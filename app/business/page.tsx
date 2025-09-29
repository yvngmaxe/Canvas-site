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
      <PageLayout
        title="事業内容"
        subtitle="Business content"
        topPadding="compact"
      >
        <section className={styles.section} aria-labelledby="business-01">
          <header className={styles.header}>
            <p className={styles.kicker}>01</p>
            <div>
              <h2 id="business-01" className={styles.title}>
                小中高校生向けの探究学習プログラムの企画・運営
              </h2>
            </div>
          </header>
          <div className={styles.content}>
            <div className={styles.pointGrid}>
              <article className={styles.point}>
                <span className={styles.pointBadge}>WORK</span>
                <span className={styles.pointKicker}>[01]</span>
                <h3 className={styles.pointTitle}>
                  企業・団体の小中高生対象 学びプログラム企画運営のお手伝い
                  または弊社主導での企画運営
                </h3>
                <p className={styles.pointText}>
                  広島で子どもの学びや成長の一助となるイベントの企画を作り続けます。
                  <br />
                  様々な場所とテーマで{" "}
                  <span className={styles.textAccent}>継続的に</span>{" "}
                  探究活動を行うことで子どもの学びの幅、それに伴う感覚の幅を拡大
                  <br />
                  させ、柔軟で主体的に{" "}
                  <span className={styles.textAccent}>
                    学び、考えて、伝える力
                  </span>
                  (生きる力) を子どもの中に、{" "}
                  <span className={styles.textAccent}>それぞれの色</span>{" "}
                  で咲かせること
                  <br />
                  を目的とします。
                </p>
              </article>
              <article className={styles.point}>
                <span className={styles.pointKicker}>[02]</span>
                <h3 className={styles.pointTitle}>
                  すべての広島県民に学外学び情報を届けるプラットフォーム「iroiro」の運営
                </h3>
                <p className={styles.pointText}>
                  iroiroを通して広島に住む皆様がすべての学外まなびの場を見つけることができます。
                  <br />
                  作成したプログラムはiroiroの過去に蓄積され、未来でも生き続けます。
                  <br />
                  <span className={styles.textAccent}>
                    多くの人と多くのサービス、活動をiroiroを通して確実にマッチングさせます。
                  </span>
                </p>
              </article>
            </div>
          </div>
          <div className={styles.figureWide}>
            <Image
              src="/images/iroiro_relation.svg"
              alt="子ども・企業・地域をつなぐ関係図"
              fill
              className={styles.figureImage}
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="business-02">
          <header className={styles.header}>
            <p className={styles.kicker}>02</p>
            <div>
              <h2 id="business-02" className={styles.title}>
                総合的な学習の時間を活用した
                <br />
                キャリア教育カリキュラムの開発
              </h2>
            </div>
          </header>
          <div className={styles.content}>
            <div className={styles.pointGrid}>
              <article className={styles.point}>
                <span className={styles.pointBadge}>WORK</span>
                <span className={styles.pointKicker}>[01]</span>
                <h3 className={styles.pointTitle}>
                  講演等によるインプット型自己探求
                </h3>
              </article>
              <article className={styles.point}>
                <span className={styles.pointKicker}>[02]</span>
                <h3 className={styles.pointTitle}>
                  「特色型」総合的な学習の時間
                </h3>
                <p className={styles.pointText}>
                  短期長期・アントレプレナーシップ教育・探究学習、その地域や実施する学校の特色を幅広く生
                  <br />
                  かしたカリキュラムをご提案させていただきます。すべての学校が一様でなく、等しく存在する
                  <br />
                  「その学校にしかない価値」を柔軟に学べる総合的な学習の時間を活用して最大限に魅せる
                  <br />
                  ことを目的とします。
                  <br />
                  <br />
                  広島の学校が多くの文書等で書き記されている理想像と成り、全国に先駆けロールモデルとなる取り組みの一環です。
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
