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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--border)] px-8 py-5 flex items-center justify-between">
        <span className="text-[var(--gold)] text-xs tracking-[0.3em] uppercase">◆ Auth</span>
        <form action={logout}>
          <button
            type="submit"
            className="text-xs tracking-[0.15em] uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Sign Out →
          </button>
        </form>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-lg">
          <p className="text-xs tracking-[0.25em] uppercase text-[var(--gold)] mb-4">Dashboard</p>

          <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-[var(--text)] mb-12">
            Hello, {profile?.username ?? 'there'}.
          </h1>

          {/* Info card */}
          <div className="relative border border-[var(--border)] p-8 space-y-6">
            <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--gold)] -translate-x-px -translate-y-px" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--gold)] translate-x-px -translate-y-px" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--gold)] -translate-x-px translate-y-px" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--gold)] translate-x-px translate-y-px" />

            <Row label="Username" value={profile?.username ?? '—'} />
            <div className="border-t border-[var(--border)]" />
            <Row label="Email" value={user.email ?? '—'} />
            <div className="border-t border-[var(--border)]" />
            <Row label="Member Since" value={joined} />
            <div className="border-t border-[var(--border)]" />
            <Row label="User ID" value={user.id.slice(0, 8) + '…'} mono />
          </div>
        </div>
      </main>
    </div>
  )
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-baseline gap-4">
      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--muted)] shrink-0">
        {label}
      </span>
      <span className={`text-sm text-[var(--text)] truncate ${mono ? 'opacity-60' : ''}`}>
        {value}
      </span>
    </div>
  )
}
