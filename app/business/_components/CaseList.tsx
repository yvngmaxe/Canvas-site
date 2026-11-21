import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./CaseList.module.css";
import type { Case, Product } from "../data";

// 柱のページの「事例」「プロダクト」：カードを並べる（参考 https://playspace.jp/4-2 ）。
// 事例は MicroCMS の「事例」（新しい順で先頭）と ../data.ts の各柱の cases（そのあと）から並ぶ。
// 事例のカードは事例の詳しいページ（/business/<柱>/<slug>）へ、プロダクトのカードは説明ページへ

export type CardItem = {
  href: string;
  image?: StaticImageData | string; // MicroCMS の事例は写真の URL
  imageAlt?: string;
  imagePosition?: string;
  logo?: boolean;
  tag?: string;
  kicker?: string;
  title: string;
  catchLead?: string;
  catchText?: string;
  note?: string;
  /** どの柱の事例か（事例の一覧ページで出す「02 学びのプロジェクト企画運営」） */
  pillarLabel?: string;
  /** カードの下に出す2つ目のリンク（トリノメの「事例を見る」）。PC はカードにマウスを乗せると出る */
  sub?: { href: string; label: string };
};

/* 事例 → カード（一言は 01・02 がキャッチコピー、03 が対象と日程） */
export function caseToCard(
  pillarId: string,
  c: Case,
  pillarLabel?: string,
): CardItem {
  const photo = c.photos?.[0];
  return {
    href: `/business/${pillarId}/${c.slug}`,
    image: photo?.src,
    imageAlt: photo?.alt,
    imagePosition: photo?.position,
    logo: photo?.logo,
    tag: c.target,
    title: c.title,
    catchLead: c.catchLead,
    catchText: c.catchCopy ?? c.subline,
    pillarLabel,
  };
}

/* プロダクト → カード（事例があれば「事例を見る」も付ける。飛び先は説明の途中の「事例」） */
export function productToCard(
  pillarId: string,
  p: Product,
  caseCount = 0,
): CardItem {
  return {
    sub:
      caseCount > 0
        ? { href: `/business/${pillarId}/${p.slug}#cases`, label: "事例を見る" }
        : undefined,
    href: `/business/${pillarId}/${p.slug}`,
    image: p.logo,
    imageAlt: `${p.title}のロゴ`,
    logo: true,
    kicker: p.kicker,
    title: p.title,
    catchText: p.catchCopy,
    note: p.status,
  };
}

export function CardList({
  id,
  heading,
  cards,
}: {
  id: string;
  /** 見出し（「事例」など）。なしにすると、カードだけを並べる */
  heading?: string;
  cards: CardItem[];
}) {
  const grid = (
    <ul className={styles.grid}>
      {cards.map((c) => (
        <li key={c.href} className={c.sub ? styles.hasSub : undefined}>
          <Link href={c.href} className={styles.card}>
            <div
              className={`${styles.photoFrame} ${c.logo ? styles.logoFrame : ""}`}
            >
              {c.image ? (
                <Image
                  src={c.image}
                  alt={c.imageAlt ?? c.title}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                  className={c.logo ? styles.logo : styles.photo}
                  style={
                    c.imagePosition
                      ? { objectPosition: c.imagePosition }
                      : undefined
                  }
                />
              ) : (
                // 写真がまだない事例は、色の付いた仮の枠
                <span className={styles.noPhoto} aria-hidden>
                  CANVAS
                </span>
              )}
            </div>
            <div className={styles.body}>
              {c.pillarLabel && (
                <span className={styles.pillarLabel}>{c.pillarLabel}</span>
              )}
              {c.tag && <span className={styles.tag}>{c.tag}</span>}
              {c.kicker && <span className={styles.kicker}>{c.kicker}</span>}
              <h4 className={styles.title}>{c.title}</h4>
              {c.catchText && (
                <p className={styles.catch}>
                  {c.catchLead && (
                    <span className={styles.catchLead}>{c.catchLead}</span>
                  )}
                  {c.catchText}
                </p>
              )}
              {c.note && <p className={styles.note}>{c.note}</p>}
              <span className={styles.more}>
                <span>詳しく見る</span>
                <span className={styles.moreIcon} aria-hidden>
                  →
                </span>
              </span>
            </div>
          </Link>
          {/* リンクの中にリンクは入れられないので、カードの外（すぐ下）に置く */}
          {c.sub && (
            <Link href={c.sub.href} className={styles.sub}>
              <span>{c.sub.label}</span>
              <span className={styles.moreIcon} aria-hidden>
                →
              </span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  if (!heading) return grid;
  return (
    <section className={styles.wrap} aria-labelledby={id}>
      <h3 id={id} className={styles.heading}>
        {heading}
      </h3>
      {grid}
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
export function Breadcrumb({
  items,
}: {
  items: { href: string; label: string }[];
}) {
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
