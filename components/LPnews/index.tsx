"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import ctaStyles from "../styles/cta.module.css";

type NewsItem = {
  id: string;
  title: string;
  category: "NEWS" | "リリース";
  date: string; // YYYY-MM-DD 形式を想定
  thumbnail?: { url: string } | undefined;
  summary?: string;
  tags?: string[];
};

type Props = {
  title?: string;
  lead?: string;
  items: NewsItem[];
  maxItemsPerCategory?: number;
};

export default function LPnews({
  title = "お知らせ",
  lead = "最新情報をピックアップしてお届けします。",
  items,
  maxItemsPerCategory = 2,
}: Props) {
  const sorted = (items || [])
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const sections: Array<{
    key: "リリース" | "NEWS";
    label: string;
    items: NewsItem[];
    emptyMessage: string;
  }> = [
    {
      key: "リリース",
      label: "リリース",
      items: sorted
        .filter((item) => item.category === "リリース")
        .slice(0, maxItemsPerCategory),
      emptyMessage: "現在リリースはありません。",
    },
    {
      key: "NEWS",
      label: "NEWS",
      items: sorted
        .filter((item) => item.category === "NEWS")
        .slice(0, maxItemsPerCategory),
      emptyMessage: "現在NEWSはありません。",
    },
  ];

  return (
    <section className={styles.section} aria-labelledby="lpnews-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="lpnews-title" className={styles.title} data-reveal>
            {title}
          </h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </header>

        {sections.map((section) => (
          <div
            key={section.key}
            className={styles.categoryBlock}
            role="region"
            aria-labelledby={`lpnews-${section.key}`}
          >
            <div className={styles.categoryHeader}>
              <h3 id={`lpnews-${section.key}`} className={styles.categoryTitle}>
                {section.label}
              </h3>
              <p className={styles.categoryHint}>
                最新{maxItemsPerCategory}件を表示しています。
              </p>
            </div>

            {section.items.length === 0 ? (
              <p className={styles.empty}>{section.emptyMessage}</p>
            ) : (
              <ul className={styles.grid}>
                {section.items.map((item) => {
                  const summary = item.summary?.trim();
                  const tags = item.tags ?? [];
                  return (
                    <li key={item.id} className={styles.card}>
                      <Link href={`/news/${item.id}`} className={styles.cardLink}>
                        <div className={styles.thumbBox}>
                          {item.thumbnail ? (
                            <Image
                              src={item.thumbnail.url}
                              alt={item.title}
                              fill
                              sizes="(max-width: 900px) 100vw, 240px"
                              className={styles.thumbImg}
                            />
                          ) : (
                            <div className={styles.thumbPlaceholder}>NEWS</div>
                          )}
                        </div>
                        <div className={styles.cardBody}>
                          <div className={styles.meta}>
                            <time dateTime={item.date} className={styles.date}>
                              {item.date}
                            </time>
                            <span className={styles.category}>{item.category}</span>
                          </div>
                          <p className={styles.cardTitle}>{item.title}</p>
                          {summary && (
                            <p className={styles.cardSummary}>{summary}</p>
                          )}
                          {tags.length > 0 && (
                            <ul className={styles.tagList}>
                              {tags.map((tag) => (
                                <li
                                  key={`${item.id}-${tag}`}
                                  className={styles.tag}
                                >
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}

        <div className={styles.actions}>
          <Link
            href="/news"
            className={`${ctaStyles.primaryButton} ${styles.moreBtn}`}
          >
            すべてのお知らせを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
