import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/actions/auth'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, created_at')
    .eq('id', user.id)
    .single()

  const joined = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—'

  const initial = (profile?.username?.[0] ?? user.email?.[0] ?? '?').toUpperCase()

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center" style={{ boxShadow: '0 2px 12px var(--accent-glow)' }}>
            <div className="w-2.5 h-2.5 rounded-[3px] bg-white/90" />
          </div>
          <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-widest text-[var(--text)] uppercase">
            Auth
          </span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-xs font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-[var(--accent)]"
            style={{ transition: 'color 0.15s, border-color 0.15s' }}
          >
            Sign out
          </button>
        </form>
      </header>

      <main className="max-w-lg mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white font-[family-name:var(--font-syne)] text-xl font-bold shrink-0" style={{ boxShadow: '0 8px 32px var(--accent-glow)' }}>
            {initial}
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] mb-0.5">Logged in as</p>
            <h1 className="font-[family-name:var(--font-syne)] text-xl font-bold text-[var(--text)]">
              {profile?.username ?? 'User'}
            </h1>
          </div>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
          <Row label="Username" value={profile?.username ?? '—'} />
          <Row label="Email" value={user.email ?? '—'} />
          <Row label="Member since" value={joined} />
          <Row label="User ID" value={user.id.slice(0, 8) + '…'} dim />
        </div>
      </main>
    </div>
  )
}

function Row({ label, value, dim = false }: { label: string; value: string; dim?: boolean }) {
  return (
    <div className="flex justify-between items-center gap-4 px-6 py-4">
      <span className="text-xs font-semibold tracking-wide text-[var(--muted)] shrink-0">
        {label}
      </span>
      <span className={`text-sm font-medium text-right truncate ${dim ? 'text-[var(--muted)]' : 'text-[var(--text)]'}`}>
        {value}
      </span>
    </div>
  )
}
