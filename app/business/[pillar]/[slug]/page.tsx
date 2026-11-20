import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { pillars } from "../../data";
import { CaseView } from "../../_components/PillarSection";
import { BackLink, Breadcrumb } from "../../_components/CaseList";

// 事例の詳しいページ（/business/project/toihogushi など）。
// 中身は ../../data.ts の各事例（もとは事業内容ページに並んでいたものを、そのまま1ページずつに）

export const dynamicParams = false;

export function generateStaticParams() {
  return pillars.flatMap((p) =>
    (p.cases ?? []).map((c) => ({ pillar: p.id, slug: c.slug })),
  );
}

function findCase(pillarId: string, slug: string) {
  const pillar = pillars.find((p) => p.id === pillarId);
  const item = pillar?.cases?.find((c) => c.slug === slug);
  return pillar && item ? { pillar, item } : null;
}

type Params = Promise<{ pillar: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { pillar, slug } = await params;
  const found = findCase(pillar, slug);
  if (!found) return {};
  const { item } = found;
  return {
    title: `${item.title} | 事業内容 | 株式会社CANVAS`,
    description: item.catchCopy ?? item.subline ?? found.pillar.lead,
  };
}

export default async function CasePage({ params }: { params: Params }) {
  const { pillar: pillarId, slug } = await params;
  const found = findCase(pillarId, slug);
  if (!found) notFound();
  const { pillar, item } = found;
  const pillarLabel = `${pillar.number} ${pillar.title}`;

  return (
    <div className="page">
      <PageLayout title="SERVICE" subtitle="事業内容" topPadding="compact" decorated="compact">
        <Breadcrumb
          items={[
            { href: "/business", label: "事業内容" },
            { href: `/business/${pillar.id}`, label: pillarLabel },
          ]}
        />
        <CaseView item={item} pillarLabel={pillarLabel} />
        <BackLink href={`/business/${pillar.id}`} label={`${pillarLabel}にもどる`} />
      </PageLayout>
    </div>
  );
}
