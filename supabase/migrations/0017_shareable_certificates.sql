-- Shareable, verifiable certificates.
--
-- The certificate has been a private document: the student types a name, the
-- browser draws it, nothing is stored. That is the right default and it stays
-- the default. But a credential nobody else can check is not a credential, and
-- LinkedIn's "add to profile" flow wants a URL a stranger can open to confirm
-- the thing is real.
--
-- So: issuing a shareable certificate is a separate, deliberate act. A student
-- who never presses the button is exactly as private as before. A student who
-- does is publishing their name, their date, and their quiz average at a URL,
-- and the UI says so in those words before they press it.
--
-- Most of these students are minors, so two things are load-bearing here:
--
--   1. The table is unreachable directly. RLS is on with no policies, so the
--      anon key cannot select from it. Both paths go through security-definer
--      functions, and the read one takes an id. You can look up a credential
--      you were given; you cannot enumerate the roster.
--   2. Nothing is stored beyond what the certificate itself shows. No email,
--      no class, no per-lesson scores.

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  -- What the student typed on the certificate. Capped at the same 60 the input
  -- allows, and required to be non-blank.
  display_name text not null
    check (length(btrim(display_name)) between 1 and 60),
  avg_score integer check (avg_score between 0 and 100),
  lessons_passed integer not null check (lessons_passed between 0 and 64),
  -- Set when the issuer is in a class, so a mentor's roster can be reconciled
  -- later. Null for solo students, which is most of them.
  student_id uuid references public.students (id) on delete set null,
  -- Who issued it. Used only to rate-limit and to let the same device find its
  -- own credential again; never returned by the verify function.
  issued_by uuid not null default auth.uid(),
  issued_at timestamptz not null default now()
);

alter table public.certificates enable row level security;
-- Deliberately no policies. See the header: the table is reachable only through
-- the two functions below.

create index if not exists certificates_issued_by_idx on public.certificates (issued_by);

/**
 * Issue a shareable certificate and return its id.
 *
 * Requires a session, which the client creates anonymously if the student does
 * not already have one. That is what makes the rate limit possible at all: an
 * unauthenticated open insert would be a spam endpoint with the anon key
 * printed in the page source.
 */
create or replace function public.issue_certificate(
  p_name text,
  p_avg_score integer,
  p_lessons_passed integer
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  clean_name text := btrim(coalesce(p_name, ''));
  recent integer;
  new_id uuid;
begin
  if auth.uid() is null then
    raise exception 'NOT_SIGNED_IN' using errcode = '42501';
  end if;
  if length(clean_name) < 1 or length(clean_name) > 60 then
    raise exception 'BAD_NAME' using errcode = '22023';
  end if;

  -- A student legitimately re-issues after fixing a typo in their name, so this
  -- is loose enough not to get in the way and tight enough that the endpoint is
  -- not worth abusing.
  select count(*) into recent
    from public.certificates
   where issued_by = auth.uid()
     and issued_at > now() - interval '1 hour';
  if recent >= 5 then
    raise exception 'TOO_MANY' using errcode = '53400';
  end if;

  insert into public.certificates (display_name, avg_score, lessons_passed, student_id)
  values (
    clean_name,
    p_avg_score,
    greatest(0, least(64, coalesce(p_lessons_passed, 0))),
    (select s.id from public.students s where s.auth_uid = auth.uid() limit 1)
  )
  returning id into new_id;

  return new_id;
end;
$$;

revoke all on function public.issue_certificate(text, integer, integer) from public;
grant execute on function public.issue_certificate(text, integer, integer) to authenticated;

/**
 * Read one certificate by id. This is what a LinkedIn viewer, a college
 * admissions officer, or a parent opens.
 *
 * Takes an id and returns one row, so holding a link lets you check that link
 * and nothing else. `issued_by` and `student_id` are never returned.
 */
create or replace function public.verify_certificate(p_id uuid)
returns table (
  display_name text,
  avg_score integer,
  lessons_passed integer,
  issued_at timestamptz
)
language sql
security definer
set search_path = public
stable
as $$
  select c.display_name, c.avg_score, c.lessons_passed, c.issued_at
    from public.certificates c
   where c.id = p_id;
$$;

revoke all on function public.verify_certificate(uuid) from public;
grant execute on function public.verify_certificate(uuid) to anon;
grant execute on function public.verify_certificate(uuid) to authenticated;
