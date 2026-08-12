-- The trading game was called "Wolf of Wall Street" after the film. It is now
-- "Market Movers", named for what the game actually does: breaking news moves
-- the prices and you live with the result.
--
-- The film is R-rated and its subject is a convicted securities fraudster,
-- which is a strange thing for a financial-literacy nonprofit to put in front
-- of middle and high schoolers, and the opposite of what the game teaches.
--
-- This renames the stored activity slug everywhere it is used as a key, so a
-- student's score and a mentor's assignment both follow the game across the
-- rename instead of being orphaned under a name nothing looks up any more.

update public.progress
   set activity_slug = 'market-movers'
 where activity_slug = 'wolf-of-wall-street';

update public.assignments
   set activity_slug = 'market-movers'
 where activity_slug = 'wolf-of-wall-street';

update public.live_sessions
   set activity_slug = 'market-movers'
 where activity_slug = 'wolf-of-wall-street';

-- `kind` stays 'wolf': it selects which host and player screens to render and
-- is never shown to anyone. Changing it would invalidate live sessions for no
-- visible gain.
create or replace function public.find_live_session(p_code text)
returns table (kind text, code text, activity_slug text)
language sql
security definer
set search_path = public
stable
as $$
  select 'wolf'::text as kind, code, 'market-movers'::text as activity_slug
    from public.game_sessions where code = upper(p_code)
  union all
  select 'quiz'::text, code, lesson_slug from public.quiz_sessions where code = upper(p_code)
  union all
  select 'coplay'::text, code, activity_slug from public.live_sessions where code = upper(p_code)
  limit 1;
$$;
revoke all on function public.find_live_session(text) from public;
revoke all on function public.find_live_session(text) from anon;
grant execute on function public.find_live_session(text) to authenticated;
