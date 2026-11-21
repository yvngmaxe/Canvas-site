import type { StaticImageData } from "next/image";
import pillar01 from "@/public/images/business/pillar-01-curriculum.jpg";
import pillar02 from "@/public/images/business/pillar-02-project.jpg";
import pillar03 from "@/public/images/business/pillar-03-field.jpg";
import torinomeLogo from "@/public/images/business/torinome-logo-p04.svg";

// 事業の4本柱のカード（1期末パンフレット p.4「学び手の『自分』から紡ぐ、4つの線。」より）
// 事業内容ページ（/business）で使う。押すと各柱のページ（/business/<id>）へ

export type PillarCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  /** ロゴなど、切らずに全体を見せたい画像は "logo" */
  imageKind?: "photo" | "logo";
  /** /business のカードの下のリンクの文字（なしなら「事例を見る」） */
  moreLabel?: string;
};

export const pillarCards: PillarCard[] = [
  {
    id: "curriculum",
    number: "01",
    title: "教材・カリキュラム開発",
    description: "探究的な学びの教材とカリキュラムをつくります。",
    image: pillar01,
    imageAlt: "教材とワークシート",
  },
  {
    id: "project",
    number: "02",
    title: "学びのプロジェクト企画運営",
    description:
      "学校・企業・地域・人をつなぎ、学びのプロジェクトを企画から当日の運営まで担います。",
    image: pillar02,
    imageAlt: "学びのプロジェクトの現場",
  },
  {
    id: "field",
    number: "03",
    title: "教育現場活動",
    description: "授業・講演・研修の現場に立ち、ファシリテーション等を行います。",
    image: pillar03,
    imageAlt: "授業・講演の様子",
  },
  {
    id: "rnd",
    number: "04",
    title: "研究開発（R&D）",
    description:
      "“学び”について多角的に研究し、人々の学びを支えるサービスを開発します。",
    image: torinomeLogo,
    imageAlt: "トリノメのロゴ",
    imageKind: "logo",
    // R&D の先はトリノメ（プロダクト）＋事例なので（本人判断 11/21）
    moreLabel: "プロダクト・事例を見る",
  },
];
