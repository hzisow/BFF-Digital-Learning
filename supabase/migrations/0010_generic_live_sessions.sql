-- ============================================================================
-- 0010_generic_live_sessions.sql
-- Generic "co-play" live sessions: a mentor hosts ANY solo activity for the
-- class; students join with a code and play at their own pace while their
-- scores stream to a shared leaderboard. (Wolf + Quiz keep their own tables.)
-- Also adds find_live_session() so one "Join a live game" screen can route to
-- the right player view (wolf / quiz / coplay) from a single code.
-- ============================================================================

create table if not exists public.live_sessions (
  id            uuid primary key default gen_random_uuid(),
  code          text not null unique,
  activity_slug text not null,
  state         text not null default 'lobby' check (state in ('lobby', 'playing', 'ended')),
  classroom_id  uuid references public.classrooms (id) on delete set null,
  created_by    uuid not null references auth.users (id) on delete cascade,
  created_at    timestamptz not null default now()
);

create table if not exists public.live_players (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions (id) on delete cascade,
  auth_uid   uuid not null references auth.users (id) on delete cascade,
  nickname   text not null,
  score      integer,
  finished   boolean not null default false,
  created_at timestamptz not null default now(),
  unique (session_id, auth_uid)
);

alter table public.live_sessions enable row level security;
alter table public.live_players enable row level security;

drop policy if exists "live_sessions_select_signed_in" on public.live_sessions;
create policy "live_sessions_select_signed_in" on public.live_sessions
  for select using (auth.uid() is not null);
drop policy if exists "live_sessions_insert_host" on public.live_sessions;
create policy "live_sessions_insert_host" on public.live_sessions
  for insert with check (
    created_by = auth.uid()
    and exists (select 1 from public.profiles where id = auth.uid() and approved)
  );
drop policy if exists "live_sessions_update_host" on public.live_sessions;
create policy "live_sessions_update_host" on public.live_sessions
  for update using (created_by = auth.uid());
drop policy if exists "live_sessions_delete_host" on public.live_sessions;
create policy "live_sessions_delete_host" on public.live_sessions
  for delete using (created_by = auth.uid());

drop policy if exists "live_players_select_signed_in" on public.live_players;
create policy "live_players_select_signed_in" on public.live_players
  for select using (auth.uid() is not null);
drop policy if exists "live_players_insert_own" on public.live_players;
create policy "live_players_insert_own" on public.live_players
  for insert with check (auth_uid = auth.uid());
drop policy if exists "live_players_update_own" on public.live_players;
create policy "live_players_update_own" on public.live_players
  for update using (auth_uid = auth.uid()) with check (auth_uid = auth.uid());

do $$
begin
  begin alter publication supabase_realtime add table public.live_sessions; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.live_players; exception when duplicate_object then null; end;
end;
$$;

create index if not exists live_players_session_id_idx on public.live_players (session_id);
create index if not exists live_sessions_code_idx on public.live_sessions (code);

create or replace function public.find_live_session(p_code text)
returns table (kind text, code text, activity_slug text)
language sql
security definer
set search_path = public
stable
as $$
  select 'wolf'::text as kind, code, 'wolf-of-wall-street'::text as activity_slug
    from public.game_sessions where code = upper(p_code)
  union all
  select 'quiz'::text, code, lesson_slug from public.quiz_sessions where code = upper(p_code)
  union all
  select 'coplay'::text, code, activity_slug from public.live_sessions where code = upper(p_code)
  limit 1;
$$;
revoke all on function public.find_live_session(text) from public;
revoke all on function public.find_live_session(text) from anon;
grant execute on function public.find_live_session(text) to authenticated;
