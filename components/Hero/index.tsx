"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type CSSProperties } from "react";
import styles from "./index.module.css";

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
      <div className={styles.background} aria-hidden>
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className={styles.backgroundImage}
          sizes="100vw"
        />
        <span className={styles.backgroundFilter} />
      </div>

      <div className={styles.overlay}>
        <div className={styles.overlayInner}>
          <h2 id="hero-headline" className={styles.headline}>
            {[
              "居場所を越えて学び",
              "思考の枠を越えて探究し",
              "今の自分を越えて本当の自分を描く",
            ].map((line, index) => (
              <span
                key={line}
                className={styles.headlineLine}
                style={{ "--line-delay": `${index * 800}ms` } as CSSProperties}
              >
                {line}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </motion.section>
  );
}
