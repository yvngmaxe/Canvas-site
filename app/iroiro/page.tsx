import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";

export default function IroiroPage() {
  return (
    <div className="page">
      <Header />
      <PageLayout title="iroiro広島" subtitle="iroiro広島の活動紹介ページ。">
        {/* TODO: 活動概要/イベント紹介/外部リンク */}
        <p className="mt-4 text-gray-600">
          ここに具体的なコンテンツが入ります。
        </p>
      </PageLayout>
    </div>
  );
}
