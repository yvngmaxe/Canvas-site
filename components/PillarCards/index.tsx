import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { pillarCards } from "./data";

// 事業の4本柱のカード（2×2）。見た目はトップの「事業内容」カードと同じ。
// カード全体を押すと各柱のページ（/business/<id>）へ

export default function PillarCards() {
  return (
    <ul className={styles.cards}>
      {pillarCards.map((card) => (
        <li key={card.id}>
          <Link href={`/business/${card.id}`} className={styles.card}>
            <div
              className={`${styles.photoFrame} ${
                card.imageKind === "logo" ? styles.logoFrame : ""
              }`}
            >
              <Image
                src={card.image}
                alt={card.imageAlt}
                sizes="(max-width: 640px) 90vw, 480px"
                fill
                className={card.imageKind === "logo" ? styles.logo : styles.photo}
              />
            </div>
            <p className={styles.number}>{card.number}</p>
            <h2 className={styles.title}>{card.title}</h2>
            <p className={styles.description}>{card.description}</p>
            <span className={styles.divider} aria-hidden />
            <span className={styles.more}>
              <span>事例を見る</span>
              <span className={styles.moreIcon} aria-hidden>
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
