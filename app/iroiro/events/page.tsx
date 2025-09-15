import PageLayout from "@/components/PageLayout";
import IroiroHeader from "@/components/IroiroHeader";

export default function IroiroEventsPage() {
  return (
    <div className="page">
      <IroiroHeader active="events" />
      <PageLayout title="iroiroイベント一覧" subtitle="イベント情報">
        <p className="text-foreground/80">このページは準備中です。</p>
      </PageLayout>
    </div>
  );
}
