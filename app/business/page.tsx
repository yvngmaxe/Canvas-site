import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";

const diagramItems = [
  {
    id: "diagram-01",
    image: "/images/content_1.svg",
    alt: "探究コミュニティの関係図",
    label: "探究授業",
    subtitle: "　　〜向かうべき目的を見つけ出す授業",
    lines: [
      "情報の収集・分析、論理的な思考、そして得られ",
      "た結論を他者に伝える表現力を養うことが目標で",
      "す。このプロセスを通じて、生徒は自分の価値観",
      "や社会とのつながりを再認識し、将来に向けて進",
      "むべき方向性、つまり「目的」を自ら見出す力を",
      "獲得します。これは、キャリアを形成する上で不",
      "可欠な、自己理解と客観的な社会認識を深めるた",
      "めの教育です。",
    ],
  },
  {
    id: "diagram-02",
    image: "/images/content_1.svg",
    alt: "学びの循環モデル",
    label: "アントレプレナーシップ教育",
    subtitle: "　　〜目的に向かう道を切り拓く授業",
    lines: [
      "失敗を恐れず挑戦する精神、粘り強くやり遂げる",
      "力、そして社会の変化を前向きに捉える姿勢を育",
      "みます。また、「稼ぐ力」や「金融教育」といっ",
      "た要素も含まれ、社会における価値創造の仕組み",
      "や、お金の流れを理解する実践的な学びを提供し",
      "ます。未来の不確実な社会を生き抜くための、自",
      "立した行動力と創造性を身につけるための教育で",
      "す。",
    ],
  },
];

export default function BusinessPage() {
  return (
    <div className="page">
      <PageLayout title="SERVICE" subtitle="事業内容" topPadding="compact">
        <section className={styles.section} aria-labelledby="business-01">
          <header className={styles.header}>
            <p className={styles.kicker}>01</p>
            <div>
              <h2 id="business-01" className={styles.title}>
                教育事業
              </h2>
            </div>
          </header>
          <div className={styles.content}>
            <div className={styles.pointGrid}>
              <article className={styles.point}>
                <span className={styles.pointBadge}>WORK</span>
                <span className={styles.pointKicker}>[01]</span>
                <h3 className={styles.pointTitle}>
                  小学生、中学生、高校生等を対象としたキャリア教育事業
                </h3>
                <p className={`${styles.pointText} ${styles.pointTextCompact}`}>
                  「ひろしま子ども推し新聞」プロジェクトを通して、お金を稼ぐ仕事の本質や地域社会
                  <br />
                  への視線を自主的に養う活動（小学生〜高校生対象）を実施します。
                  <br />
                  その他、子どもの越境のためのイベントや授業を各地で実施します。
                </p>
              </article>
              <article className={styles.point}>
                <span className={styles.pointKicker}>[02]</span>
                <h3 className={styles.pointTitle}>
                  学校における総合的な探究の時間に関するプログラムの作成・提供
                </h3>
                <p className={styles.pointText}>
                  短期長期・アントレプレナーシップ教育・探究学習、その地域や実施する学校の特色を幅広く生かしたカリキュラムをご提案させていただきます。
                  すべての学校が一様でなく、等しく存在する「その学校にしかない価値」を柔軟に学べる総合的な学習の時間を活用して最大限に魅せることを目指します。
                  <br />
                  提携する学校が多くの文書等で書き記されているような理想像と成り、全国に先駆けキャリア教育推進のロールモデルとなる取り組みの一環です。
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="business-02">
          <header className={styles.header}>
            <p className={styles.kicker}>02</p>
            <div>
              <h2 id="business-02" className={styles.title}>
                プロジェクト・イベント企画運営事業
              </h2>
            </div>
          </header>
          <div className={styles.content}>
            <div className={styles.pointGrid}>
              <article className={styles.point}>
                <span className={styles.pointBadge}>WORK</span>
                <span className={styles.pointKicker}>[01]</span>
                <h3 className={styles.pointTitle}>
                  企業のCSR活動の一環としての次世代育成向けプロジェクト、イベントの企画および運営
                </h3>
                <p className={`${styles.pointText} ${styles.pointTextCompact}`}>
                  企業の社会的責任（CSR）活動として、未来を担う子どもたちの自由な成長や学
                  習を支援するためのプロジェクトやイベントを企画・実行します。環境問題、科学技術、伝統文化など、企業の専門性やリソースを活かした体験型の越境学習の機会を提供することで、持続可能な社会の実現に貢献する人材の育成や地元企業が地元の子どもに夢を与えることを目指します。
                </p>
              </article>
              <article className={styles.point}>
                <span className={styles.pointKicker}>[02]</span>
                <h3 className={styles.pointTitle}>
                  企業または地域プロモーションを目的としたプロジェクト、イベントの企画および運営
                </h3>
                <p className={`${styles.pointText} ${styles.pointTextCompact}`}>
                  企業や地域の魅力を最大限に引き出し、ターゲット層への認知度と関心度を飛躍的に高めるプロジェクト、イベントを立案・実施します。集客増、購買意欲向上、ブランド価値の確立に直結する企画、運営を行うことで、企業価値の向上や地域活性化に貢献します。以上の活動を子どもを効果的に巻き込むことで単なるプロモーションではなく、教育的に意義のある、次世代人材を育てるものにします。
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className={styles.diagramSection}
          aria-labelledby="business-diagrams"
        >
          <figure className={styles.diagramFigureWide}>
            <Image
              src="/images/content_1.svg"
              alt="事業全体の関係図"
              fill
              className={styles.diagramImage}
              sizes="(max-width: 768px) 100vw, 960px"
            />
          </figure>
          <div className={styles.diagramTextGrid}>
            {diagramItems.map((item) => (
              <article key={item.id} className={styles.diagramCard}>
                <span className={styles.diagramKicker}>{item.label}</span>
                {item.subtitle && (
                  <p className={styles.diagramSubtitle}>{item.subtitle}</p>
                )}
                <div className={styles.diagramBody}>
                  {item.lines.map((line, index) => (
                    <p key={index} className={styles.diagramText}>
                      {line}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </PageLayout>
    </div>
  );
}
