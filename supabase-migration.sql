-- 1. Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  created_at timestamptz default now()
);

-- 2. Enable RLS
alter table profiles enable row level security;

-- 3. Policies
create policy "Users can read own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- 4. Trigger function
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- 5. Trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
