"use client"; // スクロールイベントを検知するためクライアントコンポーネントに

import PageLayout from "@/components/PageLayout";
import AnimatedHeading from "@/components/AnimatedHeading";
import styles from "./page.module.css";

export default function IroiroPage() {
  return (
    <PageLayout title="iroiro広島" subtitle="みんなの放課後探究学校">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>校訓</h2>
        <p className={styles.introText}>
          学びの中で常にベクトルは自分へ。
          <br />
          広島のすべてを通して学ぶ「自分のこと」と「想いと夢のつなげ方」
          <br />
          すべての子どもが夢から逆算した「今」を本気でアツく生きる広島に
          <br />
          まずは色集めから、立派なパレットができたら自由に夢を描こう。
        </p>

        <h2 className={styles.mainTitle}>
          iroiro広島
          <br className={styles.mobileBr} /> ３つの目標
        </h2>

        <div className={styles.goal}>
          <AnimatedHeading>１．子どもの夢探しの舞台を整える</AnimatedHeading>
          <p className={styles.goalText}>
            なんとなく勉強してなんとなく行き着いた先で陥る「私、何がしたいんだっけ？」
            <br />
            <br />
            夢や目標を考えるときに大切なのは自分への解像度。私は何が好きで、何に感動する、何が得意なのか。
            <br />
            <br />
            子どもたちが夢や目標から逆算して現在を生きることの出来るように、その材料集めをする舞台を広島に展開します。
            <br />
            <br />
            様々な「お仕事×想い」をテーマ探究活動の中で吸収し、自分だけの「やりたい×想い＝夢の色」を咲かせます。
          </p>
        </div>

        <div className={styles.goal}>
          <AnimatedHeading>
            ２．広島の中に双方向のつながりを創る
          </AnimatedHeading>
          <p className={styles.goalText}>
            教育を通して、子どもや子育て世代が互いにつながる、企業と心でつながる関係を構築します。
            <br />
            <br />
            製品やサービスを一方的に享受するだけでなく、広島県民が広島の産業を応援する、広島の産業が広島の教育を応援する双方向のつながりを創り、プラットフォーム上に可視化します。
          </p>
        </div>

        <div className={styles.goal}>
          <AnimatedHeading>３．広島を夢の発着点にする</AnimatedHeading>
          <p className={styles.goalText}>
            広島が育てた子どもの夢がこの土地で実現する未来を望みます。
            <br />
            <br />
            例えいつかこの土地を離れたとしても、帰ってきて抱いた夢を叶えられるように子ども時代に広島でつながりを創り、将来のUターンの選択肢を確保します。
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
