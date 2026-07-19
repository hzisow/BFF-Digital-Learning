-- ============================================================================
-- 0004_profile_chapter.sql — capture each BFF team member's chapter/region
--
-- Collected on the Create Account form and folded into the profile by the
-- sign-up trigger, alongside full_name.
-- ============================================================================

alter table public.profiles
  add column if not exists chapter text not null default '';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_anonymous is false then
    insert into public.profiles (id, email, full_name, chapter, approved)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data ->> 'full_name', ''),
      coalesce(new.raw_user_meta_data ->> 'chapter', ''),
      exists (
        select 1 from public.admin_allowlist a
        where lower(a.email) = lower(new.email)
      )
    )
    on conflict (id) do nothing;
  end if;
  return new;
end;
$$;
revoke all on function public.handle_new_user() from public;
revoke all on function public.handle_new_user() from anon;
revoke all on function public.handle_new_user() from authenticated;
