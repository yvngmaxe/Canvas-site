import Hero from "@/components/Hero";
import LPcompany from "@/components/LPcompany";
import CeoTeaser from "@/components/CeoTeaser";
import { getNewsList, getNewsDetail } from "@/app/_libs/microcms";
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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const draftKey = typeof sp.draftKey === "string" ? sp.draftKey : undefined;
  const contentId = typeof sp.contentId === "string" ? sp.contentId : undefined;

  // microCMSからニュースを6件取得
  const data = await getNewsList({ limit: 6 });

  // 指定されたルールでカテゴリをマッピングし、対象外のものを除外
  let mappedAndFilteredNews = data.contents
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

  if (draftKey && contentId) {
    const draft = await mergeDraft(mappedAndFilteredNews, draftKey, contentId);
    mappedAndFilteredNews = draft;
  }

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

async function mergeDraft(
  list: NewsItem[],
  draftKey: string,
  contentId: string
): Promise<NewsItem[]> {
  try {
    const draft = await getNewsDetail(contentId, { draftKey });
    if (!draft) return list;

    let mappedCategory: NewsItem["category"] | null = null;
    switch (draft.category.name) {
      case "プレスリリース":
      case "重要":
        mappedCategory = "リリース";
        break;
      case "お知らせ":
      case "ブログ":
        mappedCategory = "NEWS";
        break;
    }

    if (!mappedCategory) return list;

    const rawDate = draft.publishedAt ?? draft.createdAt ?? new Date().toISOString();

    const draftItem: NewsItem = {
      id: draft.id,
      title: draft.title,
      date: rawDate.slice(0, 10),
      category: mappedCategory,
      thumbnail: draft.thumbnail,
    };

    const filtered = list.filter((item) => item.id !== draftItem.id);
    return [draftItem, ...filtered].sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Failed to merge draft for LP", error);
    return list;
  }
}
