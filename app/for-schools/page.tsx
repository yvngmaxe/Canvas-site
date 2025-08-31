import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";

export default function ForSchoolsPage() {
  return (
    <div className="page">
      <Header />
      <PageLayout title="学校様へ" subtitle="学校関係者の皆さまへのご案内。">
        {/* TODO: 実施例/学習効果/導入までの流れ */}
        <p className="mt-4 text-gray-600">
          ここに具体的なコンテンツが入ります。
        </p>
      </PageLayout>
    </div>
  );
}
