import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "お問い合わせ | 株式会社CANVAS",
  description:
    "株式会社CANVASへのご質問・ご相談はこちらのフォームから承っております。内容確認後、担当者より通常3営業日以内にご連絡いたします。",
};

export default function Page() {
  return (
    <PageLayout
      title="ご質問、ご相談は下記フォームよりお問い合わせ下さい。"
      subtitle="内容確認後、担当者より通常３営業日以内にご連絡いたします。"
    >
      <ContactForm />
    </PageLayout>
  );
}
