-- ============================================================================
-- 0011_classroom_leaderboard.sql
-- A persistent, privacy-safe class leaderboard. Ranks students in a classroom
-- by XP, computed with the SAME formula the client uses (see src/lib/xp.ts):
--   per completed activity: 50 + floor(score / 2)
-- Returns nicknames only (no PII). SECURITY DEFINER so it can read across
-- students/progress without granting broad table access; visibility is gated to
-- people who belong to the class — a student member, or the owning mentor.
-- ============================================================================

create or replace function public.classroom_leaderboard(p_classroom_id uuid)
returns table (
  student_id uuid,
  nickname text,
  xp bigint,
  activities_completed bigint
)
language sql
security definer
set search_path = public
stable
as $$
  select
    s.id as student_id,
    s.nickname,
    coalesce(sum(50 + floor(coalesce(p.score, 0) / 2)), 0)::bigint as xp,
    count(p.id)::bigint as activities_completed
  from public.students s
  left join public.progress p
    on p.student_id = s.id and p.status = 'completed'
  where s.classroom_id = p_classroom_id
    and (
      -- caller is the mentor who owns this class …
      exists (
        select 1 from public.classrooms c
        where c.id = p_classroom_id and c.created_by = auth.uid()
      )
      -- … or the caller is a student in this same class.
      or exists (
        select 1 from public.students me
        where me.classroom_id = p_classroom_id and me.auth_uid = auth.uid()
      )
    )
  group by s.id, s.nickname
  order by xp desc, activities_completed desc, s.nickname asc;
$$;

revoke all on function public.classroom_leaderboard(uuid) from public;
revoke all on function public.classroom_leaderboard(uuid) from anon;
grant execute on function public.classroom_leaderboard(uuid) to authenticated;
