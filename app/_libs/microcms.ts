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
  contents?: string;
  category: Category;
  date: string;
  thumbnail?: MicroCMSImage;
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

// 事例（MicroCMS の「事例」API・エンドポイント cases）
// 2026-11-20 から、新しい事例は智也さんが MicroCMS で足す（今までの9件は app/business/data.ts に書いたまま）
export type CmsCase = {
  title: string;
  pillar?: string[]; // 事業の種類（セレクト）「01 教材・カリキュラム開発」など
  audience?: string[]; // 対象（複数セレクト）「学校・教育機関」など
  tag?: string;
  subline?: string; // 対象・日程（サブタイトル）
  catch?: string; // キャッチ（タイトルの下の大きめの一文）
  meta?: string; // 概要（テキストエリア。「主催：〇〇」を1行ずつ → 小さな表）
  question?: string; // 問い（赤い大きな文字）
  photos?: MicroCMSImage[];
  body?: string; // 本文（リッチエディタの HTML）
} & MicroCMSListContent;

// 事例を公開日時の新しい順に取る。MicroCMS が止まっていても、サイトは壊さず「0件」として続ける
export const getCasesList = async (): Promise<CmsCase[]> => {
  try {
    const listData = await client.getList<CmsCase>({
      endpoint: "cases",
      queries: { orders: "-publishedAt", limit: 100 },
    });
    return listData.contents;
  } catch (error) {
    console.error("MicroCMS の事例を読めませんでした", error);
    return [];
  }
};

//ニュース一覧を取得する関数
// 並び順は「公開日時の新しい順」。MicroCMS で公開日時を変えると、表示の日付も並び順も変わる
// （指定しないと MicroCMS 側の決まった順になり、新しい記事が下に来ることがあった）
export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: "news",
    queries: { orders: "-publishedAt", ...queries },
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
