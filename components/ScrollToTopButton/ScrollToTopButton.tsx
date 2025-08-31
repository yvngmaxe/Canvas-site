"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import cx from "classnames";
import styles from "./ScrollToTopButton.module.css";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // スクロールイベントを監視して、ボタンの表示・非表示を切り替える
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // コンポーネントがアンマウントされた時にイベントリスナーを削除
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <a
      href="#top-of-page"
      className={cx(
        styles.scrollToTopButton,
        "bg-accent",
        "transition-opacity duration-300",
        {
          "opacity-100 pointer-events-auto": isVisible,
          "opacity-0 pointer-events-none": !isVisible,
        }
      )}
      aria-label="ページトップに戻る"
      // isVisibleがfalseの時はフォーカス対象から外す
      tabIndex={isVisible ? 0 : -1}
    >
      <FaArrowUp />
    </a>
  );
}
