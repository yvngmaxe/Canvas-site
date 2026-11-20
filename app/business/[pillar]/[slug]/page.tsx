import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { pillars, type Case, type Pillar, type Product } from "../../data";
import { CaseView, ProductView } from "../../_components/PillarSection";
import { BackLink, Breadcrumb, CardList, caseToCard } from "../../_components/CaseList";

// 事例の詳しいページ（/business/project/toihogushi など）と、
// プロダクトの説明ページ（/business/rnd/torinome）。
// 中身は ../../data.ts（もとは事業内容ページに並んでいたものを、そのまま1ページずつに）

export const dynamicParams = false;

export function generateStaticParams() {
  return pillars.flatMap((p) => [
    ...(p.cases ?? []).map((c) => ({ pillar: p.id, slug: c.slug })),
    ...(p.products ?? []).map((pr) => ({ pillar: p.id, slug: pr.slug })),
  ]);
}

type Found =
  | { kind: "case"; pillar: Pillar; item: Case }
  | { kind: "product"; pillar: Pillar; item: Product };

function find(pillarId: string, slug: string): Found | null {
  const pillar = pillars.find((p) => p.id === pillarId);
  if (!pillar) return null;
  const c = pillar.cases?.find((x) => x.slug === slug);
  if (c) return { kind: "case", pillar, item: c };
  const pr = pillar.products?.find((x) => x.slug === slug);
  if (pr) return { kind: "product", pillar, item: pr };
  return null;
}

type Params = Promise<{ pillar: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { pillar, slug } = await params;
  const found = find(pillar, slug);
  if (!found) return {};
  if (found.kind === "product") {
    const p = found.item;
    return {
      title: `${p.kicker} ${p.title} | 事業内容 | 株式会社CANVAS`,
      description: p.catchCopy,
    };
  }
  const { item } = found;
  return {
    title: `${item.title} | 事業内容 | 株式会社CANVAS`,
    description: item.catchCopy ?? item.subline ?? found.pillar.lead,
  };
}

/* プロダクトの「事例」：ほかの柱の事例へのリンクをカードに */
function relatedCards(product: Product) {
  return (product.relatedCases ?? []).flatMap(({ pillarId, slug }) => {
    const c = pillars.find((p) => p.id === pillarId)?.cases?.find((x) => x.slug === slug);
    return c ? [caseToCard(pillarId, c)] : [];
  });
}

export default async function CasePage({ params }: { params: Params }) {
  const { pillar: pillarId, slug } = await params;
  const found = find(pillarId, slug);
  if (!found) notFound();
  const { pillar } = found;
  const pillarLabel = `${pillar.number} ${pillar.title}`;
  const cards = found.kind === "product" ? relatedCards(found.item) : [];

  return (
    <div className="page">
      <PageLayout title="SERVICE" subtitle="事業内容" topPadding="compact" decorated="compact">
        <Breadcrumb
          items={[
            { href: "/business", label: "事業内容" },
            { href: `/business/${pillar.id}`, label: pillarLabel },
          ]}
        />
        {found.kind === "product" ? (
          <ProductView
            cases={
              cards.length > 0 ? (
                <CardList id="product-cases-title" heading="事例" cards={cards} />
              ) : undefined
            }
          />
        ) : (
          <CaseView item={found.item} pillarLabel={pillarLabel} />
        )}
        <BackLink href={`/business/${pillar.id}`} label={`${pillarLabel}にもどる`} />
      </PageLayout>
    </div>
  );
}
