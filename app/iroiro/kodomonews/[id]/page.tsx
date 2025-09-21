import type { Metadata } from 'next';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import IroiroHeader from '@/components/IroiroHeader';
import { getKodomoNewsDetail } from '@/app/_libs/microcms';

export const revalidate = 60;

type Params = { params: { id: string } };

function formatDate(input?: string) {
  if (!input) return '';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return new Intl.DateTimeFormat('ja-JP', { dateStyle: 'long' }).format(d);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = params;
  try {
    const data = await getKodomoNewsDetail(id);
    const title = data.title || '子ども新聞';
    const ogImage = data.thumbnail?.url || '/images/NEWS_thumbnail.png';
    return {
      title,
      description: data.summary || undefined,
      alternates: { canonical: `/iroiro/kodomonews/${id}` },
      openGraph: {
        title,
        description: data.summary || undefined,
        images: [{ url: ogImage }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: data.summary || undefined,
        images: [{ url: ogImage }],
      },
    };
  } catch {
    return { title: '子ども新聞' };
  }
}

export default async function KodomoNewsDetailPage({ params }: Params) {
  const { id } = params;
  const data = await getKodomoNewsDetail(id);

  return (
    <div className="page">
      <IroiroHeader active="kodomonews" />
      <PageLayout title={data.title} subtitle={formatDate(data.date)}>
        <div className="grid gap-6">
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

          {data.summary && (
            <p className="text-lg leading-8">{data.summary}</p>
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

