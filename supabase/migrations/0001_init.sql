-- ============================================================================
-- BFF Classroom — initial database schema (0001_init.sql)
--
-- Run this whole file in the Supabase SQL Editor (or via `supabase db push`).
-- It creates every table, function, trigger, policy, and index the app needs:
--   * profiles       — one row per BFF team member (email accounts)
--   * classrooms     — mentor-created classes with join codes
--   * students       — anonymous students who joined a class with a code
--   * assignments    — activities a mentor assigned to a class
--   * progress       — per-student, per-activity progress + scores
--   * game_sessions  — live "Wolf of Wall Street" games
--   * game_players   — players in a live game
--
-- IMPORTANT: students and live-game players sign in with Supabase's
-- "Anonymous sign-ins" (no email collected). You MUST enable this in the
-- dashboard: Authentication -> Sign In / Up -> enable "Anonymous sign-ins".
--
-- The file is safe to re-run: it uses IF NOT EXISTS / OR REPLACE / DROP
-- POLICY IF EXISTS throughout.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------

-- Team member profiles (mirrors auth.users for non-anonymous accounts).
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null,
  full_name  text not null default '',
  created_at timestamptz not null default now()
);

-- Classes created by BFF mentors. Students join with `code`.
create table if not exists public.classrooms (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  school     text,
  code       text not null unique,
  created_by uuid not null references auth.users (id) on delete cascade,
  archived   boolean not null default false,
  created_at timestamptz not null default now()
);

-- Students are anonymous auth users tied to a classroom by nickname.
create table if not exists public.students (
  id           uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references public.classrooms (id) on delete cascade,
  auth_uid     uuid not null references auth.users (id) on delete cascade,
  nickname     text not null,
  created_at   timestamptz not null default now(),
  unique (classroom_id, auth_uid)
);

-- Activities a mentor assigned to a class (referenced by activity slug).
create table if not exists public.assignments (
  id            uuid primary key default gen_random_uuid(),
  classroom_id  uuid not null references public.classrooms (id) on delete cascade,
  activity_slug text not null,
  note          text,
  due_at        timestamptz,
  created_by    uuid references auth.users (id) on delete set null,
  created_at    timestamptz not null default now(),
  unique (classroom_id, activity_slug)
);

-- Per-student, per-activity progress (upserted from the app).
create table if not exists public.progress (
  id            uuid primary key default gen_random_uuid(),
  student_id    uuid not null references public.students (id) on delete cascade,
  activity_slug text not null,
  status        text not null check (status in ('started', 'completed')),
  score         integer,
  data          jsonb not null default '{}'::jsonb,
  updated_at    timestamptz not null default now(),
  unique (student_id, activity_slug)
);

-- Live Wolf of Wall Street games, hosted by a team member.
create table if not exists public.game_sessions (
  id           uuid primary key default gen_random_uuid(),
  code         text not null unique,
  stage        integer not null default 0,
  reveal_index integer not null default 0,
  classroom_id uuid references public.classrooms (id) on delete set null,
  created_by   uuid not null references auth.users (id) on delete cascade,
  created_at   timestamptz not null default now()
);

-- Players in a live game (anonymous or team accounts).
create table if not exists public.game_players (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.game_sessions (id) on delete cascade,
  auth_uid   uuid not null references auth.users (id) on delete cascade,
  nickname   text not null,
  cash       numeric not null default 1000,
  holdings   jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (session_id, auth_uid)
);

-- ----------------------------------------------------------------------------
-- Trigger: auto-create a profile for every new (non-anonymous) auth user
-- ----------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_anonymous is false then
    insert into public.profiles (id, email, full_name)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data ->> 'full_name', '')
    )
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- Function: join_classroom(code, nickname)
--
-- SECURITY DEFINER so anonymous students can join a class they cannot
-- otherwise see (classrooms are only selectable by their creator).
-- ----------------------------------------------------------------------------

create or replace function public.join_classroom(p_code text, p_nickname text)
returns table (student_id uuid, classroom_id uuid, classroom_name text)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  c public.classrooms%rowtype;
  s public.students%rowtype;
begin
  select * into c
  from public.classrooms
  where code = upper(p_code)
    and archived = false;

  if not found then
    raise exception 'classroom_not_found';
  end if;

  insert into public.students (classroom_id, auth_uid, nickname)
  values (c.id, auth.uid(), p_nickname)
  on conflict (classroom_id, auth_uid)
  do update set nickname = excluded.nickname
  returning * into s;

  return query select s.id, c.id, c.name;
end;
$$;

revoke all on function public.join_classroom(text, text) from public;
revoke all on function public.join_classroom(text, text) from anon;
grant execute on function public.join_classroom(text, text) to authenticated;

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------

alter table public.profiles      enable row level security;
alter table public.classrooms    enable row level security;
alter table public.students      enable row level security;
alter table public.assignments   enable row level security;
alter table public.progress      enable row level security;
alter table public.game_sessions enable row level security;
alter table public.game_players  enable row level security;

-- profiles: you can see and edit only your own profile.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- classrooms: only the creating team member can see or manage a class.
-- The `exists (profiles ...)` check keeps anonymous users from creating one.
drop policy if exists "classrooms_select_own" on public.classrooms;
create policy "classrooms_select_own" on public.classrooms
  for select using (created_by = auth.uid());

drop policy if exists "classrooms_insert_own" on public.classrooms;
create policy "classrooms_insert_own" on public.classrooms
  for insert with check (
    created_by = auth.uid()
    and exists (select 1 from public.profiles where id = auth.uid())
  );

