import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "会社概要 | 株式会社CANVAS",
  description:
    "株式会社CANVASの会社概要ページです。社名・設立・所在地・代表者・事業内容など、会社の基本情報をご紹介します。",
};

export default function CompanyPage() {
  return (
    <div className="page">
      <PageLayout title="COMPANY" subtitle="会社概要">
        <dl className="divide-y divide-gray-200">
          {/* 1期末パンフレット p.16「会社概要」と同じ見出し・順番 */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              社名
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              株式会社CANVAS
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              設立
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              2025年11月21日
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              所在地
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              広島県東広島市鏡山2丁目313番地
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              代表者
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              代表取締役 山口 智也
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              事業内容
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              {/* 1期末パンフレット p.16 の「事業内容」（4本柱）に合わせる */}
              <ul>
                <li style={{ listStyleType: "disc" }}>教材・カリキュラム開発</li>
                <li style={{ listStyleType: "disc" }}>学びのプロジェクト企画運営</li>
                <li style={{ listStyleType: "disc" }}>教育現場活動</li>
                <li style={{ listStyleType: "disc" }}>研究開発（R&amp;D）</li>
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              お問い合わせ
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              yamaguchi@e-canvas.co.jp
            </dd>
          </div>
        </dl>
      </PageLayout>
    </div>
  );
}
