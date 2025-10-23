"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerUser, type RegisterFormState } from "./actions";

const cityOptions = [
  "広島市",
  "呉市",
  "竹原市",
  "三原市",
  "尾道市",
  "福山市",
  "府中市",
  "三次市",
  "庄原市",
  "大竹市",
  "東広島市",
  "廿日市市",
  "安芸高田市",
  "江田島市",
  "府中町",
  "海田町",
  "熊野町",
  "坂町",
  "安芸太田町",
  "北広島町",
  "大崎上島町",
  "世羅町",
  "神石高原町",
];

function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 送信ボタンのコンポーネント
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "10px 15px",
        backgroundColor: pending ? "#ccc" : "var(--accent)",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: pending ? "not-allowed" : "pointer",
        opacity: pending ? 0.7 : 1,
      }}
    >
      {pending ? "登録中..." : "登録"}
    </button>
  );
}

export default function RegisterPage() {
  // フォームの初期状態
  const initialState: RegisterFormState = { error: null };
  // useActionStateフックでアクションと状態を連携
  const [state, formAction] = useActionState(registerUser, initialState);
  const today = getTodayString();

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        アカウント登録
      </h1>
      <form
        action={formAction}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            メールアドレス:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            パスワード:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="password_confirm"
            style={{ display: "block", marginBottom: "5px" }}
          >
            パスワード (確認用):
          </label>
          <input
            type="password"
            id="password_confirm"
            name="password_confirm"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="nickname"
            style={{ display: "block", marginBottom: "5px" }}
          >
            ニックネーム:
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="birth_date"
            style={{ display: "block", marginBottom: "5px" }}
          >
            生年月日:
          </label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            required
            max={today}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="city"
            style={{ display: "block", marginBottom: "5px" }}
          >
            お住まいの市 (非公開):
          </label>
          <select
            id="city"
            name="city"
            defaultValue=""
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              backgroundColor: "white",
            }}
          >
            <option value="">選択してください</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* エラーメッセージの表示 */}
        {state?.error && (
          <p style={{ color: "red", textAlign: "center", margin: "0" }}>
            {state.error}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
