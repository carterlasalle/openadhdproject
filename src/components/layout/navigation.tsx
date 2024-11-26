'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { useSupabase } from '@/components/providers/supabase-provider'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const mainNav = [
  { name: 'Resources', href: '/resources' },
  { name: 'Tools', href: '/tools' },
  { name: 'Community', href: '/community' },
]

const userNav = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
  { name: 'Support Us', href: '/support-us' },
]

export function Navigation() {
  const pathname = usePathname()
  const { supabase } = useSupabase()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return (
    <nav className="border-b">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              OpenADHD
            </Link>
            <div className="hidden ml-8 sm:block">
              <div className="flex items-center space-x-4">
                {mainNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm transition-colors',
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                {userNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'hidden sm:block rounded-md px-3 py-2 text-sm transition-colors',
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="rounded-md bg-destructive px-3 py-2 text-sm text-destructive-foreground hover:bg-destructive/90"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
} 