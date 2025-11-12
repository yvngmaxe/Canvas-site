import { cache } from 'react'
import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

// Define a function to create a Supabase client for server-side operations.
// This is used in Server Components, Server Actions, and Route Handlers.
export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  )
}

// Define a function to create a Supabase client for client-side operations.
// This is used in Client Components.
export const createBrowserSupabaseClient = () => {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

const shouldSkipSupabaseAuth = process.env.SUPABASE_DISABLE_AUTH === '1'

// Cache the server Supabase client + current user per-request to avoid
// triggering multiple refresh attempts with the same token.
export const getCurrentUser = cache(async () => {
  const supabase = await createServerSupabaseClient()

  if (shouldSkipSupabaseAuth) {
    console.warn('[supabase] Skipping auth lookup because SUPABASE_DISABLE_AUTH=1')
    return { supabase, user: null, error: null }
  }
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    return { supabase, user, error }
  } catch (error) {
    console.error('[supabase] Failed to fetch current user', error)
    return {
      supabase,
      user: null,
      error: error instanceof Error ? error : new Error('Failed to load user'),
    }
  }
})

// Define a function to create a Supabase client for admin operations.
// This uses the service role key and should only be used in server-side environments.
export const createAdminClient = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined.');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
