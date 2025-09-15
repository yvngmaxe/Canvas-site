import PageLayout from "@/components/PageLayout";
import IroiroHeader from "@/components/IroiroHeader";

export default function IroiroNewsPage() {
  return (
    <div className="page">
      <IroiroHeader active="kodomonews" />
      <PageLayout title="こども新聞" subtitle="子どもたちの発信">
        <p className="text-foreground/80">このページは準備中です。</p>
      </PageLayout>
    </div>
  );
}
