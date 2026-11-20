"use client";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { Fragment, type ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import ctaStyles from "../styles/cta.module.css";
import ReframingText, { reframingHeading } from "../ReframingText";
import { pillarCards } from "../PillarCards/data";

type Props = {
  titleSmall?: string;
  titleLarge?: string;
  description?: string;
  features?: Feature[];
};

type Feature = {
  number: string;
  title: string;
  description: string;
  /** 「詳しく見る」の飛び先（事業内容ページの各節） */
  href: string;
  /** カードの写真（智也さんから素材が届いたら入れる。無いあいだは仮の枠を出す） */
  image?: StaticImageData | string;
  imageAlt?: string;
  /** ロゴなど、切らずに全体を見せたい画像は "logo" */
  imageKind?: "photo" | "logo";
};

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function LPcompany({
  titleSmall = "私たちは、すべての学び手の<br class='mobile-only-br'>キャンバスを共に描きだす",
  titleLarge = "キャリア教育の会社です。",
  description = "",
  features,
}: Props) {
  const featureList = features ?? defaultFeatures;

  return (
    <section className={styles.section} aria-labelledby="lpcompany-heading">
      <div className={styles.inner}>
        <motion.div
          className={styles.layout}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={variants}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.headingLabel}>ABOUT-US</p>
            <div className={styles.headingRow}>
              <h2 id="lpcompany-heading" className={styles.headingTitle}>
                会社紹介
              </h2>
              <div className={styles.headingLine} aria-hidden />
            </div>
          </div>

          <div className={styles.copy}>
            {/* 会社の一文 → Reframing の文章 → CANVASについて ボタン の順に縦 */}
            <div className={styles.aboutRow}>
              <div className={styles.intro}>
                <p className={styles.title} data-reveal>
                  <span
                    className={styles.titleSmall}
                    dangerouslySetInnerHTML={{
                      __html: titleSmall.replace(
                        highlightKeyword,
                        `<span class="${styles.titleHighlight}">${highlightKeyword}</span>`,
                      ),
                    }}
                  />
                  <span className={styles.titleLarge}>{titleLarge}</span>
                </p>
                {description && <p className={styles.text}>{description}</p>}
              </div>

              {/* 文章とボタンの段：広いPCではボタンを文章の右、最後の一文の高さに */}
              <div className={styles.reframingRow}>
                {/* CANVASについて（パンフ p.2 Reframing）の文章を全部。文章は components/ReframingText で /aboutus と共通 */}
                <div className={styles.reframing}>
                  <p className={styles.reframingLabel}>
                    <span className={styles.reframingLabelSmall}>LEARNING</span>
                    <span className={styles.reframingLabelLarge}>
                      Reframing
                    </span>
                  </p>
                  <h3 className={styles.reframingHeading}>
                    {reframingHeading}
                  </h3>
                  <div className={styles.reframingBody}>
                    <ReframingText />
                  </div>
                </div>

                {/* 会社紹介の続き（/aboutus）へ：PCは文章の右下、スマホは中央 */}
                <div className={styles.aboutLinkRow}>
                  <Link
                    href="/aboutus"
                    className={`${ctaStyles.primaryButton} ${styles.aboutLink}`}
                  >
                    CANVASについて
                  </Link>
                </div>
              </div>
            </div>

            {/* 4本柱のカードには「事業内容」の見出し（上の「会社紹介」と同じ作り） */}
            <div
              className={`${styles.sectionHeading} ${styles.serviceHeading}`}
            >
              <p className={styles.headingLabel}>SERVICE</p>
              <div className={styles.headingRow}>
                <h2 id="lpservice-heading" className={styles.headingTitle}>
                  事業内容
                </h2>
                <div className={styles.headingLine} aria-hidden />
              </div>
            </div>

            <div className={styles.features}>
              {featureList.map((feature) => (
                <article key={feature.number} className={styles.featureItem}>
                  {/* 写真：角丸の枠（内側の白い線はトリノメのロゴで見えないため4つともなし） */}
                  <div
                    className={`${styles.photoFrame} ${
                      feature.imageKind === "logo" ? styles.logoFrame : ""
                    }`}
                  >
                    {feature.image ? (
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt ?? feature.title}
                        sizes="(max-width: 640px) 90vw, 480px"
                        fill
                        className={
                          feature.imageKind === "logo"
                            ? styles.logo
                            : styles.photo
                        }
                      />
                    ) : (
                      <span className={styles.photoPlaceholder}>
                        写真が入ります
                      </span>
                    )}
                  </div>
                  <p className={styles.featureNumber}>{feature.number}</p>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                  <div className={styles.featureLinkDivider} aria-hidden />
                  <Link href={feature.href} className={styles.featureLink}>
                    <span className={styles.featureLinkLabel}>詳しく見る</span>
                    <span className={styles.featureLinkIcon} aria-hidden>
                      →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 事業の4本柱：事業内容ページのカードと同じデータ（components/PillarCards/data.ts）を使う。
// 「詳しく見る」は各柱のページ（/business/<id>）へ
const defaultFeatures: Feature[] = pillarCards.map((c) => ({
  number: c.number,
  title: c.title,
  description: c.description,
  href: `/business/${c.id}`,
  image: c.image,
  imageAlt: c.imageAlt,
  imageKind: c.imageKind,
}));

const highlightKeyword = "キャンバス";

function highlightKeywordInTitle(text: string): ReactNode {
  if (!text.includes(highlightKeyword)) return text;
  const parts = text.split(highlightKeyword);
  return parts.map((part, index) => (
    <Fragment key={`title-small-${index}`}>
      {part}
      {index < parts.length - 1 && (
        <span className={styles.titleHighlight}>{highlightKeyword}</span>
      )}
    </Fragment>
  ));
}
