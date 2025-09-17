import Link from "next/link";
import type { User } from "@supabase/supabase-js";

type Profile = {
  nickname: string | null;
};

export default function AuthButtons({
  user,
  profile,
}: {
  user: User | null;
  profile: Profile | null;
}) {
  const linkClassName = "text-sm hover:opacity-80";

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Link href="/account" className={linkClassName}>
            {profile?.nickname || "マイアカウント"}
          </Link>
        </>
      ) : (
        <>
          <Link href="/auth/login" className={`${linkClassName} text-red-500 font-medium`}>
            ログイン
          </Link>
          <Link
            href="/auth/register"
            className={`${linkClassName} text-red-500 font-medium`}
          >
            新規登録
          </Link>
        </>
      )}
    </div>
  );
}
