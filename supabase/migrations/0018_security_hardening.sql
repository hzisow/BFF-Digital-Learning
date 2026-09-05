-- Security hardening pass, from the red-team audit.
-- Covers: live-session/player enumeration, the students UPDATE grant,
-- certificate forgery/spam, value/size bounds, and admin approval on
-- unverified emails. Every change here was checked against live data first
-- (no existing row violates any new constraint).

-- ============================================================================
-- 1. Stop cross-classroom enumeration of live sessions and players.
--    The old policies were `select using (auth.uid() is not null)`, so any
--    anonymous session could read every session's join code and every
--    player's name and score. Scope SELECT to the host or a joined member.
--    Looking a session up by code happens *before* you are a member, so that
--    one lookup moves into a SECURITY DEFINER function: an exact code still
--    resolves, but the table can no longer be dumped.
-- ============================================================================

-- Host-or-member predicate per game type. SECURITY DEFINER so the policies
-- that call it do not recurse back into these tables' own RLS.
create or replace function public.quiz_access(p_session uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from quiz_sessions s where s.id = p_session and s.created_by = auth.uid())
      or exists (select 1 from quiz_players p where p.session_id = p_session and p.auth_uid = auth.uid());
$$;
create or replace function public.game_access(p_session uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from game_sessions s where s.id = p_session and s.created_by = auth.uid())
      or exists (select 1 from game_players p where p.session_id = p_session and p.auth_uid = auth.uid());
$$;
create or replace function public.live_access(p_session uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from live_sessions s where s.id = p_session and s.created_by = auth.uid())
      or exists (select 1 from live_players p where p.session_id = p_session and p.auth_uid = auth.uid());
$$;
revoke all on function public.quiz_access(uuid) from public, anon;
revoke all on function public.game_access(uuid) from public, anon;
revoke all on function public.live_access(uuid) from public, anon;
grant execute on function public.quiz_access(uuid) to authenticated;
grant execute on function public.game_access(uuid) to authenticated;
grant execute on function public.live_access(uuid) to authenticated;

drop policy if exists "quiz_sessions_select_signed_in" on public.quiz_sessions;
create policy "quiz_sessions_select_member" on public.quiz_sessions
  for select using (public.quiz_access(id));
drop policy if exists "quiz_players_select_signed_in" on public.quiz_players;
create policy "quiz_players_select_member" on public.quiz_players
  for select using (public.quiz_access(session_id));

drop policy if exists "game_sessions_select_signed_in" on public.game_sessions;
create policy "game_sessions_select_member" on public.game_sessions
  for select using (public.game_access(id));
drop policy if exists "game_players_select_signed_in" on public.game_players;
create policy "game_players_select_member" on public.game_players
  for select using (public.game_access(session_id));

drop policy if exists "live_sessions_select_signed_in" on public.live_sessions;
create policy "live_sessions_select_member" on public.live_sessions
  for select using (public.live_access(id));
drop policy if exists "live_players_select_signed_in" on public.live_players;
create policy "live_players_select_member" on public.live_players
  for select using (public.live_access(session_id));

-- By-code lookups, used by the join screens before membership exists. Each
-- returns the single row for an exact code; there is no way to enumerate.
create or replace function public.get_quiz_session_by_code(p_code text)
returns public.quiz_sessions language sql stable security definer set search_path = public as $$
  select * from public.quiz_sessions where code = upper(trim(p_code)) limit 1;
$$;
create or replace function public.get_game_session_by_code(p_code text)
returns public.game_sessions language sql stable security definer set search_path = public as $$
  select * from public.game_sessions where code = upper(trim(p_code)) limit 1;
$$;
create or replace function public.get_live_session_by_code(p_code text)
returns public.live_sessions language sql stable security definer set search_path = public as $$
  select * from public.live_sessions where code = upper(trim(p_code)) limit 1;
$$;
revoke all on function public.get_quiz_session_by_code(text) from public, anon;
revoke all on function public.get_game_session_by_code(text) from public, anon;
revoke all on function public.get_live_session_by_code(text) from public, anon;
grant execute on function public.get_quiz_session_by_code(text) to authenticated;
grant execute on function public.get_game_session_by_code(text) to authenticated;
grant execute on function public.get_live_session_by_code(text) to authenticated;

-- ============================================================================
-- 2. Remove the students UPDATE grant. A student could PATCH their own row
--    into any classroom and read that class's roster/leaderboard/assignments.
--    Every legitimate write to students goes through SECURITY DEFINER
--    functions (join_classroom, rename_student, merge_students), so the
--    direct grant is pure attack surface.
-- ============================================================================
drop policy if exists "students_update_own" on public.students;
revoke update on public.students from anon, authenticated;

-- ============================================================================
-- 3. Certificate hardening. Previously the score and lesson count were taken
--    verbatim from client-supplied arguments, the name was any 60 chars, and
--    the per-user hourly limit reset with each fresh anonymous session.
--    Now: for a class-linked student the numbers are derived from their own
--    progress rows (arguments ignored); the display name may not contain
--    digits, URLs or @ (kills the "text 555-0199 for a free gift" abuse while
--    still allowing accented and non-Latin names); a per-name hourly cap
--    blocks bulk-identical spam pages; and anon loses the direct grant.
-- ============================================================================
create or replace function public.issue_certificate(p_name text, p_avg_score integer, p_lessons_passed integer)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  core_slugs text[] := array[
    'earning-income','spending-budgeting','saving-investing','credit-debt',
    'risk-insurance','financial-decision-making','financial-planning','consumer-protection'
  ];
  pass_score constant integer := 85;
  clean_name text := btrim(coalesce(p_name, ''));
  v_student  uuid;
  v_avg      integer := greatest(0, least(100, coalesce(p_avg_score, 0)));
  v_passed   integer := greatest(0, least(8, coalesce(p_lessons_passed, 0)));
  recent     integer;
  same_name  integer;
  new_id     uuid;
