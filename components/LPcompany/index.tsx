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
  title = "すべての地域と人を教育を通してつなぎ合わせる",
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
            広島全体でピースをつなぎ合わせる教育を通して
            <br className={styles.desktopBreak} />
            この土地の間でそれぞれ特別な色を持つ人やモノ、想いが結びつく。
          </p>
          <p className={styles.text}>
            広島に住むあなたに
            <br className={styles.desktopBreak} />
            「広島」というモノトーンに見えていた土地を
            <br className={styles.desktopBreak} />
            より多彩に、色鮮やかに魅せます。
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
