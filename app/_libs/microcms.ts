import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";
export type { MicroCMSImage } from "microcms-js-sdk";

//型の定義

export type Category = {
  name: string;
} & MicroCMSListContent;

type Tag = {
  name: string;
} & MicroCMSListContent;

type CategoryField = Category | Category[] | null | undefined;

export type News = {
  title: string;
  description?: string;
  decsription?: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category?: Category | Category[] | null;
  tags?: Tag[] | string[] | Tag | string | null;
} & MicroCMSListContent;

// iroiro イベント
export type IroiroEvent = {
  title: string;
  description?: string;
  body?: string; // 詳細本文（任意）
  date?: string; // ISO8601 日付 or 日時（microCMS 側で日付型推奨）
  place?: string;
  target?: string; // 参加対象（例: 小学生、中学生）
  thumbnail?: MicroCMSImage;
} & MicroCMSListContent;

// iroiro スポンサー
export type IroiroSponsor = {
  name: string;
  logo?: MicroCMSImage; // 画像フィールド
  url?: string; // 会社サイトなど
  kidsPower?: number; // 数値指標
  description?: string; // プロフィール本文（リッチテキスト）
} & MicroCMSListContent;

//実績
export type AchievementTag = {
  name: string;
} & MicroCMSListContent;

export type Achievement = {
  title: string;
  description?: string;
  content?: string;
  category: Category;
  date: string;
  thumbnail?: MicroCMSImage;
  // microCMSの「コンテンツ参照（news）」想定: フィールドIDは relatedNews を想定
  relatedNews?: {
    id: string;
    title?: string;
  } | null;
  tags?: AchievementTag[] | string[] | AchievementTag | string | null;
} & MicroCMSListContent;

export function extractCategoryNames(category: CategoryField): string[] {
  if (!category) return [];
  if (Array.isArray(category)) {
    return category
      .map((item) => item?.name)
      .filter((name): name is string => Boolean(name));
  }
  return category.name ? [category.name] : [];
}

export function getPrimaryCategoryName(
  category: CategoryField,
): string | undefined {
  const [first] = extractCategoryNames(category);
  return first;
}

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

//ニュース一覧を取得する関数
export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: "news",
    queries,
  });
  return listData;
};

//ニュースの詳細情報を取得する関数
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
  return detailData;
};

// スポンサー一覧を取得（エンドポイント名は microCMS の設定に合わせて変更）
export const getIroiroSponsorsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<IroiroSponsor>({
    endpoint: "iroiro_sponsors",
    queries,
  });
  return listData;
};

// イベント一覧を取得
export const getIroiroEventsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<IroiroEvent>({
    endpoint: "iroiro_events",
    queries,
  });
  return listData;
};

// イベント詳細を取得
export const getIroiroEventDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client.getListDetail<IroiroEvent>({
    endpoint: "iroiro_events",
    contentId,
    queries,
  });
  return detailData;
};

// スポンサー詳細を取得
export const getIroiroSponsorDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client.getListDetail<IroiroSponsor>({
    endpoint: "iroiro_sponsors",
    contentId,
    queries,
  });
  return detailData;
};

// 実績を取得
export const getAchievementsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Achievement>({
    endpoint: "achievements",
    queries,
  });
  return listData;
};

// 実績詳細を取得
export const getAchievementDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client.getListDetail<Achievement>({
    endpoint: "achievements",
    contentId,
    queries,
  });
  return detailData;
};
