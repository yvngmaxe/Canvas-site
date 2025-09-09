'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './index.module.css';

const easeOutCubic: [number, number, number, number] = [0.16, 1, 0.3, 1];

const variants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutCubic,
    }
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutCubic,
      delay: 0.2,
    },
  },
};

export default function LPVision() {
  return (
    <motion.section 
      className={styles.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={styles.background}></div>
      <div className={styles.content}>
        <motion.h2 className={styles.title} variants={variants}>
          VISION
        </motion.h2>
        <motion.p className={styles.text} variants={textVariants}>
          ここに「VISION」のコンテンツが入ります。
          <br />
          私たちの目指す未来についての文章をここに追加しましょう。
        </motion.p>
      </div>
    </motion.section>
  );
}
