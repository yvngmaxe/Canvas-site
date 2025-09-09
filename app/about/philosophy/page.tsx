import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";

// 仮の理念データ
const principles = [
  {
    id: 1,
    heading: "見出し",
    text: "説明文。ここにテキストが入ります。私たちは、常に新しいアイデアと挑戦を歓迎し、学び続ける文化を育みます。",
  },
  {
    id: 2,
    heading: "見出し",
    text: "説明文。ここにテキストが入ります。私たちは、常に新しいアイデアと挑戦を歓迎し、学び続ける文化を育みます。",
  },
  {
    id: 3,
    heading: "見出し",
    text: "説明文。ここにテキストが入ります。私たちは、常に新しいアイデアと挑戦を歓迎し、学び続ける文化を育みます。",
  },
];

export default function PhilosophyPage() {
  return (
    <div className="page">
      <PageLayout
        title="企業理念"
        subtitle="ここに一文メッセージが入ります。私たちの目指す社会と、その実現に向けた想い。"
      >
        <div className={styles.principleList}>
          {principles.map((item) => (
            <div key={item.id} className={styles.principleItem}>
              <h2 className={styles.heading}>{item.heading}</h2>
              <p className={styles.text}>{item.text}</p>
            </div>
          ))}
        </div>
      </PageLayout>
    </div>
  );
}
