-- Add contact column to profiles
alter table profiles
  add column if not exists contact text;

-- Update trigger to read 'name' from metadata (instead of old 'username')
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, email, contact)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    new.raw_user_meta_data->>'contact'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;
