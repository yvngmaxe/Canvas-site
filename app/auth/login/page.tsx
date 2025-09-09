"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginUser, type FormState } from "./actions";

// 送信ボタンのコンポーネント
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: '10px 15px',
        backgroundColor: pending ? '#ccc' : '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: pending ? 'not-allowed' : 'pointer',
      }}
    >
      {pending ? 'ログイン中...' : 'ログイン'}
    </button>
  );
}

export default function LoginPage() {
  // フォームの初期状態
  const initialState: FormState = { error: null };
  // useActionStateフックでアクションと状態を連携
  const [state, formAction] = useActionState(loginUser, initialState);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>ログイン</h1>
      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>メールアドレス:</label>
          <input type="email" id="email" name="email" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>パスワード:</label>
          <input type="password" id="password" name="password" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
        </div>
        
        {/* エラーメッセージの表示 */}
        {state.error && (
          <p style={{ color: 'red', textAlign: 'center', margin: '0' }}>
            {state.error}
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
