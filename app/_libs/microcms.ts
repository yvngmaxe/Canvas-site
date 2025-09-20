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

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

// iroiro イベント
export type IroiroEvent = {
  title: string;
  description?: string;
  body?: string; // 詳細本文（任意）
  date?: string; // ISO8601 日付 or 日時（microCMS 側で日付型推奨）
  place?: string;
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

// 子ども新聞
export type KodomoNews = {
  title: string;
  date?: string; // 掲載日
  summary?: string; // 一覧用の要約
  thumbnail?: MicroCMSImage; // サムネイル画像
  body?: string; // 詳細本文（任意）
} & MicroCMSListContent;

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
  queries?: MicroCMSQueries
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

// スポンサー詳細を取得
export const getIroiroSponsorDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<IroiroSponsor>({
    endpoint: "iroiro_sponsors",
    contentId,
    queries,
  });
  return detailData;
};

// 子ども新聞 一覧を取得
export const getKodomoNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<KodomoNews>({
    endpoint: "iroiro_kodomonews",
    queries,
  });
  return listData;
};
