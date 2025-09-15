import Image from 'next/image';
import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import IroiroHeader from '@/components/IroiroHeader';
import { getIroiroSponsorDetail } from '@/app/_libs/microcms';
import { FaHeart } from 'react-icons/fa';
import styles from './page.module.css';

// NOTE: このページは動的ルート `/iroiro/sponsors/[id]` です。
// 一覧ページで付与した contentId（microCMSのID）が URL の [id] に入り、
// それを使って microCMS から該当スポンサーの詳細を取得しています。

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await getIroiroSponsorDetail(id);
    const title = data.name || 'スポンサー';
    const ogImage = data.logo?.url || '/images/NEWS_thumbnail.png';
    const plainDesc = data.description?.replace(/<[^>]*>/g, '').slice(0, 120);
    return {
      title: `${title} | スポンサー | 株式会社Canvas`,
      description: plainDesc || `${title} のスポンサー紹介ページ` ,
      alternates: { canonical: `/iroiro/sponsors/${id}` },
      openGraph: {
        type: 'article',
        url: `/iroiro/sponsors/${id}`,
        title: `${title} | スポンサー | 株式会社Canvas`,
        description: `${title} のスポンサー紹介ページ`,
        images: [{ url: ogImage }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} | スポンサー | 株式会社Canvas`,
        description: `${title} のスポンサー紹介ページ`,
        images: [{ url: ogImage }],
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: 'スポンサー | 株式会社Canvas',
      description: 'スポンサー紹介ページ',
    };
  }
}

export default async function SponsorProfilePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await getIroiroSponsorDetail(id);
  const logoUrl = data.logo?.url ?? '/images/test1.jpg';
  const kidsPower = typeof data.kidsPower === 'number' ? data.kidsPower : 0;

  return (
    <div className="page">
      <IroiroHeader active="sponsors" />
      <PageLayout title={data.name} subtitle="スポンサー紹介" topPadding="compact">
        <div className={styles.container}>
          <section className={styles.hero}>
            <div className={styles.logoWrap}>
              <Image src={logoUrl} alt={`${data.name} ロゴ`} fill className={styles.logoImg} sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
            <div className={styles.heartBadge} aria-label={`キッズパワー ${kidsPower}`}>
              <FaHeart className={styles.heartIcon} aria-hidden="true" />
              <span className={styles.heartValue}>{kidsPower}</span>
            </div>
          </section>

          <section className={styles.section}>
            {data.description ? (
              <div
                className={styles.p}
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            ) : (
              <p className={styles.p}>プロフィール本文は準備中です。</p>
            )}
          </section>
        </div>
      </PageLayout>
    </div>
  );
}
