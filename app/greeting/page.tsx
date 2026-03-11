import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function GreetingPage() {
  return (
    <div className="page">
      <PageLayout title="MEMBER" subtitle="メンバー紹介">
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
                代表取締役/キャリア教育デザイナー
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
