"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
};

export default function PaintReveal({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // コンテナがビューポートのどこにあるかを監視
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // 開始時:コンテナの底が画面の上端, 終了時:コンテナの上端が画面の下端
  });

  // scrollYProgress (0〜1) の値を clip-path の circle の半径に変換
  // 50%から150%に変化させることで、完全に覆われるようにする
  const clipPath = useTransform(
    scrollYProgress,
    [0.2, 0.8], // アニメーションを開始・終了するスクロール位置
    ["circle(50% at 50% 50%)", "circle(150% at 50% 50%)"]
  );

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* 背景色を表示するアニメーション要素 */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, hsl(340 90% 65%), hsl(210 90% 60%) 40%, hsl(50 95% 60%) 70%, hsl(140 65% 55%))",
          clipPath: clipPath,
        }}
      />
      {/* 前景のコンテンツ */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}