import PageLayout from "@/components/PageLayout";
import NewsList from "@/components/NewsList/NewsList";
import { getNewsList } from "@/app/_libs/microcms";

// ページの再検証時間を設定 (membersページと同じ)
export const revalidate = 60;

export default async function NewsPage() {
  const { contents: newsItems } = await getNewsList();

  return (
    <PageLayout title="お知らせ" subtitle="最新情報をお届けします。">
      <NewsList newsItems={newsItems} />
    </PageLayout>
  );
}
