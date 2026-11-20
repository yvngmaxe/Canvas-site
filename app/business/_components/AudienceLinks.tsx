import Link from "next/link";
import styles from "./AudienceLinks.module.css";
import { audiences } from "../data";

// 事業内容ページの「対象から事例をさがす」：押すと事例の一覧ページ（/business/cases）を、その対象で絞り込んだ状態で開く

export function AudienceLinks() {
  return (
    <section className={styles.wrap} aria-labelledby="audience-title">
      <h2 id="audience-title" className={styles.heading}>
        対象から事例をさがす
      </h2>
      <ul className={styles.list}>
        {audiences.map((a) => (
          <li key={a.id}>
            <Link href={`/business/cases?for=${a.id}`} className={styles.button}>
              <span>{a.button}</span>
              <span className={styles.icon} aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className={styles.all}>
        <Link href="/business/cases" className={styles.allLink}>
          すべての事例を見る
          <span aria-hidden> →</span>
        </Link>
      </p>
    </section>
  );
}
