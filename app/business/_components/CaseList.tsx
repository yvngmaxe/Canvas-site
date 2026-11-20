import Image from "next/image";
import Link from "next/link";
import styles from "./CaseList.module.css";
import type { Case } from "../data";

// 柱のページの「事例」：事例のカードを並べる（参考 https://playspace.jp/4-2 ）。
// 新しい実績は ../data.ts の各柱の cases に足せば、ここにカードが増える。
// カードを押すと事例の詳しいページ（/business/<柱>/<slug>）へ

export function CaseList({ pillarId, cases }: { pillarId: string; cases: Case[] }) {
  return (
    <section className={styles.wrap} aria-labelledby="cases-title">
      <h3 id="cases-title" className={styles.heading}>
        事例
      </h3>
      <ul className={styles.grid}>
        {cases.map((c) => {
          const photo = c.photos?.[0];
          return (
            <li key={c.slug}>
              <Link href={`/business/${pillarId}/${c.slug}`} className={styles.card}>
                <div className={`${styles.photoFrame} ${photo?.logo ? styles.logoFrame : ""}`}>
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                      className={photo.logo ? styles.logo : styles.photo}
                      style={photo.position ? { objectPosition: photo.position } : undefined}
                    />
                  ) : (
                    // 写真がまだない事例は、色の付いた仮の枠
                    <span className={styles.noPhoto} aria-hidden>
                      CANVAS
                    </span>
                  )}
                </div>
                <div className={styles.body}>
                  {c.target && <span className={styles.tag}>{c.target}</span>}
                  <h4 className={styles.title}>{c.title}</h4>
                  {/* 一言：01・02 はキャッチコピー、03 は対象と日程 */}
                  {(c.catchCopy || c.subline) && (
                    <p className={styles.catch}>
                      {c.catchLead && <span className={styles.catchLead}>{c.catchLead}</span>}
                      {c.catchCopy ?? c.subline}
                    </p>
                  )}
                  <span className={styles.more}>
                    <span>詳しく見る</span>
                    <span className={styles.moreIcon} aria-hidden>
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* 「← ○○にもどる」 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <div className={styles.backRow}>
      <Link href={href} className={styles.back}>
        <span aria-hidden>←</span>
        {label}
      </Link>
    </div>
  );
}

/* 道しるべ「事業内容 › 02 学びのプロジェクト企画運営」 */
export function Breadcrumb({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav className={styles.breadcrumb} aria-label="現在の場所">
      {items.map((it, i) => (
        <span key={it.href} className={styles.breadcrumbItem}>
          {i > 0 && (
            <span aria-hidden className={styles.breadcrumbDivider}>
              ›
            </span>
          )}
          <Link href={it.href} className={styles.breadcrumbLink}>
            {it.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
