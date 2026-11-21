import { getCasesList, getCaseDetail, type CmsCase } from "@/app/_libs/microcms";
import { audiences, pillars, type Audience } from "./data";
import type { CardItem } from "./_components/CaseList";

// MicroCMS の事例を、サイトの柱・対象に対応させる。
// 「事業の種類」は先頭の番号（01〜04）で柱を、「対象」は選択肢の文字（学校・教育機関 など）で対象を決める

export type CmsCaseItem = CmsCase & {
  pillarId: string;
  audienceIds: Audience[];
};

/* 1件をサイトの柱・対象に対応させる。事業の種類が選ばれていない事例は null（サイトに出さない） */
export function toCmsCaseItem(c: CmsCase): CmsCaseItem | null {
  const number = c.pillar?.[0]?.trim().slice(0, 2);
  const pillar = pillars.find((p) => p.number === number);
  if (!pillar) return null;
  const audienceIds = audiences
    .filter((a) => c.audience?.some((label) => label.trim() === a.label))
    .map((a) => a.id);
  return { ...c, pillarId: pillar.id, audienceIds };
}

export async function getCmsCases(): Promise<CmsCaseItem[]> {
  const list = await getCasesList();
  return list.flatMap((c) => {
    const item = toCmsCaseItem(c);
    return item ? [item] : [];
  });
}

// ───────────── 画面プレビュー（MicroCMS の下書きを本物のページで見る） ─────────────
// /api/preview?endpoint=cases が、見たい事例のコンテンツIDと draftKey をこのクッキーに入れてから事例のページへ送る。
// アドレスに draftKey を付けない（付けると事例のページが毎回作り直しになり、1分ごとの読み直しが効かなくなるため）
export const CASE_DRAFT_COOKIE = "canvas_case_draft";

/** クッキーの中身「<コンテンツID>:<draftKey>」 */
export function caseDraftCookieValue(contentId: string, draftKey: string) {
  return `${contentId}:${draftKey}`;
}

export function parseCaseDraftCookie(value: string | undefined) {
  if (!value) return null;
  const i = value.indexOf(":");
  if (i <= 0) return null;
  return { contentId: value.slice(0, i), draftKey: value.slice(i + 1) };
}

/** 下書きを1件読む。読めなければ null */
export async function getCmsCaseDraft(
  contentId: string,
  draftKey: string,
): Promise<CmsCaseItem | null> {
  try {
    return toCmsCaseItem(await getCaseDetail(contentId, { draftKey }));
  } catch (error) {
    console.error("MicroCMS の事例の下書きを読めませんでした", error);
    return null;
  }
}

/* MicroCMS の事例 → カード（ほかの事例と同じ形。写真は1枚目） */
export function cmsCaseToCard(c: CmsCaseItem, pillarLabel?: string): CardItem {
  const photo = c.photos?.[0];
  return {
    href: `/business/${c.pillarId}/${c.id}`,
    image: photo?.url,
    imageAlt: c.title,
    tag: c.tag,
    title: c.title,
    catchText: c.catch ?? c.subline, // カードの一言：キャッチがあればキャッチ、なければサブタイトル
    pillarLabel,
  };
}
