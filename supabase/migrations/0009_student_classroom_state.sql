-- ============================================================================
-- 0009_student_classroom_state.sql
-- Lets a student check whether their own classroom is still open (not archived).
-- SECURITY DEFINER so it can read classrooms without granting students broad
-- select on that table; only returns a row when the caller owns the student.
-- ============================================================================

create or replace function public.student_classroom_state(p_student_id uuid)
returns table (archived boolean, classroom_name text)
language sql
security definer
set search_path = public
stable
as $$
  select c.archived, c.name
  from public.students s
  join public.classrooms c on c.id = s.classroom_id
  where s.id = p_student_id and s.auth_uid = auth.uid();
$$;
revoke all on function public.student_classroom_state(uuid) from public;
revoke all on function public.student_classroom_state(uuid) from anon;
grant execute on function public.student_classroom_state(uuid) to authenticated;
