"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import type { Achievement } from "@/app/_libs/microcms";
import dayjs from "dayjs";

type Props = {
  items: Achievement[];
};

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

export default function AchievementList({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("すべて");
  const [activeYear, setActiveYear] = useState<string>("すべて");
  const [activeTag, setActiveTag] = useState<string>("すべて");

  // カテゴリ一覧を取得（重複を除去）
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(
        items
          .map((item) => item.category?.name)
          .filter((name): name is string => Boolean(name))
      )
    ).sort();
    return ["すべて", ...cats];
  }, [items]);

  // 年一覧を取得（重複を除去、降順）
  const years = useMemo(() => {
    const yearSet = new Set<string>();
    items.forEach((item) => {
      if (item.date) {
        const year = item.date.slice(0, 4);
        yearSet.add(year);
      }
    });
    const yearArray = Array.from(yearSet).sort((a, b) => b.localeCompare(a));
    return ["すべて", ...yearArray];
  }, [items]);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach((item) => {
      extractTagNames(item.tags).forEach((name) => {
        tagSet.add(name);
      });
    });
    const tagArray = Array.from(tagSet).sort((a, b) => a.localeCompare(b));
    return ["すべて", ...tagArray];
  }, [items]);

  // フィルタリング
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch =
        activeCategory === "すべて" ||
        item.category?.name === activeCategory;
      const yearMatch =
        activeYear === "すべて" || item.date?.startsWith(activeYear);
      const tagMatch =
        activeTag === "すべて" ||
        extractTagNames(item.tags).includes(activeTag);
      return categoryMatch && yearMatch && tagMatch;
    });
  }, [items, activeCategory, activeYear, activeTag]);

  // 日付順でソート（新しい順）
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [filteredItems]);

  if (items.length === 0) {
    return <p className={styles.empty}>実績はまだありません。</p>;
  }

  return (
    <div className={styles.container}>
      {/* カテゴリタブ */}
      {categories.length > 1 && (
        <div className={styles.tabs} role="tablist" aria-label="実績カテゴリー">
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              className={`${styles.tab} ${
                activeCategory === category ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* 年別フィルター */}
      {years.length > 1 && (
        <div className={styles.yearFilter} aria-label="年別フィルター">
          {years.map((year) => (
            <button
              key={year}
              className={`${styles.yearBtn} ${
                activeYear === year ? styles.active : ""
              }`}
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {/* タグフィルター */}
      {tags.length > 1 && (
        <div className={styles.tagFilter} aria-label="タグフィルター">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tagBtn} ${
                activeTag === tag ? styles.active : ""
              }`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* 実績リスト */}
      {sortedItems.length === 0 ? (
        <p className={styles.empty}>
          {activeCategory !== "すべて" || activeYear !== "すべて"
            ? "該当する実績はありません。"
            : "実績はまだありません。"}
        </p>
      ) : (
        <ul className={styles.list}>
          {sortedItems.map((item) => {
            const formattedDate = item.date
              ? dayjs(item.date).format("YYYY/MM/DD")
              : "";
            const description = item.description?.trim() || "";
            const summary =
              description.length > 0
                ? `${description.slice(0, 90)}${
                    description.length > 90 ? "…" : ""
                  }`
                : "";
          const relatedNewsId = item.relatedNews?.id;
          const hasLink = Boolean(relatedNewsId);
          const tagNamesForItem = extractTagNames(item.tags);

            return (
              <li key={item.id} className={styles.item}>
                <article className={styles.card}>
                  {relatedNewsId ? (
                    <Link href={`/news/${relatedNewsId}`} className={styles.link}>
                      <CardContent
                        item={item}
                        formattedDate={formattedDate}
                        summary={summary}
                        showChevron={hasLink}
                        tagNames={tagNamesForItem}
                      />
                    </Link>
                  ) : (
                    <div className={styles.link}>
                      <CardContent
                        item={item}
                        formattedDate={formattedDate}
                        summary={summary}
                        showChevron={hasLink}
                        tagNames={tagNamesForItem}
                      />
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// カードの中身を表示するコンポーネント
function CardContent({
  item,
  formattedDate,
  summary,
  showChevron,
  tagNames,
}: {
  item: Achievement;
  formattedDate: string;
  summary: string;
  showChevron: boolean;
  tagNames: string[];
}) {
  return (
    <>
      <div className={styles.media}>
        {item.thumbnail ? (
          <Image
            src={item.thumbnail.url}
            alt={item.title}
            fill
            className={styles.mediaImage}
            sizes="(max-width: 768px) 100vw, 280px"
          />
        ) : (
          <div className={styles.mediaPlaceholder} aria-hidden>
            ACHIEVEMENT
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
        <h3 className={styles.title}>{item.title}</h3>
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
    </>
  );
}
