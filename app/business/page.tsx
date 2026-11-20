import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PillarCards from "@/components/PillarCards";
import { AudienceLinks } from "./_components/AudienceLinks";

// 事業内容ページ：4本柱のカードだけ（1期末パンフレット p.4）。
// カードを押すと各柱のページ（/business/<id>）へ。柱の説明と事例はそちらに
// （智也さんのフィードバック：事業のカード → 事例のカード → 事例の詳細、の3段。参考 https://playspace.jp/4#new-service ）

export const metadata: Metadata = {
  title: "事業内容 | 株式会社CANVAS",
  description:
    "株式会社CANVASの事業内容をご紹介します。教材・カリキュラム開発、学びのプロジェクト企画運営、教育現場活動、研究開発（R&D）の4つの柱で、人々の学びを支えています。",
};

export default function BusinessPage() {
  return (
    <div className="page">
      <PageLayout title="SERVICE" subtitle="事業内容" topPadding="compact" decorated="compact">
        <PillarCards />
        {/* 対象（学校・塾・自治体・企業）から事例をさがす入り口 */}
        <AudienceLinks />
      </PageLayout>
    </div>
  );
}
