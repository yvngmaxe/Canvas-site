import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  getNewsDetail,
  getIroiroEventDetail,
} from "@/app/_libs/microcms";
import {
  getCmsCaseDraft,
  caseDraftCookieValue,
  CASE_DRAFT_COOKIE,
} from "@/app/business/cmsCases";

const shouldSkipVerification =
  process.env.MICROCMS_PREVIEW_VERIFY === "0" || process.env.NODE_ENV !== "production";
const MICROCMS_REQUEST_TIMEOUT = Number(process.env.MICROCMS_PREVIEW_TIMEOUT_MS ?? 5000);

export async function GET(request: NextRequest) {
  const secret = process.env.MICROCMS_PREVIEW_SECRET;
  const { searchParams } = new URL(request.url);

  const contentId = searchParams.get("contentId");
  const draftKey = searchParams.get("draftKey");
  const endpoint = searchParams.get("endpoint") ?? "news";
  const token = searchParams.get("secret");
  const redirectParam = searchParams.get("redirect");

  if (!secret || !contentId || !draftKey || token !== secret) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 事例：下書きを読んで「事業の種類」から柱を決め、/business/<柱>/<コンテンツID> へ。
  // draftKey はアドレスではなくクッキーで渡す（事例のページの1分ごとの読み直しを保つため）
  if (endpoint === "cases") {
    let item;
    try {
      item = await withTimeout(getCmsCaseDraft(contentId, draftKey), MICROCMS_REQUEST_TIMEOUT);
    } catch (error) {
      console.error("Failed to fetch preview content", error);
    }
    if (!item) {
      return new NextResponse(
        "事例の下書きを表示できませんでした。MicroCMS で「事業の種類」を選んでいるか確かめてから、もう一度「画面プレビュー」を押してください。",
        { status: 400, headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    }

    const draft = await draftMode();
    draft.enable();
    const response = NextResponse.redirect(
      new URL(`/business/${item.pillarId}/${encodeURIComponent(contentId)}`, request.url),
    );
    response.cookies.set(CASE_DRAFT_COOKIE, caseDraftCookieValue(contentId, draftKey), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1時間
    });
    return response;
  }

  if (!shouldSkipVerification) {
    try {
      const verifyPromise: Promise<unknown> =
        endpoint === "news"
          ? getNewsDetail(contentId, { draftKey })
          : endpoint === "iroiro_events"
            ? getIroiroEventDetail(contentId, { draftKey })
            : Promise.resolve(undefined);

      await withTimeout(verifyPromise, MICROCMS_REQUEST_TIMEOUT);
    } catch (error) {
      console.error("Failed to fetch preview content", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const draft = await draftMode();
  draft.enable();

  if (redirectParam) {
    const redirectUrl = new URL(redirectParam, request.url);
    redirectUrl.searchParams.set("draftKey", draftKey);
    redirectUrl.searchParams.set("contentId", contentId);
    return NextResponse.redirect(redirectUrl);
  }

  const redirectPath =
    endpoint === "news"
      ? `/news/${contentId}?draftKey=${draftKey}`
      : endpoint === "iroiro_events"
        ? `/iroiro/events/${contentId}?draftKey=${draftKey}`
        : "/";

  return NextResponse.redirect(new URL(redirectPath, request.url));
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutId: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`microCMS preview verification timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}
