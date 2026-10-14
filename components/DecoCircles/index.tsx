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

// 下層ページの丸：濃い色の小さい丸（赤・黄）。page は4つ、compact は2つ
const pageDots = [
  { key: "pageDot1", color: "pageDotYellow" },
  { key: "pageDot2", color: "pageDotRed" },
  { key: "pageDot3", color: "pageDotYellow" },
  { key: "pageDot4", color: "pageDotRed" },
] as const;

type Letter = { char: string; key: string; chevron: boolean };

// 背景に散らす「C・A・N・V・A・S」の文字（装飾のみ）
// A はロゴと同じ、横棒のない山形の図形で描く
const homeLetters: Letter[] = [
  { char: "C", key: "C", chevron: false },
  { char: "A", key: "A1", chevron: true },
  { char: "N", key: "N", chevron: false },
  { char: "V", key: "V", chevron: false },
  { char: "A", key: "A2", chevron: true },
  { char: "S", key: "S", chevron: false },
];

// 下層ページは CANVAS 全部ではなく、数を絞って置く
const pageLetters: Letter[] = [
  { char: "C", key: "C", chevron: false },
  { char: "A", key: "A", chevron: true },
  { char: "S", key: "S", chevron: false },
];

const compactLetters: Letter[] = [
  { char: "A", key: "A", chevron: true },
  { char: "S", key: "S", chevron: false },
];

type Props = {
  // home: トップページ用 / page: 長い下層ページ用 / compact: 短い下層ページ用
  variant?: "home" | "page" | "compact";
};

export default function DecoCircles({ variant = "home" }: Props) {
  const isHome = variant === "home";
  const layerClass =
    variant === "compact" ? `${styles.layer} ${styles.compact}` : styles.layer;
  const letters = isHome
    ? homeLetters
    : variant === "compact"
      ? compactLetters
      : pageLetters;
  const dots = variant === "compact" ? pageDots.slice(0, 2) : pageDots;

  return (
    <div className={layerClass} aria-hidden="true">
      {isHome
        ? homeShapes.map((shape) => (
            <span key={shape} className={`${styles.shape} ${styles[shape]}`} />
          ))
        : dots.map(({ key, color }) => (
            <span
              key={key}
              className={`${styles.pageDot} ${styles[color]} ${styles[key]}`}
            />
          ))}
      {letters.map(({ char, key, chevron }) => (
        <span
          key={key}
          className={
            isHome
              ? `${styles.letter} ${styles[`letter${key}`]}`
              : `${styles.letter} ${styles.pageLetter} ${styles[`pageLetter${key}`]}`
          }
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
