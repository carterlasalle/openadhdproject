'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { useSupabase } from '@/components/providers/supabase-provider'

export default function SignInPage() {
  const { supabase } = useSupabase()

  return (
    <Container className="max-w-md py-8">
      <Card className="p-6">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome to OpenADHD</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access all features
          </p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgb(var(--primary))',
                  brandAccent: 'rgb(var(--primary-foreground))',
                },
              },
            },
          }}
          providers={['google', 'github']}
          redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}
        />
      </Card>
    </Container>
  )
} 