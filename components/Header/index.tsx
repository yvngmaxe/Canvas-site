"use client";

import styles from "./index.module.css";
import { useEffect, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import SearchModal from "@/components/SearchModal";

export default function Header({ children }: { children?: React.ReactNode }) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isSubOpen, setSubOpen] = useState<boolean>(false);
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const open = () => setOpen(true);
  const close = () => {
    setOpen(false);
    setSubOpen(false);
  };
  const toggleSub = () => setSubOpen((prev) => !prev);
  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Escキーでメニューを閉じる、開閉時にスクロールをロック
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = original;
      };
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={cx(styles.header, { [styles.open]: isOpen })}>
      <h1 className={styles.logo}>
        <Link href="/" onClick={close} aria-label="株式会社CANVAS トップへ">
          <Image
            src="/images/canvas_logo.png"
            alt="株式会社CANVASのロゴ画像"
            width={110}
            height={40}
            priority
            fetchPriority="high"
            loading="eager"
            sizes="(max-width: 640px) 88px, 110px"
            className={styles.logoImg}
          />
        </Link>
      </h1>

      <div className={styles.rightContainer}>
        {children}
        <button
          className={styles.searchButton}
          aria-label="検索を開く"
          onClick={openSearch}
        >
          🔍
        </button>
        <button
          className={cx(
            styles.header__toggle,
            isOpen && styles.open,
            "text-red-500",
          )}
          aria-label="メニューを開く"
          aria-expanded={isOpen}
          aria-controls="globalnav"
          onClick={open}
        >
          <span
            className={`${styles.header__toggleBar} transition-transform duration-300`}
          ></span>
          <span
            className={`${styles.header__toggleBar} transition-opacity duration-300`}
          ></span>
          <span
            className={`${styles.header__toggleBar} transition-transform duration-300`}
          ></span>
        </button>
      </div>

      <nav className={styles.nav}>
        <ul
          className={cx(styles.nav__list, { [styles.open]: isOpen })}
          id="globalnav"
        >
          <li>
            <Link href="/news" onClick={close}>
              お知らせ
            </Link>
          </li>
          <li>
            <Link href="/hiroba" onClick={close}>
              広場
            </Link>
          </li>
          <li>
            <Link href="/company" onClick={close}>
              会社概要
            </Link>
          </li>
          <li>
            <Link href="/aboutus" onClick={close}>
              会社紹介
            </Link>
          </li>
          <li>
            <Link href="/business" onClick={close}>
              事業内容
            </Link>
          </li>
          <li>
            <Link href="/achievements" onClick={close}>
              実績
            </Link>
          </li>
          <li>
            <Link href="/greeting" onClick={close}>
              メンバー紹介
            </Link>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <button
          className={cx(
            styles.header__toggle,
            styles.closeButton,
            "inline-grid h-11 w-11 place-items-center rounded-xl border border-gray-300/80 bg-white/90 text-gray-800 shadow-sm backdrop-blur transition hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400",
          )}
          onClick={close}
        >
          <span></span>
          <span></span>
        </button>
      )}
      <motion.div className={styles.progressBar} style={{ scaleX }} />
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </header>
  );
}
