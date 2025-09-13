import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/components/Article";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const { id } = params;
  try {
    const data = await getNewsDetail(id);
    const title = data.title || "お知らせ";
    const description = data.description || "株式会社Canvasのお知らせ";
    const ogImage = data.thumbnail?.url || "/images/NEWS_thumbnail.png";

    return {
      title: `${title} | 株式会社Canvas`,
      description,
      alternates: { canonical: `/news/${id}` },
      openGraph: {
        type: "article",
        url: `/news/${id}`,
        title: `${title} | 株式会社Canvas`,
        description,
        images: [{ url: ogImage }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | 株式会社Canvas`,
        description,
        images: [{ url: ogImage }],
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: "お知らせ | 株式会社Canvas",
      description: "株式会社Canvasのお知らせ",
      alternates: { canonical: `/news/${id}` },
    };
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getNewsDetail(id);
  return <Article data={data} />;
}
