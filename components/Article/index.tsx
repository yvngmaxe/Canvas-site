import Link from "next/link";
import Image from "next/image";
import type { News } from "@/app/_libs/microcms";
import styles from "./index.module.css";

type Props = {
  data: News;
};

const formatDate = (isoString: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date(isoString));

export default function Article({ data }: Props) {
  const displayDateISO =
    data.publishedAt ?? data.createdAt ?? new Date().toISOString();
  const displayDate = formatDate(displayDateISO);
  const categoryName = data.category?.name ?? "NEWS";

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb} aria-label="パンくずリスト">
          <Link href="/" className={styles.breadcrumbLink}>
            HOME
          </Link>
          <span aria-hidden className={styles.breadcrumbDivider}>
            ›
          </span>
          <Link href="/news" className={styles.breadcrumbLink}>
            NEWS
          </Link>
        </nav>
        <p className={styles.kicker}>NEWS</p>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.meta}>
          <time dateTime={displayDateISO} className={styles.date}>
            {displayDate}
          </time>
          {categoryName && (
            <span className={styles.category}>{categoryName}</span>
          )}
        </div>
      </header>

      {data.thumbnail && (
        <figure className={styles.hero}>
          <Image
            src={data.thumbnail.url}
            alt={data.title}
            width={data.thumbnail.width ?? 1200}
            height={data.thumbnail.height ?? 800}
            className={styles.heroImage}
            sizes="(max-width: 768px) 100vw, 720px"
            priority
          />
        </figure>
      )}

      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: data.content || "" }}
      />

      <footer className={styles.footer}>
        <Link href="/news" className={styles.backLink}>
          <span aria-hidden>←</span>
          お知らせ一覧に戻る
        </Link>
      </footer>
    </article>
  );
}
