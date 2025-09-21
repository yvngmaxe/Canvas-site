"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./index.module.css";

// スライドのデータを配列で管理
const slides = [
  {
    src: "/images/white_other02.png",
    alt: "ヒーロー画像",
  },
];

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className={styles.hero}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
      }}
    >
      <div className={styles.slideShowContainer} aria-label="ヒーロー画像">
        {slides.map((slide, index) => (
          <div className={styles.slideShowItem} key={index}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={styles.heroImg}
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* テキストオーバーレイ */}
      <div className={styles.overlay} aria-hidden>
        <div className={styles.overlayInner}>
          <h2 id="hero-headline" className={styles.headline}>
            広島にあるもの、
            <br />
            ぜんぶで、
            <br />
            教育。
          </h2>
        </div>
      </div>

    </motion.section>
  );
}
