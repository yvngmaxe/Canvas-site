import PageLayout from "@/components/PageLayout";
import NewsList from "@/components/NewsList/NewsList";
import { getNewsList } from "@/app/_libs/microcms";
import Pagination from "@/components/Pagination/Pagination";

// ページの再検証時間を設定 (membersページと同じ)
export const revalidate = 60;

// 1ページあたりの記事数
const limit = 10;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // エラーメッセージに従い、searchParamsをawaitで解決する
  const sp = await (searchParams as any);
  const page = sp.page ?? '1';
  const currentPage = Array.isArray(page) ? parseInt(page[0], 10) : parseInt(page, 10);



  const { contents: newsItems, totalCount } = await getNewsList({
    limit,
    offset: (currentPage - 1) * limit,
  });

  return (
    <PageLayout title="お知らせ" subtitle="最新情報をお届けします。">
      <NewsList newsItems={newsItems} />
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        limit={limit}
        basePath="/news"
      />
    </PageLayout>
  );
}
