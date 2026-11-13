import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";

// 事業内容ページ：1期末パンフレット p.4〜13 の「4本柱」に合わせた構成
// 文章はパンフレットの文面どおり（v1.2 の文章は Obsidian の content-v1.2.md に控えあり）

export const metadata: Metadata = {
  title: "事業内容 | 株式会社CANVAS",
  description:
    "株式会社CANVASの事業内容をご紹介します。教材・カリキュラム開発、学びのプロジェクト企画運営、教育現場活動、研究開発（R&D）の4つの柱で、人々の学びを支えています。",
};

type Meta = { label: string; value: string };

type Case = {
  title: string;
  target?: string; // 「〇〇 向け」
  catchCopy?: string;
  meta: Meta[];
  question?: string; // 問い
  body?: string[];
  points?: string[];
};

type Pillar = {
  id: string; // トップの「詳しく見る」の飛び先
  number: string;
  title: string;
  lead: string;
  target?: string;
  question?: string[]; // 1行ずつ（2行目はパンフのように右にずらす）
  canDo?: { label: string; text?: string }[];
  cases?: Case[];
};

const pillars: Pillar[] = [
  {
    id: "curriculum",
    number: "01",
    title: "教材・カリキュラム開発",
    lead: "授業で使う教材と、期間を通した学びの流れを設計・制作します。",
    target: "学習塾・民間教育事業者／広島の企業 向け", // パンフ p.5 右上
    canDo: [
      { label: "年間カリキュラム" },
      { label: "授業スライド" },
      { label: "ワークシート" },
      { label: "先生用の手引き" },
    ],
    cases: [
      {
        title: "キャリア探究講座",
        target: "学習塾・民間教育事業者／広島の企業 向け",
        catchCopy: "今日の学びが、いつの間にか『ジブンの中で』線になる。",
        meta: [
          { label: "主催", value: "エデュパーク（株式会社メリッツ）" },
          {
            label: "受託内容",
            value:
              "年間カリキュラムと毎月の教材の設計・制作、企業と連携したプロジェクトの企画",
          },
          {
            label: "対象・期間",
            value: "小学1〜6年生／2026年度（3月〜翌2月）",
          },
        ],
        question:
          "その体験は子どもたちに、将来引き出し可能な形の学びとして吸着しているか？",
      },
      {
        title: "AIはてなラボ",
        target: "学習塾・民間教育事業者／フリースクール／教育機関 向け",
        catchCopy: "AIを使いこなし、AIに問える人へ。",
        meta: [
          { label: "開発・保有", value: "株式会社CANVAS" },
          { label: "対象", value: "小学3〜6年生・中学生" },
          {
            label: "開講",
            value: "2027年度ローンチ、エデュパーク西条校で開講予定",
          },
          {
            label: "役割",
            value: "講座の企画、カリキュラム・教材の開発、授業",
          },
        ],
        question: "AI時代に、わたしには何ができるだろうか？",
      },
    ],
  },
  {
    id: "project",
    number: "02",
    title: "学びのプロジェクト企画運営",
    lead: "学校・企業・地域・人をつなぎ、学びのプロジェクトを企画から当日の運営まで担います。",
    target: "教育機関 向け", // パンフ p.7 右上
    canDo: [
      { label: "修学旅行・教育旅行のプログラム" },
      { label: "地域と学校をつなぐワークショップ" },
      { label: "大学生・起業家と出会うプログラム" },
      { label: "企画書・運営要項・協力者の手配" },
    ],
    cases: [
      {
        title: "修学旅行 起業家教育プログラム",
        target: "教育機関 向け",
        catchCopy: "起業家精神の軸上と出会い、対話する。",
        meta: [
          { label: "対象", value: "東京の私立中学校 2年生21名" },
          {
            label: "日時・会場",
            value: "2026年9月3日（10:00〜12:30）／広島大学 東広島キャンパス",
          },
          {
            label: "役割",
            value:
              "プログラムの企画、登壇者のコーディネート、当日のファシリテーション",
          },
        ],
        question: "その選択に、意志はあるか？",
      },
      {
        title: "大学生と一緒に大和町を発掘しよう！",
        target: "中山間地域の自治体・地域団体 向け",
        catchCopy: "「知っている場所」から「誇れる故郷」へ。",
        meta: [
          { label: "地域", value: "三原市大和町" },
          {
            label: "対象",
            value: "大和中学校・広島三育学院中学校の1〜3年生 約20名",
          },
          {
            label: "日程",
            value: "2026年2月11日 ワークショップ・3月27日 おせっかいマルシェ",
          },
          {
            label: "主催",
            value: "地域法人おせっかいさん　共催 株式会社CANVAS・三育学院",
          },
          {
            label: "役割",
            value: "ワークショップの企画・ファシリテーション、広島大学生の参加",
          },
        ],
        question: "手足の馴染む日常に、学びを見出せるか？",
      },
      {
        title: "問いほぐしプログラム",
        target: "教育機関 向け",
        catchCopy: "私的な熱に、時間をかけて迫る。",
        meta: [
          { label: "対象", value: "三原市立大和中学校 3年生28名" },
          {
            label: "日程",
            value: "2026年6月25日・26日 事前授業、6月29日 本番",
          },
          {
            label: "役割",
            value:
              "プログラムと教材の設計、当日のファシリテーション、大学生メンター5名のコーディネート",
          },
        ],
        question: "その学びに、私的な熱は宿っているか？",
      },
      {
        title: "PSIアントレプレナーシップ・フェスティバル 大学生プログラム",
        target: "企業／教育機関 向け",
        catchCopy:
          "「遊び心 × 起業家精神」ワクワクするプロジェクトを、仲間を見つけて共創しよう！",
        meta: [
          { label: "対象", value: "大学生・大学院生" },
          {
            label: "日時・会場",
            value: "2026年10月3日／TKPガーデンシティ広島駅前大橋",
          },
          { label: "主催", value: "Peace & Science Innovation（PSI）" },
          {
            label: "役割",
            value:
              "大学生プログラムの企画・設計、当日のツール制作、ファシリテーション、大学生の募集",
          },
        ],
        question: "なぜ今日ここに足を運んだのか？",
      },
    ],
  },
  {
    id: "field",
    number: "03",
    title: "教育現場活動",
    lead: "授業・講演・研修の現場に立ち、ファシリテーション等を行います。実際の学び手と対面し、学び手のキャリア段階に応じて、弾力を持った意図を練り直しながら伝えます。",
    target: "企業／教育機関 向け",
    question: ["想いはしなやかに、穏やかに、", "学び手の心へ伝えられるか？"],
    canDo: [
      {
        label: "講師派遣",
        text: "既存の教材やカリキュラムを用いて、授業の講師を務めます。",
      },
      {
        label: "講演",
        text: "中学生・高校生・大学生、保護者、大人に向けて話します。テーマの例は、キャリア、人生の学び、起業家精神家です。",
      },
      {
        label: "ファシリテーション",
        text: "授業や研修、対話の場で、参加者の考えを引き出す進行役を務めます。",
      },
    ],
    cases: [
      {
        title: "ひろしま協創中学校 社会人講演会「Kyoso Jr. View」",
        target: "講演",
        meta: [{ label: "対象・日程", value: "中学1〜3年生／2026年9月26日" }],
        body: [
          "講演テーマ「その選択に、意志はあるか」。",
          "第1部では、ライフストーリーを共有したうえで、起業家精神家とは何か、自分たちがワクワクする学びとは何かを、生徒と対話した。続いて、教育者として探究的な学びの設計の仕方をレクチャーし、生徒が実際にワクワクする探究プロジェクトを起案した。",
          "第2部では、アスリートや経営者、研究者などの講師陣と並び、中学生と保護者の前でシンポジウムに登壇した。中学生に伝えたのは、次の3つ。",
        ],
        points: [
          "自分に自信が持てないなら、今すぐ変わらないといけない",
          "責任を引き受ける",
          "毎日過度に自分に期待して、毎日それに応えること",
        ],
      },
      {
        title:
          "四条畷学園 キャリアデザイン授業「SNS・動画配信からみえてくる社会のしくみ」",
        target: "講師派遣",
        meta: [
          {
            label: "対象・日程",
            value: "高校3年生／2026年9〜11月 全7回（1日2コマ）",
          },
        ],
        body: [
          "株式会社Progressの金融教育教材「CASH」を用いて、授業の講師を務める。SNSマーケティング、動画配信サービス、スポーツと地域経済といった身近な題材から社会のしくみを読み解き、グループで企画して発表する。株式売買のシミュレーションとライフプランニングを通して、お金と自分の将来のつながりも考える。",
        ],
      },
      {
        title: "三原市立大和中学校 個人探究の中間報告会",
        target: "ファシリテーション",
        meta: [{ label: "対象・日程", value: "3年生 28名／2026年9月28日" }],
        body: [
          "大学生と一緒に教室に入り、生徒一人ひとりの探究の中間報告に立ち会う。生徒は探究の目的と今後の計画を発表し、大学生と意見を交わして次の一歩を考える。年の近い大学生と出会うことで、生徒が探究や学びそのものに、さまざまな刺激を受けることをねらった。",
        ],
      },
    ],
  },
  {
    id: "rnd",
    number: "04",
    title: "研究開発（R&D）",
    lead: "“学び”について多角的に研究し、人々の学びを支えるサービスを開発します。",
    target: "すべての学び手 向け",
  },
];

