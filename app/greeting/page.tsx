import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function GreetingPage() {
  return (
    <div className="page">
      <PageLayout title="MESSAGE" subtitle="代表メッセージ">
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
              10歳で二分の一の成人式を迎える。周りが次々と将来の夢を発表する中、
              夢がなく何も発表できない自分を知る。
              夢は過去の好き・嫌い・得意・苦手・感動など様々な経験が基になり生まれるものだと考え、
              夢のない自分が「子どもが夢のかけらを探す環境」を整えるためにキャリア教育の分野に従事。
              18歳で教育に携わる活動を開始し、様々な講師/授業企画運営を経験する。
              <br />
              株式会社CANVASで「教育から始める地域創生」に取り組む。
              <br />
              人生のコンセプトはビビッと生きる。
            </p>

            <h2 className={styles.heading}>推して、推されて、生きていく。</h2>
            <p className={styles.message}>
              ずっと居たい空間には、良い町・事業・人、そして教育があるものです。
              <br />
              休みが取れたら訪れたい施設、会いたい人が皆さんにもあると思います。
              <br />
              広島には皆さんがまだ見たことがない「大事にしたい・守りたい何か」が眠っているはずです。
              <br />
              ここからあなたの特別を見つけてください。
            </p>

            <h2 className={styles.heading}>
              自分を見つけて切り拓くための「キャリア教育」
            </h2>
            <p className={styles.message}>
              子どもたちに夢から逆算された今を熱く生きてほしい。
              <br />
              夢や目標は自分の魂から聞こえてくるもの。
              <br />
              心で学ぶ「キャリア教育」を通して、誰かに与えられた色ではなく自分で獲得した心の色を一つずつ増やす。
              <br />
              そんな学びを繰り返していくうちに、その子だけの色(=個性)を持つようになる。
              そんな魂から聞こえてくる夢はきっとその子にしかみえない、
              叶えられない大切な財産になると信じています。
            </p>
            <p className={styles.message}>
              今すぐに目に見える結果は出ません。
              しかし、いつの日か来たるその子の未来で、挑戦したいこと・乗り越えたい壁と相対したときにキャリア教育は力を発揮します。
              今は大きな目標が無くてもいい。「将来何か頑張りたい」となんとなく思う子どもに、どんな壁にも通用する魔法のカードを授けます。
            </p>

            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>
                <strong>
                  合言葉は、何年後かの君へ、今の君からのプレゼント。
                </strong>
              </p>
            </blockquote>

            <div className={styles.socialSection}>
              <h3 className={styles.socialHeading}>個人SNS</h3>
              <p className={styles.socialIntro}>
                日々の活動や想いはSNSで発信しています。
                <span className={styles.socialIntroEmphasis}>
                  ぜひフォローしてください。
                </span>
              </p>
              <div className={styles.socialLinks}>
                <a
                  className={styles.socialLink}
                  href="https://www.instagram.com/canvas_education/"
                  target="_blank"
                  aria-label="Instagram"
                  rel="noopener noreferrer"
                >
                  <FaInstagram aria-hidden="true" />
                  Instagram
                </a>
                <a
                  className={styles.socialLink}
                  href="https://www.facebook.com/ytomoya.55"
                  target="_blank"
                  aria-label="Facebook"
                  rel="noopener noreferrer"
                >
                  <FaFacebook aria-hidden="true" />
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
