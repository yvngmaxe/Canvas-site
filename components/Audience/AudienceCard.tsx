import styles from "./index.module.css";

type AudienceCardProps = {
  title: string;
  text: string;
  href: string;
};

export default function AudienceCard({ title, text, href }: AudienceCardProps) {
  return (
    <a className={styles.audience__item} href={href}>
      <h3 className={styles.audience__heading}>{title}</h3>
      <p className={styles.audience__text}>{text}</p>
    </a>
  );
}
