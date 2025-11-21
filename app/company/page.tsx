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
              広島県東広島市鏡山2-313
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
              <ul>
                <li style={{ listStyleType: "disc" }}>
                  小学生、中学生、高校生等を対象としたキャリア教育事業
                </li>
                <li style={{ listStyleType: "disc" }}>
                  キャリア教育に関するコンサルティング
                </li>
                <li style={{ listStyleType: "disc" }}>
                  学習塾及び英会話教室の企画、開発及び経営
                </li>
                <li style={{ listStyleType: "disc" }}>
                  学校、各種施設、企業及び個人に対するコーチング及びコンサルティング
                </li>
                <li style={{ listStyleType: "disc" }}>
                  各種イベントの企画、制作、運営及び管理
                </li>
                <li style={{ listStyleType: "disc" }}>
                  前各号に附帯又は関連する一切の事業
                </li>
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-foreground">
              連絡先
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80 sm:col-span-2 sm:mt-0">
              yamaguchi@e-canvas.co.jp
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
