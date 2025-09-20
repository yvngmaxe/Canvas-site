"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealController() {
  // ルートが変わるたびに再スキャンして監視を張り直す
  const pathname = usePathname();

  useEffect(() => {
    const observed = new WeakSet<Element>();

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

    const observeNode = (el: Element | null) => {
      if (!el || observed.has(el)) return;
      if (el instanceof HTMLElement && el.matches("[data-reveal]")) {
        io.observe(el);
        observed.add(el);
      }
    };

    const scanAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => observeNode(el));
    };

    // ルート変更直後はDOM差し替えの最中のことがあるため、
    // 2フレーム待ってから初回スキャン
    requestAnimationFrame(() => requestAnimationFrame(scanAll));

    // 遅延挿入にも対応するためにMutationObserverで監視
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== "childList") continue;
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return; // ELEMENT_NODE
          const el = node as Element;
          observeNode(el);
          el.querySelectorAll?.("[data-reveal]").forEach((child) => {
            observeNode(child);
          });
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
