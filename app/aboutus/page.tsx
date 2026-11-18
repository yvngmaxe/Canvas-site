import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";
import ctaStyles from "@/components/styles/cta.module.css";

// CANVASについて：1期末パンフレット p.2（Reframing）・p.3（Message）・p.4 上（4つの線）に合わせた構成
// v1.2 の文章（「自分の人生に確信を持つキャリア教育」）は Obsidian の content-v1.2.md に控えあり

export const metadata: Metadata = {
  title: "CANVASについて | 株式会社CANVAS",
  description:
    "人生を、学びとして捉えてみる。株式会社CANVASが大切にしている学びの考え方「マイキャンバス」と、学び手の「自分」から紡ぐ4つの線をご紹介します。",
};

/* パンフの赤字（強調） */
function Em({ children }: { children: ReactNode }) {
  return <strong className={styles.em}>{children}</strong>;
}

/* 縦書きの詩：1行＝1列（右から左へ読む） */
function Poem({
  lines,
  className = "",
}: {
  lines: { text: string; big?: boolean; gapBefore?: boolean }[];
  className?: string;
}) {
  return (
    <p className={`${styles.poem} ${className}`}>
      {lines.map((l) => (
        <span
          key={l.text}
          className={`${styles.poemLine} ${l.big ? styles.poemBig : ""} ${
            l.gapBefore ? styles.poemGap : ""
          }`}
        >
          {l.text}
        </span>
      ))}
    </p>
  );
}

// p.4「学び手の『自分』から紡ぐ、4つの線。」
const lines4 = [
  {
    title: "自分から",
    tone: styles.lineSelf,
    text: "自分が何を大切にしているかに気づく。ジブンという輪郭の内と外を行き来しながら、自分が生きる北極星を探す。",
  },
  {
    title: "人へ",
    tone: styles.linePeople,
    text: "学びの中で、さまざまな人と出会い、対話を重ねる。人から受け取り、人に手渡し、人とつながりながら生きていく。その往復の中で、新しい世界と、新しい自分に出会う。",
  },
  {
    title: "土地へ",
    tone: styles.lineLand,
    text: "学びの中で新しい土地と出会い、その土地に溶け込んでいく。土地から学び、土地に自らの学びを返し、学びによって土地の未来を切り拓く。",
  },
  {
    title: "未来へ",
    tone: styles.lineFuture,
    text: "学びが、未来をつくる。ワクワクしながら未来を思い描き、そこへ自分を引き寄せていく中で、また新しい学びと出会う。自分の未来も、人の未来も、土地の未来も、すべては「自分」という生き方の軸線上にある。それらが心地よく響きあう世界を探す学び手とともに。",
  },
];

