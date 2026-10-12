import styles from "./index.module.css";

// 背景に散らす丸・リング・ドット柄（装飾のみ）
const shapes = [
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

// 背景に散らす「C・A・N・V・A・S」の文字（装飾のみ）
// A はロゴと同じ、横棒のない山形の図形で描く
const letters = [
  { char: "C", className: "letterC", chevron: false },
  { char: "A", className: "letterA1", chevron: true },
  { char: "N", className: "letterN", chevron: false },
  { char: "V", className: "letterV", chevron: false },
  { char: "A", className: "letterA2", chevron: true },
  { char: "S", className: "letterS", chevron: false },
] as const;

export default function DecoCircles() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {shapes.map((shape) => (
        <span key={shape} className={`${styles.shape} ${styles[shape]}`} />
      ))}
      {letters.map(({ char, className, chevron }) => (
        <span
          key={className}
          className={`${styles.letter} ${styles[className]}`}
        >
          {chevron ? (
            <svg className={styles.chevron} viewBox="0 0 100 92">
              <path d="M0 92 L39 0 L61 0 L100 92 L80 92 L50 22 L20 92 Z" />
            </svg>
          ) : (
            char
          )}
        </span>
      ))}
    </div>
  );
}
