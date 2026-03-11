import Hero from "@/components/Hero";
import LPcompany from "@/components/LPcompany";
import CeoTeaser from "@/components/CeoTeaser";
import {
  getNewsList,
  getNewsDetail,
  getAchievementsList,
  extractCategoryNames,
} from "@/app/_libs/microcms";
import type { MicroCMSImage, News } from "@/app/_libs/microcms";
import LPservice from "@/components/LPservice";
import LPnews from "@/components/LPnews";
import LPworks from "@/components/LPworks";
import SectionDivider from "@/components/SectionDivider/index";
import { SectionHeader } from "@/components/SectionHeader/index";
export const revalidate = 60;

type NewsItem = {
  id: string;
  title: string;
  category: "NEWS" | "リリース";
  date: string;
  thumbnail: MicroCMSImage | undefined;
  summary: string;
  tags: string[];
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const draftKey = typeof sp.draftKey === "string" ? sp.draftKey : undefined;
  const contentId = typeof sp.contentId === "string" ? sp.contentId : undefined;

  const [newsData, achievementsData] = await Promise.all([
    fetchNewsListWithFallback(6),
    fetchAchievementsListWithFallback(6),
  ]);

  // タグまたはカテゴリー名で種別を判断
  let mappedAndFilteredNews = newsData.contents
    .map((news: News) => {
      const mappedCategory = determineNewsCategory(news);

      if (mappedCategory) {
        const rawDate =
          news.publishedAt ?? news.createdAt ?? new Date().toISOString();
        const rawDescription = news.description ?? news.decsription;
        const description = rawDescription?.trim();
        const bodyText = news.content
          ?.replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        const summarySource =
          description && description.length > 0
            ? description
            : (bodyText ?? "");
        const summary = summarySource
          ? `${summarySource.slice(0, 90)}${
              summarySource.length > 90 ? "…" : ""
            }`
          : "";

        return {
          id: news.id,
          title: news.title,
          date: rawDate.slice(0, 10),
          category: mappedCategory,
          thumbnail: news.thumbnail, // thumbnail情報を追加
          summary,
          tags: normalizeTagNames(news.tags),
        };
      }
      return null;
    })
    .filter((item): item is NewsItem => item !== null);

  if (draftKey && contentId) {
    const draft = await mergeDraft(mappedAndFilteredNews, draftKey, contentId);
    mappedAndFilteredNews = draft;
  }

  const pickupAchievements = achievementsData.contents ?? [];

  return (
    <>
      <Hero />
      <SectionHeader label="ABOUT-CANVAS" title="CANVASについて" />
      <LPcompany />
      <SectionHeader label="WORKS" title="実績" />
      <LPworks
        title="実績ピックアップ"
        lead="実績ページの中から最新の取り組みをいくつか抜粋しています。"
        items={pickupAchievements}
        maxItems={3}
      />
      <SectionHeader label="NEWS" title="お知らせ" />
      {/*<LPservice />*/}
      <LPnews
        title="お知らせ"
        lead="リリースとNEWSをカテゴリごとに掲載しています。"
        items={mappedAndFilteredNews}
        maxItemsPerCategory={2}
      />
      <SectionHeader label="MEMBER" title="メンバー紹介" />
      <CeoTeaser />
    </>
  );
}

async function fetchNewsListWithFallback(limit: number) {
  try {
    return await getNewsList({ limit });
  } catch (error) {
    console.error("[Home] Failed to fetch news list", error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    } satisfies Awaited<ReturnType<typeof getNewsList>>;
  }
}

async function fetchAchievementsListWithFallback(limit: number) {
  try {
    return await getAchievementsList({ limit });
  } catch (error) {
    console.error("[Home] Failed to fetch achievements list", error);
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit,
    } satisfies Awaited<ReturnType<typeof getAchievementsList>>;
  }
}

async function mergeDraft(
  list: NewsItem[],
  draftKey: string,
  contentId: string,
): Promise<NewsItem[]> {
  try {
    const draft = await getNewsDetail(contentId, { draftKey });
    if (!draft) return list;

    const mappedCategory = determineNewsCategory(draft);

    if (!mappedCategory) return list;

    const rawDate =
      draft.publishedAt ?? draft.createdAt ?? new Date().toISOString();

    const rawDescription = draft.description ?? draft.decsription;
    const description = rawDescription?.trim();
    const bodyText = draft.content
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const summarySource =
      description && description.length > 0 ? description : (bodyText ?? "");
    const summary = summarySource
      ? `${summarySource.slice(0, 90)}${summarySource.length > 90 ? "…" : ""}`
      : "";

    const draftItem: NewsItem = {
      id: draft.id,
      title: draft.title,
      date: rawDate.slice(0, 10),
      category: mappedCategory,
      thumbnail: draft.thumbnail,
      summary,
      tags: normalizeTagNames(draft.tags),
    };

    const filtered = list.filter((item) => item.id !== draftItem.id);
    return [draftItem, ...filtered].sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error("Failed to merge draft for LP", error);
    return list;
  }
}

function determineNewsCategory(news: News): "NEWS" | "リリース" | null {
  const tagBased = pickCategoryFromTags(news.tags);
  if (tagBased) return tagBased;

  const categoryNames = extractCategoryNames(news.category);
  if (
    categoryNames.some((name) => name === "プレスリリース" || name === "重要")
  ) {
    return "リリース";
  }
  if (
    categoryNames.some(
      (name) => name === "お知らせ" || name === "ブログ" || name === "NEWS",
    )
  ) {
    return "NEWS";
  }
  return null;
}

function pickCategoryFromTags(tags: News["tags"]): "NEWS" | "リリース" | null {
  const tagNames = normalizeTagNames(tags);
  if (tagNames.includes("NEWS")) return "NEWS";
  if (tagNames.includes("リリース")) return "リリース";
  return null;
}

function normalizeTagNames(tags: News["tags"]): string[] {
  if (!tags) return [];
  const normalized = Array.isArray(tags) ? tags : [tags];
  return normalized
    .map((tag) => {
      if (typeof tag === "string") return tag;
      if (tag && typeof tag === "object" && "name" in tag) {
        return typeof tag.name === "string" ? tag.name : undefined;
      }
      return undefined;
    })
    .filter((name): name is string => Boolean(name));
}
