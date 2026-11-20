import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { pillars, type Case, type Pillar, type Product } from "../../data";
import { CaseView, CmsCaseView, ProductView } from "../../_components/PillarSection";
import { BackLink, Breadcrumb, CardList, caseToCard } from "../../_components/CaseList";
import { getCmsCases, cmsCaseToCard, type CmsCaseItem } from "../../cmsCases";

// 事例の詳しいページ（/business/project/toihogushi など）と、
// プロダクトの説明ページ（/business/rnd/torinome）。
// 中身は ../../data.ts（もとは事業内容ページに並んでいたものを、そのまま1ページずつに）

// data.ts の事例・プロダクトは先に作っておき、それ以外のアドレスは MicroCMS の事例（コンテンツID）を探す
export const dynamicParams = true;
// MicroCMS の事例を1分ごとに読み直す
export const revalidate = 60;

export function generateStaticParams() {
  return pillars.flatMap((p) => [
    ...(p.cases ?? []).map((c) => ({ pillar: p.id, slug: c.slug })),
    ...(p.products ?? []).map((pr) => ({ pillar: p.id, slug: pr.slug })),
  ]);
}

type Found =
  | { kind: "case"; pillar: Pillar; item: Case }
  | { kind: "product"; pillar: Pillar; item: Product }
  | { kind: "cms"; pillar: Pillar; item: CmsCaseItem };

async function find(pillarId: string, slug: string): Promise<Found | null> {
  const pillar = pillars.find((p) => p.id === pillarId);
  if (!pillar) return null;
  const c = pillar.cases?.find((x) => x.slug === slug);
  if (c) return { kind: "case", pillar, item: c };
  const pr = pillar.products?.find((x) => x.slug === slug);
  if (pr) return { kind: "product", pillar, item: pr };
  // MicroCMS の事例（同じ柱に入っているものだけ）
  const cms = (await getCmsCases()).find((x) => x.id === slug && x.pillarId === pillar.id);
  if (cms) return { kind: "cms", pillar, item: cms };
  return null;
}

type Params = Promise<{ pillar: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { pillar, slug } = await params;
  const found = await find(pillar, slug);
  if (!found) return {};
  if (found.kind === "cms") {
    return {
      title: `${found.item.title} | 事業内容 | 株式会社CANVAS`,
      description: found.item.subline ?? found.pillar.lead,
    };
  }
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
  const found = await find(pillarId, slug);
  if (!found) notFound();
  const { pillar } = found;
  const pillarLabel = `${pillar.number} ${pillar.title}`;
  // プロダクト（トリノメ）の事例：MicroCMS で同じ柱（04 R&D）に入れた事例（新しい順）＋ data.ts で指定したもの
  const cards =
    found.kind === "product"
      ? [
          ...(await getCmsCases())
            .filter((c) => c.pillarId === pillar.id)
            .map((c) => cmsCaseToCard(c)),
          ...relatedCards(found.item),
        ]
      : [];

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
        ) : found.kind === "cms" ? (
          <CmsCaseView
            pillarLabel={pillarLabel}
            title={found.item.title}
            tag={found.item.tag}
            catchCopy={found.item.catch}
            subline={found.item.subline}
            meta={found.item.meta}
            question={found.item.question}
            body={found.item.body}
            photos={found.item.photos}
          />
        ) : (
          <CaseView item={found.item} pillarLabel={pillarLabel} />
        )}
        <BackLink href={`/business/${pillar.id}`} label={`${pillarLabel}にもどる`} />
      </PageLayout>
    </div>
  );
}
