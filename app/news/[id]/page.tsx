import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/components/Article";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";

export const revalidate = 60;

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ draftKey?: string }>;
  }
): Promise<Metadata> {
  const [{ id }, { draftKey }] = await Promise.all([params, searchParams]);
  try {
    const data = await getNewsDetail(id, draftKey ? { draftKey } : undefined);
    const title = data.title || "お知らせ";
    const description =
      data.description || data.decsription || "株式会社CANVASのお知らせ";
    const ogImage = data.thumbnail?.url || "/images/NEWS_thumbnail.png";

    return {
      title: `${title} | 株式会社CANVAS`,
      description,
      alternates: { canonical: `/news/${id}` },
      openGraph: {
        type: "article",
        url: `/news/${id}`,
        title: `${title} | 株式会社CANVAS`,
        description,
        images: [{ url: ogImage }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | 株式会社CANVAS`,
        description,
        images: [{ url: ogImage }],
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: "お知らせ | 株式会社CANVAS",
      description: "株式会社CANVASのお知らせ",
      alternates: { canonical: `/news/${id}` },
    };
  }
}

export default async function Page(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ draftKey?: string }>;
  }
) {
  const [{ id }, { draftKey }] = await Promise.all([params, searchParams]);

  const { isEnabled } = await draftMode();
  const query = draftKey && isEnabled ? { draftKey } : undefined;

  try {
    const data = await getNewsDetail(id, query);
    return <Article data={data} />;
  } catch (error) {
    console.error("Failed to load news detail", error);
    notFound();
  }
}
