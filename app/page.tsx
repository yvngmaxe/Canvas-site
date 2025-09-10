import Hero from "@/components/Hero";
import Audience from "@/components/Audience/Audience";
import TopNews from "@/components/TopNews/TopNews";
import SectionSeparator from "@/components/SectionSeparator/SectionSeparator";
import LPVision from "@/components/LPVision";
import LPiroiro from "@/components/LPiroiro";
import { getNewsList } from "@/app/_libs/microcms";
import type { News, MicroCMSImage } from "@/app/_libs/microcms";

// TopNewsコンポーネントが期待する型
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
      {/* <Audience /> */}
      <TopNews items={mappedAndFilteredNews} />
      <SectionSeparator />
      <LPVision />
      <SectionSeparator />
      <LPiroiro />
      <SectionSeparator />
    </>
  );
}
