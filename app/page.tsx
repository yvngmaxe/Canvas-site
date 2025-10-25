import Hero from "@/components/Hero";
import LPcompany from "@/components/LPcompany";
import CeoTeaser from "@/components/CeoTeaser";
import { getNewsList } from "@/app/_libs/microcms";
import type { News, MicroCMSImage } from "@/app/_libs/microcms";
import LPservice from "@/components/LPservice";
import LPnews from "@/components/LPnews";

export const revalidate = 60;

type NewsItem = {
  id: string;
  title: string;
  category: "NEWS" | "リリース";
  date: string;
  thumbnail: MicroCMSImage | undefined;
};

export default async function Home() {
  // microCMSからニュースを6件取得
  const data = await getNewsList({ limit: 6 });

  // 指定されたルールでカテゴリをマッピングし、対象外のものを除外
  const mappedAndFilteredNews = data.contents
    .map((news: News) => {
      let mappedCategory: "NEWS" | "リリース" | null = null;

      switch (news.category.name) {
        case "プレスリリース":
        case "重要":
          mappedCategory = "リリース";
          break;
        case "お知らせ":
        case "ブログ":
          mappedCategory = "NEWS";
          break;
      }

      if (mappedCategory) {
        const rawDate =
          news.publishedAt ?? news.createdAt ?? new Date().toISOString();
        return {
          id: news.id,
          title: news.title,
          date: rawDate.slice(0, 10),
          category: mappedCategory,
          thumbnail: news.thumbnail, // thumbnail情報を追加
        };
      }
      return null;
    })
    .filter((item): item is NewsItem => item !== null);

  return (
    <>
      <Hero />
      <LPcompany />
      <LPservice />
      <LPnews
        title="お知らせ"
        lead="リリースとNEWSをタブで表示します。"
        items={mappedAndFilteredNews}
        maxItems={4}
        showTabs
      />
      <CeoTeaser />
    </>
  );
}
