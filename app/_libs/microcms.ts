import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";
export type { MicroCMSImage } from "microcms-js-sdk";

//型の定義

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

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

// iroiro スポンサー
export type IroiroSponsor = {
  name: string;
  logo?: MicroCMSImage; // 画像フィールド
  url?: string; // 会社サイトなど
  kidsPower?: number; // 数値指標
  description?: string; // プロフィール本文（リッチテキスト）
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

//メンバーの一覧を表示する関数
export const getMembersList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Member>({
    endpoint: "members",
    queries,
  });
  return listData;
};

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
