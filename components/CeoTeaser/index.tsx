"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

export default function CeoTeaser() {
  return (
    <section className={styles.section} aria-labelledby="ceoTeaserTitle">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>GREETING-ご挨拶-</p>
          <h2 id="ceoTeaserTitle" className={styles.title}>
            代表メッセージ
          </h2>
        </header>

        <div className={styles.card}>
          <div className={styles.thumb}>
            <Image
              src="/images/ceo.jpg"
              alt="代表者の写真"
              width={80}
              height={80}
            />
          </div>
          <div className={styles.content}>
            <p className={styles.text}>
              教育から始める地域創生。心で学ぶキャリア教育を広島から。
            </p>
            <div className={styles.actions}>
              <Link href="/greeting" className={styles.cta}>
                ご挨拶を読む
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
