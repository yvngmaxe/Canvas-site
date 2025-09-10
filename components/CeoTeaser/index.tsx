"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

export default function CeoTeaser() {
  return (
    <section className={styles.wrap} aria-labelledby="ceoTeaserTitle">
      <div className={styles.card}>
        <div className={styles.thumb}>
          <Image
            src="/images/test1.jpg"
            alt="代表者の写真"
            width={80}
            height={80}
          />
        </div>
        <div className={styles.content}>
          <h3 id="ceoTeaserTitle" className={styles.title}>代表メッセージ</h3>
          <p className={styles.text}>
            教育から始める地域創生。心で学ぶキャリア教育を広島から。
          </p>
          <Link href="/greeting" className={styles.cta}>
            ご挨拶を読む
          </Link>
        </div>
      </div>
    </section>
  );
}

