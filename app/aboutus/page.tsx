import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";

export default function AboutUsPage() {
  return (
    <div className="page">
      <PageLayout title="ABOUT US" subtitle="私たちについて">
        <div className={styles.wrap}>
          <h2 className={styles.introHeadline}>
            CANVASは様々な機関・団体・企業と連携して、
            <span className={styles.introBreak}>真新しい学びを提供します。</span>
          </h2>
          {/* Section 1 */}
          <section className={`${styles.section} ${styles.splitSection} ${styles.sectionFirst}`}>
            <div className={styles.splitText}>
              <h2 className={styles.heading}>教育から広島の色を描き興す</h2>
              <div className={styles.bodyCopy}>
                <p className={styles.text}>
                  情報が錯綜するこの社会で遠くにあるものがまるで近くにあるかのように感じることがありませんか。すべての情報が手に入る現代社会で都道府県として、各地域として区切られている曲がりくねった線は何を意味しているのでしょうか。情報に目を取られ、あなたの手の届く範囲にある素敵なつながりを忘れていませんか。
                </p>
                <p className={styles.text}>
                  多種多様な地域や事業をテーマに探究を行うことで子どもに新しい「生きるための色」を咲かせ、一方では、この色により新たに地域創生の種が植えられます。教育を通して、新たな人々のつながり・想いを生むと同時に、子どもの点数化できない人間としての力を見つけます。
                </p>
                <p className={styles.text}>
                  あなただけの推し企業・地域・場所を見つけてください。
                  <br />
                  ここから、教育から、個人を、地域を、色鮮やかに。
                  <br />
                  ここにすべての想いを乗せて広島の色をキャンバスに描き興こす。
                </p>
              </div>
            </div>
            <div className={styles.splitVisual}>
              <Image
                src="/images/01.png"
                alt="CANVASの学びを象徴する色鮮やかなグラフィック"
                width={640}
                height={640}
                className={styles.sectionImage}
                priority
              />
            </div>
          </section>

          {/* Section 2 */}
          <section className={`${styles.section} ${styles.splitSection} ${styles.sectionSecond}`}>
            <div className={styles.splitVisual}>
              <Image
                src="/images/02.png"
                alt="学びに向かう子どもたちのイメージ"
                width={640}
                height={640}
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.splitText}>
              <h2 className={styles.heading}>
                変わりゆく世の中と共に教育の形をアップデートする
              </h2>
              <div className={styles.bodyCopy}>
                <p className={styles.text}>
                  CANVASが日本の教育シーンのアップデートを牽引する姿を体現します。
                </p>
                <p className={styles.text}>
                  AIの台頭・情報の可視化、急速に変化しつつある社会情勢の中で、教育の形も少しずつ変化します。
                  <br />
                  成績によって区分される時代から、数値化できない個人の内側に秘められた何かに焦点をあてる時代へ。
                  <br />
                  20歳までなんとなく生きる時代から、アツい「個」が自分を主張しあう時代へ。
                </p>
                <p className={styles.text}>
                  弊社は<strong>小中高校生向けに</strong>身近な地域/社会を絡めた主体的な学び;キャリア教育を推進していきます。自考する力を育て、子どもが自ら笑顔で学びに飛び込んでいくような教育環境を拡げます。
                  <br />
                  自分で考え、思考を言葉にまとめ、他人にプレゼンする。話し合い、修正し、意思決定する。
                  <br />
                  この先、生きていくうえで不可欠な「生きる力」と「生きるための色」を持ち合わせたアツい「個」を養成します。
                </p>
              </div>
            </div>
          </section>

          <div className={styles.links}>
            <Link className={styles.linkBtn} href="/business">
              事業内容を見る
            </Link>
            <Link className={styles.linkBtn} href="/greeting">
              社長挨拶を読む
            </Link>
            <Link className={styles.linkBtn} href="/contact">
              お問い合わせ
            </Link>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
