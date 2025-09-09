import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // 環境変数が未設定の場合はミドルウェア処理をスキップ
  if (!url || !anon) {
    return response
  }

  const supabase = createServerClient(
    url,
    anon,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            request.cookies.set({ name, value, ...options })
          } catch (_e) {
            // ignore if request cookies are immutable in this runtime
          }
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          try {
            request.cookies.set({ name, value: '', ...options })
          } catch (_e) {
            // ignore
          }
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // Cookie削除は空値+maxAge=0のsetで確実に無効化
          response.cookies.set({ name, value: '', maxAge: 0, ...options })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side-rendering#session-refresh-in-server-components
  try {
    await supabase.auth.getUser()
  } catch (_e) {
    // ignore
  }

  return response
}

// 一時的にミドルウェアを無効化（MIDDLEWARE_INVOCATION_FAILED 回避）
export const config = {
  matcher: [],
}
