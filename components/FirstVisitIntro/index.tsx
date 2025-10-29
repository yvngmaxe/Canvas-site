"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./index.module.css";
import Image from "next/image";

type StorageScope = "local" | "session";
type PlayMode = "always" | "session" | "local";

type Props = {
  playMode?: PlayMode; // 再生方針: always | session | local
  storageScope?: StorageScope; // 互換のため残置（playMode未指定時に使用）
  minShowMs?: number; // 最低表示時間（ms）。デフォルト900ms
};

export default function FirstVisitIntro({
  playMode,
  storageScope = "local",
  minShowMs = 900,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [moving, setMoving] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [linesVisible, setLinesVisible] = useState(false);

  useEffect(() => {
    // respect reduced motion
    if (typeof window === "undefined") return;
    // reduced motion の場合も表示はする（CSS側でモーション抑制）
    // const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const key = "lp_intro_played_v4";
    const forceIntro =
      new URLSearchParams(window.location.search).get("intro") === "1";
    const mode: PlayMode =
      playMode ??
      (storageScope === "session"
        ? "session"
        : storageScope === "local"
        ? "local"
        : "local");
    if (!forceIntro) {
      if (mode !== "always") {
        const storage =
          mode === "session" ? window.sessionStorage : window.localStorage;
        try {
          if (storage.getItem(key)) return;
          storage.setItem(key, "1");
        } catch {
          // storage unavailable; still show intro but won't persist
        }
      }
      // mode === 'always' は常に再生
    }

    setVisible(true);
    window.setTimeout(() => setLinesVisible(true), 50);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const showMs = Math.max(300, minShowMs);
    const moveDuration = 650;

    const t1 = window.setTimeout(() => {
      // 目標: Hero の見出し位置へ移動
      const dst = document.getElementById("hero-headline");
      const src = headlineRef.current;
      if (!dst || !src) {
        setFadeOut(true);
        return;
      }
      const srcRect = src.getBoundingClientRect();
      const dstRect = dst.getBoundingClientRect();
      // 中心点ベースで平行移動（スケールは省略）
      const srcCx = srcRect.left + srcRect.width / 2;
      const srcCy = srcRect.top + srcRect.height / 2;
      const dstCx = dstRect.left + dstRect.width / 2;
      const dstCy = dstRect.top + dstRect.height / 2;
      const dx = dstCx - srcCx;
      const dy = dstCy - srcCy;

      setMoving(true); // scrim を薄く
      // 次のフレームで transform を当てる
      requestAnimationFrame(() => {
        src.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      // 移動し終えたらオーバーレイを閉じる
      window.setTimeout(() => {
        setVisible(false);
        document.documentElement.style.overflow = prevOverflow;
      }, moveDuration);
    }, showMs);

    const t2 = window.setTimeout(() => {
      // セーフティ: 万一 move が走らなかった場合のフォールバックで閉じる
      if (!moving && !fadeOut) {
        setFadeOut(true);
        window.setTimeout(() => {
          setVisible(false);
          document.documentElement.style.overflow = prevOverflow;
        }, 450);
      }
    }, showMs + 1200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [playMode, storageScope, minShowMs]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ""} ${
        moving ? styles.moving : ""
      }`}
      aria-hidden
    >
      <div className={styles.bg}>
        <Image
          src="/images/white_other02.png"
          alt=""
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover" }}
        />
        <div className={styles.scrim} />
      </div>
      <div className={styles.inner}>
        <h2
          ref={headlineRef}
          className={`${styles.headline} ${linesVisible ? styles.visible : ""}`}
        >
          {[
            "居場所を越えて学び",
            "思考の枠を越えて探究し",
            "今の自分を越えて本当の自分を描く",
          ].map((line, index) => (
            <span
              key={line}
              className={styles.headlineLine}
              style={{ transitionDelay: `${index * 120}ms` } as CSSProperties}
            >
              {line}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
