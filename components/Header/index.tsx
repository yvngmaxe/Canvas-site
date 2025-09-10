"use client";

import styles from "./index.module.css";
import { useState } from "react";
import cx from "classnames";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

export default function Header({ children }: { children?: React.ReactNode }) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isSubOpen, setSubOpen] = useState<boolean>(false);
  const open = () => setOpen(true);
  const close = () => {
    setOpen(false);
    setSubOpen(false);
  };
  const toggleSub = () => setSubOpen((prev) => !prev);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <header className={cx(styles.header, { [styles.open]: isOpen })}>
      <h1 className={`${styles.logo} text-2xl sm:text-3xl`}>
        <Link href="/" onClick={close}>
          Canvas
        </Link>
      </h1>

      <div className={styles.rightContainer}>
        {children}
        <button
          className={cx(styles.header__toggle, isOpen && styles.open)}
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
            <Link href="/business" onClick={close}>
              事業内容
            </Link>
          </li>
          <li>
            <Link href="/greeting" onClick={close}>
              社長挨拶
            </Link>
          </li>
          {/*
          <li>
            <Link href="/for-parents" onClick={close}>
              保護者様へ
            </Link>
          </li>
          <li>
            <Link href="/for-companies" onClick={close}>
              企業様へ
            </Link>
          </li>
          <li>
            <Link href="/for-schools" onClick={close}>
              学校様へ
            </Link>
          </li>
          */}

          <li className={styles.nav__hasSub}>
            <button
              type="button"
              className={cx(styles.nav__label, { [styles.open]: isSubOpen })}
              aria-expanded={isSubOpen}
              aria-controls="iroiroSub"
              onClick={toggleSub}
            >
              iroiro広島
            </button>

            <ul
              id="iroiroSub"
              className={cx(styles.nav__sub, { [styles.open]: isSubOpen })}
            >
              <li>
                <Link href="/iroiro/events" onClick={close}>
                  iroiroイベント一覧
                </Link>
              </li>
              <li>
                <Link href="/iroiro/about" onClick={close}>
                  iroiro概要
                </Link>
              </li>
              <li>
                <Link href="/iroiro/sponsors" onClick={close}>
                  iroiroスポンサー
                </Link>
              </li>
              <li>
                <Link href="/iroiro/kodomonews" onClick={close}>
                  こども新聞
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {isOpen && (
        <button
          className={cx(
            styles.header__toggle,
            styles.closeButton,
            "inline-grid h-11 w-11 place-items-center rounded-xl border border-gray-300/80 bg-white/90 text-gray-800 shadow-sm backdrop-blur transition hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400"
          )}
          onClick={close}
        >
          <span></span>
          <span></span>
        </button>
      )}
      <motion.div className={styles.progressBar} style={{ scaleX }} />
    </header>
  );
}