// 04 研究開発：自己探求AI「トリノメ」（パンフレット p.12）
const torinomeMeta: Meta[] = [
  { label: "予定", value: "2027年3月ローンチ予定" },
  {
    label: "実績",
    value: "公益財団法人ひろしまベンチャー育成基金 助成金 学生枠 採択",
  },
  { label: "研究", value: "広島大学 情報科学部の研究室で研究・論文執筆を並行" },
  {
    label: "使う場面",
    value:
      "高校の探究のテーマづくり、総合型選抜に向けた自己理解、その先の進路、働く意義のリフレーミングやキャリア形成など、「本当の自分」が起点となるポイント",
  },
];

const toihogushiText = [
  "問いほぐしとは、問いを立て、明確にし、洗練させていく営みである。私たちは何かを知ろうとするとき、すぐに答えを探しにいく。しかし、その前にある「何を、なぜ、どこから問うのか」という問いそのものは、意外と曖昧なまま置かれている。問いほぐしは、答えを出すことより先に、その問いに向き合う。探究が答えに向かって進む営みだとすれば、問いほぐしは、その探究の枠組みをつくり、組み替えていく営みである。",
  "実践は、今口にしている問いに、別の角度から問いを返すことから始まる。「星はなんでキラキラ輝いて見えるの？」と問う子どもに、「『輝く』って、どういう意味で聞いてる？」と確かめ返す。すると問いの前提が明らかになり、本当に知りたかったことが見えてくる。こうした問い返しは、人との対話の中でも、自分一人の中でも重ねることができる。",
  "問いほぐしを重ねると、曖昧だった物事を正確に、深く理解できるようになる。しかし、いちばん大きいのは、物の見方そのものが変わっていくことだ。人は誰でも、気づかないうちに固定観念を持っており、それは自分一人ではなかなか振り返れない。問いほぐしは、唯一だと思い込んでいた見方を、「いくつもある見方の一つ」として捉え直させてくれる。これを「固定観念の中性化」と呼ぶ。",
  "人生の探究には、決まった答えがない。どんな道に進むのか、なぜ働くのか、どう生きたいのか。その問いが借りてきた言葉や固定観念のままでは、積み重ねる経験は自分の学びとして吸着していかない。問いを自分の言葉へ磨き直すたびに、見方が広がり、本当の願いに一歩ずつ近づいていく。それは子どもにも、生き方を問い直す大人にも、等しく開かれている。",
];

