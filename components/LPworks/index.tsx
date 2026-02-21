import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import type { Achievement } from "@/app/_libs/microcms";
import styles from "./index.module.css";
import ctaStyles from "../styles/cta.module.css";

type Props = {
  title?: string;
  lead?: string;
  items?: Achievement[];
  maxItems?: number;
};

const DEFAULT_LEAD =
  "実績ページからピックアップした取り組みの一部をご紹介します。";

export default function LPworks({
  title = "ピックアップ実績",
  lead = DEFAULT_LEAD,
  items = [],
  maxItems = 3,
}: Props) {
  const sortedItems = items
    .slice()
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });

  const limit = Math.max(0, maxItems);
  const list = sortedItems.slice(0, limit);

  return (
    <section className={styles.section} aria-labelledby="lpworks-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>WORKS-実績-</p>
          <h2 id="lpworks-title" className={styles.title} data-reveal>
            {title}
          </h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </header>

        {list.length === 0 ? (
          <p className={styles.empty}>ピックアップできる実績はまだありません。</p>
        ) : (
          <ul className={styles.grid}>
            {list.map((item) => {
              const formattedDate = item.date
                ? dayjs(item.date).format("YYYY/MM/DD")
                : "";
              const summary = createSummary(item);
              const tagNames = extractTagNames(item.tags);
              const relatedNewsId = item.relatedNews?.id;
              const card = (
                <CardContent
                  item={item}
                  formattedDate={formattedDate}
                  summary={summary}
                  tagNames={tagNames}
                  showChevron={Boolean(relatedNewsId)}
                />
              );

              return (
                <li key={item.id} className={styles.item}>
                  {relatedNewsId ? (
                    <Link
                      href={`/news/${relatedNewsId}`}
                      className={styles.cardLink}
                    >
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className={styles.actions}>
          <Link
            href="/achievements"
            className={`${ctaStyles.primaryButton} ${styles.moreBtn}`}
          >
            実績一覧を見る
          </Link>
        </div>
      </div>
    </section>
  );
}

function extractTagNames(tags: Achievement["tags"]): string[] {
  if (!tags) return [];
  const normalized = Array.isArray(tags) ? tags : [tags];
  return normalized
    .map((tag) => {
      if (typeof tag === "string") return tag;
      if (tag && typeof tag === "object" && "name" in tag) {
        return typeof tag.name === "string" ? tag.name : undefined;
      }
      return undefined;
    })
    .filter((name): name is string => Boolean(name));
}

function createSummary(item: Achievement): string {
  const primary = item.description?.trim();
  if (primary && primary.length > 0) {
    return truncate(primary);
  }

  const fallback = stripHtml(item.content);
  return fallback ? truncate(fallback) : "";
}

function stripHtml(value?: string | null): string {
  if (!value) return "";
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(value: string, max = 80): string {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function CardContent({
  item,
  formattedDate,
  summary,
  tagNames,
  showChevron,
}: {
  item: Achievement;
  formattedDate: string;
  summary: string;
  tagNames: string[];
  showChevron: boolean;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {item.thumbnail ? (
          <Image
            src={item.thumbnail.url}
            alt={item.title}
            fill
            sizes="(max-width: 900px) 100vw, 320px"
            className={styles.mediaImage}
          />
        ) : (
          <div className={styles.mediaPlaceholder} aria-hidden>
            WORKS
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          {formattedDate && (
            <time dateTime={item.date} className={styles.date}>
              {formattedDate}
            </time>
          )}
          {item.category?.name && (
            <span className={styles.category}>{item.category.name}</span>
          )}
        </div>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        {summary && <p className={styles.summary}>{summary}</p>}
        {tagNames.length > 0 && (
          <ul className={styles.tagList}>
            {tagNames.map((name) => (
              <li key={`${item.id}-${name}`} className={styles.tag}>
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {showChevron && (
        <span className={styles.chevron} aria-hidden>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </article>
  );
}

