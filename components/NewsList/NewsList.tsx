// components/NewsList/NewsList.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './NewsList.module.css';
import type { News } from '@/app/_libs/microcms';
import dayjs from 'dayjs'; // dayjsをインポート

type Props = {
  newsItems: News[];
};

export default function NewsList({ newsItems }: Props) {
  if (newsItems.length === 0) {
    return <p>お知らせはありません。</p>;
  }

  return (
    <ul className={styles.newsList}>
      {newsItems.map((item) => (
        <li key={item.id} className={styles.newsItem}>
          <Link href={`/news/${item.id}`} className={styles.link}>
            <div className={styles.thumbnail}>
              {item.thumbnail && (
                <Image
                  src={item.thumbnail.url}
                  alt={item.title}
                  fill
                  className={styles.thumbnailImage}
                  sizes="120px"
                />
              )}
            </div>
            <div className={styles.textContent}>
              <div className={styles.meta}>
                <time dateTime={item.publishedAt || item.createdAt} className={styles.date}>
                  {/* dayjsを使って日付をフォーマット */}
                  {dayjs(item.publishedAt || item.createdAt).format('YYYY/MM/DD')}
                </time>
                <span className={styles.category}>{item.category.name}</span>
              </div>
              <p className={styles.newsTitle}>{item.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
