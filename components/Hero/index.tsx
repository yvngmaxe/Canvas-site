"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import cx from "classnames";
import { motion } from "framer-motion";
import styles from "./index.module.css";

// スライドのデータを配列で管理
const slides = [
  {
    src: "/images/white_other02.png",
    alt: "ヒーロー画像 1",
  },
  {
    src: "/images/test2.jpg",
    alt: "ヒーロー画像 2",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // ドットがクリックされた時の処理
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (containerRef.current) {
      const scrollLeft = containerRef.current.offsetWidth * index;
      containerRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  // スクロールを監視して、アクティブなドットを更新する
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div
        className={styles.slideShowContainer}
        ref={containerRef}
        aria-label="ヒーロー画像スライドショー"
      >
        {slides.map((slide, index) => (
          <div className={styles.slideShowItem} key={index}>
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1200}
              height={600}
              sizes="100vw"
              priority={index === 0} // 最初の画像だけ優先的に読み込む
            />
          </div>
        ))}
      </div>

      {/* テキストオーバーレイ */}
      <div className={styles.overlay} aria-hidden>
        <div className={styles.overlayInner}>
          <h2 className={styles.headline}>
            広島にあるもの、
            <br />
            ぜんぶで、
            <br />
            教育。
          </h2>
        </div>
      </div>

      {/*
      <nav
        className={styles.heroDots}
        aria-label="スライドショーページネーション"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`${index + 1}枚目のスライドへ`}
            className={cx(styles.heroDot, {
              [styles.active]: activeIndex === index,
            })}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </nav>
      */}
    </motion.section>
  );
}
