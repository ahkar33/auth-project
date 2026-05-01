'use client'

import { useActionState, useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { register, type AuthState } from '@/app/actions/auth'

const initial: AuthState = {}

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, initial)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (state.errors?.form) {
      toast.error(state.errors.form[0])
    }
  }, [state])

  if (state.success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px] pointer-events-none" />
        <div className="w-full max-w-sm text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '0 8px 32px var(--accent-glow)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[var(--text)] mb-3">
            Account created
          </h1>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-8">
            {state.message}
          </p>
          <Link href="/login" className="btn-primary inline-block" style={{ textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="mb-10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center" style={{ boxShadow: '0 4px 20px var(--accent-glow)' }}>
            <div className="w-3 h-3 rounded-[3px] bg-white/90" />
          </div>
          <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-widest text-[var(--text)] uppercase">
            Auth
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[var(--text)] mb-1.5">
          Create account
        </h1>
        <p className="text-sm text-[var(--muted)] mb-8">
          Get started in seconds
        </p>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7">
          <form action={formAction} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-2 tracking-wide">
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
                <p className="mt-1.5 text-xs text-[var(--error)]">{state.errors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-2 tracking-wide">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="field-input"
                placeholder="your_handle"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              {state.errors?.username && (
                <p className="mt-1.5 text-xs text-[var(--error)]">{state.errors.username[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-2 tracking-wide">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="field-input"
                placeholder="min. 8 characters"
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {state.errors?.password && (
                <p className="mt-1.5 text-xs text-[var(--error)]">{state.errors.password[0]}</p>
              )}
            </div>

            <button type="submit" disabled={pending} className="btn-primary mt-2">
              {pending ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--accent)] hover:opacity-80 transition-opacity font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
