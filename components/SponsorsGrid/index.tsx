import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import styles from "./index.module.css";

export type Sponsor = {
  name: string;
  logo: string; // public path or remote URL
  url?: string;
  kidsPower?: number;
  description?: string;
  profilePath?: string;
};

type Props = {
  sponsors: Sponsor[];
  leadText?: string;
  mobileLeadBreakAfter?: string;
};

export default function SponsorsGrid({ sponsors, leadText, mobileLeadBreakAfter }: Props) {
  const renderLead = () => {
    if (!leadText) return null;

    if (mobileLeadBreakAfter) {
      const index = leadText.indexOf(mobileLeadBreakAfter);
      if (index !== -1) {
        const splitPoint = index + mobileLeadBreakAfter.length;
        const firstPart = leadText.slice(0, splitPoint);
        const rest = leadText.slice(splitPoint);

        return (
          <p className={styles.lead}>
            {firstPart}
            {rest && <span className={styles.mobileLeadNewLine}>{rest}</span>}
          </p>
        );
      }
    }

    return <p className={styles.lead}>{leadText}</p>;
  };

  // Flat grid with optional lead text rendered above the grid
  return (
    <div>
      {renderLead()}
      <div className={styles.grid}>
        {sponsors.map((s) => (
          <Card key={s.name} sponsor={s} />
        ))}
      </div>
    </div>
  );
}

function Card({ sponsor }: { sponsor: Sponsor }) {
  const kidsPower = sponsor.kidsPower ?? 0;
  const hasDescription = Boolean(sponsor.description);

  const content = (
    <article className={styles.card}>
      <div className={`${styles.cardSection} ${styles.infoSection}`}>
        <span className={styles.infoLabel}>Sponsor</span>
        <h4 className={styles.name}>{sponsor.name}</h4>
      </div>
      <div className={`${styles.cardSection} ${styles.logoSection}`}>
        <div className={styles.logoWrap}>
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            fill
            className={styles.logoImg}
            sizes="(max-width: 640px) 60vw, 25vw"
          />
        </div>
      </div>
      {hasDescription && (
        <div className={`${styles.cardSection} ${styles.textSection}`}>
          <p className={styles.description}>{sponsor.description}</p>
        </div>
      )}
      <div className={`${styles.cardSection} ${styles.powerSection}`}>
        <div className={styles.powerBadge}>
          <div className={styles.powerHeader}>
            <span className={styles.powerChip}>Kids Power</span>
          </div>
          <div className={styles.powerValueRow}>
            <FaHeart className={styles.powerIcon} aria-hidden="true" />
            <div className={styles.powerDigits}>
              <span className={styles.powerLabel}>キッズパワー</span>
              <div className={styles.powerValueGroup}>
                <span className={styles.powerValue}>{kidsPower}</span>
                <span className={styles.powerUnit}>pt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  const linkHref = sponsor.profilePath || sponsor.url;
  if (linkHref) {
    const isExternal = !sponsor.profilePath && Boolean(sponsor.url);
    return (
      <Link
        href={linkHref}
        className={styles.cardLink}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={`${sponsor.name} の詳細`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
