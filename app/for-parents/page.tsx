import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";

export default function ForParentsPage() {
  return (
    <div className="page">
      <Header />
      <PageLayout
        title="保護者様へ"
        subtitle="保護者様向けのご案内コンテンツ。"
      >
        {/* TODO: 対象/料金（あれば）/申込導線/よくある質問 */}
        <p className="mt-4 text-gray-600">
          ここに具体的なコンテンツが入ります。
        </p>
      </PageLayout>
    </div>
  );
}
