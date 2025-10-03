import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";

export default function GreetingPage() {
  return (
    <div className="page">
      <PageLayout title="MESSAGE" subtitle="代表から">
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/ceo.jpg"
              alt="代表者の写真"
              width={320}
              height={320}
              className={styles.image}
            />
            <div className={styles.profileCard}>
              <div className={styles.profilePosition}>
                株式会社CANVAS 代表取締役 / キャリア教育デザイナー
              </div>
              <div className={styles.profileName}>山口 智也</div>
            </div>
          </div>
          <div className={styles.content}>
            <p className={`${styles.message} ${styles.lead}`}>
              10歳で二分の一の成人式を迎える。周りが次々と将来の夢を発表する中、夢がなく何も発表できない自分に疑問を持つ。18歳で教育に携わるボランティアを開始。19歳で三原市大和町をはじめとする様々な広島の地域と会社の魅力に触れ、広島が大好きになる。
            </p>
            <p className={styles.message}>
              株式会社CANVASで「教育から始める地域創生」に取り組む。
            </p>

            <h2 className={styles.heading}>心で学ぶ「キャリア教育」</h2>
            <p className={styles.message}>
              子どもたちに夢から逆算された今を熱く生きてほしい。夢や目標は自分の魂から聞こえてくるもの。心で学ぶ「キャリア教育」を通して、心の色を一つずつ増やす。そんな学びを繰り返していくうちに、その子だけの色(=個性)を持つようになる。そんな魂から聞こえてくる夢はきっとその子にしかみえない、叶えられない大切な財産になると信じています。
            </p>
            <p className={styles.message}>
              今すぐに目に見える結果は出ません。しかし、いつの日か来たるその子の未来で、挑戦したいこと・乗り越えたい壁と相対したときにキャリア教育は力を発揮します。今は大きな目標が無くてもいい。「将来何か頑張りたい」となんとなく思う子どもに、どんな壁にも通用する魔法のカードを授けます。
            </p>

            <blockquote className={styles.quote}>
              <p className={styles.message} style={{ margin: 0 }}>
                合言葉は「何年後かの君へ、今の君からのプレゼント。」
              </p>
            </blockquote>

            {/* 署名は上部プロフィールに集約 */}
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
