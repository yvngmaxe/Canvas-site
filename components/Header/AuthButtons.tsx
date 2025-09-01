import Link from 'next/link';
import { logoutUser } from '@/app/auth/login/actions';

export default function AuthButtons({ user, profile }: { user: any, profile: any }) {

  // ログアウトボタン用のスタイルをTailwind CSSで定義
  const buttonClassName = "bg-transparent border-none p-0 font-inherit cursor-pointer hover:opacity-80 text-sm";
  const linkClassName = "text-sm hover:opacity-80";

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Link href="/account" className={linkClassName}>
            {profile?.nickname || 'マイアカウント'}
          </Link>
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
