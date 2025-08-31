"use client";

import Link from "next/link";
import styles from "./TopNews.module.css";
import { useState } from "react";
import cx from "classnames";

type NewsItem = {
  id: string;
  title: string;
  category: 'NEWS' | 'リリース'; // カテゴリを特定の値に限定
  date: string;
};

// 仮のデータを更新
const allNewsItems: NewsItem[] = [
  {
    id: "1",
    title: "株式会社Canvasを設立しました",
    category: "リリース",
    date: "2024-10-02",
  },
  {
    id: "2",
    title: "新しい探究学習プログラムを開始しました",
    category: "リリース",
    date: "2024-10-05",
  },
  {
    id: "3",
    title: "Webサイトをリニューアルしました",
    category: "NEWS",
    date: "2024-10-01",
  },
  {
    id: "4",
    title: "メディア掲載のお知らせ",
    category: "NEWS",
    date: "2024-10-08",
  },
];

export default function TopNews() {
  const [activeTab, setActiveTab] = useState<'リリース' | 'NEWS'>('リリース');

  // 選択されたタブに基づいてニュースをフィルタリング
  const filteredNews = allNewsItems
    .filter((item) => item.category === activeTab)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 日付で降順ソート

  return (
    <section className={styles.topNews}>
      <h2 className={styles.title}>お知らせ</h2>

      {/* タブ切り替え部分 */}
      <div className={styles.tabContainer}>
        <button 
          className={cx(styles.tabButton, { [styles.active]: activeTab === 'リリース' })}
          onClick={() => setActiveTab('リリース')}
        >
          リリース
        </button>
        <button 
          className={cx(styles.tabButton, { [styles.active]: activeTab === 'NEWS' })}
          onClick={() => setActiveTab('NEWS')}
        >
          NEWS
        </button>
      </div>

      {/* ニュース一覧部分 */}
      <ul className={styles.newsList}>
        {filteredNews.map((item) => (
          <li key={item.id} className={styles.newsItem}>
            <Link href={`/news/${item.id}`} className={styles.link}>
              <div className={styles.meta}>
                <time dateTime={item.date} className={styles.date}>{item.date}</time>
                <span className={styles.category}>{item.category}</span>
              </div>
              <p className={styles.newsTitle}>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}