'use client'

import { useActionState, useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { register, type AuthState } from '@/app/actions/auth'

const initial: AuthState = {}

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, initial)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [rePass, setRePass] = useState('')
  const [contact, setContact] = useState('')
  const [agreed, setAgreed] = useState(false)

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
                Your Name
              </label>
              <input
                type="text"
                name="name"
                className="field-input"
                placeholder="John Doe"
                autoComplete="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              {state.errors?.name && (
                <p className="mt-1.5 text-xs text-[var(--error)]">{state.errors.name[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-2 tracking-wide">
                Your Email
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
                Password
              </label>
              <input
                type="password"
                name="pass"
                className="field-input"
                placeholder="min. 8 characters"
                autoComplete="new-password"
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
              {state.errors?.pass && (
                <p className="mt-1.5 text-xs text-[var(--error)]">{state.errors.pass[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-2 tracking-wide">
                Repeat your password
              </label>
              <input
                type="password"
                name="re_pass"
                className="field-input"
                placeholder="••••••••"
                autoComplete="new-password"
                value={rePass}
                onChange={e => setRePass(e.target.value)}
              />
              {state.errors?.re_pass && (
                <p className="mt-1.5 text-xs text-[var(--error)]">{state.errors.re_pass[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-2 tracking-wide">
                Contact no
              </label>
              <input
                type="text"
                name="contact"
                className="field-input"
                placeholder="+1 234 567 8900"
                autoComplete="tel"
                value={contact}
                onChange={e => setContact(e.target.value)}
              />
              {state.errors?.contact && (
                <p className="mt-1.5 text-xs text-[var(--error)]">{state.errors.contact[0]}</p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree-term"
                name="agree-term"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border border-[var(--border)] bg-transparent accent-[var(--accent)] cursor-pointer"
              />
              <label htmlFor="agree-term" className="text-xs text-[var(--muted)] leading-relaxed cursor-pointer">
                I agree to the{' '}
                <span className="text-[var(--accent)] hover:opacity-80 transition-opacity">
                  Terms of Service
                </span>
              </label>
            </div>
            {state.errors?.['agree-term'] && (
              <p className="-mt-3 text-xs text-[var(--error)]">{state.errors['agree-term'][0]}</p>
            )}

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
