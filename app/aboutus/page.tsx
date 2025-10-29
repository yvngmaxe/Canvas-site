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
            <span className={styles.introBreak}>
              真新しい学びを提供します。
            </span>
          </h2>
          {/* Section 1 */}
          <section
            className={`${styles.section} ${styles.splitSection} ${styles.sectionFirst}`}
          >
            <div className={styles.splitText}>
              <h2 className={styles.heading}>越境する</h2>
              <div className={styles.bodyCopy}>
                <p className={styles.text}>
                  確固たる自分を持つことが自分の人生の最大の教科書になる。子どもが受動的に学ぶ閉鎖的な学習空間など、既存の行動範囲/思考範囲を越えない教育は「自分とは」という自分らしさを失わせます。自分の快適な土地や空間を越えて深く学び、既存の思考の枠を越えて探究し、今の自分を越えて本当の自分を描き出すことで、揺るがぬ信念や夢、目標につながる確固たる自分を築くことができる。自分を越え、未踏の領域で得た揺るがぬ信念と夢、目標こそが、人生を切り拓く羅針盤となるのです。子どもの内側に秘められているモノを外側へ引き出し、子どもが未来を見つけて切り拓くためのキャリア教育です。
                </p>
              </div>
            </div>
            <div className={styles.splitVisual}>
              <Image
                src="/images/01.png"
                alt="1つ目の項目の見出しの画像"
                width={640}
                height={640}
                className={styles.sectionImage}
                priority
              />
            </div>
          </section>

          {/* Section 2 */}
          <section
            className={`${styles.section} ${styles.splitSection} ${styles.sectionSecond}`}
          >
            <div className={styles.splitVisual}>
              <Image
                src="/images/02.png"
                alt="２つ目の項目の見出しの画像"
                width={640}
                height={640}
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.splitText}>
              <h2 className={styles.heading}>
                変わりゆく世の中と共に
                <br />
                教育の形をアップデートする
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
                  弊社は<strong>小中高校生向けに</strong>
                  身近な地域/社会を絡めた主体的な学び;キャリア教育を推進していきます。自考する力を育て、子どもが自ら笑顔で学びに飛び込んでいくような教育環境を拡げます。
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
              代表メッセージを読む
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
