import type { Metadata } from 'next';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import IroiroHeader from '@/components/IroiroHeader';
import { getIroiroEventDetail } from '@/app/_libs/microcms';
import { notFound } from 'next/navigation';

export const revalidate = 60;

// Use inline prop typing to avoid Next's PageProps generic constraint issues

function formatDate(input?: string) {
  if (!input) return '';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return new Intl.DateTimeFormat('ja-JP', { dateStyle: 'long' }).format(d);
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await getIroiroEventDetail(id);
    const title = data.title || 'イベント詳細';
    const ogImage = data.thumbnail?.url || '/images/NEWS_thumbnail.png';
    return {
      title,
      description: data.description || data.place || undefined,
      alternates: { canonical: `/iroiro/events/${id}` },
      openGraph: {
        title,
        description: data.description || data.place || undefined,
        images: [{ url: ogImage }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: data.description || data.place || undefined,
        images: [{ url: ogImage }],
      },
    };
  } catch {
    return { title: 'イベント詳細' };
  }
}

export default async function IroiroEventDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let data;
  try {
    data = await getIroiroEventDetail(id);
  } catch {
    notFound();
  }
  if (!data || !data.id) notFound();

  return (
    <div className="page">
      <IroiroHeader active="events" />
      <PageLayout title={data.title} subtitle={data.place || ''}>
        <div className="grid gap-6">
          <div className="text-sm text-foreground/70">{formatDate(data.date)}</div>

          {data.thumbnail?.url && (
            <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={data.thumbnail.url}
                alt={data.title}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                className="object-cover"
                priority={false}
              />
            </div>
          )}

          {data.description && (
            <p className="text-lg leading-8">{data.description}</p>
          )}

          {data.body && (
            <article
              className="prose prose-neutral max-w-none"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          )}
        </div>
      </PageLayout>
    </div>
  );
}
