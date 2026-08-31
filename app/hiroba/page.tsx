import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "コミュニティと交流の広場 | 株式会社CANVAS",
  description:
    "株式会社CANVASが運営するコミュニティスペースのご案内ページです。",
};

export default function HirobaPage() {
  return (
    <div className="page">
      <PageLayout title="COMMUNITY SPACE" subtitle="コミュニティと交流の広場">
        <p className="text-foreground/80">このページは準備中です。</p>
      </PageLayout>
    </div>
  );
}
