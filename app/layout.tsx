import type { Metadata } from 'next'
import { DM_Mono, Playfair_Display } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Sign in or create an account',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmMono.variable} ${playfair.variable}`}>
      <body>
        {children}
        <Toaster
          theme="light"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              border: '1px solid #E4DDD4',
              color: '#1C1917',
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.02em',
            },
          }}
        />
      </body>
    </html>
  )
}
