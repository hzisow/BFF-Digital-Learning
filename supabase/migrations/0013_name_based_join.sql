-- ============================================================================
-- 0013_name_based_join.sql
-- Students identify with a first name and a last initial ("Jayden M.") instead
-- of a nickname plus an optional 4-digit PIN.
--
-- The PIN was friction at the worst moment — a room of students inventing a
-- nickname, then inventing and confirming a number — and it left mentors
-- reading a roster of "JayJay" and "xX_money_Xx" with no idea who was who.
--
-- Nothing about the schema needs to change: identity is still
-- (classroom_id, lower(nickname)), and the composed name goes in that column.
-- What has to change is the PIN enforcement. There is no PIN box in the app any
-- more, so a record created before this change — one already exists — would
-- raise `pin_required` forever and lock that student out of their own name with
-- no way to satisfy the check.
--
-- So: stop enforcing, and clear the stored hashes. The trade-off is deliberate
-- and follows from the product decision — with no PIN, anyone holding the class
-- code can claim a name in that class. That is acceptable for a mentor-supervised
-- classroom, and it is the same level of protection a paper sign-in sheet gives.
--
-- p_pin is kept in the signature (ignored) so an older cached build of the app
-- keeps working through a deploy instead of erroring on an unknown argument.
-- ============================================================================

create or replace function public.join_classroom(
  p_code text,
  p_nickname text,
  p_pin text default null   -- accepted and ignored; see header
)
returns table (student_id uuid, classroom_id uuid, classroom_name text, reconnected boolean)
language plpgsql
security definer
set search_path = public, extensions
as $$
#variable_conflict use_column
declare
  c public.classrooms%rowtype;
  s public.students%rowtype;
  v_nick text := trim(p_nickname);
begin
  if v_nick = '' then
    raise exception 'name_required';
  end if;

  select * into c from public.classrooms where code = upper(p_code) and archived = false;
  if not found then
    raise exception 'classroom_not_found';
  end if;

  select * into s from public.students
    where classroom_id = c.id and lower(nickname) = lower(v_nick)
    limit 1;

  if found then
    -- Same name, same class: this is the student coming back, possibly on a
    -- different device. Re-point the record at their current session so RLS
    -- keeps working, and hand back their existing progress.
    update public.students set auth_uid = auth.uid() where id = s.id;
    return query select s.id, c.id, c.name, true;
  else
    insert into public.students (classroom_id, auth_uid, nickname)
    values (c.id, auth.uid(), v_nick)
    returning * into s;
    return query select s.id, c.id, c.name, false;
  end if;
end;
$$;

revoke all on function public.join_classroom(text, text, text) from public;
revoke all on function public.join_classroom(text, text, text) from anon;
grant execute on function public.join_classroom(text, text, text) to authenticated;

-- Retire the stored hashes. Leaving them would do nothing except make a future
-- reader think PINs are still in play.
update public.students set pin_hash = null where pin_hash is not null;
