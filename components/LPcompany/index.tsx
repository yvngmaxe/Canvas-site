"use client";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { Fragment, type ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import ctaStyles from "../styles/cta.module.css";
import pillar01 from "@/public/images/business/pillar-01-curriculum.jpg";
import pillar02 from "@/public/images/business/pillar-02-project.jpg";
import pillar03 from "@/public/images/business/pillar-03-field.jpg";
import torinomeLogo from "@/public/images/business/torinome-logo-p04.svg";

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
            <div className={styles.intro}>
              <p className={styles.title} data-reveal>
                <span 
                  className={styles.titleSmall}
                  dangerouslySetInnerHTML={{ 
                    __html: titleSmall
                      .replace(highlightKeyword, `<span class="${styles.titleHighlight}">${highlightKeyword}</span>`)
                  }}
                />
                <span className={styles.titleLarge}>{titleLarge}</span>
              </p>
              <p className={styles.text}>{description}</p>
              {/* 会社紹介の続き（/aboutus）へ */}
              <Link href="/aboutus" className={`${ctaStyles.primaryButton} ${styles.aboutLink}`}>
                CANVASについて
              </Link>
            </div>

            {/* 4本柱のカードには「事業内容」の見出し（上の「会社紹介」と同じ作り） */}
            <div className={`${styles.sectionHeading} ${styles.serviceHeading}`}>
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
                  {/* 写真：前の右側の写真と同じく、角丸＋少し内側に白い線 */}
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
                          feature.imageKind === "logo" ? styles.logo : styles.photo
                        }
                      />
                    ) : (
                      <span className={styles.photoPlaceholder}>写真が入ります</span>
                    )}
                    <div className={styles.photoAccent} aria-hidden />
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

// 事業の4本柱（1期末パンフレット p.4「学び手の「自分」から紡ぐ、4つの線。」より）
// 「詳しく見る」は事業内容ページの各節へ。節の id は事業内容ページを作り直すときに付ける
const defaultFeatures: Feature[] = [
  {
    number: "01",
    title: "教材・カリキュラム開発",
    description: "探究的な学びの教材とカリキュラムをつくります。",
    href: "/business#curriculum",
    image: pillar01,
    imageAlt: "教材とワークシート",
  },
  {
    number: "02",
    title: "学びのプロジェクト企画運営",
    description:
      "学校・企業・地域・人をつなぎ、学びのプロジェクトを企画から当日の運営まで担います。",
    href: "/business#project",
    image: pillar02,
    imageAlt: "学びのプロジェクトの現場",
  },
  {
    number: "03",
    title: "教育現場活動",
    description: "授業・講演・研修の現場に立ち、ファシリテーション等を行います。",
    href: "/business#field",
    image: pillar03,
    imageAlt: "授業・講演の様子",
  },
  {
    number: "04",
    title: "研究開発（R&D）",
    description:
      "“学び”について多角的に研究し、人々の学びを支えるサービスを開発します。",
    href: "/business#rnd",
    image: torinomeLogo,
    imageAlt: "トリノメのロゴ",
    imageKind: "logo",
  },
];

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
