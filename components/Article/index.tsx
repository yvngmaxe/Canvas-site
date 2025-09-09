import Image from 'next/image';
import type { News } from '@/app/_libs/microcms';
import styles from './index.module.css';

type Props = {
  data: News;
};

export default function Article({ data }: Props) {
  const displayDateISO = data.publishedAt ?? data.createdAt ?? new Date().toISOString();
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.date}>
        {new Date(displayDateISO).toLocaleDateString('ja-JP')}
      </p>
      {data.thumbnail && (
        <div className={styles.thumbnail}>
          <Image
            src={data.thumbnail.url}
            alt=""
            width={data.thumbnail.width}
            height={data.thumbnail.height}
            className={styles.thumbnailImage}
          />
        </div>
      )}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: data.content || '',
        }}
      />
    </article>
  );
}
