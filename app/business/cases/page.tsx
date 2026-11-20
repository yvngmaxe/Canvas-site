import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { pillars, audiences, type Audience } from "../data";
import { caseToCard, BackLink, Breadcrumb } from "../_components/CaseList";
import { CaseFinder, type FinderCard } from "../_components/CaseFinder";
import { getCmsCases, cmsCaseToCard } from "../cmsCases";
import styles from "../_components/CaseFinder.module.css";

// 事例の一覧ページ（/business/cases）：全部の柱の事例を1ページに並べ、対象（学校・塾・自治体・企業）で絞り込める。
// 事業内容ページの「対象から事例をさがす」のボタンから ?for=school のように来る

export const metadata: Metadata = {
  title: "事例 | 事業内容 | 株式会社CANVAS",
  description:
    "株式会社CANVASの事例をご紹介します。学校・教育機関、塾・教育事業者、自治体・地域、企業の方に向けた取り組みを、対象ごとにご覧いただけます。",
};

export default async function CasesPage({
  searchParams,
}: {
  searchParams: Promise<{ for?: string | string[] }>;
}) {
  const sp = await searchParams;
  const param = typeof sp.for === "string" ? sp.for : undefined;
  const initial: Audience | "all" = audiences.some((a) => a.id === param)
    ? (param as Audience)
    : "all";

  // MicroCMS の事例（新しい順）を先頭に、そのあとに data.ts の事例
  const label = (pillarId: string) => {
    const p = pillars.find((x) => x.id === pillarId);
    return p ? `${p.number} ${p.title}` : undefined;
  };
  const cmsCards: FinderCard[] = (await getCmsCases()).map((c) => ({
    ...cmsCaseToCard(c, label(c.pillarId)),
    audiences: c.audienceIds,
  }));
  const cards: FinderCard[] = [
    ...cmsCards,
    ...pillars.flatMap((p) =>
      (p.cases ?? []).map((c) => ({
        ...caseToCard(p.id, c, `${p.number} ${p.title}`),
        audiences: c.audiences,
      })),
    ),
  ];

  return (
    <div className="page">
      <PageLayout title="SERVICE" subtitle="事業内容" topPadding="compact" decorated="compact">
        <Breadcrumb items={[{ href: "/business", label: "事業内容" }]} />
        <h2 className={styles.pageTitle}>事例</h2>
        <p className={styles.pageLead}>対象を選ぶと、その方に向けた事例だけをご覧いただけます。</p>
        <CaseFinder
          cards={cards}
          options={audiences.map((a) => ({ id: a.id, label: a.label }))}
          initial={initial}
        />
        <BackLink href="/business" label="事業内容にもどる" />
      </PageLayout>
    </div>
  );
}
