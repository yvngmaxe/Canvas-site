import Link from "next/link";
import styles from "./index.module.css";

type ActiveKey = "events" | "sponsors" | "kodomonews";

type Props = {
  active?: ActiveKey;
  tagline?: string;
  showNav?: boolean;
};

export default function IroiroHeader({
  active,
  tagline = "広島が広島の未来を担う子供たちの色を開花させる",
  showNav = true,
}: Props) {
  return (
    <section className={styles.wrapper} aria-label="iroiro header">
      <div className={styles.center}>
        <div className={styles.logo} aria-hidden="true">
          iroiro
        </div>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
      </div>

      {showNav && (
        <div className={styles.cards} aria-label="iroiro navigation">
          <Link href="/iroiro/sponsors" className={styles.cardLink}>
            <span className={styles.label}>スポンサー</span>
            <div
              className={`${styles.card} ${styles.cardSponsors} ${
                active === "sponsors" ? styles.active : ""
              }`}
            >
              <div className={styles.cardInner} aria-hidden="true"></div>
            </div>
          </Link>
          <Link href="/iroiro/kodomonews" className={styles.cardLink}>
            <span className={styles.label}>広島子ども新聞</span>
            <div
              className={`${styles.card} ${styles.cardKodomo} ${
                active === "kodomonews" ? styles.active : ""
              }`}
            >
              <div className={styles.cardInner} aria-hidden="true"></div>
            </div>
          </Link>
          <Link href="/iroiro/events" className={styles.cardLink}>
            <span className={styles.label}>イベント一覧</span>
            <div
              className={`${styles.card} ${styles.cardEvents} ${
                active === "events" ? styles.active : ""
              }`}
            >
              <div className={styles.cardInner} aria-hidden="true"></div>
            </div>
          </Link>
        </div>
      )}

      <hr className={styles.divider} />
    </section>
  );
}
