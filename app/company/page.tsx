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
              広島県東広島市西条中央6丁目31-1 エスペランテ505
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
              <strong>教育・キャリア支援事業</strong>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  小学生、中学生、高校生を対象としたキャリア教育事業
                </li>
                <li style={{ listStyleType: "disc" }}>
                  学校における総合的な探究の時間に関するプログラムの作成・提供
                </li>
                <br />
              </ul>
              <strong>プロジェクト・イベント企画運営事業</strong>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  企業のCSR活動の一環としての次世代育成向けプロジェクト、イベントの企画および運営
                </li>
                <li style={{ listStyleType: "disc" }}>
                  企業または地域プロモーションを目的としたプロジェクト、イベントの企画および運営
                </li>
                <br />
              </ul>
              <strong>付随事業</strong>
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  前各号に付随または関連する一切の事業
                </li>
                <br />
              </ul>
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
