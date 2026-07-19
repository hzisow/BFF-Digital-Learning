-- ============================================================================
-- 0003_live_quiz.sql — Live Quiz (Kahoot-style lesson quiz mode)
--
-- A mentor hosts a lesson's quiz on the projector; students join with a
-- 6-character code on their own devices and answer for speed-based points.
--   * quiz_sessions — one row per live quiz (state machine + join code)
--   * quiz_players  — one row per joined student (score + answers jsonb)
--
-- Students sign in with Supabase's "Anonymous sign-ins" (already required by
-- 0001_init.sql — no extra dashboard setup needed).
--
-- The file is safe to re-run: it uses IF NOT EXISTS / DROP POLICY IF EXISTS
-- throughout, and the realtime block swallows duplicate_object.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------

-- Live quizzes, hosted by a team member. `state` drives every screen:
-- lobby -> question -> reveal -> (question -> reveal ...) -> done.
create table if not exists public.quiz_sessions (
  id                  uuid primary key default gen_random_uuid(),
  code                text not null unique,
  lesson_slug         text not null,
  state               text not null default 'lobby'
                        check (state in ('lobby', 'question', 'reveal', 'done')),
  question_index      integer not null default 0,
  question_started_at timestamptz,
  classroom_id        uuid references public.classrooms (id) on delete set null,
  created_by          uuid not null references auth.users (id) on delete cascade,
  created_at          timestamptz not null default now()
);

-- Players in a live quiz (anonymous or team accounts). `answers` maps the
-- question index (as a text key) to {choice, points, ms}; `score` is the
-- running total of answer points.
create table if not exists public.quiz_players (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.quiz_sessions (id) on delete cascade,
  auth_uid   uuid not null references auth.users (id) on delete cascade,
  nickname   text not null,
  score      integer not null default 0,
  answers    jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (session_id, auth_uid)
);

-- ----------------------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------------------

alter table public.quiz_sessions enable row level security;
alter table public.quiz_players  enable row level security;

-- quiz_sessions: any signed-in user (incl. anonymous players) can look up a
-- quiz by code; only approved team members (profiles) can host; only the host
-- can advance or delete the quiz.
drop policy if exists "quiz_sessions_select_signed_in" on public.quiz_sessions;
create policy "quiz_sessions_select_signed_in" on public.quiz_sessions
  for select using (auth.uid() is not null);

drop policy if exists "quiz_sessions_insert_host" on public.quiz_sessions;
create policy "quiz_sessions_insert_host" on public.quiz_sessions
  for insert with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and approved
    )
  );

drop policy if exists "quiz_sessions_update_host" on public.quiz_sessions;
create policy "quiz_sessions_update_host" on public.quiz_sessions
  for update using (created_by = auth.uid());

drop policy if exists "quiz_sessions_delete_host" on public.quiz_sessions;
create policy "quiz_sessions_delete_host" on public.quiz_sessions
  for delete using (created_by = auth.uid());

-- quiz_players: any signed-in user can see the leaderboard; players manage
-- only their own row.
drop policy if exists "quiz_players_select_signed_in" on public.quiz_players;
create policy "quiz_players_select_signed_in" on public.quiz_players
  for select using (auth.uid() is not null);

drop policy if exists "quiz_players_insert_own" on public.quiz_players;
create policy "quiz_players_insert_own" on public.quiz_players
  for insert with check (auth_uid = auth.uid());

drop policy if exists "quiz_players_update_own" on public.quiz_players;
create policy "quiz_players_update_own" on public.quiz_players
  for update using (auth_uid = auth.uid()) with check (auth_uid = auth.uid());

-- ----------------------------------------------------------------------------
-- Realtime: broadcast live-quiz changes to connected players
-- ----------------------------------------------------------------------------

do $$
begin
  begin
    alter publication supabase_realtime add table public.quiz_sessions;
  exception
    when duplicate_object then null; -- already in the publication
  end;
  begin
    alter publication supabase_realtime add table public.quiz_players;
  exception
    when duplicate_object then null; -- already in the publication
  end;
end;
$$;

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------

create index if not exists quiz_players_session_id_idx on public.quiz_players (session_id);
create index if not exists quiz_sessions_code_idx      on public.quiz_sessions (code);
