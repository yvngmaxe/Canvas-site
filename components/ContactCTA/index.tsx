import Link from "next/link";
import styles from "./index.module.css";
import ctaStyles from "../styles/cta.module.css";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      aria-label="お問い合わせ"
      className={`${ctaStyles.sectionBackdrop} ${styles.wrapper}`}
    >
      <div className={styles.container}>
        <div className={`${ctaStyles.cardSurface} ${styles.inner}`}>
          <div className={styles.copy}>
            <p className={styles.lead}>CANVASに相談しませんか？</p>

            <p className={styles.text}>
              ご相談・協業・講師依頼など、お気軽にお問い合わせください。
            </p>
          </div>

          <div className={styles.actions}>
            <Link
              href="/contact"
              className={`${ctaStyles.primaryButton} ${styles.button}`}
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
