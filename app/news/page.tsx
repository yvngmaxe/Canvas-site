import PageLayout from "@/components/PageLayout";
import NewsList from "@/components/NewsList/NewsList";
import { getNewsList, getNewsDetail } from "@/app/_libs/microcms";
import Pagination from "@/components/Pagination/Pagination";

// ページの再検証時間を設定 (membersページと同じ)
export const revalidate = 60;

// 1ページあたりの記事数
const limit = 10;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const page = sp.page ?? "1";
  const currentPage = Array.isArray(page)
    ? parseInt(page[0], 10)
    : parseInt(page, 10);

  const draftKey = typeof sp.draftKey === "string" ? sp.draftKey : undefined;
  const contentId = typeof sp.contentId === "string" ? sp.contentId : undefined;

  const { contents: newsItems, totalCount } = await getNewsList({
    limit,
    offset: (currentPage - 1) * limit,
  });

  const listItems = draftKey && contentId ? await mergeDraft(newsItems, draftKey, contentId) : newsItems;

  return (
    <PageLayout title="NEWS" subtitle="お知らせ">
      <NewsList newsItems={listItems} />
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        limit={limit}
        basePath="/news"
      />
    </PageLayout>
  );
}

async function mergeDraft(
  newsItems: Awaited<ReturnType<typeof getNewsList>>["contents"],
  draftKey: string,
  contentId: string
) {
  try {
    const draftItem = await getNewsDetail(contentId, { draftKey });
    if (!draftItem) return newsItems;

    const filtered = newsItems.filter((item) => item.id !== draftItem.id);
    return [draftItem, ...filtered].sort((a, b) => {
      const da = new Date(a.publishedAt ?? a.createdAt ?? 0).getTime();
      const db = new Date(b.publishedAt ?? b.createdAt ?? 0).getTime();
      return db - da;
    });
  } catch (error) {
    console.error("Failed to merge draft news", error);
    return newsItems;
  }
}
