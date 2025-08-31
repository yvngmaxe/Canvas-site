"use client";

import Image from "next/image";
import styles from "./MemberList.module.css";
import cx from "classnames";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import type { Member } from "@/app/_libs/microcms";

// 画面サイズに応じて出し分けるためのカスタムフック
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => {
      setMatches(media.matches);
    };

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [query]);

  return matches;
};

// Propsの型定義
type Props = {
  members: Member[];
};

export default function MemberList({ members }: Props) {
  const isDesktop = useMediaQuery("(min-width: 769px)");

  return (
    <div className={styles.memberList}>
      {members.map((member, index) => {
        const initial = isDesktop
          ? { opacity: 0, x: index % 2 === 0 ? 40 : -40 }
          : { opacity: 0, y: 40 };
        
        const whileInView = { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          transition: { duration: 0.8, ease: "easeOut" } 
        };

        return (
          <motion.div
            key={member.id}
            initial={initial}
            whileInView={whileInView}
            viewport={{ once: true, amount: 0.4 }}
            className={cx(styles.memberItem, {
              [styles.reverse]: index % 2 !== 0,
            })}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={member.image.url}
                alt={`${member.name}のプロフィール写真`}
                width={member.image.width}
                height={member.image.height}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <p className={styles.position}>{member.position}</p>
              <h2 className={styles.name}>{member.name}</h2>
              <p className={styles.profile}>{member.profile}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
