import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";

// 仮のデータ
const sections = [
  {
    id: 1,
    heading: "対象：私たちが価値を届けたい人",
    text: "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。",
  },
  {
    id: 2,
    heading: "価値：私たちが提供するもの",
    text: "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。",
  },
  {
    id: 3,
    heading: "行動原則：私たちが大切にすること",
    text: "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。",
  },
  {
    id: 4,
    heading: "今後の展望：私たちが目指す未来",
    text: "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。",
  },
];

export default function ActivityPhilosophyPage() {
  return (
    <div className="page">
      <PageLayout
        title="活動理念"
        subtitle="Canvasの活動における基本的な考え方と指針です。"
      >
        <div className={styles.sectionList}>
          {sections.map((item) => (
            <div key={item.id} className={styles.sectionItem}>
              <h2 className={styles.heading}>{item.heading}</h2>
              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>
      </PageLayout>
    </div>
  );
}
