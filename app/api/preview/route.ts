import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getNewsDetail, getIroiroEventDetail } from "@/app/_libs/microcms";

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
