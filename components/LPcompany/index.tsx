"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./index.module.css";

type Props = {
  title?: string;
  description?: string;
};

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function LPcompany({
  title = "確固たる自分を持つことが自分の人生の最大の教科書になる",
  description = "",
}: Props) {
  return (
    <section className={styles.section} aria-labelledby="lpcompany-title">
      <div className={styles.inner}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={variants}
        >
          <p className={styles.kicker}>ABOUT US -わたしたちについて-</p>
          <h2 id="lpcompany-title" className={styles.title} data-reveal>
            {title}
          </h2>
          <p className={styles.text}>{description}</p>
          <p className={styles.text}>
            <strong>
              子どもが向かうべき未来を自ら見つけ出し、その道を自ら切り拓く力を育てるためのキャリア教育をお届けします。
            </strong>
          </p>

          <div className={styles.actions}>
            <Link href="/aboutus" className={styles.button}>
              わたしたちについて
            </Link>
            <Link href="/company" className={styles.button}>
              会社概要
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
