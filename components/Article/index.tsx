import Link from "next/link";
import Image from "next/image";
import type { News, Achievement } from "@/app/_libs/microcms";
import { extractCategoryNames } from "@/app/_libs/microcms";
import styles from "./index.module.css";

type Props = {
  data: News | Achievement;
};

const formatDate = (isoString: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date(isoString));

function isAchievement(data: News | Achievement): data is Achievement {
  // contentsフィールドの存在で判定（実績にのみ存在）
  return 'contents' in data;
}

export default function Article({ data }: Props) {
  const isAchievementData = isAchievement(data);
  
  const displayDateISO = isAchievementData 
    ? data.date || data.createdAt || new Date().toISOString()
    : data.publishedAt ?? data.createdAt ?? new Date().toISOString();
  const displayDate = formatDate(displayDateISO);
  
  const categoryNames = extractCategoryNames(data.category);
  const displayCategory = categoryNames.length > 0 
    ? categoryNames 
    : [isAchievementData ? "実績" : "NEWS"];

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
          <Link 
            href={isAchievementData ? "/achievements" : "/news"} 
            className={styles.breadcrumbLink}
          >
            {isAchievementData ? "WORKS" : "NEWS"}
          </Link>
        </nav>
        <p className={styles.kicker}>
          {isAchievementData ? "WORKS" : "NEWS"}
        </p>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.meta}>
          <time dateTime={displayDateISO} className={styles.date}>
            {displayDate}
          </time>
          <span className={styles.categoryGroup}>
            {displayCategory.map((name) => (
              <span key={`${data.id}-${name}`} className={styles.category}>
                {name}
              </span>
            ))}
          </span>
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
        dangerouslySetInnerHTML={{ 
          __html: (isAchievement(data) ? data.contents : data.content) || "" 
        }}
      />

      <footer className={styles.footer}>
        <Link 
          href={isAchievementData ? "/achievements" : "/news"} 
          className={styles.backLink}
        >
          <span aria-hidden>←</span>
          {isAchievementData ? "実績一覧に戻る" : "お知らせ一覧に戻る"}
        </Link>
      </footer>
    </article>
  );
}
