"use client";

import { useState } from "react";
import styles from "./CaseFinder.module.css";
import { CardList, type CardItem } from "./CaseList";
import type { Audience } from "../data";

// 事例の一覧ページの「対象」の切り替え（すべて／学校・教育機関／…）。
// 押すとその対象の事例だけを出し、アドレスも ?for=school のように変える（そのまま共有・再読み込みできる）

export type FinderCard = CardItem & { audiences: Audience[] };

export function CaseFinder({
  cards,
  options,
  initial,
}: {
  cards: FinderCard[];
  options: { id: Audience; label: string }[];
  initial: Audience | "all";
}) {
  const [current, setCurrent] = useState<Audience | "all">(initial);

  const select = (id: Audience | "all") => {
    setCurrent(id);
    const url = id === "all" ? "/business/cases" : `/business/cases?for=${id}`;
    window.history.replaceState(null, "", url);
  };

  const shown = current === "all" ? cards : cards.filter((c) => c.audiences.includes(current));
  const tabs: { id: Audience | "all"; label: string; count: number }[] = [
    { id: "all", label: "すべて", count: cards.length },
    ...options.map((o) => ({
      id: o.id,
      label: o.label,
      count: cards.filter((c) => c.audiences.includes(o.id)).length,
    })),
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="group" aria-label="対象で絞り込む">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`${styles.tab} ${current === t.id ? styles.tabActive : ""}`}
            aria-pressed={current === t.id}
            onClick={() => select(t.id)}
          >
            {t.label}
            <span className={styles.count}>{t.count}</span>
          </button>
        ))}
      </div>

      {shown.length > 0 ? (
        <CardList id="all-cases" cards={shown} />
      ) : (
        <p className={styles.empty}>この対象の事例は、これから追加していきます。</p>
      )}
    </div>
  );
}
