-- ============================================================================
-- 0014_roster_management.sql
-- Let a mentor fix their own class list: rename, remove, and merge students.
--
-- This closes a gap opened by 0013. When students identified with a nickname
-- plus a PIN, a name was effectively claimed once. Now that they type their own
-- first name and last initial, a class of thirty will produce typos — "Jaden M"
-- on Monday and "Jayden M" on Tuesday are two separate records with split
-- progress, and until now a mentor had no way to fix either one.
--
-- RLS only ever let a mentor SELECT students in their classroom; there was no
-- UPDATE policy for them and no DELETE policy at all. Rather than widen the
-- policies, these are SECURITY DEFINER functions with an explicit ownership
-- check, because two of the three need logic a policy cannot express: rename has
-- to fail cleanly on the (classroom, lower(nickname)) unique index, and merge
-- has to reconcile two sets of progress rows.
-- ============================================================================

-- Does the caller own the classroom this student belongs to?
create or replace function public.mentor_owns_student(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.students s
    join public.classrooms c on c.id = s.classroom_id
    where s.id = p_student_id and c.created_by = auth.uid()
  );
$$;

-- ----------------------------------------------------------------------------
-- Rename — for typos, and for telling two students with the same name apart.
-- ----------------------------------------------------------------------------
create or replace function public.rename_student(p_student_id uuid, p_name text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name  text := trim(p_name);
  v_class uuid;
begin
  if not public.mentor_owns_student(p_student_id) then
    raise exception 'not_authorized';
  end if;
  if v_name = '' then
    raise exception 'name_required';
  end if;

  select classroom_id into v_class from public.students where id = p_student_id;

  -- Report the clash ourselves; the raw unique-violation message is not
  -- something to put in front of a mentor.
  if exists (
    select 1 from public.students
    where classroom_id = v_class
      and lower(nickname) = lower(v_name)
      and id <> p_student_id
  ) then
    raise exception 'name_taken';
  end if;

  update public.students set nickname = v_name where id = p_student_id;
end;
$$;

-- ----------------------------------------------------------------------------
-- Remove — for a stray record. Progress goes with it (FK is ON DELETE CASCADE),
-- which is the point: this is for cleaning up a duplicate, not for discipline.
-- ----------------------------------------------------------------------------
create or replace function public.remove_student(p_student_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.mentor_owns_student(p_student_id) then
    raise exception 'not_authorized';
  end if;
  delete from public.students where id = p_student_id;
end;
$$;

-- ----------------------------------------------------------------------------
-- Merge — the one that actually solves the typo case. Folds `p_from` into
-- `p_into`, keeping the better of the two records for every activity, then
-- deletes the duplicate.
--
-- "Better" mirrors mergeEntry() in src/lib/progress.ts so the server and the
-- client never disagree: completed beats started, the higher score wins, and
-- the jsonb payloads are unioned.
-- ----------------------------------------------------------------------------
create or replace function public.merge_students(p_from uuid, p_into uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_from_class uuid;
  v_into_class uuid;
begin
  if p_from = p_into then
    raise exception 'same_student';
  end if;
  if not public.mentor_owns_student(p_from) or not public.mentor_owns_student(p_into) then
    raise exception 'not_authorized';
  end if;

  select classroom_id into v_from_class from public.students where id = p_from;
  select classroom_id into v_into_class from public.students where id = p_into;
  if v_from_class is distinct from v_into_class then
    raise exception 'different_classrooms';
  end if;

  insert into public.progress (student_id, activity_slug, status, score, data, updated_at)
  select p_into, f.activity_slug, f.status, f.score, f.data, f.updated_at
  from public.progress f
  where f.student_id = p_from
  on conflict (student_id, activity_slug) do update set
    status = case
               when public.progress.status = 'completed' or excluded.status = 'completed'
               then 'completed' else 'started'
             end,
    -- coalesce to -1 so a NULL score never beats a real one, then back to NULL
    -- if neither side had a score at all.
    score = nullif(
              greatest(coalesce(public.progress.score, -1), coalesce(excluded.score, -1)),
              -1
            ),
    data = public.progress.data || excluded.data,
    updated_at = greatest(public.progress.updated_at, excluded.updated_at);

  delete from public.students where id = p_from;
end;
$$;

revoke all on function public.mentor_owns_student(uuid) from public, anon;
revoke all on function public.rename_student(uuid, text) from public, anon;
revoke all on function public.remove_student(uuid) from public, anon;
revoke all on function public.merge_students(uuid, uuid) from public, anon;
grant execute on function public.rename_student(uuid, text) to authenticated;
grant execute on function public.remove_student(uuid) to authenticated;
grant execute on function public.merge_students(uuid, uuid) to authenticated;
