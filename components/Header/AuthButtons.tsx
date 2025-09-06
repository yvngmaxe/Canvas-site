import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import type { User as Profile } from '@prisma/client';

export default function AuthButtons({ user, profile }: { user: User | null, profile: Profile | null }) {

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
