import { GeistSans } from 'geist/font/sans'
import './globals.css'
import SupabaseProvider from '@/components/providers/supabase-provider'

export const metadata = {
  title: 'OpenADHD',
  description: 'Open-source ADHD resources and tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