begin
  if auth.uid() is null then
    raise exception 'NOT_SIGNED_IN' using errcode = '42501';
  end if;
  if length(clean_name) < 1 or length(clean_name) > 60
     or clean_name ~ '[0-9]'
     or clean_name ~* '(https?://|www\.|@)'
     or clean_name ~ '[\n\r\t]' then
    raise exception 'BAD_NAME' using errcode = '22023';
  end if;

  -- Per-user and per-name hourly caps.
  select count(*) into recent from public.certificates
   where issued_by = auth.uid() and issued_at > now() - interval '1 hour';
  if recent >= 5 then raise exception 'TOO_MANY' using errcode = '53400'; end if;
  select count(*) into same_name from public.certificates
   where lower(display_name) = lower(clean_name) and issued_at > now() - interval '1 hour';
  if same_name >= 3 then raise exception 'TOO_MANY' using errcode = '53400'; end if;

  -- For a class-linked student, trust the server, not the client.
  select s.id into v_student from public.students s where s.auth_uid = auth.uid() limit 1;
  if v_student is not null then
    select coalesce(round(avg(score)), 0)::int,
           count(*) filter (where coalesce(score, 0) >= pass_score)
      into v_avg, v_passed
      from public.progress
     where student_id = v_student and status = 'completed'
       and activity_slug = any(core_slugs) and score is not null;
    v_passed := least(8, v_passed);
  end if;

  insert into public.certificates (display_name, avg_score, lessons_passed, student_id)
  values (clean_name, v_avg, v_passed, v_student)
  returning id into new_id;
  return new_id;
end;
$$;
revoke all on function public.issue_certificate(text, integer, integer) from public, anon;
grant execute on function public.issue_certificate(text, integer, integer) to authenticated;

-- ============================================================================
-- 4. Value and size bounds. Scores/cash are client-written; without these a
--    student could PATCH score:2147483647 or a multi-MB progress blob that
--    every mentor's dashboard then loads. Data verified clean before adding.
-- ============================================================================
alter table public.students     add constraint students_nick_len   check (char_length(nickname) between 1 and 40);
alter table public.quiz_players add constraint quiz_nick_len        check (char_length(nickname) between 1 and 40);
alter table public.live_players add constraint live_nick_len        check (char_length(nickname) between 1 and 40);
alter table public.game_players add constraint game_nick_len        check (char_length(nickname) between 1 and 40);
alter table public.progress     add constraint progress_score_range check (score is null or score between 0 and 100);
alter table public.quiz_players add constraint quiz_score_range     check (score between 0 and 100000);
alter table public.live_players add constraint live_score_range     check (score is null or score between 0 and 100);
alter table public.game_players add constraint game_cash_nonneg     check (cash >= 0);
alter table public.progress     add constraint progress_data_size   check (length(data::text) <= 16384);
alter table public.progress     add constraint progress_slug_fmt    check (activity_slug ~ '^[a-z0-9-]{1,64}$');

-- Tidy up table-level privileges nobody should hold via the API.
revoke truncate, references, trigger on all tables in schema public from anon, authenticated;

-- ============================================================================
-- 5. Do not grant admin approval from an unverified email. Auto-approval fired
--    on INSERT to auth.users from raw email, so an attacker could pre-register
--    an allowlisted address via the email/password endpoint. Gate on a
--    confirmed email (Google OIDC is confirmed at creation; email/password is
--    not until the link is clicked) and re-check when confirmation lands.
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if coalesce(new.is_anonymous, false) = false then
    insert into public.profiles (id, email, full_name, chapter, approved)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
      coalesce(new.raw_user_meta_data ->> 'chapter', ''),
      new.email_confirmed_at is not null and exists (
        select 1 from public.admin_allowlist a where lower(a.email) = lower(new.email)
      )
    )
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$;

create or replace function public.handle_email_confirmed()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.email_confirmed_at is not null and old.email_confirmed_at is null then
    update public.profiles set approved = true
     where id = new.id
       and exists (select 1 from public.admin_allowlist a where lower(a.email) = lower(new.email));
  end if;
  return new;
end;
$$;
drop trigger if exists on_auth_email_confirmed on auth.users;
create trigger on_auth_email_confirmed
  after update of email_confirmed_at on auth.users
  for each row execute function public.handle_email_confirmed();

-- Trigger functions must never be reachable as RPCs.
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.handle_email_confirmed() from public, anon, authenticated;

-- ============================================================================
-- 6. Per-user daily rate limiting for the AI functions, so one session (or one
--    minted anonymous user) cannot drain the shared Gemini free-tier quota.
--    The counter is keyed on auth.uid() inside the function, so a caller can
--    only ever spend their own budget, never inflate someone else's.
-- ============================================================================
create table if not exists public.ai_usage (
  user_id uuid  not null,
  day     date  not null default current_date,
  calls   integer not null default 0,
  primary key (user_id, day)
);
alter table public.ai_usage enable row level security; -- no policies: function-only

create or replace function public.bump_ai_usage(p_limit integer)
returns boolean language plpgsql security definer set search_path = public as $$
declare c integer;
begin
  if auth.uid() is null then return false; end if;
  insert into public.ai_usage (user_id, day, calls)
  values (auth.uid(), current_date, 1)
  on conflict (user_id, day) do update set calls = public.ai_usage.calls + 1
  returning calls into c;
  return c <= p_limit;
end;
$$;
revoke all on function public.bump_ai_usage(integer) from public, anon;
grant execute on function public.bump_ai_usage(integer) to authenticated;
