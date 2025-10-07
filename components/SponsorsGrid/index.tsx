import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import styles from "./index.module.css";

export type Sponsor = {
  name: string;
  logo: string; // public path or remote URL
  url?: string;
  kidsPower?: number;
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
  const content = (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.logoWrap}>
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            fill
            className={styles.logoImg}
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        </div>
        <div className={styles.powerBox}>
          <div
            className={styles.heartBadge}
            aria-label={`キッズパワー ${sponsor.kidsPower ?? 0}`}
          >
            <FaHeart className={styles.heartIconLarge} aria-hidden="true" />
            <span className={styles.heartValue}>{sponsor.kidsPower ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (sponsor.url) {
    return (
      <Link
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={sponsor.name}
      >
        {content}
        <div className={styles.name}>{sponsor.name}</div>
      </Link>
    );
  }
  return (
    <div>
      {content}
      <div className={`${styles.name} ${styles.muted}`}>{sponsor.name}</div>
    </div>
  );
}
