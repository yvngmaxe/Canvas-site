'use server';

import { createServerSupabaseClient } from '../../_libs/supabase';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error logging in:', error.message);
    // エラーハンドリングを強化する（例: ユーザーにフィードバックを返す）
    return { error: error.message };
  }

  // キャッシュをクリアしてリダイレクト
  revalidatePath('/', 'layout');
  redirect('/'); // トップページへリダイレクト
}

export async function logoutUser() {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error logging out:', error.message);
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/auth/login'); // ログアウト後はログインページにリダイレクト
}
