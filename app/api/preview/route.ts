import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getNewsDetail, getIroiroEventDetail } from "@/app/_libs/microcms";

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

  try {
    if (endpoint === "news") {
      await getNewsDetail(contentId, { draftKey });
    } else if (endpoint === "iroiro_events") {
      await getIroiroEventDetail(contentId, { draftKey });
    }
  } catch (error) {
    console.error("Failed to fetch preview content", error);
    return NextResponse.redirect(new URL("/", request.url));
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
