-- ============================================================================
-- 0008_durable_student_reconnect.sql
-- Durable, portable student records: identity becomes (classroom, nickname)
-- (+ optional PIN) instead of the anonymous browser session. A student can
-- rejoin from any device / after a wipe and get their record + progress back.
-- Still no emails, no PII.
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;

-- Optional PIN (hashed) so nicknames can't be casually impersonated.
alter table public.students add column if not exists pin_hash text;

-- Identity is now (classroom_id, nickname), not (classroom_id, auth_uid):
--  * drop the old per-session uniqueness (it blocked shared devices)
--  * one nickname per classroom, case-insensitive
alter table public.students drop constraint if exists students_classroom_id_auth_uid_key;
create unique index if not exists students_classroom_nick_key
  on public.students (classroom_id, lower(nickname));

-- Reconnect-or-create. Verifies PIN when one is set; re-points the record at
-- the caller's current session so RLS keeps working on the new device.
drop function if exists public.join_classroom(text, text);
create or replace function public.join_classroom(
  p_code text,
  p_nickname text,
  p_pin text default null
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
  v_pin  text := nullif(trim(coalesce(p_pin, '')), '');
begin
  select * into c from public.classrooms where code = upper(p_code) and archived = false;
  if not found then
    raise exception 'classroom_not_found';
  end if;

  select * into s from public.students
    where classroom_id = c.id and lower(nickname) = lower(v_nick)
    limit 1;

  if found then
    if s.pin_hash is not null then
      if v_pin is null then raise exception 'pin_required'; end if;
      if s.pin_hash <> crypt(v_pin, s.pin_hash) then raise exception 'pin_incorrect'; end if;
    elsif v_pin is not null then
      update public.students set pin_hash = crypt(v_pin, gen_salt('bf')) where id = s.id;
    end if;
    update public.students set auth_uid = auth.uid() where id = s.id;
    return query select s.id, c.id, c.name, true;
  else
    insert into public.students (classroom_id, auth_uid, nickname, pin_hash)
    values (
      c.id, auth.uid(), v_nick,
      case when v_pin is not null then crypt(v_pin, gen_salt('bf')) else null end
    )
    returning * into s;
    return query select s.id, c.id, c.name, false;
  end if;
end;
$$;

revoke all on function public.join_classroom(text, text, text) from public;
revoke all on function public.join_classroom(text, text, text) from anon;
grant execute on function public.join_classroom(text, text, text) to authenticated;
