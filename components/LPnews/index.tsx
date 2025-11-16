"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import ctaStyles from "../styles/cta.module.css";
import { useRef, useState } from "react";

type NewsItem = {
  id: string;
  title: string;
  category: "NEWS" | "リリース";
  date: string; // YYYY-MM-DD 形式を想定
  thumbnail?: { url: string } | undefined;
  summary?: string;
};

type Props = {
  title?: string;
  lead?: string;
  items: NewsItem[];
  maxItems?: number;
  showTabs?: boolean;
  idPrefix?: string;
};

export default function LPnews({
  title = "お知らせ",
  lead = "最新情報をピックアップしてお届けします。",
  items,
  maxItems = 4,
  showTabs = false,
  idPrefix = "lpnews",
}: Props) {
  const [activeTab, setActiveTab] = useState<"リリース" | "NEWS">("リリース");

  const tabs: Array<"リリース" | "NEWS"> = ["リリース", "NEWS"];
  const tabRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];

  const getTabIndex = (key: "リリース" | "NEWS") =>
    activeTab === key ? 0 : -1;
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = tabs.indexOf(activeTab);
    let nextIndex = currentIndex;
    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setActiveTab(tabs[nextIndex]);
    const ref = tabRefs[nextIndex].current;
    if (ref) ref.focus();
  };

  const sorted = (items || [])
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filtered = showTabs
    ? sorted.filter((i) => i.category === activeTab)
    : sorted;

  const list = filtered.slice(0, maxItems);

  return (
    <section className={styles.section} aria-labelledby="lpnews-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>NEWS-お知らせ-</p>
          <h2 id="lpnews-title" className={styles.title} data-reveal>
            {title}
          </h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </header>

        {showTabs && (
          <div
            className={styles.tabContainer}
            role="tablist"
            aria-label="お知らせカテゴリーの切り替え"
          >
            <button
              ref={tabRefs[0]}
              id={`${idPrefix}-tab-release`}
              role="tab"
              aria-controls={`${idPrefix}-panel-release`}
              aria-selected={activeTab === "リリース"}
              tabIndex={getTabIndex("リリース")}
              className={`${styles.tabButton} ${
                activeTab === "リリース" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("リリース")}
              onKeyDown={onKeyDown}
            >
              リリース
            </button>
            <button
              ref={tabRefs[1]}
              id={`${idPrefix}-tab-news`}
              role="tab"
              aria-controls={`${idPrefix}-panel-news`}
              aria-selected={activeTab === "NEWS"}
              tabIndex={getTabIndex("NEWS")}
              className={`${styles.tabButton} ${
                activeTab === "NEWS" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("NEWS")}
              onKeyDown={onKeyDown}
            >
              NEWS
            </button>
          </div>
        )}

        {list.length === 0 ? (
          <p
            id={
              activeTab === "リリース"
                ? `${idPrefix}-panel-release`
                : `${idPrefix}-panel-news`
            }
            role={showTabs ? "tabpanel" : undefined}
            aria-labelledby={
              activeTab === "リリース"
                ? `${idPrefix}-tab-release`
                : `${idPrefix}-tab-news`
            }
            className={styles.empty}
          >
            現在お知らせはありません。
          </p>
        ) : (
          <ul
            id={
              activeTab === "リリース"
                ? `${idPrefix}-panel-release`
                : `${idPrefix}-panel-news`
            }
            role={showTabs ? "tabpanel" : undefined}
            aria-labelledby={
              activeTab === "リリース"
                ? `${idPrefix}-tab-release`
                : `${idPrefix}-tab-news`
            }
            className={styles.grid}
          >
            {list.map((item) => {
              const summary = item.summary?.trim();
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
                      {summary && <p className={styles.cardSummary}>{summary}</p>}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

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
