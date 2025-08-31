"use client";

import { useEffect } from "react";

export default function RevealController() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;

          const el = e.target as HTMLElement;

          const group = el.getAttribute("data-reveal-group");
          if (group) {
            const children = Array.from(
              el.querySelectorAll<HTMLElement>(`[data-reveal-child="${group}"]`)
            );

            children.forEach((child, idx) => {
              const delayMs = Math.min(idx * 300, 1000); // 0ms,160ms,320ms...
              window.setTimeout(() => {
                child.classList.add("isVisible");
              }, delayMs);
            });

            // 親セクション自体も見せたい場合
            el.classList.add("isVisible");
            io.unobserve(el);
            return;
          }

          // 単体要素: 既存の order ロジック
          const orderAttr = el.getAttribute("data-reveal-order");
          let order = orderAttr ? parseInt(orderAttr, 10) : NaN;
          if (Number.isNaN(order)) order = 0;
          const delayMs = Math.min(order * 160, 800);

          window.setTimeout(() => {
            el.classList.add("isVisible");
            io.unobserve(el); // 一度表示したら監視解除
          }, delayMs);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px", // 画面下端より少し早めに発火
      }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
