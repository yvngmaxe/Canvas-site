import PageLayout from "@/components/PageLayout";
import {
  getAchievementsList,
  getAchievementDetail,
} from "@/app/_libs/microcms";
import AchievementList from "@/components/AchievementList";

// ページの再検証時間を設定
export const revalidate = 60;

// 下書きデータをマージする関数
async function mergeDraft(
  achievements: Awaited<ReturnType<typeof getAchievementsList>>["contents"],
  draftKey: string,
  contentId: string,
) {
  try {
    const draftItem = await getAchievementDetail(contentId, { draftKey });
    if (!draftItem) return achievements;

    const filtered = achievements.filter((item) => item.id !== draftItem.id);
    return [draftItem, ...filtered].sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da; // 新しい順
    });
  } catch (error) {
    console.error("Failed to merge draft achievement", error);
    return achievements;
  }
}

// エラーハンドリング付きで実績一覧を取得
async function fetchAchievementsListWithFallback(
  queries?: Parameters<typeof getAchievementsList>[0],
) {
  try {
    return await getAchievementsList(queries);
  } catch (error) {
    console.error(
      "[AchievementsPage] Failed to fetch achievements list",
      error,
    );
    return {
      contents: [],
      totalCount: 0,
      offset: queries?.offset ?? 0,
      limit: queries?.limit ?? 100,
    } satisfies Awaited<ReturnType<typeof getAchievementsList>>;
  }
}

export default async function AchievementsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const draftKey = typeof sp.draftKey === "string" ? sp.draftKey : undefined;
  const contentId = typeof sp.contentId === "string" ? sp.contentId : undefined;

  // 実績データを取得（エラーハンドリング付き）
  const data = await fetchAchievementsListWithFallback({ limit: 100 });

  // 下書きデータがある場合はマージ
  const listItems =
    draftKey && contentId
      ? await mergeDraft(data.contents, draftKey, contentId)
      : data.contents;

  return (
    <div className="page">
      <PageLayout title="WORKS" subtitle="実績一覧">
        <AchievementList items={listItems} />
      </PageLayout>
    </div>
  );
}
