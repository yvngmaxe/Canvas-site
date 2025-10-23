import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

type ActiveKey = "events" | "sponsors" | "kodomonews";

type Props = {
  active?: ActiveKey;
  tagline?: string; // deprecated: using image logo only
  logoImage?: string; // Image path/URL for tagline
  logoAlt?: string;
  kodomoImage?: string; // photo for ひろしま子ども推し新聞 card
  showNav?: boolean;
};

export default function IroiroHeader({
  active,
  logoImage = "/images/iroiro_logo.png",
  logoAlt = "",
  kodomoImage = "/images/kodomonews_logo.png",
  showNav = true,
}: Props) {
  return (
    <section className={styles.wrapper} aria-label="iroiro header">
      <div className={styles.center}>
        <div className={styles.logo} aria-hidden="true">
          <Image
            src={logoImage}
            alt={logoAlt || "iroiro ロゴ"}
            fill
            className={styles.logoImage}
            sizes="(max-width: 640px) 330px, 420px"
          />
        </div>
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
            <span className={styles.label}>ひろしま子ども推し新聞</span>
            <div
              className={`${styles.card} ${styles.cardKodomo} ${
                active === "kodomonews" ? styles.active : ""
              }`}
            >
              {/* デスクトップ版ロゴ */}
              <Image
                src={kodomoImage}
                alt="ひろしま子ども推し新聞"
                fill
                className={`${styles.cardImage} ${styles.desktopOnly}`}
                sizes="(max-width: 640px) 100vw, 33vw"
                priority={active === "kodomonews"}
              />
              {/* スマホ版ロゴ */}
              <Image
                src="/images/kodomonews_mobile_logo.png"
                alt="ひろしま子ども推し新聞（モバイル）"
                fill
                className={`${styles.cardImage} ${styles.mobileOnly}`}
                sizes="100vw"
                priority={false}
              />
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
