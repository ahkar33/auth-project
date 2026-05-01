import type { Metadata } from 'next'
import { Syne, Outfit } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Sign in or create an account',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <body>
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: '#0C1220',
              border: '1px solid #1A2640',
              color: '#DDE6F5',
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.85rem',
              letterSpacing: '0.01em',
            },
          }}
        />
      </body>
    </html>
  )
}