drop policy if exists "classrooms_update_own" on public.classrooms;
create policy "classrooms_update_own" on public.classrooms
  for update using (created_by = auth.uid());

drop policy if exists "classrooms_delete_own" on public.classrooms;
create policy "classrooms_delete_own" on public.classrooms
  for delete using (created_by = auth.uid());

-- students: a student sees their own row; a mentor sees their class roster.
-- No INSERT policy on purpose — rows are created via join_classroom(),
-- which runs as SECURITY DEFINER.
drop policy if exists "students_select_own_or_mentor" on public.students;
create policy "students_select_own_or_mentor" on public.students
  for select using (
    auth_uid = auth.uid()
    or exists (
      select 1 from public.classrooms c
      where c.id = classroom_id and c.created_by = auth.uid()
    )
  );

drop policy if exists "students_update_own" on public.students;
create policy "students_update_own" on public.students
  for update using (auth_uid = auth.uid()) with check (auth_uid = auth.uid());

-- assignments: visible to the class creator and to students in the class;
-- only the class creator can create/change/remove them.
drop policy if exists "assignments_select_member" on public.assignments;
create policy "assignments_select_member" on public.assignments
  for select using (
    exists (
      select 1 from public.classrooms c
      where c.id = classroom_id and c.created_by = auth.uid()
    )
    or exists (
      select 1 from public.students s
      where s.classroom_id = assignments.classroom_id and s.auth_uid = auth.uid()
    )
  );

drop policy if exists "assignments_insert_mentor" on public.assignments;
create policy "assignments_insert_mentor" on public.assignments
  for insert with check (
    exists (
      select 1 from public.classrooms c
      where c.id = classroom_id and c.created_by = auth.uid()
    )
  );

drop policy if exists "assignments_update_mentor" on public.assignments;
create policy "assignments_update_mentor" on public.assignments
  for update using (
    exists (
      select 1 from public.classrooms c
      where c.id = classroom_id and c.created_by = auth.uid()
    )
  );

drop policy if exists "assignments_delete_mentor" on public.assignments;
create policy "assignments_delete_mentor" on public.assignments
  for delete using (
    exists (
      select 1 from public.classrooms c
      where c.id = classroom_id and c.created_by = auth.uid()
    )
  );

-- progress: a student reads/writes their own progress; the class mentor
-- can read (but not write) every student's progress.
drop policy if exists "progress_select_own_or_mentor" on public.progress;
create policy "progress_select_own_or_mentor" on public.progress
  for select using (
    exists (
      select 1 from public.students s
      where s.id = progress.student_id and s.auth_uid = auth.uid()
    )
    or exists (
      select 1
      from public.students s
      join public.classrooms c on c.id = s.classroom_id
      where s.id = progress.student_id and c.created_by = auth.uid()
    )
  );

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own" on public.progress
  for insert with check (
    exists (
      select 1 from public.students s
      where s.id = student_id and s.auth_uid = auth.uid()
    )
  );

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own" on public.progress
  for update using (
    exists (
      select 1 from public.students s
      where s.id = student_id and s.auth_uid = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.students s
      where s.id = student_id and s.auth_uid = auth.uid()
    )
  );

-- game_sessions: any signed-in user (incl. anonymous players) can look up a
-- game by code; only team members (profiles) can host; only the host can
-- advance or delete the game.
drop policy if exists "game_sessions_select_signed_in" on public.game_sessions;
create policy "game_sessions_select_signed_in" on public.game_sessions
  for select using (auth.uid() is not null);

drop policy if exists "game_sessions_insert_host" on public.game_sessions;
create policy "game_sessions_insert_host" on public.game_sessions
  for insert with check (
    created_by = auth.uid()
    and exists (select 1 from public.profiles where id = auth.uid())
  );

drop policy if exists "game_sessions_update_host" on public.game_sessions;
create policy "game_sessions_update_host" on public.game_sessions
  for update using (created_by = auth.uid());

drop policy if exists "game_sessions_delete_host" on public.game_sessions;
create policy "game_sessions_delete_host" on public.game_sessions
  for delete using (created_by = auth.uid());

-- game_players: any signed-in user can see the leaderboard; players manage
-- only their own row.
drop policy if exists "game_players_select_signed_in" on public.game_players;
create policy "game_players_select_signed_in" on public.game_players
  for select using (auth.uid() is not null);

drop policy if exists "game_players_insert_own" on public.game_players;
create policy "game_players_insert_own" on public.game_players
  for insert with check (auth_uid = auth.uid());

drop policy if exists "game_players_update_own" on public.game_players;
create policy "game_players_update_own" on public.game_players
  for update using (auth_uid = auth.uid()) with check (auth_uid = auth.uid());

-- ----------------------------------------------------------------------------
-- Realtime: broadcast live-game changes to connected players
-- ----------------------------------------------------------------------------

do $$
begin
  begin
    alter publication supabase_realtime add table public.game_sessions;
  exception
    when duplicate_object then null; -- already in the publication
  end;
  begin
    alter publication supabase_realtime add table public.game_players;
  exception
    when duplicate_object then null; -- already in the publication
  end;
end;
$$;

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------

create index if not exists students_classroom_id_idx  on public.students (classroom_id);
create index if not exists assignments_classroom_id_idx on public.assignments (classroom_id);
create index if not exists progress_student_id_idx    on public.progress (student_id);
create index if not exists game_players_session_id_idx on public.game_players (session_id);
create index if not exists game_sessions_code_idx     on public.game_sessions (code);
create index if not exists classrooms_code_idx        on public.classrooms (code);
