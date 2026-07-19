-- ============================================================================
-- 0005_admin_approval_dashboard.sql
-- Let approved admins see + approve pending team members from the dashboard.
-- (Approving via the Supabase table / approve_admin() still works too.)
-- ============================================================================

-- SECURITY DEFINER helper so RLS policies can check "is the caller approved?"
-- without recursively triggering profiles' own RLS.
create or replace function public.is_approved_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select approved from public.profiles where id = auth.uid()), false);
$$;
revoke all on function public.is_approved_admin() from public;
revoke all on function public.is_approved_admin() from anon;
grant execute on function public.is_approved_admin() to authenticated;

-- Approved admins can read every profile (to list pending requests); everyone
-- else still only sees their own.
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_approved_admin());

-- Approve a pending member: flips their profile and adds them to the allowlist.
-- Callable only by an already-approved admin.
create or replace function public.approve_team_member(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
begin
  if not public.is_approved_admin() then
    raise exception 'not_authorized';
  end if;
  update public.profiles set approved = true
    where id = p_user_id
    returning email into v_email;
  if v_email is not null then
    insert into public.admin_allowlist (email, note)
    values (lower(v_email), 'approved via dashboard')
    on conflict (email) do nothing;
  end if;
end;
$$;
revoke all on function public.approve_team_member(uuid) from public;
revoke all on function public.approve_team_member(uuid) from anon;
grant execute on function public.approve_team_member(uuid) to authenticated;
