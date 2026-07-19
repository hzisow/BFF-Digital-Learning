-- ============================================================================
-- 0007_robust_handle_new_user.sql
-- Make profile creation robust for OAuth (Google) team sign-ins:
--   * treat a NULL is_anonymous as non-anonymous (the old `is_anonymous is
--     false` check silently skipped some OAuth users → no profile was created)
--   * fall back to Google's 'name' claim for full_name
-- Then backfill any team accounts that missed profile creation.
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(new.is_anonymous, false) = false then
    insert into public.profiles (id, email, full_name, chapter, approved)
    values (
      new.id,
      new.email,
      coalesce(
        new.raw_user_meta_data ->> 'full_name',
        new.raw_user_meta_data ->> 'name',
        ''
      ),
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

-- Backfill profiles for existing team accounts that never got one.
insert into public.profiles (id, email, full_name, chapter, approved)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name', ''),
  coalesce(u.raw_user_meta_data ->> 'chapter', ''),
  exists (select 1 from public.admin_allowlist a where lower(a.email) = lower(u.email))
from auth.users u
where coalesce(u.is_anonymous, false) = false
  and not exists (select 1 from public.profiles p where p.id = u.id);
