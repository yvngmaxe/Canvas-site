"use client";

import { useActionState } from "react";
import { submitContactData } from "@/app/_actions/contact";
import styles from "./index.module.css";

const initialState = {
  status: "",
  message: "",
};

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactData, initialState);

  if (state.status === "success") {
    return (
      <p className={styles.success}>
        お問い合わせありがとうございます。
        <br />
        お返事までしばらくお待ちください。
      </p>
    );
  }
  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.nameFields}>
        <div className={styles.item}>
          <label htmlFor="last_name">姓</label>
          <input
            className={styles.textfield}
            type="text"
            id="last_name"
            name="last_name"
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="first_name">名</label>
          <input
            className={styles.textfield}
            type="text"
            id="first_name"
            name="first_name"
          />
        </div>
      </div>
      <div className={styles.item}>
        <label htmlFor="company">会社名・団体名（任意）</label>
        <input
          className={styles.textfield}
          type="text"
          id="company"
          name="company"
        />
      </div>
      <div className={styles.item}>
        <label htmlFor="email">メールアドレス</label>
        <input
          className={styles.textfield}
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div className={styles.item}>
        <label htmlFor="message">お問い合わせ内容</label>
        <textarea className={styles.textfield} id="message" name="message" />
      </div>

      <div className={styles.actions}>
        {state.status === "error" && (
          <p className={styles.error}>{state.message}</p>
        )}
        <button type="submit" value="送信する" className={styles.submit}>
          送信
        </button>
      </div>
    </form>
  );
}
