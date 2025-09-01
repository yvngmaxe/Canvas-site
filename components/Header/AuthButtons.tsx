import Link from 'next/link';
import { logoutUser } from '@/app/auth/login/actions';
import { createServerSupabaseClient } from '@/app/_libs/supabase';

export default async function AuthButtons() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // ログアウトボタン用のスタイルをTailwind CSSで定義
  const buttonClassName = "bg-transparent border-none p-0 font-inherit cursor-pointer hover:opacity-80 text-sm";
  const linkClassName = "text-sm hover:opacity-80";

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Link href="/account" className={linkClassName}>
            マイアカウント
          </Link>
          <form action={logoutUser} style={{ margin: 0, padding: 0 }}>
            <button type="submit" className={buttonClassName}>
              ログアウト
            </button>
          </form>
        </>
      ) : (
        <>
          <Link href="/auth/login" className={linkClassName}>
            ログイン
          </Link>
          <Link href="/auth/register" className={linkClassName}>
            新規登録
          </Link>
        </>
      )}
    </div>
  );
}
