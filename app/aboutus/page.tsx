import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";

export default function AboutUsPage() {
  return (
    <div className="page">
      <PageLayout title="ABOUT CANVAS" subtitle="CANVASについて">
        <div className={styles.wrap}>
          <section className={`${styles.section} ${styles.singleSection}`}>
            <div className={styles.singleText}>
              <h2 className={styles.heading}>
                自分の人生に確信を持つキャリア教育
              </h2>
              <div className={styles.bodyCopy}>
                <p className={styles.text}>
                  大きな揺らぎのある周辺環境、この先もっと大きな変化や未知が待ち受けるなかで子どもたちは未来をどう生きていくべきか。
                  取り組むべきは自分と「他」を常に循環させながら、自己を更新し、確立させていくことである。
                  知らないものや人と関わりを持ち、自分が考えたことのない思考の幅を体験し、身体をアンコンフォートな未知の領域へ投げだす。
                  そんな営みの中で、自分の人生の教科書（マイキャンバス）を更新していく。
                  マイキャンバスに基づき、常にアクションに今の自分で出せる最大の暫定解（仮説）を根拠として持ち、
                  アクションから逆説的に暫定解を評価する。
                  新たな自分が見つかれば、マイキャンバスを更新し、暫定解とアクションの質を高めていく。
                  これをしていくと、未来に待ち受ける未知の「大人」の世界でもマイキャンバスが生きる指標になり、
                  また新しい世界で更新プロセスを回しながらマイキャンバスを更新し続ける。これを行い、
                  すべての大人になりゆく子どもが未来のアクションで辿り着くスポットが自分にとって居心地の良い自分最適な環境を自分で生み出すことができ、
                  「よりよい人生」という曖昧な未来へ確実に近づく。マイキャンバスが自分自身を未知の最適な環境へ導く指標になり、
                  それは自分自身によってのみ生み出されるものである。と考えています。
                </p>
              </div>
            </div>
          </section>

          <div className={styles.links}>
            <Link className={styles.linkBtn} href="/business">
              事業内容を見る
            </Link>
            <Link className={styles.linkBtn} href="/greeting">
              メンバー紹介を見る
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
