"use client";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { Fragment, type ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import ctaStyles from "../styles/cta.module.css";
import defaultVisual from "@/public/images/aboutcompany.jpg";

type Props = {
  titleSmall?: string;
  titleLarge?: string;
  description?: string;
  image?: StaticImageData | string;
  imageAlt?: string;
  features?: Feature[];
};

type Feature = {
  title: string;
  description: string;
  action?: FeatureLink;
  links?: FeatureLink[];
};

type FeatureLink = {
  label: string;
  href: string;
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
  titleSmall = "私たちは、すべての学び手のキャンバスを共に描きだす",
  titleLarge = "キャリア教育の会社です。",
  description = "",
  image = defaultVisual,
  imageAlt = "LPcompany visual",
  features,
}: Props) {
  const featureList = features ?? defaultFeatures;
  const highlightedTitleSmall = highlightKeywordInTitle(titleSmall);

  return (
    <section className={styles.section} aria-labelledby="lpcompany-heading">
      <div className={styles.inner}>
        <motion.div
          className={styles.layout}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
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
                <span className={styles.titleSmall}>
                  {highlightedTitleSmall}
                </span>
                <span className={styles.titleLarge}>{titleLarge}</span>
              </p>
              <p className={styles.text}>{description}</p>
            </div>

            <div className={styles.features}>
              {featureList.map((feature, index) => {
                const featureLinks = feature.links ?? defaultFeatureLinks;
                const actionLink =
                  feature.action ?? defaultFeatureActions[index] ?? null;
                return (
                  <article key={feature.title} className={styles.featureItem}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                    <div className={styles.featureLinkDivider} aria-hidden />
                    <div className={styles.featureLinks}>
                      {featureLinks.map((link) => {
                        const isServiceLink = link.label === "サービス紹介";
                        if (isServiceLink) {
                          return (
                            <span
                              key={`${feature.title}-${link.label}`}
                              className={`${styles.featureLink} ${styles.featureLinkDisabled}`}
                              aria-disabled="true"
                            >
                              <span className={styles.featureLinkLabel}>
                                {link.label}
                              </span>
                              <span
                                className={styles.featureLinkIcon}
                                aria-hidden
                              >
                                →
                              </span>
                            </span>
                          );
                        }
                        return (
                          <Link
                            key={`${feature.title}-${link.label}`}
                            href={link.href}
                            className={styles.featureLink}
                          >
                            <span className={styles.featureLinkLabel}>
                              {link.label}
                            </span>
                            <span
                              className={styles.featureLinkIcon}
                              aria-hidden
                            >
                              →
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    {actionLink && (
                      <Link
                        href={actionLink.href}
                        className={`${ctaStyles.primaryButton} ${styles.featureButton}`}
                      >
                        {actionLink.label}
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.photoFrame}>
              <Image
                src={image}
                alt={imageAlt}
                sizes="(max-width: 900px) 90vw, 420px"
                fill
                className={styles.photo}
                priority={false}
              />
              <div className={styles.photoAccent} aria-hidden />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const defaultFeatures: Feature[] = [
  {
    title: "イベント･プロジェクト",
    description:
      "学び手の越境体験(昨日まで知らなかった、触れたことのなかったものに出会う体験)を創出するイベントや、キャリア教育に関するプロジェクトの企画・運営を行います。",
  },
  {
    title: "講師･ファシリテーター",
    description:
      "各種イベント/セミナー/授業でのポジティブなインプットを実現する「探究的な」ファシリテーターを行います。また、各種講演等を行います。",
  },
  {
    title: "教材カリキュラム",
    description:
      "キャリア教育に関するカリキュラム/教材の開発を行います。定性的な「学びのエンジン」をデータ分析を用いてロジカルに、かつ愛をもって美しく学び手の心に届けます。",
  },
];

const defaultFeatureLinks: FeatureLink[] = [
  {
    label: "サービス紹介",
    href: "/business",
  },
  {
    label: "事例紹介",
    href: "/achievements",
  },
];

const defaultFeatureActions: FeatureLink[] = [
  {
    label: "会社紹介",
    href: "/aboutus",
  },
  {
    label: "会社概要",
    href: "/company",
  },
  {
    label: "お問い合わせ",
    href: "/contact",
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
