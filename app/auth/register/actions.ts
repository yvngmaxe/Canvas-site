'use server';

import { cookies } from 'next/headers';
import { createServerClient, createAdminClient } from '../../_libs/supabase'; // createAdminClient を追加
import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nickname = formData.get('nickname') as string;
  const age = formData.get('age') ? parseInt(formData.get('age') as string) : null;
  const city = formData.get('city') as string;

  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore); // 認証用クライアント

  // 1. Supabase Authでユーザーを登録
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error('Error signing up:', authError.message);
    return { error: authError.message };
  }

  if (authData.user) {
    // 2. profilesテーブルにユーザー情報を追加 (Adminクライアントを使用)
    const adminSupabase = createAdminClient(); // Adminクライアントを初期化
    const { error: profileError } = await adminSupabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        nickname,
        age,
        city: city || null, // cityが空の場合はnullを挿入
        avatar_url: null, // アバターは後で実装
      });

    if (profileError) {
      console.error('Error inserting profile:', profileError.message);
      // プロファイル作成に失敗した場合、ユーザー登録もロールバックするなどの考慮が必要
      // 現状はエラーをログに出力するのみ
      return { error: profileError.message };
    }

    console.log('User registered and profile created:', authData.user.id);
    // 登録成功後、リダイレクト
    redirect('/auth/login'); // ログインページへリダイレクト
  }

  return { success: true };
}
