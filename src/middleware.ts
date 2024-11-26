import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not signed in and the current path is not /auth/signin,
  // redirect the user to /auth/signin
  if (!session && !req.nextUrl.pathname.startsWith('/auth/signin')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Specify which routes should be protected by the middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/resources/submit',
    '/tools/submit',
    '/profile/:path*',
  ],
} 