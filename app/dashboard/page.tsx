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

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)] px-6 py-4 flex items-center justify-between">
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted)]">Auth</span>
        <form action={logout}>
          <button
            type="submit"
            className="text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors underline underline-offset-2"
          >
            Sign out
          </button>
        </form>
      </header>

      <main className="max-w-md mx-auto px-4 py-16">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-2">Dashboard</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text)] mb-10">
          Hello, {profile?.username ?? 'there'}.
        </h1>

        <div className="bg-[var(--surface)] border border-[var(--border)] shadow-sm divide-y divide-[var(--border)]">
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
    <div className="flex justify-between items-baseline gap-4 px-5 py-4">
      <span className="text-[0.65rem] tracking-[0.15em] uppercase text-[var(--muted)] shrink-0">
        {label}
      </span>
      <span className={`text-sm text-right truncate ${dim ? 'text-[var(--muted)]' : 'text-[var(--text)]'}`}>
        {value}
      </span>
    </div>
  )
}
