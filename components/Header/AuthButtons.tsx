import Link from "next/link";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";

type Profile = {
  nickname: string | null;
  avatar_url?: string | null;
};

export default function AuthButtons({
  user,
  profile,
}: {
  user: User | null;
  profile: Profile | null;
}) {
  const linkClassName = "text-sm hover:opacity-80 flex items-center gap-2";
  const avatarUrl = profile?.avatar_url ?? null;
  const fallbackInitial = (profile?.nickname || user?.email || "").slice(0, 1).toUpperCase() || "C";

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <Link href="/account" className={linkClassName}>
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="プロフィール画像"
                fill
                sizes="32px"
                className="object-cover"
              />
            ) : (
              fallbackInitial
            )}
          </span>
          {profile?.nickname || "マイアカウント"}
        </Link>
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
