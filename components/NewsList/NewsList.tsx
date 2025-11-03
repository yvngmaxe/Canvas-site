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
      {newsItems.map((item) => {
        const published = item.publishedAt || item.createdAt;
        const formattedDate = dayjs(published).format('YYYY/MM/DD');

        return (
          <li key={item.id} className={styles.newsItem}>
            <article className={styles.card}>
              <Link href={`/news/${item.id}`} className={styles.link}>
                <div className={styles.media}>
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail.url}
                      alt={item.title}
                      fill
                      className={styles.mediaImage}
                      sizes="(max-width: 768px) 100vw, 220px"
                    />
                  ) : (
                    <div className={styles.mediaPlaceholder} aria-hidden>
                      NEWS
                    </div>
                  )}
                </div>
                <div className={styles.body}>
                  <div className={styles.meta}>
                    <time dateTime={published} className={styles.date}>
                      {formattedDate}
                    </time>
                    <span className={styles.category}>{item.category.name}</span>
                  </div>
                  <h3 className={styles.title}>{item.title}</h3>
                </div>
                <span className={styles.chevron} aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
