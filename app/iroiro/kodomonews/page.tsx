import type { ReactNode } from "react";
import Image from "next/image";
import IroiroHeader from "@/components/IroiroHeader";
import styles from "./page.module.css";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_KODOMONEWS_EMAIL ?? "info@example.com";

const OVERVIEW = [
  {
    title: "応募枠",
    lines: ["①小学生の部", "②中学生の部", "③高校生の部"],
  },
  {
    title: "応募内容",
    lines: [
      "①自由枠",
      "広島にあるもの(施設・企業・地域など)",
      "について、各テーマを1つ選定。",
      "※広島に関係あるものならなんでも受付中です！",
    ],
  },
  {
    title: "日程",
    lines: [
      "入稿(締切):毎月20日",
      "公開:翌月1日に月刊号を発行",
      "WEB/各事業所で配布・公開",
    ],
  },
  {
    title: "集計",
    lines: [
      "WEB:各部門優秀者計3名の新聞を公開。",
      "紙面月刊号:最優秀者1名を選定し掲載。",
    ],
  },
];

const CREATION_RULES = [
  "用紙は縦向き",
  "A4用紙に手書き、もしくは電子端末で作成",
  "写真で撮影する場合は、文字が鮮明に写るようにお願いいたします",
  "公式フォーマットを基に作成できます。オリジナルレイアウトもOKです",
];

const TEMPLATE_FORMATS = [
  {
    level: "初級",
    description: "埋め込み式で書き込みやすいシンプルフォーマット。",
    href: "/downloads/1月_初級.pdf",
  },
  {
    level: "中級",
    description: "初級より見出しとポイントが1つ多い埋め込み式。",
    href: "/downloads/1月_中級.pdf",
  },
  {
    level: "上級",
    description:
      "タイトルとロゴ以外が白紙。オリジナルでレイアウトを組みたい人向け。",
    href: "/downloads/1月_上級.pdf",
  },
  {
    level: "PowerPoint",
    description: "パソコンで作る人はこちら。PPTX形式で編集できます。",
    href: "/downloads/ひろしま子ども推し新聞1月.pptx",
  },
];

type SubmissionMethod = {
  title: string;
  steps: ReactNode[];
};

const toZenkakuNumber = (value: number) =>
  value
    .toString()
    .replace(/\d/g, (d) => String.fromCharCode("０".charCodeAt(0) + Number(d)));

const SUBMISSIONS = (mailto: string): SubmissionMethod[] => [
  {
    title: "①インスタグラムで入稿",
    steps: [
      "本ホームページの上部のボタンからアカウント登録をする。",
      "インスタグラムにて「iroiro_hiroshima」をフォローする。",
      "DMにて新聞を撮影・スキャンした写真またはpdfファイルを送る。",
      "続いて、「ニックネーム,年齢」を送る。",
    ],
  },
  {
    title: "②メールで入稿 *画質が悪い場合はこちらでお願いします",
    steps: [
      "アカウント登録をする。",
      "[yamaguchi@e-canvas.co.jp]を宛先に、登録したメールアドレスで新規メールを作成。",
      "「件名」を「○月ひろしま子ども推し新聞」に変更。",
      "新聞を撮影・スキャンした写真またはpdfファイルを添付。",
      "本文に「ニックネーム,年齢」を記述",
      "送信",
    ],
  },
];

