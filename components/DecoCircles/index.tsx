import styles from "./index.module.css";

// 背景に散らす丸・リング・ドット柄（装飾のみ）
const homeShapes = [
  "circleYellowLg",
  "dotRedSm",
  "circleNavyMd",
  "dotsYellow",
  "circlePinkMd",
  "dotYellowSm",
  "ringYellow",
  "dotRedXs",
  "circleNavyLg",
  "dotsPink",
] as const;

// 下層ページはトップより短いので、図形を減らして間隔を保つ
const pageShapes = [
  "pageCircleYellow",
  "pageCircleNavy",
  "pageCirclePink",
  "pageRingYellow",
] as const;

// 背景に散らす「C・A・N・V・A・S」の文字（装飾のみ）
// A はロゴと同じ、横棒のない山形の図形で描く
const letters = [
  { char: "C", key: "C", chevron: false },
  { char: "A", key: "A1", chevron: true },
  { char: "N", key: "N", chevron: false },
  { char: "V", key: "V", chevron: false },
  { char: "A", key: "A2", chevron: true },
  { char: "S", key: "S", chevron: false },
] as const;

type Props = {
  // home: トップページ用 / page: 下層ページ用（配置だけが違う）
  // compact: 短い下層ページ用（page と同じ配置で、文字と図形を小さくする）
  // word: compact の図形に、散らした文字の代わりに「CΛNVΛS」をまとめて右下に置く（試作）
  variant?: "home" | "page" | "compact" | "word";
};

const chevronIcon = (className: string) => (
  <svg className={className} viewBox="0 0 100 92">
    <path d="M0 92 L39 0 L61 0 L100 92 L80 92 L50 22 L20 92 Z" />
  </svg>
);

export default function DecoCircles({ variant = "home" }: Props) {
  const shapes = variant === "home" ? homeShapes : pageShapes;
  const isShort = variant === "compact" || variant === "word";
  const layerClass = isShort
    ? `${styles.layer} ${styles.compact}${variant === "word" ? ` ${styles.wordLayer}` : ""}`
    : styles.layer;
  const letterPrefix = variant === "home" ? "letter" : "pageLetter";

  return (
    <div className={layerClass} aria-hidden="true">
      {shapes.map((shape) => (
        <span key={shape} className={`${styles.shape} ${styles[shape]}`} />
      ))}
      {variant === "word" ? (
        <span className={styles.word}>
          {letters.map(({ char, key, chevron }) => (
            <span key={key} className={styles[`wordLetter${key}`]}>
              {chevron ? chevronIcon(styles.wordChevron) : char}
            </span>
          ))}
        </span>
      ) : (
        letters.map(({ char, key, chevron }) => (
          <span
            key={key}
            className={`${styles.letter} ${styles[`${letterPrefix}${key}`]}`}
          >
            {chevron ? chevronIcon(styles.chevron) : char}
          </span>
        ))
      )}
    </div>
  );
}
