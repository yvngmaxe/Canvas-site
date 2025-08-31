import PageLayout from "@/components/PageLayout";

export default function ForCompaniesPage() {
  return (
    <div className="page">
      <PageLayout title="企業様へ" subtitle="企業様向けのご案内コンテンツ。">
        {/* TODO: 協業パターン/導入メリット/問い合わせ導線 */}
        <p className="mt-4 text-gray-600">
          ここに具体的なコンテンツが入ります。
        </p>
      </PageLayout>
    </div>
  );
}
