'use client'

import { useActionState, useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { login, type AuthState } from '@/app/actions/auth'

const initial: AuthState = {}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initial)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (state.errors?.form) {
      toast.error(state.errors.form[0])
    }
  }, [state])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted)] mb-3">Auth</p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text)]">
            Sign In
          </h1>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] p-8 shadow-sm">
          <form action={formAction} className="flex flex-col gap-5">
            <div>
              <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-1.5">
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
                <p className="mt-1 text-[0.65rem] text-[var(--error)]">{state.errors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-[var(--muted)] mb-1.5">
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
                <p className="mt-1 text-[0.65rem] text-[var(--error)]">{state.errors.password[0]}</p>
              )}
            </div>

            <button type="submit" disabled={pending} className="btn-primary mt-1">
              {pending ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-[var(--muted)]">
          No account?{' '}
          <Link href="/register" className="text-[var(--text)] underline underline-offset-2 hover:opacity-60 transition-opacity">
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}
