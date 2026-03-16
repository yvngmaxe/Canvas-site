"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import ctaStyles from "../styles/cta.module.css";

export default function CeoTeaser() {
  return (
    <section className={styles.section} aria-labelledby="ceoTeaserTitle">
      <div className={styles.inner}>
        <header className={styles.header}></header>

        <div className={`${ctaStyles.cardSurface} ${styles.card}`}>
          <div className={styles.thumb}>
            <Image
              src="/images/yamaguchi.jpg"
              alt="株式会社CANVAS 山口智也の写真"
              width={80}
              height={80}
              sizes="(max-width: 640px) 64px, 80px"
            />
          </div>
          <div className={styles.content}>
            <p className={styles.text}>
              代表取締役/キャリア教育デザイナー <strong>山口智也</strong>
            </p>
            <div className={styles.actions}>
              <Link
                href="/greeting"
                className={`${ctaStyles.primaryButton} ${styles.cta}`}
              >
                メンバー紹介を見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
