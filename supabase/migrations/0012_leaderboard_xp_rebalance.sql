-- ============================================================================
-- 0012_leaderboard_xp_rebalance.sql
-- Rebalances leaderboard XP to match the mastery-weighted client formula
-- (src/lib/xp.ts) and fixes a bug in 0011: the LEFT JOIN made a student with
-- ZERO completed activities score 50 XP (a single all-NULL join row summed to
-- 50). Now unmatched rows contribute 0.
--   completed with a score : 10 + floor(score * 9 / 10)
--   completed, no score     : 50
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
    coalesce(
      sum(
        case
          when p.id is null then 0
          when p.score is null then 50
          else 10 + floor((greatest(0, least(100, p.score)) * 9)::numeric / 10)
        end
      ),
      0
    )::bigint as xp,
    count(p.id)::bigint as activities_completed
  from public.students s
  left join public.progress p
    on p.student_id = s.id and p.status = 'completed'
  where s.classroom_id = p_classroom_id
    and (
      exists (
        select 1 from public.classrooms c
        where c.id = p_classroom_id and c.created_by = auth.uid()
      )
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
