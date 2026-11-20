import { getCasesList, type CmsCase } from "@/app/_libs/microcms";
import { audiences, pillars, type Audience } from "./data";
import type { CardItem } from "./_components/CaseList";

// MicroCMS の事例を、サイトの柱・対象に対応させる。
// 「事業の種類」は先頭の番号（01〜04）で柱を、「対象」は選択肢の文字（学校・教育機関 など）で対象を決める

export type CmsCaseItem = CmsCase & {
  pillarId: string;
  audienceIds: Audience[];
};

export async function getCmsCases(): Promise<CmsCaseItem[]> {
  const list = await getCasesList();
  return list.flatMap((c) => {
    const number = c.pillar?.[0]?.trim().slice(0, 2);
    const pillar = pillars.find((p) => p.number === number);
    if (!pillar) return []; // 事業の種類が選ばれていない事例は出さない
    const audienceIds = audiences
      .filter((a) => c.audience?.some((label) => label.trim() === a.label))
      .map((a) => a.id);
    return [{ ...c, pillarId: pillar.id, audienceIds }];
  });
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
