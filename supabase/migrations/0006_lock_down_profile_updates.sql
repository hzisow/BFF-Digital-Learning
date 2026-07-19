-- ============================================================================
-- 0006_lock_down_profile_updates.sql
-- Security: a signed-in user may edit only their own name/chapter — never the
-- `approved` flag (which would let them self-approve as an admin). RLS still
-- limits them to their own row; column grants limit WHICH columns.
-- ============================================================================

revoke update on public.profiles from authenticated;
grant update (full_name, chapter) on public.profiles to authenticated;