export default function IroiroNewsPage() {
  const mailto = `mailto:${CONTACT_EMAIL}`;
  const submissions = SUBMISSIONS(mailto);

  return (
    <div className="page">
      <IroiroHeader active="kodomonews" />
      <main className="mx-auto max-w-screen-lg px-4 pt-6 pb-10 sm:pt-8 sm:pb-16">
        <section className={styles.wrapper} aria-labelledby="kodomonews-about">
          <header className={styles.hero}>
            <p className={styles.kicker}>HIROSHIMA KIDS MEDIA</p>
            <h2 id="kodomonews-about" className={styles.srOnly}>
              ひろしま子ども推し新聞
            </h2>
            <div className={styles.logo} aria-hidden="true">
              <Image
                src="/images/kodomonews_logo.png"
                alt="ひろしま子ども推し新聞のロゴ"
                fill
                className={styles.logoImage}
                sizes="(max-width: 540px) 90vw, 420px"
                priority
              />
            </div>
            <p className={styles.lead}></p>
          </header>

          <section
            className={styles.overview}
            aria-labelledby="kodomonews-overview"
          >
            <h3 id="kodomonews-overview" className={styles.sectionTitle}>
              1月号の大募集中！
            </h3>
            <div className={styles.overviewGrid}>
              {OVERVIEW.map((item, index) => (
                <article key={item.title} className={styles.overviewCard}>
                  <span className={styles.overviewNumber}>
                    {toZenkakuNumber(index + 1).padStart(2, "０")}
                  </span>
                  <h4 className={styles.overviewTitle}>{item.title}</h4>
                  <ul className={styles.overviewLines}>
                    {item.lines.map((line, idx) => {
                      const isPrimary = idx === 0;
                      const isNote = line.startsWith("※");
                      const className = [
                        styles.overviewLine,
                        isPrimary ? styles.overviewLinePrimary : "",
                        isNote ? styles.overviewLineNote : "",
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <li key={idx} className={className}>
                          {line}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              ))}
            </div>
            <p className={styles.overviewAward}>
              <span className={styles.overviewAwardHighlight}>
                各月最優秀者1名に、ギフトカード500円をお給料として贈呈！
              </span>
              <br />
              <span className={styles.overviewAwardNote}>
                ※選ばれた方には、別途ご連絡させていただきます。
              </span>
            </p>
          </section>

          <section
            className={styles.creation}
            aria-labelledby="kodomonews-creation"
          >
            <h3 id="kodomonews-creation" className={styles.sectionTitle}>
              新聞の作成
            </h3>
            <div className={styles.creationCard}>
              <p className={styles.creationLead}>
                入稿する新聞は下記のルールに沿ってご準備ください。
              </p>
              <ul className={styles.creationList}>
                {CREATION_RULES.map((rule, idx) => (
                  <li key={idx} className={styles.creationItem}>
                    <span className={styles.creationBullet}>•</span>
                    <span className={styles.creationText}>{rule}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.formatDownloads}>
                <h4 className={styles.formatHeading}>新聞フォーマット</h4>
                <p className={styles.formatSubtext}>
                  レベル別のテンプレートをダウンロードできます。
                  <strong>書き込み、または印刷してお使いください。</strong>
                  パソコンで作成される方はpptxファイルもダウンロードできます。
                </p>
                <ul className={styles.formatList}>
                  {TEMPLATE_FORMATS.map((template) => (
                    <li key={template.level} className={styles.formatItem}>
                      <div className={styles.formatMeta}>
                        <span className={styles.formatLevel}>
                          {template.level}
                        </span>
                        <p className={styles.formatDescription}>
                          {template.description}
                        </p>
                      </div>
                      <a
                        href={template.href}
                        download
                        className={styles.formatButton}
                      >
                        ダウンロード
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.methods} aria-labelledby="kodomonews-flow">
            <h3 id="kodomonews-flow" className={styles.sectionTitle}>
              応募方法
            </h3>
            <div className={styles.methodList}>
              {submissions.map((method, index) => (
                <article
                  key={method.title}
                  className={styles.method}
                  aria-label={`${method.title}の手順`}
                >
                  <header className={styles.methodHeader}>
                    <span className={styles.methodTitle}>{method.title}</span>
                  </header>
                  <ol className={styles.stepList}>
                    {method.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className={styles.stepItem}>
                        <span className={styles.stepNumber}>
                          {toZenkakuNumber(stepIndex + 1)}
                        </span>
                        <div className={styles.stepBody}>{step}</div>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
