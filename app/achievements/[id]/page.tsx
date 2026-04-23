import { notFound } from "next/navigation";
import { getAchievementDetail } from "@/app/_libs/microcms";
import PageLayout from "@/components/PageLayout";
import Article from "@/components/Article";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// メタデータ生成
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const draftKey = typeof resolvedSearchParams.draftKey === "string" ? resolvedSearchParams.draftKey : undefined;

  try {
    const achievement = await getAchievementDetail(resolvedParams.id, draftKey ? { draftKey } : undefined);
    if (!achievement) {
      return { title: "実績が見つかりません" };
    }

    const description = achievement.description?.trim() || "";
    const summary = description 
      ? `${description.slice(0, 120)}${description.length > 120 ? "…" : ""}` 
      : "株式会社CANVASの実績をご紹介します。";

    const ogImage = achievement.thumbnail?.url ?? "/images/NEWS_thumbnail.png";

    return {
      title: `${achievement.title} | 実績 | 株式会社CANVAS`,
      description: summary,
      openGraph: {
        title: `${achievement.title} | 実績 | 株式会社CANVAS`,
        description: summary,
        type: "article",
        images: [{ url: ogImage }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${achievement.title} | 実績 | 株式会社CANVAS`,
        description: summary,
        images: [ogImage],
      },
    };
  } catch {
    return { title: "実績が見つかりません" };
  }
}

export default async function AchievementDetailPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const draftKey = typeof resolvedSearchParams.draftKey === "string" ? resolvedSearchParams.draftKey : undefined;

  let achievement;
  try {
    achievement = await getAchievementDetail(resolvedParams.id, draftKey ? { draftKey } : undefined);
  } catch (error) {
    console.error("Failed to fetch achievement:", error);
    notFound();
  }

  if (!achievement) {
    notFound();
  }

  // デバッグ情報（開発時のみ）
  if (process.env.NODE_ENV === 'development') {
    const isAchievementTest = 'contents' in achievement;
    console.log('Achievement data:', {
      id: achievement.id,
      title: achievement.title,
      isAchievementDetected: isAchievementTest,
      hasContents: 'contents' in achievement,
      hasContent: 'content' in achievement,
      contentsLength: achievement.contents?.length || 0,
      dataKeys: Object.keys(achievement)
    });
  }

  return (
    <PageLayout title="WORKS" subtitle="実績">
      <Article data={achievement} />
    </PageLayout>
  );
}

export const revalidate = 60;