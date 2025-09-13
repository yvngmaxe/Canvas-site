import styles from "./index.module.css";
import { FaInstagram, FaLine } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__brand}>
          <p className={styles.footer__logo}>Canvas</p>
        </div>

        <nav className={styles.footer__nav} aria-label="フッターナビゲーション">
          <ul className={styles.footer__list}>
            <li>
              <Link href="/news">お知らせ</Link>
            </li>
            <li>
              <Link href="/hiroba">広場</Link>
            </li>
            <li>
              <Link href="/company">会社概要</Link>
            </li>
            <li>
              <Link href="/aboutus">私たちについて</Link>
            </li>
            <li>
              <Link href="/business">事業内容</Link>
            </li>
            <li>
              <Link href="/greeting">代表から</Link>
            </li>
            <li>
              <Link href="/iroiro/iroiro">iroiro概要</Link>
            </li>
            <li>
              <Link href="/iroiro/events">iroiroイベント一覧</Link>
            </li>
            <li>
              <Link href="/iroiro/sponsors">iroiroスポンサー</Link>
            </li>
            <li>
              <Link href="/iroiro/kodomonews">子ども新聞</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.footer__sns}>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://line.me/ja/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLine />
          </a>
        </div>

        <div className={styles.footer__contact} id="contact">
          <h2 className={styles.contact__title}>Canvasに相談しませんか？</h2>
          <div className={styles.contact__body}>
            <p className={styles.contact__text}>
              ご相談・協業・講師依頼など、お気軽にお問い合わせください。
            </p>
            <a href="/contact" className={styles.contactButton}>
              お問い合わせ
            </a>
          </div>
        </div>

        <div className={styles.footer__copy}>
          <small>&copy; {new Date().getFullYear()} Canvas LLC (planned)</small>
        </div>
      </div>
    </footer>
  );
}
