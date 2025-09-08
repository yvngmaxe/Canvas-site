'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './index.module.css';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
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
        <motion.p className={styles.text} variants={{ ...variants, visible: { ...variants.visible, transition: { ...variants.visible.transition, delay: 0.2 } } }}>
          なんとなく生きる時代は終わった。
          <br />
          自分だけの色で広島で夢を見よう。
          <br />
          広島が君の出発点。
        </motion.p>
        <motion.div variants={{ ...variants, visible: { ...variants.visible, transition: { ...variants.visible.transition, delay: 0.4 } } }}>
          <Link href="/iroiro" className={styles.button}>
            詳しく見る
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
