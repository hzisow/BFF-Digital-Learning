-- ============================================================================
-- 0002_admin_allowlist.sql — Admin access control: allowlist + approval gating
--
-- Only pre-approved emails become functional BFF team admins. Anyone may
-- submit the sign-up form, but an un-approved account cannot create
-- classrooms or host games (RLS enforces it) and the app shows a
-- "pending approval" screen. Anonymous student sign-ins are UNAFFECTED.
--
-- To approve a teammate, either add their email to admin_allowlist BEFORE they
-- sign up, or (if they already signed up) run:  select approve_admin('them@x.com');
-- ============================================================================

-- 1. approved flag on team-member profiles
alter table public.profiles
  add column if not exists approved boolean not null default false;

-- 2. allowlist of emails that auto-approve as admins on sign-up
create table if not exists public.admin_allowlist (
  email      text primary key,
  note       text,
  created_at timestamptz not null default now()
);

-- RLS on with NO policies => deny all for anon/authenticated. The trigger and
-- helper below are SECURITY DEFINER (owned by postgres, BYPASSRLS) so they can
-- still read/write it. This keeps the allowlist invisible to the public API.
alter table public.admin_allowlist enable row level security;

-- 3. on sign-up, approve iff the email is on the allowlist (case-insensitive)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_anonymous is false then
    insert into public.profiles (id, email, full_name, approved)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data ->> 'full_name', ''),
      exists (
        select 1 from public.admin_allowlist a
        where lower(a.email) = lower(new.email)
      )
    )
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public;
revoke all on function public.handle_new_user() from anon;
revoke all on function public.handle_new_user() from authenticated;

-- 4. require approved = true to create classrooms or host live games
drop policy if exists "classrooms_insert_own" on public.classrooms;
create policy "classrooms_insert_own" on public.classrooms
  for insert with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and approved
    )
  );

drop policy if exists "game_sessions_insert_host" on public.game_sessions;
create policy "game_sessions_insert_host" on public.game_sessions
  for insert with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and approved
    )
  );

-- 5. admin helper: approve someone by email (adds them to the allowlist AND
--    flips any existing profile). Callable only via SQL editor / service role.
create or replace function public.approve_admin(p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_allowlist (email) values (lower(p_email))
    on conflict (email) do nothing;
  update public.profiles set approved = true where lower(email) = lower(p_email);
end;
$$;
revoke all on function public.approve_admin(text) from public;
revoke all on function public.approve_admin(text) from anon;
revoke all on function public.approve_admin(text) from authenticated;

-- 6. Seed the first approved admin OUT OF BAND, not in this public file.
--    Run once from the Supabase SQL editor after the first deploy:
--        select public.approve_admin('founder@example.org');
--    Keeping the founder's address out of the repo avoids handing anyone the
--    exact account whose compromise would grant org-wide admin.
