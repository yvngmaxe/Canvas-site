"use client";

import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import styles from "./index.module.css";
import type { IroiroEvent } from "@/app/_libs/microcms";
import { useMemo, useState } from "react";

type Props = {
  events: IroiroEvent[];
  basePath?: string;
};

export default function EventList({ events, basePath = "/iroiro/events" }: Props) {
  dayjs.locale("ja");
  if (events.length === 0) return <p>現在、公開中のイベントはありません。</p>;

  const [groupMode, setGroupMode] = useState<"date" | "place">("date");

  const grouped = useMemo(() => {
    if (groupMode === "place") {
      const byPlace = events.reduce<Map<string, { label: string; sort: number; items: IroiroEvent[] }>>((acc, event) => {
        const raw = event.place?.trim();
        const key = raw && raw.length > 0 ? raw : "その他の地域";
        if (!acc.has(key)) {
          acc.set(key, {
            label: key,
            sort: key === "その他の地域" ? Number.POSITIVE_INFINITY : key.localeCompare("a"),
            items: [],
          });
        }
        acc.get(key)!.items.push(event);
        return acc;
      }, new Map());

      return Array.from(byPlace.values()).sort((a, b) => a.sort - b.sort);
    }

    const byDate = events.reduce<Map<string, { label: string; sort: number; items: IroiroEvent[] }>>((acc, event) => {
      if (event.date) {
        const d = dayjs(event.date);
        if (d.isValid()) {
          const key = d.format("YYYY-MM");
          if (!acc.has(key)) {
            acc.set(key, {
              label: d.format("YYYY年 M月"),
              sort: d.startOf("month").valueOf(),
              items: [],
            });
          }
          acc.get(key)!.items.push(event);
          return acc;
        }
      }

      const key = "undated";
      if (!acc.has(key)) {
        acc.set(key, {
          label: "日程未定のイベント",
          sort: Number.POSITIVE_INFINITY,
          items: [],
        });
      }
      acc.get(key)!.items.push(event);
      return acc;
    }, new Map());

    return Array.from(byDate.values()).sort((a, b) => a.sort - b.sort);
  }, [events, groupMode]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="イベントの並び替え">
          <button
            type="button"
            role="tab"
            aria-selected={groupMode === "date"}
            className={`${styles.tabButton} ${groupMode === "date" ? styles.activeTab : ""}`}
            onClick={() => setGroupMode("date")}
          >
            日付で分類
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={groupMode === "place"}
            className={`${styles.tabButton} ${groupMode === "place" ? styles.activeTab : ""}`}
            onClick={() => setGroupMode("place")}
          >
            場所で分類
          </button>
        </div>
      </div>

      {grouped.map((group) => (
        <section key={group.label} className={styles.group}>
          <header className={styles.groupHeader}>
            <h3 className={styles.groupTitle}>{group.label}</h3>
          </header>
          <ul className={styles.list}>
            {group.items.map((event) => {
              const dateObj = event.date ? dayjs(event.date) : null;
              const dateLabel = dateObj
                ? `${dateObj.format("M月D日(ddd)")}`
                : "日程未定";
              const plainBody = event.body?.replace(/<[^>]+>/g, " ") ?? "";
              const description = event.description || plainBody.slice(0, 80);

              return (
                <li key={event.id} className={styles.item}>
                  <Link href={`${basePath}/${event.id}`} className={styles.card}>
                    <figure className={styles.media}>
                      {event.thumbnail ? (
                        <Image
                          src={event.thumbnail.url}
                          alt={event.title}
                          fill
                          sizes="(max-width: 900px) 100vw, 360px"
                          className={styles.mediaImage}
                        />
                      ) : (
                        <div className={styles.mediaPlaceholder} aria-hidden>
                          <span>iroiro</span>
                          <span>event</span>
                        </div>
                      )}
                    </figure>

                    <div className={styles.content}>
                      <div className={styles.header}>
                        <span className={styles.dateBadge}>{dateLabel}</span>
                        {event.place && (
                          <span className={styles.place}>{event.place}</span>
                        )}
                      </div>

                      <h4 className={styles.title}>{event.title}</h4>

                      {description && (
                        <p className={styles.description}>{description}</p>
                      )}

                      <span className={styles.cta}>
                        詳細を見る
                        <svg
                          className={styles.ctaIcon}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M9 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
