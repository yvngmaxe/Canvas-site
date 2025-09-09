'use server';

import { createServerSupabaseClient } from '../_libs/supabase';

export async function submitComment(formData: FormData) {
  const content = formData.get('content') as string;

  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Error getting user or user not logged in:', userError?.message || 'User not logged in');
    return { error: 'コメントを投稿するにはログインが必要です。' };
  }

  const { error: insertError } = await supabase
    .from('comments')
    .insert({
      user_id: user.id,
      content: content,
    });

  if (insertError) {
    console.error('Error inserting comment:', insertError.message);
    return { error: insertError.message };
  }

  return { success: true };
}
