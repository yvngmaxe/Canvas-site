import { createServerSupabaseClient } from '@/app/_libs/supabase';
import { redirect } from 'next/navigation';
import { logoutUser } from '@/app/auth/login/actions';

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch profile information
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
    console.error('Error fetching profile:', error);
    // Optionally, handle the error more gracefully
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        {profile?.nickname ? `${profile.nickname}さんのアカウント` : 'マイアカウント'}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '15px', alignItems: 'center' }}>
        <p style={{ fontWeight: 'bold' }}>メールアドレス:</p>
        <p>{user.email}</p>

        <p style={{ fontWeight: 'bold' }}>ニックネーム:</p>
        <p>{profile?.nickname || '未設定'}</p>

        <p style={{ fontWeight: 'bold' }}>年齢:</p>
        <p>{profile?.age || '未設定'}</p>

        <p style={{ fontWeight: 'bold' }}>市町村:</p>
        <p>{profile?.city || '未設定'}</p>
      </div>
      <form action={logoutUser} style={{ marginTop: '20px', textAlign: 'center' }}>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ログアウト
        </button>
      </form>
    </div>
  );
}
