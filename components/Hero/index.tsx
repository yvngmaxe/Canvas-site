"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import cx from "classnames";
import { motion } from "framer-motion";
import styles from "./index.module.css";

// スライドのデータを配列で管理
const slides = [
  {
    src: "/images/test1.jpg",
    alt: "説明的な代替テキスト1", // TODO: 画像の内容に合わせて変更してください
  },
  {
    src: "/images/test2.jpg",
    alt: "説明的な代替テキスト2", // TODO: 画像の内容に合わせて変更してください
  },
  {
    src: "/images/test3.jpg",
    alt: "説明的な代替テキスト3", // TODO: 画像の内容に合わせて変更してください
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
    >
      <div className={styles.slideShowContainer} ref={containerRef}>
        {slides.map((slide, index) => (
          <div className={styles.slideShowItem} key={index}>
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1200}
              height={600}
              priority={index === 0} // 最初の画像だけ優先的に読み込む
            />
          </div>
        ))}
      </div>

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
    </motion.section>
  );
}
