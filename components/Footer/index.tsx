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
              <Link href="/iroiro">iroiro広島</Link>
            </li>
            {/*
            <li>
              <Link href="/for-parents">保護者様へ</Link>
            </li>
            <li>
              <Link href="/for-companies">企業様へ</Link>
            </li>
            <li>
              <Link href="/for-schools">学校様へ</Link>
            </li>
            */}
            <li>
              <Link href="/about/company">会社概要</Link>
            </li>
            <li>
              <Link href="/about/philosophy">企業理念</Link>
            </li>
            <li>
              <Link href="/about/activity-philosophy">活動理念</Link>
            </li>
            <li>
              <Link href="/about/greeting">社長挨拶</Link>
            </li>
            <li>
              <Link href="/members">メンバー</Link>
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
          <h2 className={styles.contact__title}>CONTACT</h2>
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
