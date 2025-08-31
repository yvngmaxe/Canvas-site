import Header from "@/components/Header";
import PageLayout from "@/components/PageLayout";
import MemberList from "@/components/MemberList/MemberList";
import { getMembersList } from "@/app/_libs/microcms";

// ページの再検証時間を設定（例: 60秒）
export const revalidate = 60;

export default async function MembersPage() {
  const { contents: members } = await getMembersList();

  return (
    <div className="page">
      <Header />
      <PageLayout
        title="MEMBER"
        subtitle="株式会社Canvasのメンバーを紹介します。"
      >
        <MemberList members={members} />
      </PageLayout>
    </div>
  );
}