export default function BusinessPage() {
  return (
    <div className="page">
      <PageLayout
        title="SERVICE"
        subtitle="事業内容"
        topPadding="compact"
        decorated
      >
        {/* 4本柱へのページ内リンク */}
        <nav className={styles.pillarNav} aria-label="事業の4つの柱">
          {pillars.map((p) => (
            <a key={p.id} href={`#${p.id}`} className={styles.pillarNavItem}>
              <span className={styles.pillarNavNumber}>{p.number}</span>
              <span className={styles.pillarNavTitle}>{p.title}</span>
            </a>
          ))}
        </nav>

        {pillars.map((pillar) => (
          <section
            key={pillar.id}
            id={pillar.id}
            className={styles.section}
            aria-labelledby={`${pillar.id}-title`}
          >
            {/* パンフレットと同じ「赤い帯」の見出し */}
            <header className={styles.band}>
              <p className={styles.kicker}>{pillar.number}</p>
              <div className={styles.headerBody}>
                <h2 id={`${pillar.id}-title`} className={styles.title}>
                  {pillar.title}
                </h2>
                <p className={styles.lead}>{pillar.lead}</p>
                {/* 01・02 の「できること」はパンフと同じく帯の中に */}
                {pillar.canDo && !pillar.canDo.some((c) => c.text) && (
                  <ul className={styles.bandTags} aria-label="できること">
                    {pillar.canDo.map((c) => (
                      <li key={c.label} className={styles.bandTag}>
                        {c.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {pillar.target && (
                <span className={styles.targetPill}>{pillar.target}</span>
              )}
            </header>

            {pillar.question && <BigQuestion lines={pillar.question} />}

            {/* 03 の「できること」（説明つき）は帯の下に3列で */}
            {pillar.canDo && pillar.canDo.some((c) => c.text) && (
              <div className={styles.block}>
                <h3 className={styles.blockHeading}>できること</h3>
                <ul className={styles.canDoGrid}>
                  {pillar.canDo.map((c) => (
                    <li key={c.label} className={styles.canDoItem}>
                      <span className={styles.tag}>{c.label}</span>
                      {c.text && <p className={styles.canDoText}>{c.text}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {pillar.id === "rnd" && <Torinome />}

            {pillar.cases && (
              <div className={styles.block}>
                <h3 className={styles.blockHeading}>事例</h3>
                <div
                  className={`${styles.caseGrid} ${
                    pillar.id === "field" ? styles.caseGridFeature : ""
                  }`}
                >
                  {pillar.cases.map((c) => (
                    <CaseCard key={c.title} item={c} />
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}

        <div className={styles.moreLinks}>
          <Link href="/achievements" className={styles.moreButton}>
            実績をもっと見る
          </Link>
        </div>
      </PageLayout>
    </div>
  );
}

function BigQuestion({ lines }: { lines: string[] }) {
  return (
    <p className={styles.bigQuestion}>
      {lines.map((line, i) => (
        <span
          key={line}
          className={i > 0 ? styles.bigQuestionShift : undefined}
        >
          {line}
        </span>
      ))}
    </p>
  );
}

function CaseCard({ item }: { item: Case }) {
  return (
    <article className={styles.caseCard}>
      {item.target && <span className={styles.caseTarget}>{item.target}</span>}
      <h4 className={styles.caseTitle}>{item.title}</h4>
      {item.catchCopy && <p className={styles.caseCatch}>{item.catchCopy}</p>}
      <dl className={styles.metaList}>
        {item.meta.map((m) => (
          <div key={m.label} className={styles.metaRow}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>
      {item.question && (
        <p className={styles.caseQuestion}>
          <span className={styles.questionLabel}>問い</span>
          {item.question}
        </p>
      )}
      {item.body?.map((t) => (
        <p key={t} className={styles.caseBody}>
          {t}
        </p>
      ))}
      {item.points && (
        <ul className={styles.pointList}>
          {item.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

function Torinome() {
  return (
    <div className={styles.torinome}>
      <div className={styles.torinomeTop}>
        <div className={styles.torinomeMain}>
          <div className={styles.torinomeHead}>
            <p className={styles.torinomeKicker}>自己探求AI</p>
            <h3 className={styles.torinomeTitle}>
              「トリノメ」
              <span className={styles.torinomeSub}>（問いほぐしAI）</span>
            </h3>
            <p className={styles.torinomeCatch}>
              AIが答えを出す時代に、自分だけの種火を描く。
            </p>
          </div>

          <dl className={styles.metaList}>
            {torinomeMeta.map((m) => (
              <div key={m.label} className={styles.metaRow}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>

          <p className={styles.questionLabel}>問い</p>
          <BigQuestion
            lines={["あなたが、", "心からやりたいことは何ですか？"]}
          />
        </div>

        {/* パンフレット 図1「問いほぐしの層」 */}
        <figure className={styles.layers}>
          <div className={styles.layerOuter}>
            <span className={styles.layerOuterLabel}>どこかで聞いた言葉</span>
            <div className={styles.layerMiddle}>
              <span className={styles.layerMiddleLabel}>
                言いかけていること
              </span>
              <div className={styles.layerCore}>核</div>
            </div>
          </div>
          <figcaption className={styles.layersCaption}>
            <span className={styles.layersCore}>核</span>
            ：まだ言葉になっていない大切な価値観
            <br />
            図1　問いほぐしの層
          </figcaption>
        </figure>
      </div>

      <div className={styles.block}>
        <h4 className={styles.blockHeading}>問いほぐしとは</h4>
        <div className={styles.longText}>
          {toihogushiText.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <p>
            <strong>
              問いほぐしは、人が一生をかけて学び続けるための、問いの手入れである。
            </strong>
          </p>
        </div>
        <p className={styles.source}>
          出典：佐藤邦政『善い学びとはなにか：〈問いほぐし〉と〈知の正義〉の教育哲学』新曜社、2019年
        </p>
      </div>

      {/* パンフレット 図2「答えを渡すAI／問いを返すAI」 */}
      <figure className={styles.compare}>
        <figcaption className={styles.compareCaption}>
          答えを渡すAI／問いを返すAI
        </figcaption>
        <div className={styles.compareRow}>
          <span className={styles.compareFrom}>生徒の相談</span>
          <span className={styles.compareArrow} aria-hidden>
            →
          </span>
          <span className={styles.compareMid}>
            一般的な生成AI：候補を並べる
          </span>
          <span className={styles.compareArrow} aria-hidden>
            →
          </span>
          <span className={styles.compareTo}>「AIが出した答え」</span>
        </div>
        <div className={`${styles.compareRow} ${styles.compareRowAccent}`}>
          <span className={styles.compareFrom}>生徒の相談</span>
          <span className={styles.compareArrow} aria-hidden>
            →
          </span>
          <span className={styles.compareMid}>トリノメ：問いを返す</span>
          <span className={styles.compareArrow} aria-hidden>
            →
          </span>
          <span className={styles.compareTo}>「あなたの答え」</span>
        </div>
      </figure>
    </div>
  );
}
