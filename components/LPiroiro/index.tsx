'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
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

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutCubic,
      delay: 0.4,
    },
  },
};

export default function LPiroiro() {
  return (
    <motion.section 
      className={styles.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={styles.content}>
        <motion.h2 className={styles.title} variants={variants}>
          iroiro広島
        </motion.h2>
        <motion.p className={styles.text} variants={textVariants}>
          なんとなく生きる時代は終わった。
          <br />
          自分だけの色で広島で夢を見よう。
          <br />
          広島が君の出発点。
        </motion.p>
        <motion.div variants={buttonVariants}>
          <Link href="/iroiro" className={styles.button}>
            詳しく見る
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
