'use client'

import { useActionState, useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { login, type AuthState } from '@/app/actions/auth'

const initial: AuthState = {}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initial)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  useEffect(() => {
    if (state.errors?.form) {
      toast.error(state.errors.form[0])
    }
  }, [state])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="mb-10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center shadow-lg" style={{ boxShadow: '0 4px 20px var(--accent-glow)' }}>
            <div className="w-3 h-3 rounded-[3px] bg-white/90" />
          </div>
          <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-widest text-[var(--text)] uppercase">
            Auth
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[var(--text)] mb-1.5">
          Welcome back
        </h1>
        <p className="text-sm text-[var(--muted)] mb-8">
          Sign in to continue
        </p>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7">
          <form action={formAction} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-2 tracking-wide">
                Your Name
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
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {state.errors?.password && (
                <p className="mt-1.5 text-xs text-[var(--error)]">{state.errors.password[0]}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border border-[var(--border)] bg-transparent accent-[var(--accent)] cursor-pointer"
              />
              <label htmlFor="remember-me" className="text-xs text-[var(--muted)] cursor-pointer">
                Remember me
              </label>
            </div>

            <button type="submit" disabled={pending} className="btn-primary mt-2">
              {pending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          No account?{' '}
          <Link href="/register" className="text-[var(--accent)] hover:opacity-80 transition-opacity font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
