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
              src="/images/ceo.jpeg"
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
              両親が小学校の教師だった影響で、小さいころから教育に触れながら生きる。時代と共に広がり続ける教育の可能性と、その反対に教育現場は疲弊していることを知る。
              AIの無機質さと対照的に人が人である所以たる心が強調される中で、冷たい無機物にはない”力”を子どもたちに探し当ててもらうためにキャリア教育に従事し始める。
              18歳で教育に携わる活動を開始し、様々な講師/授業企画運営を経験する。
              夢は広島の教育カルチャーをつくること。
              <br />
              趣味は読書と魚釣り。
              <br />
              人生のコンセプトはビビッと生きる。
            </p>

            <h2 className={styles.heading}>
              &quot;プチ&quot;ブレイクスルーを意識的に起こす
            </h2>
            <p className={styles.message}>
              自分の届かなかった環境・思考領域を越えて、あえて不快適な領域に踏み込む必要があります。
              この越境によって、自分の中に内在している未開拓領域を開拓することで、「自分」を更新していきます。
              ”不安”と”未知へのワクワク”を両脇に抱えて探究した先ではじき出す自分だけの答えには何にも代えがたい教育的価値があると考えています。
            </p>

            <p className={styles.message}>
              この「更新」を常に続けながら生活することで、真の自分を認識することができます。
              自分で創りあげた人生の最大の教科書を見ながら未来を選択することで、先の未来にあるイベントとのミスマッチをなくし、
              個々がそれぞれの領域で最大のパフォーマンスを引き出せる社会を目指します。
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
              目指すものが視えれば、未来はその先のある点から逆算されて選択するものになる。
              ただなんとなく前に進むのではなく、子どもが自分に必要なものを選択しながらキャリアを切り拓くことができるような毎日を望んでいます。
              毎日少し背伸びをしたまま生活してみて、いつのまにかその高さが日常になり、また背伸びしてみる。
              毎日自分の外殻を成す価値観や思考の壁を超えることは越境学習の初めの一歩になります。
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
