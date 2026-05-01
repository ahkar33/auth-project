# Auth Project Plan

## Stack

- Next.js 16 (App Router)
- React 19
- Supabase (auth + database)
- Tailwind CSS v4
- Zod (server-side validation)
- TypeScript

## Packages to Add

```
@supabase/supabase-js
@supabase/ssr
zod
```

## Supabase Setup

### SQL Migration

Run in Supabase SQL editor before starting:

```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

-- Trigger: auto-create profile row on signup (runs as security definer, bypasses RLS)
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

create policy "Users can read own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);
```

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## File Structure

```
app/
  (auth)/
    login/
      page.tsx              # login form (Client Component, useActionState)
    register/
      page.tsx              # register form (Client Component, useActionState)
  dashboard/
    page.tsx                # protected page shown after login
  actions/
    auth.ts                 # Server Actions: register, login, logout
  layout.tsx                # root layout
lib/
  supabase/
    client.ts               # browser Supabase client
    server.ts               # server Supabase client (used in Server Actions)
middleware.ts               # session refresh + route protection
```

## Auth Flow

### Register

1. User fills in email, username, password
2. Server Action validates fields with Zod
3. Check username uniqueness in `profiles` table
4. Call `supabase.auth.signUp(email, password)`
5. Insert row into `profiles(id, username)`
6. Redirect to `/dashboard`

### Login

1. User fills in email, password
2. Server Action validates fields with Zod
3. Call `supabase.auth.signInWithPassword(email, password)`
4. Supabase sets cookie-based session via `@supabase/ssr`
5. Redirect to `/dashboard`

### Logout

1. Call `supabase.auth.signOut()` in a Server Action
2. Clear session cookie
3. Redirect to `/login`

### Route Protection (middleware.ts)

- Reads session cookie on every request
- Unauthenticated users hitting `/dashboard/*` are redirected to `/login`
- Authenticated users hitting `/login` or `/register` are redirected to `/dashboard`

## Validation Rules (Zod)

| Field    | Rules                                      |
|----------|--------------------------------------------|
| email    | valid email format, required               |
| username | 3–20 chars, alphanumeric + underscores     |
| password | min 8 chars                                |

## Error Handling

- Form errors displayed inline via `useActionState`
- Supabase errors (duplicate email, wrong password) surfaced as field-level messages
- Pending state disables submit button during action execution
