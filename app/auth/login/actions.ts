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
    return { error: error.message };
  }

  // キャッシュをクリアしてリダイレクト
  revalidatePath('/', 'layout');
  redirect('/'); // トップページへリダイレクト
}

export async function logoutUser() {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error logging out:', error.message);
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/auth/login'); // ログアウト後はログインページにリダイレクト
}