import styles from "./index.module.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__brand}>
          <p className={styles.footer__logo}>株式会社CANVAS</p>
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
              <Link href="/aboutus">わたしたちについて</Link>
            </li>
            <li>
              <Link href="/business">事業内容</Link>
            </li>
            <li>
              <Link href="/greeting">代表メッセージ</Link>
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
              <Link href="/iroiro/kodomonews">ひろしま子ども推し新聞</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.footer__sns}>
          <a
            href="https://www.instagram.com/miraipasse/"
            target="_blank"
            aria-label="Instagram"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.instagram.com/miraipasse/"
            target="_blank"
            aria-label="Facebook"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
        </div>

        <div className={styles.footer__copy}>
          <small>&copy; {new Date().getFullYear()} CANVAS Co., Ltd</small>
        </div>
      </div>
    </footer>
  );
}
