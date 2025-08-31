import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // 追加

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// AdminクライアントのURLとキーのチェックを追加
if (!supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

// Client-side Supabase client (for browser interactions)
export const createBrowserClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Server-side Supabase client (for Server Components/Actions)
export const createServerClient = (cookies: any) => {
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get: (name: string) => cookies().get(name)?.value,
        set: (name: string, value: string, options: any) => cookies().set(name, value, options),
        remove: (name: string, options: any) => cookies().delete(name, options),
      },
    }
  );
};

// Server-side Supabase Admin client (bypasses RLS, for privileged operations)
export const createAdminClient = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false, // Adminクライアントはセッションを永続化しない
    },
  });
};