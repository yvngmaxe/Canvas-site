"use server";

import {
  createServerSupabaseClient,
  createAdminClient,
} from "../../_libs/supabase";
import { redirect } from "next/navigation";

// フォームの状態の型を定義
export type RegisterFormState = {
  error: string | null;
};

export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("password_confirm") as string; // 確認用パスワードを取得
  const nickname = formData.get("nickname") as string;
  const birthDateRaw = formData.get("birth_date");
  const birthDate = typeof birthDateRaw === "string" ? birthDateRaw.trim() : "";
  const city = formData.get("city") as string;

  if (!birthDate) {
    return { error: "生年月日を入力してください。" };
  }

  const birthDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!birthDatePattern.test(birthDate)) {
    return { error: "生年月日の形式が正しくありません。" };
  }

  const parsedBirthDate = new Date(birthDate);
  if (
    Number.isNaN(parsedBirthDate.getTime()) ||
    parsedBirthDate.toISOString().slice(0, 10) !== birthDate
  ) {
    return { error: "生年月日の形式が正しくありません。" };
  }

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  if (birthDate > todayString) {
    return { error: "未来の日付は指定できません。" };
  }

  // パスワード確認
  if (password !== passwordConfirm) {
    return { error: "パスワードが一致しません。" };
  }

  const supabase = await createServerSupabaseClient();

  // 1. Supabase Authでユーザーを登録
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error("Error signing up:", authError.message);
    if (authError.message.includes("unique constraint")) {
      return { error: "このメールアドレスは既に使用されています。" };
    }
    return { error: authError.message };
  }

  if (authData.user) {
    // 2. profilesテーブルにユーザー情報を追加 (Adminクライアントを使用)
    const adminSupabase = createAdminClient();
    const { error: profileError } = await adminSupabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        nickname,
        birth_date: birthDate,
        city: city || null, // cityが空の場合はnullを挿入
        avatar_url: null, // アバターは後で実装
      });

    if (profileError) {
      console.error("Error inserting profile:", profileError.message);
      // TODO: 本番環境では、ここでAuthユーザーを削除するなどのロールバック処理が必要
      return { error: "プロフィールの作成に失敗しました。" };
    }

    // 登録成功後、メッセージ付きでログインページへリダイレクト
    redirect(
      `/auth/login?message=${encodeURIComponent(
        "登録が完了しました。メールに記載されたリンクから認証を完了して、ログインしてください。"
      )}`
    );
  }

  return { error: "不明なエラーが発生しました。" };
}
