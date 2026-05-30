-- products table for The AI Vision Weaver Vault
-- Run this in Supabase Dashboard → SQL Editor, or via the Supabase CLI:
--   supabase db push

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  category            text not null,
  description         text not null,
  price               text not null,
  cta_label           text not null default 'View Product',
  featured            boolean not null default false,
  status              text not null default 'draft' check (status in ('draft','active','archived')),
  image_url           text,
  slug                text not null unique,
  stripe_payment_link text,
  is_paid_product     boolean not null default true,
  delivery_type       text not null default 'download' check (delivery_type in ('download','booking','community','workshop')),
  sort_order          integer not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists products_status_sort_idx on public.products (status, sort_order);
create index if not exists products_featured_idx    on public.products (featured) where featured;

-- Keep updated_at fresh on every update.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- Row-Level Security
-- Public site reads ACTIVE products with the anon key.
-- Admin writes must happen from the server (service-role key) — never from the browser.
alter table public.products enable row level security;

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
  on public.products
  for select
  using (status = 'active');

-- No insert/update/delete policies for anon. Service-role bypasses RLS, so admin
-- tooling can write through a server route or the SQL editor.
