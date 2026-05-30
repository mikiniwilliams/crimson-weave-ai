-- Adds stripe_price_id + RLS policies so authenticated users can manage products.
-- Run after 001_products.sql.
--
-- NOTE on the admin model: for now, ANY authenticated Supabase user can write
-- to public.products. That's fine while only the owner has an account. As soon
-- as you add a second user, tighten this — either:
--   (a) Add an `admins` table keyed by user_id and join in the policies, or
--   (b) Use Supabase custom JWT claims (e.g. role = 'admin').
-- The policies below are scoped to "authenticated" so they're easy to tighten later.

alter table public.products
  add column if not exists stripe_price_id text;

-- Authenticated users can read every row (including drafts/archived) for admin views.
drop policy if exists "Authenticated can read all products" on public.products;
create policy "Authenticated can read all products"
  on public.products
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can insert products" on public.products;
create policy "Authenticated can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete products" on public.products;
create policy "Authenticated can delete products"
  on public.products
  for delete
  to authenticated
  using (true);
