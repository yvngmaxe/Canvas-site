'use client';

import { useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import styles from './index.module.css';

type Props = {
  children: ReactNode;
};

export default function AnimatedHeading({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // 要素の上端が画面の下端に来た時(0)から、要素の下端が画面の上端を通過する時(1)までを監視
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 50%以上スクロールされたら「読み終わり」とみなす
    if (latest > 0.5) {
      setIsFinished(true);
    } else {
      setIsFinished(false); // スクロールして戻ったら色も戻るように
    }
  });

  return (
    <div ref={containerRef} className={styles.container}>
      <motion.div
        className={styles.borderIndicator}
        animate={{ backgroundColor: isFinished ? '#22c55e' : '#e2e8f0' }}
        transition={{ duration: 0.5 }}
      />
      <h3 className={styles.goalTitle}>
        {children}
      </h3>
    </div>
  );
}