export default function AboutUsPage() {
  return (
    <div className="page">
      <PageLayout title="ABOUT CANVAS" subtitle="CANVASについて" decorated="compact">
        <div className={styles.wrap}>
          {/* ───────── p.2 LEARNING Reframing ───────── */}
          <section className={styles.section} aria-labelledby="reframing-title">
            <p className={styles.label}>
              <span className={styles.labelSmall}>LEARNING</span>
              <span className={styles.labelLarge}>Reframing</span>
            </p>
            <h2 id="reframing-title" className={styles.heading}>
              人生を、学びとして捉えてみる。
            </h2>

            <div className={styles.withPoem}>
              <div className={styles.prose}>
                <p>
                  学びは、教室の中だけにあるものではありません。働くこと、暮らすこと、人と出会うこと、知らない土地を歩くこと。
                  <Em>生きるすべての活動の中に、学びはあります。</Em>
                  これまで「学び」として数えられてこなかった経験の種も、捉え直せば、その人を育てる学びになる。私たちは、その種を、教育をデザインするための資源にしています。
                </p>
                <p>
                  そして学びは、機会として与えられたその時間だけで終わるものではありません。授業や研修が終わったあとも、学びは静かに流れ続けます。ある日ふと思い出されて次の選択を支え、ときには手放され、また描き直されていく。
                  <br />
                  <Em>学びの本当の価値は、その時間のあとに続いていく流れの中にあります。</Em>
                </p>
                <p>
                  だから私たちは、「正解は〇〇です」と教え込むことはしません。
                  <br />
                  「君はどう思う？」と問い続けます。
                  <br />
                  問いは学び手の中から立ち上がり、心が動いたとき、人は理解から自分ごとへ、そして心からのアウトプットへと、生きるように学びはじめます。
                </p>
                <p>学び手は、子どもだけではありません。働く人も、地域で暮らす人も、企業も。</p>
                <p>
                  <Em>生きるすべての人が、学びを受け取る人であり、学びをつくる当人です。</Em>
                </p>
              </div>

              <Poem
                className={styles.poemReframing}
                lines={[
                  { text: "揺らぎのある未来に向かって歩いていく", big: true },
                  { text: "私たちに、できることはなんだろう。", big: true },
                ]}
              />
            </div>
          </section>

          {/* ───────── p.3 LEARNING Message ───────── */}
          <section className={styles.section} aria-labelledby="message-title">
            <p className={styles.label} id="message-title">
              <span className={styles.labelSmall}>LEARNING</span>
              <span className={styles.labelLarge}>Message</span>
            </p>

            <div className={`${styles.prose} ${styles.proseColumns}`}>
              <p>
                毎日進化する人工知能。1年後には見られなくなるかもしれない、愛すべき自然の景色。人々の心のつながりをつくり続けてきた文化。生まれ続ける仕事と、消えてゆく仕事。私たちが生きていくこの先には、もっと大きな変化や、まだ誰も知らない世界が待っています。
              </p>
              <p>
                子どもも、大人も、みんなが学び手です。そんな未来に臨む学び手たちが、道に迷わないように。自分の頭と力で道を切り拓けるように。堂々と「この道に進みたい」と奮い立てるように。揺らぎのある世の中で、ただ一つだけ信じ続けられる「ジブン」でいられるように。いま必要なのは、人々の「人生の学び」を支えるキャリア教育です。
              </p>
              <p>人生の学びは、自分と「他」とのあいだを、何度も行き来しながら進んでいきます。</p>
              <p>
                まず、外へ出る。知らないものや人と関わり、自分では考えたことのなかった考えにふれ、居心地のよくない未知の場所へ、身体ごと飛び込んでみる。
              </p>
              <p>
                次に、動く。そのときの自分に出せるいちばんの答えを「仮の答え」として持ち、それを根拠に動いてみる。
              </p>
              <p>
                そして、ふり返る。動いたあとに、その仮の答えが確かだったのかを見直し、また自分に問い直す。
              </p>
              <p>
                新しい自分が見つかれば、それを描き足す。描き足した自分をもとに、次の仮の答えと動き方は、少しずつ確かなものになっていく。
              </p>
              <p className={styles.inkPara}>
                私たちは、こうして描き重ねられていく自分を
                <br />
                <strong className={styles.marker}>「マイキャンバス」</strong>
                と呼んでいます。好きなことも、苦手なことも、うまくいかなかった日も、すべてが一色としてキャンバスに重なっていく。その絵は、誰かに代わりに描いてもらうことはできず、自分の手によってのみ描かれ、完成することもありません。
              </p>
              <p>
                この繰り返しは、学校を出たあとも、大人になったあとも終わりません。まだ見ぬ世界に立ったときも、描きつづけてきたマイキャンバスが、進む先を示す指標になる。そしてその世界でまた、外へ出て、動き、ふり返り、描き足していく。そうして一人ひとりが、自分にとって心地よい居場所を、自分の手でつくり出していける。それが、「よりよい人生」という曖昧な未来に、確かに近づいていく道だと考えています。
              </p>
              <p>
                何歳になっても、自分を描きつづける「学び手」であること。私たちは、その学びを支えたいと考えています。
              </p>
            </div>

            {/* 図：マイキャンバス（外へ出る→動く→ふり返る→描き足す）＋縦書きの詩 */}
            <div className={styles.messageBottom}>
              <figure className={styles.cycle} aria-label="マイキャンバスの循環：外へ出る、動く、ふり返る、描き足す">
                <svg viewBox="0 0 200 200" className={styles.cycleSvg} aria-hidden>
                  <circle cx="100" cy="100" r="70" className={styles.cycleCircle} />
                  {/* 時計回りの矢印（右上・右下・左下・左上） */}
                  {[45, 135, 225, 315].map((deg) => (
                    <path
                      key={deg}
                      d="M -5 -5 L 5 0 L -5 5 Z"
                      className={styles.cycleArrow}
                      transform={`rotate(${deg} 100 100) translate(100 30)`}
                    />
                  ))}
                </svg>
                <span className={`${styles.cycleLabel} ${styles.cycleTop}`}>外へ出る</span>
                <span className={`${styles.cycleLabel} ${styles.cycleRight}`}>動く</span>
                <span className={`${styles.cycleLabel} ${styles.cycleBottom}`}>ふり返る</span>
                <span className={`${styles.cycleLabel} ${styles.cycleLeft}`}>描き足す</span>
                <span className={styles.cycleCenter}>
                  マイ
                  <br />
                  キャンバス
                </span>
              </figure>

              <div className={styles.poemGroup}>
                <Poem
                  lines={[
                    { text: "貴方を拡げていく先々で" },
                    { text: "出会う人" },
                    { text: "出会う土地" },
                    { text: "出会うモノと" },
                    { text: "心地よく繋がりますように。" },
                    { text: "学びは、紡がれていく。", big: true, gapBefore: true },
                    { text: "自分から、人へ、土地へ、未来へ。" },
                    { text: "貴方だけの色が", gapBefore: true },
                    { text: "貴方だけのキャンバスが" },
                    { text: "人々と美しく響きあいますように。" },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ───────── p.4 上 4つの線 ───────── */}
          <section className={styles.section} aria-labelledby="lines-title">
            <h2 id="lines-title" className={styles.heading}>
              <span className={styles.nowrapChunk}>学び手の「自分」から紡ぐ、</span>
              <span className={`${styles.nowrapChunk} ${styles.headingAccent}`}>4つの線。</span>
            </h2>

            <div className={styles.lines}>
              {/* 左：「自分」の点から4本の線（PCのみ） */}
              <div className={styles.linesOrigin} aria-hidden>
                <svg viewBox="0 0 100 400" preserveAspectRatio="none" className={styles.linesSvg}>
                  {[
                    // 線の先は各行の境目（0・25・50・75%）＝各見出しの真ん中
                    { y: 0, cls: styles.strokeSelf },
                    { y: 100, cls: styles.strokePeople },
                    { y: 200, cls: styles.strokeLand },
                    { y: 300, cls: styles.strokeFuture },
                  ].map((l) => (
                    <path
                      key={l.y}
                      d={`M 12 150 C 60 150, 50 ${l.y}, 100 ${l.y}`}
                      className={l.cls}
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
                <span className={styles.selfDot} />
                <span className={styles.selfLabel}>自分</span>
              </div>

              <ul className={styles.lineList}>
                {lines4.map((l) => (
                  <li key={l.title} className={`${styles.lineItem} ${l.tone}`}>
                    <h3 className={styles.lineTitle}>{l.title}</h3>
                    <p className={styles.lineText}>{l.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* お問い合わせはフッターの上の帯にあるので、ここは2つだけ。ボタンはトップと同じ浮いた赤いボタン */}
          <div className={styles.links}>
            <Link className={ctaStyles.primaryButton} href="/business">
              事業内容を見る
            </Link>
            <Link className={ctaStyles.primaryButton} href="/greeting">
              メンバー紹介を見る
            </Link>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
