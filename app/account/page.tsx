import { getCurrentUser } from "@/app/_libs/supabase";
import { redirect } from "next/navigation";
import { logoutUser } from "@/app/auth/login/actions";
import Image from "next/image";
import styles from "./account.module.css";

function calculateAge(birthDate: string): number | null {
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age >= 0 ? age : null;
}

function formatBirthDate(birthDate: string): string {
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (
    !yearStr ||
    !monthStr ||
    !dayStr ||
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day)
  ) {
    return birthDate;
  }

  return `${year}年${month}月${day}日`;
}

export default async function AccountPage() {
  const { supabase, user } = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch profile information
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found
    console.error("Error fetching profile:", error);
    // Optionally, handle the error more gracefully
  }

  const birthDateValue = profile?.birth_date as string | null | undefined;
  const age = birthDateValue ? calculateAge(birthDateValue) : null;
  const formattedBirthDate = birthDateValue ? formatBirthDate(birthDateValue) : null;
  const avatarUrl = typeof profile?.avatar_url === "string" ? profile.avatar_url : null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>アカウント情報</h1>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="アバター画像"
              fill
              sizes="96px"
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarPlaceholder} aria-hidden>
              <span className={styles.avatarInitial}>
                {(profile?.nickname ?? user.email ?? "").slice(0, 1).toUpperCase() || "C"}
              </span>
            </div>
          )}
        </div>
        <div>
          <p className={styles.profileName}>{profile?.nickname || user.email}</p>
          <p className={styles.profileEmail}>{user.email}</p>
        </div>
      </div>
      <div className={styles.infoGrid}>
        <p>
          <span>メールアドレス:</span> {user.email}
        </p>
        <p>
          <span>ニックネーム:</span> {profile?.nickname || "未設定"}
        </p>
        <p>
          <span>年齢:</span> {age !== null ? age : "未設定"}
        </p>
        <p>
          <span>生年月日:</span> {formattedBirthDate ?? "未設定"}
        </p>
        <p>
          <span>市町村:</span> {profile?.city || "未設定"}
        </p>
      </div>
      <form action={logoutUser} className={styles.logoutForm}>
        <button type="submit" className={styles.logoutButton}>
          ログアウト
        </button>
      </form>
    </div>
  );
}
