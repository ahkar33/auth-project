'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { login, type AuthState } from '@/app/actions/auth'

const initial: AuthState = {}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initial)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 border-r border-[var(--border)] relative overflow-hidden">
        <div className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-dm-mono)]">
          ◆ Auth
        </div>

        <div>
          <div
            className="text-[11rem] font-[family-name:var(--font-playfair)] font-bold leading-none text-[var(--border)] select-none pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-8"
            aria-hidden
          >
            01
          </div>
          <p className="font-[family-name:var(--font-playfair)] text-5xl leading-tight text-[var(--text)] relative z-10">
            Welcome<br />back.
          </p>
          <p className="mt-4 text-sm text-[var(--muted)] tracking-wide">
            Sign in to continue.
          </p>
        </div>

        <div className="text-xs text-[var(--muted)] tracking-widest">
          — EST. 2025
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10 text-[var(--gold)] text-xs tracking-[0.3em] uppercase">
            ◆ Auth
          </div>

          <div className="mb-10">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text)]">
              Sign In
            </h1>
            <p className="mt-1 text-xs text-[var(--muted)] tracking-wide">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="relative p-8 border border-[var(--border)]">
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--gold)] -translate-x-px -translate-y-px" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--gold)] translate-x-px -translate-y-px" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--gold)] -translate-x-px translate-y-px" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--gold)] translate-x-px translate-y-px" />

            <form action={formAction} className="flex flex-col gap-7">
              {state.errors?.form && (
                <p className="text-xs text-red-400 tracking-wide bg-red-950/30 border border-red-900/40 px-3 py-2">
                  {state.errors.form[0]}
                </p>
              )}

              <div>
                <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="field-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {state.errors?.email && (
                  <p className="mt-1 text-[0.65rem] text-red-400">{state.errors.email[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-[var(--muted)] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="field-input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {state.errors?.password && (
                  <p className="mt-1 text-[0.65rem] text-red-400">{state.errors.password[0]}</p>
                )}
              </div>

              <button type="submit" disabled={pending} className="btn-primary mt-2">
                {pending ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-[var(--muted)] tracking-wide">
            No account?{' '}
            <Link href="/register" className="text-[var(--gold)] hover:text-[var(--text)] transition-colors">
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
