import Link from 'next/link';
import styles from './index.module.css';

type Props = {
  id?: string;
  kicker?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function ContactCTA({
  id = 'contact',
  kicker = 'CONTACT-お問い合わせ-',
  title = 'Canvasに相談しませんか？',
  description = 'ご相談・協業・講師依頼など、お気軽にお問い合わせください。',
  buttonLabel = 'お問い合わせ',
  buttonHref = '/contact',
}: Props) {
  return (
    <section id={id} aria-label="お問い合わせ" className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.kicker}>{kicker}</p>
        <div className={styles.inner}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{description}</p>
          </div>
          <div className={styles.actions}>
            <Link href={buttonHref} className={styles.button}>
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
