"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./TopNews.module.css";
import { useState } from "react";
import cx from "classnames";
import type { MicroCMSImage } from "@/app/_libs/microcms";

type NewsItem = {
  id: string;
  title: string;
  category: 'NEWS' | 'リリース';
  date: string;
  thumbnail?: MicroCMSImage;
};

// Propsの型を定義
type Props = {
  items: NewsItem[];
};

export default function TopNews({ items }: Props) {
  const [activeTab, setActiveTab] = useState<'リリース' | 'NEWS'>('リリース');

  // propsで渡されたitemsを元にフィルタリング
  const filteredNews = items
    .filter((item) => item.category === activeTab)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
              <div className={styles.thumbnail}>
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail.url}
                    alt={item.title}
                    fill
                    className={styles.thumbnailImage}
                    sizes="100px"
                  />
                )}
              </div>
              <div className={styles.textContent}>
                <div className={styles.meta}>
                  <time dateTime={item.date} className={styles.date}>{item.date}</time>
                  <span className={styles.category}>{item.category}</span>
                </div>
                <p className={styles.newsTitle}>{item.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* もっと見るボタン */}
      <div className={styles.seeMoreContainer}>
        <Link href="/news" className={styles.seeMoreButton}>
          すべてのお知らせを見る
        </Link>
      </div>
    </section>
  );
}
