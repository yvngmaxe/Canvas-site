import Hero from "@/components/Hero";
import Audience from "@/components/Audience/Audience";
import TopNews from "@/components/TopNews/TopNews";
import SectionSeparator from "@/components/SectionSeparator/SectionSeparator";
import { getNewsList } from "@/app/_libs/microcms";
import type { News, MicroCMSImage } from "@/app/_libs/microcms";

// TopNewsコンポーネントが期待する型
type NewsItem = {
  id: string;
  title: string;
  category: 'NEWS' | 'リリース';
  date: string;
  thumbnail?: MicroCMSImage;
};

export default async function Home() {
  // microCMSからニュースを6件取得
  const data = await getNewsList({ limit: 6 });

  // 指定されたルールでカテゴリをマッピングし、対象外のものを除外
  const mappedAndFilteredNews = data.contents
    .map((news: News) => {
      let mappedCategory: 'NEWS' | 'リリース' | null = null;

      switch (news.category.name) {
        case 'プレスリリース':
        case '重要':
          mappedCategory = 'リリース';
          break;
        case 'お知らせ':
        case 'ブログ':
          mappedCategory = 'NEWS';
          break;
      }

      if (mappedCategory) {
        return {
          id: news.id,
          title: news.title,
          date: new Date(news.publishedAt).toISOString().split('T')[0],
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
      <Audience />
      <TopNews items={mappedAndFilteredNews} />
      <SectionSeparator />
      {/* VISION セクションのプレースホルダー */}
      <section
        style={{
          padding: "40px 20px",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ fontSize: "2em", marginBottom: "20px" }}>VISION</h2>
        <p style={{ fontSize: "1.1em", color: "#555" }}>
          ここに「VISION」のコンテンツが入ります。
          詳細を教えていただければ、ここに再構築します。
        </p>
      </section>
      <SectionSeparator />
      {/* iroiro広島 の直書きコンテンツのプレースホルダー */}
      <section
        style={{
          padding: "40px 20px",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ fontSize: "2em", marginBottom: "20px" }}>iroiro広島</h2>
        <p style={{ fontSize: "1.1em", color: "#555" }}>
          ここに「iroiro広島」の元のコンテンツが入ります。
          詳細を教えていただければ、ここに再構築します。
        </p>
      </section>
      <SectionSeparator />
    </>
  );
}