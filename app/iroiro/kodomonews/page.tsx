import PageLayout from "@/components/PageLayout";
import IroiroHeader from "@/components/IroiroHeader";
import KodomoNewsList, { KodomoNewsItem } from "@/components/KodomoNewsList";
import { getKodomoNewsList } from "@/app/_libs/microcms";

export const revalidate = 60;

export default async function IroiroNewsPage() {
  // microCMS から子ども新聞記事一覧を取得（新しい順）
  const { contents } = await getKodomoNewsList({ limit: 100, orders: "-date" });

  const items: KodomoNewsItem[] = contents.map((c) => ({
    id: c.id,
    title: c.title,
    date: c.date || c.publishedAt || c.createdAt,
    summary: c.summary,
    thumbnailUrl: c.thumbnail?.url,
    href: `/iroiro/kodomonews/${c.id}`,
  }));

  return (
    <div className="page">
      <IroiroHeader active="kodomonews" />
      <PageLayout
        title="広島子ども新聞！！"
        subtitle=""
        preDivider={
          <p className="text-left text-3xl sm:text-4xl font-bold">
            子どもでもお仕事をして稼げる！！新聞を投稿しよう
          </p>
        }
      >
        <KodomoNewsList items={items} />
      </PageLayout>
    </div>
  );
}
