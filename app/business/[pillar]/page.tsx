import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { pillars } from "../data";
import { PillarSection } from "../_components/PillarSection";
import { CaseList, BackLink } from "../_components/CaseList";

// 柱のページ（/business/curriculum など）：柱の説明（赤い帯）＋事例のカード
// R&D（/business/rnd）は今はトリノメの説明をそのまま出している（作り直しステップ4で「R&D → トリノメ」の形に）

export const dynamicParams = false;

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar: id } = await params;
  const pillar = pillars.find((p) => p.id === id);
  if (!pillar) return {};
  return {
    title: `${pillar.title} | 事業内容 | 株式会社CANVAS`,
    description: pillar.lead,
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar: id } = await params;
  const pillar = pillars.find((p) => p.id === id);
  if (!pillar) notFound();

  return (
    <div className="page">
      <PageLayout title="SERVICE" subtitle="事業内容" topPadding="compact" decorated="compact">
        <PillarSection pillar={pillar}>
          {pillar.cases && pillar.cases.length > 0 ? (
            <CaseList pillarId={pillar.id} cases={pillar.cases} />
          ) : undefined}
        </PillarSection>
        <BackLink href="/business" label="事業内容にもどる" />
      </PageLayout>
    </div>
  );
}
