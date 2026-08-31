import Image from "next/image";
import styles from "./index.module.css";
import ctaStyles from "../styles/cta.module.css";
import type { NoteArticle } from "@/app/_libs/note";

type Props = {
  title?: string;
  items: NoteArticle[];
  accountUrl?: string;
  maxItems?: number;
};

export default function LPnote({
  title = "note",
  items,
  accountUrl = "https://note.com/tomoya_canvas",
  maxItems = 6,
}: Props) {
  const articles = items.slice(0, maxItems);

  return (
    <section className={styles.section} aria-labelledby="lpnote-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="lpnote-title" className={styles.title} data-reveal>
            {title}
          </h2>
        </header>

        {articles.length === 0 ? (
          <p className={styles.empty}>現在表示できる記事がありません。</p>
        ) : (
          <ul className={styles.grid}>
            {articles.map((article) => (
              <li key={article.id} className={styles.card}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                >
                  <div className={styles.thumbBox}>
                    {article.thumbnail ? (
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 340px"
                        className={styles.thumbImg}
                      />
                    ) : (
                      <div className={styles.thumbPlaceholder}>note</div>
                    )}
                    <span className={styles.noteBadge}>note</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.cardTitle}>{article.title}</p>
                    {article.excerpt && (
                      <p className={styles.cardSummary}>{article.excerpt}</p>
                    )}
                    <div className={styles.meta}>
                      {article.creatorImage && (
                        <Image
                          src={article.creatorImage}
                          alt={article.creatorName}
                          width={24}
                          height={24}
                          className={styles.avatar}
                        />
                      )}
                      <span className={styles.creatorName}>
                        {article.creatorName}
                      </span>
                      {article.date && (
                        <>
                          <span className={styles.dot} aria-hidden="true">
                            ・
                          </span>
                          <time dateTime={article.date} className={styles.date}>
                            {article.date}
                          </time>
                        </>
                      )}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.actions}>
          <a
            href={accountUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaStyles.primaryButton} ${styles.moreBtn}`}
          >
            noteでもっと見る
          </a>
        </div>
      </div>
    </section>
  );
}
