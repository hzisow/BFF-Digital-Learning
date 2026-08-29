-- Platform statistics for the org dashboard.
--
-- Every other query in this app runs under RLS, where a mentor sees only the
-- classrooms they created. That is right for running a class and useless for
-- running an organization: nobody could answer "how many students are on the
-- platform" without a service key in a browser, which this project will not do.
--
-- So: one security-definer function that returns COUNTS ONLY. No names, no
-- emails, no per-student rows, nothing that identifies a child. It is gated to
-- approved team members, so a pending account (or an anonymous student session,
-- which is authenticated but has no profile) gets nothing.
--
-- Returned as a single jsonb object because a dashboard wants one round trip,
-- not fourteen.

create or replace function public.platform_stats()
returns jsonb
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  core_slugs text[] := array[
    'earning-income', 'spending-budgeting', 'saving-investing', 'credit-debt',
    'risk-insurance', 'financial-decision-making', 'financial-planning',
    'consumer-protection'
  ];
  pass_score constant integer := 85;
  result jsonb;
begin
  if not public.is_approved_admin() then
    raise exception 'NOT_APPROVED' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'generated_at', now(),

    -- People
    'students_total', (select count(*) from public.students),
    'students_active_7d', (
      select count(distinct student_id) from public.progress
       where updated_at > now() - interval '7 days'
    ),
    'students_active_30d', (
      select count(distinct student_id) from public.progress
       where updated_at > now() - interval '30 days'
    ),
    'mentors_approved', (select count(*) from public.profiles where approved),
    'mentors_pending', (select count(*) from public.profiles where not approved),

    -- Classes
    'classrooms_total', (select count(*) from public.classrooms),
    'classrooms_active', (select count(*) from public.classrooms where not archived),
    'schools', (
      select count(distinct lower(btrim(school)))
        from public.classrooms
       where school is not null and btrim(school) <> ''
    ),

    -- Work done. "Completed" counts everything; "passed" is the mastery bar the
    -- course path actually gates on, and the gap between them is the interesting
    -- number.
    'activities_completed', (
      select count(*) from public.progress where status = 'completed'
    ),
    'lessons_completed', (
      select count(*) from public.progress
       where status = 'completed' and activity_slug = any(core_slugs)
    ),
    'lessons_passed', (
      select count(*) from public.progress
       where status = 'completed'
         and activity_slug = any(core_slugs)
         and coalesce(score, 0) >= pass_score
    ),
    'avg_quiz_score', (
      select round(avg(score))::int from public.progress
       where status = 'completed'
         and activity_slug = any(core_slugs)
         and score is not null
    ),

    -- Students who cleared the bar on all eight core lessons, which is exactly
    -- what unlocks the certificate.
    'graduates', (
      select count(*) from (
        select student_id
          from public.progress
         where activity_slug = any(core_slugs)
           and status = 'completed'
           and coalesce(score, 0) >= pass_score
         group by student_id
        having count(distinct activity_slug) = array_length(core_slugs, 1)
      ) g
    ),

    -- Live sessions hosted, across all three kinds.
    'live_sessions', (
      (select count(*) from public.game_sessions)
      + (select count(*) from public.quiz_sessions)
      + (select count(*) from public.live_sessions)
    ),

    -- Joins per week for the last 8 weeks, oldest first, so the dashboard can
    -- draw a trend without a second call.
    'signups_by_week', (
      select coalesce(jsonb_agg(jsonb_build_object('week', wk, 'count', n) order by wk), '[]'::jsonb)
        from (
          select date_trunc('week', created_at)::date as wk, count(*) as n
            from public.students
           where created_at > now() - interval '8 weeks'
           group by 1
        ) w
    ),

    -- Most-finished activities, so the team can see what actually gets used.
    'top_activities', (
      select coalesce(jsonb_agg(jsonb_build_object('slug', activity_slug, 'count', n) order by n desc), '[]'::jsonb)
        from (
          select activity_slug, count(*) as n
            from public.progress
           where status = 'completed'
           group by activity_slug
           order by n desc
           limit 10
        ) t
    )
  ) into result;

  return result;
end;
$$;

revoke all on function public.platform_stats() from public;
revoke all on function public.platform_stats() from anon;
grant execute on function public.platform_stats() to authenticated;

-- The dashboard filters progress by recency and groups students by join week on
-- every load. Both are sequential scans without these.
create index if not exists progress_updated_at_idx on public.progress (updated_at);
create index if not exists students_created_at_idx on public.students (created_at);
