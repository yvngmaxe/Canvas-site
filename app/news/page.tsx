import Link from "next/link";
import Header from "@/components/Header";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";

type NewsItem = {
  id: string;
  title: string;
  category: {
    name: string;
  };
  date: string;
};

// 仮のデータ
const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "株式会社Canvas設立しました",
    category: {
      name: "更新情報",
    },
    date: "2024-10-02",
  },
  {
    id: "2",
    title: "新しいサービスを開始しました",
    category: {
      name: "プレスリリース",
    },
    date: "2024-10-05",
  },
];

export default function NewsPage() {
  return (
    <div className="page">
      <Header />
      <PageLayout title="お知らせ" subtitle="最新情報をお届けします。">
        <ul className={styles.newsList}>
          {newsItems.map((item) => (
            <li key={item.id} className={styles.newsItem}>
              <Link href={`/news/${item.id}`} className={styles.link}>
                <div className={styles.meta}>
                  <time dateTime={item.date} className={styles.date}>
                    {item.date}
                  </time>
                  <span className={styles.category}>{item.category.name}</span>
                </div>
                <p className={styles.newsTitle}>{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </PageLayout>
    </div>
  );
}
