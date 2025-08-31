import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLayout from "@/components/PageLayout";
import styles from "./page.module.css";

export default function GreetingPage() {
  return (
    <div className="page">
      <Header />
      <PageLayout title="ご挨拶" subtitle="Message from the CEO">
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/test1.jpg" // 仮の画像
              alt="代表者の写真"
              width={240}
              height={240}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <p className={styles.message}>
              ここに代表からのメッセージが入ります。テキストダミーです。ここに代表からのメッセージが入ります。テキストダミーです。ここに代表からのメッセージが入ります。テキストダミーです。ここに代表からのメッセージが入ります。テキストダミーです。ここに代表からのメッセージが入ります。テキストダミーです。ここに代表からのメッセージが入ります。テキストダミーです。
            </p>
            <p className={styles.signature}>
              <span className={styles.position}>株式会社Canvas 代表</span>
              <span className={styles.name}>山口　智也</span>
            </p>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
