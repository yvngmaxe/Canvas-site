import styles from "../Audience/index.module.css";
import AudienceCard from "./AudienceCard";

export default function Audience() {
  return (
    <section className={styles.audience}>
      <h2 className={styles.audience__title}>対象別のご案内</h2>
      <div className={styles.audience__container}>
        <AudienceCard
          title="企業様へ"
          text="企業向け説明文ダミー。採用・研修・地域連携での協働をご検討の方向け。"
          href="/for-companies"
        />
        <AudienceCard
          title="学校様へ"
          text="学校向け説明文ダミー。探究・出前授業・PBL伴走の導入をご検討の方向け。"
          href="/for-schools"
        />
        <AudienceCard
          title="保護者様へ"
          text="保護者向け説明文ダミー。親子イベントや学びの情報をお探しの方向け。"
          href="/for-parents"
        />
      </div>
    </section>
  );
}
