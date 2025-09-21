import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import styles from './index.module.css';
import type { IroiroEvent } from '@/app/_libs/microcms';

type Props = {
  events: IroiroEvent[];
  basePath?: string; // 将来詳細ページを作るなら使う
};

export default function EventList({ events, basePath = '/iroiro/events' }: Props) {
  dayjs.locale('ja');
  if (events.length === 0) return <p>現在、公開中のイベントはありません。</p>;

  return (
    <ul className={styles.grid}>
      {events.map((ev) => (
        <li key={ev.id} className={styles.row}>
          <time
            className={styles.dateOutside}
            dateTime={ev.date || ''}
            aria-label="開催日"
          >
            {ev.date ? dayjs(ev.date).format('M月D日(ddd)') : '日程未定'}
          </time>

          <div className={styles.card}>
            <Link href={`${basePath}/${ev.id}`} className={styles.link}>
              <div className={styles.thumb}>
                {ev.thumbnail ? (
                  <Image
                    src={ev.thumbnail.url}
                    alt={ev.title}
                    fill
                    className={styles.thumbImg}
                    sizes="(max-width: 900px) 100vw, 220px"
                  />
                ) : (
                  <div className={styles.thumbPlaceholder}>No Image</div>
                )}
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  {ev.place && <span className={styles.place}>{ev.place}</span>}
                </div>
                <h3 className={styles.title}>{ev.title}</h3>
              </div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
