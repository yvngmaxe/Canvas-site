"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./index.module.css";

type ServiceItem = {
  title: string;
  text: string;
  href: string;
};

type Props = {
  title?: string;
  lead?: string;
  items?: ServiceItem[];
};

const variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function LPservice({
  title = "提供しているサービス",
  lead = "地域×教育×子ども（小中高）を軸に、学校・企業・家庭をつなぐキャリア教育を展開します。",
  items = [
    {
      title: "探究を通じた「心で学ぶキャリア教育」",
      text: "採用・研修・地域連携の文脈で、子どもたちとの学びの場を共創します。",
      href: "/business",
    },
    {
      title: "iroiro広島",
      text: "広島が、広島の未来を担う子どもたちの色を開花させる。",
      href: "/business",
    },
  ],
}: Props) {
  return (
    <section className={styles.section} aria-labelledby="lpservice-title">
      <div className={styles.inner}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={variants}
        >
          <p className={styles.kicker}>SERVICES-事業紹介-</p>
          <h2 id="lpservice-title" className={styles.title} data-reveal>
            {title}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </motion.div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${
                item.title.includes("iroiro") ? styles.cardIroiro : ""
              }`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: i * 0.05 },
              }}
              viewport={{ once: true, amount: 0.4 }}
            >
              {item.title.includes("iroiro") ? (
                <>
                  {/* 左ブロック: ロゴ */}
                  <div className={styles.iroiroLeft}>
                    <div className={styles.iroiroLogoBig}>
                      <Image
                        src="/images/iroiro_logo.png"
                        alt="iroiro広島 ロゴ"
                        fill
                        className={styles.iroiroLogoBigImg}
                        sizes="(max-width: 900px) 100vw, 200px"
                        priority={false}
                      />
                    </div>
                    <div className={styles.iroiroLeftText}>
                      <div className={styles.iroiroSub}>
                        <span className={styles.iroiroSubLine}>広島が</span>
                        <span className={styles.iroiroSubLine}>
                          広島の未来を担う子どもたちの色を
                        </span>
                        <span className={styles.iroiroSubLine}>
                          　　　　　　　　　　　開花させる
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 中ブロック: 3行程度の説明 */}
                  <div className={styles.iroiroCenter}>
                    <ul
                      className={styles.iroiroList}
                      aria-label="iroiro広島の目標"
                    >
                      <li className={styles.iroiroListItem} data-reveal>
                        <span className={styles.iroiroListLabel}>
                          子どもの夢探しの舞台をつくる
                        </span>
                      </li>
                      <li className={styles.iroiroListItem} data-reveal>
                        <span className={styles.iroiroListLabel}>
                          広島に双方向のつながりを創る
                        </span>
                      </li>
                      <li className={styles.iroiroListItem} data-reveal>
                        <span className={styles.iroiroListLabel}>
                          広島を夢の発着点にする
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* 右ブロック: 3つのボタン */}
                  <div className={styles.iroiroRight}>
                    <div className={styles.actionsRow}>
                      <Link href="/iroiro/events" className={styles.link}>
                        イベント一覧へ
                      </Link>
                      <Link href="/iroiro/iroiro" className={styles.link}>
                        iroiroについて
                      </Link>
                      <Link href="/iroiro/sponsors" className={styles.link}>
                        iroiroスポンサー
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.cardMain}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                </div>
              )}
              {!item.title.includes("iroiro") && (
                <Link
                  href={item.href}
                  className={`${styles.link} ${styles.linkRight}`}
                >
                  事業内容
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
