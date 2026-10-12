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

export default function DecoCircles() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {shapes.map((shape) => (
        <span key={shape} className={`${styles.shape} ${styles[shape]}`} />
      ))}
    </div>
  );
}
