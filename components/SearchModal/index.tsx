"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import styles from "./index.module.css";

// 検索対象となるページのデータ
const searchablePages = [
  { title: "トップページ", url: "/" },
  { title: "お知らせ", url: "/news" },
  { title: "広場", url: "/hiroba" },
  { title: "会社概要", url: "/company" },
  { title: "わたしたちについて", url: "/aboutus" },
  { title: "事業内容", url: "/business" },
  { title: "代表メッセージ", url: "/greeting" },
  { title: "お問い合わせ", url: "/contact" },
  { title: "iroiroイベント一覧", url: "/iroiro/events" },
  { title: "iroiro概要", url: "/iroiro/iroiro" },
  { title: "iroiroスポンサー", url: "/iroiro/sponsors" },
  { title: "ひろしま子ども推し新聞", url: "/iroiro/kodomonews" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // クライアント側でマウントされたことを確認
  useEffect(() => {
    setMounted(true);
  }, []);

  // 部分一致検索（大文字・小文字を区別しない）
  const filteredPages = searchQuery.trim()
    ? searchablePages.filter((page) =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // モーダルが開いたときにフォーカスを入力欄に移動
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // 少し遅延させて確実にフォーカスする
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // 閉じたときに検索クエリをリセット
      setSearchQuery("");
    }
  }, [isOpen]);

  // Escキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // モーダルが開いているときは背景スクロールを無効化
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // オーバーレイクリックで閉じる
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !mounted || typeof window === "undefined") return null;

  const modalContent = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            HP内検索<span className={styles.beta}>β</span>
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="検索モーダルを閉じる"
          >
            ✕
          </button>
        </div>

        {/* 検索入力欄 */}
        <div className={styles.searchInputContainer}>
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="ページタイトルで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 注意書き */}
        <p className={styles.note}>
          ※現在はページタイトルのみ検索できます
        </p>

        {/* 検索結果 */}
        <div className={styles.resultsContainer}>
          {searchQuery.trim() === "" ? (
            <p className={styles.emptyMessage}>
              検索キーワードを入力してください
            </p>
          ) : filteredPages.length === 0 ? (
            <p className={styles.emptyMessage}>
              該当するページは見つかりませんでした
            </p>
          ) : (
            <ul className={styles.resultsList}>
              {filteredPages.map((page, index) => (
                <li key={`${page.url}-${index}`}>
                  <Link
                    href={page.url}
                    className={styles.resultItem}
                    onClick={onClose}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );

  // Portalを使ってbody直下に配置
  return createPortal(modalContent, document.body);
}

