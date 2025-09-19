import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

export type KodomoNewsItem = {
  id: string;
  title: string;
  date: string; // ISO形式 or 表示用文字列
  summary?: string;
  thumbnailUrl?: string;
  href?: string; // 詳細ページURL（未実装なら#）
};

type Props = {
  items: KodomoNewsItem[];
};

function formatDate(input: string) {
  try {
    const d = new Date(input);
    if (isNaN(d.getTime())) return input;
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
  } catch {
    return input;
  }
}

export default function KodomoNewsList({ items }: Props) {
  if (!items || items.length === 0) {
    return <p>記事がありません。</p>;
  }

  return (
    <ul className={styles.list}>
      {items.map((it) => {
        const href = it.href || "#";
        return (
          <li key={it.id} className={styles.item}>
            <Link href={href} className={styles.cardLink}>
              <div className={styles.thumbBox}>
                {it.thumbnailUrl ? (
                  <Image
                    src={it.thumbnailUrl}
                    alt={it.title}
                    fill
                    className={styles.thumbImg}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    priority={false}
                  />
                ) : (
                  <div className={styles.thumbPlaceholder}>No Image</div>
                )}
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <time className={styles.date}>{formatDate(it.date)}</time>
                </div>
                <h3 className={styles.title}>{it.title}</h3>
                {it.summary && <p className={styles.summary}>{it.summary}</p>}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

