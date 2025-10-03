import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/components/Article";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await getNewsDetail(id);
    const title = data.title || "お知らせ";
    const description = data.description || "株式会社CANVASのお知らせ";
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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getNewsDetail(id);
  return <Article data={data} />;
}
