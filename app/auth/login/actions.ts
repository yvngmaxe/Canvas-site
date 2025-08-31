'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '../../_libs/supabase';
import { redirect } from 'next/navigation';

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error logging in:', error.message);
    // エラーハンドリングを強化する（例: ユーザーにフィードバックを返す）
    return { error: error.message };
  }

  // ログイン成功後、リダイレクト
  redirect('/'); // トップページへリダイレクト
}
