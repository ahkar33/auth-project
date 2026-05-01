import type { Metadata } from 'next'
import { DM_Mono, Playfair_Display } from 'next/font/google'
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
      <body>{children}</body>
    </html>
  )
}
