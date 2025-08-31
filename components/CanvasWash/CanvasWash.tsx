"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CanvasWash.module.css";

/**
 * スクロール量に応じて“絵の具のしみ”が広がり、
 * 下のカラフルなグラデーション背景が見えてくる演出。
 * - pointer-events: none で操作をブロックしない
 * - prefers-reduced-motion 対応
 */
export default function CanvasWash() {
  const [progress, setProgress] = useState(0); // 0→1
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setProgress(1); // アニメーションを避けて常時フル表示
      return;
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const scrollHeight = doc.scrollHeight - doc.clientHeight;
        const p = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
        setProgress(p);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // 初期計算
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 一番下まで来たら必ず全面が染まるようにする安全ネット（0→1 のスムーズな補正）
  const clamp = (n: number, min = 0, max = 1) =>
    Math.max(min, Math.min(max, n));
  const tailRaw = clamp((progress - 0.85) / 0.15); // 85%以降で効き始める
  const tail = tailRaw * tailRaw * (3 - 2 * tailRaw); // smoothstep easing

  return (
    <div className={styles.wash} aria-hidden="true">
      {/* SVGマスクで“しみ”を作る */}
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 背景のカラフル層（自由に配色OK） */}
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(340 90% 65%)" />
            <stop offset="40%" stopColor="hsl(210 90% 60%)" />
            <stop offset="70%" stopColor="hsl(50 95% 60%)" />
            <stop offset="100%" stopColor="hsl(140 65% 55%)" />
          </linearGradient>

          {/* にじみの縁に“ふちぼかし”を追加（絵の具感） */}
          <radialGradient id="bleed" r="1">
            <stop offset="85%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>

          {/* 絵の具の縁にランダムな“にじみ/ギザギザ”を与えるフィルタ */}
          <filter id="splatWarp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="1"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="0.35" />
          </filter>

          {/* しみ形状マスク（白=見える / 黒=隠れる） */}
          <mask id="inkMaskBase">
            {/* 初期は真っ黒（＝全部隠す） */}
            <rect x="0" y="0" width="100" height="100" fill="black" />

            {/* メインのスプラッシュ（左上寄り） */}
            <g
              filter="url(#splatWarp)"
              transform={`translate(18 22) scale(${0.35 + 0.85 * progress})`}
            >
              <path
                fill="white"
                d="M0,0 C6,-2 12,1 13,7 C14,12 10,16 4,17 C-2,18 -6,14 -7,8 C-8,3 -4,1 0,0 Z"
              />
              {/* 周囲の飛沫 */}
              <circle cx="10" cy="-3" r="1.8" fill="white" />
              <circle cx="-6" cy="-4" r="1.4" fill="white" />
              <circle cx="-10" cy="3" r="1.2" fill="white" />
            </g>

            {/* 右中央のスプラッシュ */}
            <g
              filter="url(#splatWarp)"
              transform={`translate(72 48) scale(${0.7 + 0.7 * progress})`}
            >
              <path
                fill="white"
                d="M0,0 C5,-3 10,-2 12,3 C13,7 10,11 6,12 C1,13 -3,11 -5,7 C-7,2 -3,1 0,0 Z"
              />
              <circle cx="9" cy="-2" r="1.5" fill="white" />
              <circle cx="-4" cy="-5" r="1.2" fill="white" />
            </g>

            {/* 右下のスプラッシュ */}
            <g
              filter="url(#splatWarp)"
              transform={`translate(86 84) scale(${0.55 + 0.7 * progress})`}
            >
              <path
                fill="white"
                d="M0,0 C4,-2 8,-1 9,3 C10,6 7,9 4,10 C0,11 -3,9 -4,6 C-5,2 -2,1 0,0 Z"
              />
              <circle cx="7" cy="-1" r="1.2" fill="white" />
            </g>

            {/* ドリップ（滴り）: 長さをprogressで伸ばす */}
            <g filter="url(#splatWarp)">
              <rect
                x="19"
                y="22"
                width="1.4"
                height={4 + 22 * progress}
                rx="0.7"
                fill="white"
              />
              <rect
                x="73"
                y="50"
                width="1.2"
                height={2 + 18 * progress}
                rx="0.6"
                fill="white"
              />
              <rect
                x="87"
                y="84"
                width="0.9"
                height={1 + 16 * progress}
                rx="0.45"
                fill="white"
              />
            </g>

            {/* フィナーレ：ページ下部で全面を一気に見せる安全ネット */}
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="white"
              opacity={tail}
            />
          </mask>
        </defs>

        {/* カラフル層にマスクを適用 */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="url(#bgGrad)"
          mask="url(#inkMaskBase)"
        />
      </svg>
    </div>
  );
}
