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
              className={styles.card}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: i * 0.05 },
              }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className={styles.cardMain}>
                {item.title.includes("iroiro") ? (
                  <div className={styles.logoBanner}>
                    <Image
                      src="/images/iroiro_logo.png"
                      alt="iroiro広島 ロゴ"
                      fill
                      className={styles.logoBannerImg}
                      sizes="(max-width: 640px) 270px, 360px"
                      priority={false}
                    />
                  </div>
                ) : (
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                )}
                <p className={styles.cardText}>{item.text}</p>
                {item.title.includes("iroiro") && (
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
                )}
              </div>
              {!item.title.includes("iroiro") && (
                <Link
                  href={item.href}
                  className={`${styles.link} ${styles.linkRight}`}
                >
                  事業紹介へ
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
