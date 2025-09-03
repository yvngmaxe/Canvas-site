import { createServerSupabaseClient } from "@/app/_libs/supabase";
import { redirect } from "next/navigation";
import { logoutUser } from "@/app/auth/login/actions";
import styles from "./account.module.css";

export default async function AccountPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>アカウント情報</h1>
      <div className={styles.infoGrid}>
        <p>
          <span>メールアドレス:</span> {user.email}
        </p>
        <p>
          <span>ニックネーム:</span> {profile?.nickname || "未設定"}
        </p>
        <p>
          <span>年齢:</span> {profile?.age || "未設定"}
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
