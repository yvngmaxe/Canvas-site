'use server';

import { createServerSupabaseClient } from '../../_libs/supabase';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// フォームの状態の型を定義
export type FormState = {
  error: string | null;
};

export async function loginUser(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error logging in:', error.message);
    const isInvalidCreds = error.message === 'Invalid login credentials';
    return {
      error: isInvalidCreds
        ? 'メールアドレスまたはパスワードが正しくありません。'
        : error.message,
    };
  }

  // キャッシュをクリアしてリダイレクト
  revalidatePath('/', 'layout');
  redirect('/'); // トップページへリダイレクト
}

// フォームActionとして使用するため、FormDataを受け取り、void/Promise<void>を返す
export async function logoutUser() {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error logging out:', error.message);
    // エラー時もセッションを無効化できている可能性があるためトップへ誘導
  }

  revalidatePath('/', 'layout');
  redirect('/auth/login'); // ログアウト後はログインページにリダイレクト
}
