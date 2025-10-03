import PageLayout from "@/components/PageLayout";

export default function CompanyPage() {
  return (
    <div className="page">
      <PageLayout title="COMPANY" subtitle="会社概要">
        <dl className="divide-y divide-gray-200">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              商号
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              株式会社CANVAS
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              所在地
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              広島県広島市
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              設立(登記後に記入)
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              2025年（予定）
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              役員
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              代表取締役　山口　智也
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              事業内容
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              教育イベントの企画・運営
              <br />
              探究学習プログラムの設計・提供
              <br />
              学校・企業・地域を繋ぐコーディネーション
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              連絡先
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              info@example.com （ダミー）
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              取引先
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0"></dd>
          </div>
        </dl>
      </PageLayout>
    </div>
  );
}
