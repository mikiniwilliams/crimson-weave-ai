-- Orders captured from Stripe webhook events.
-- Writes happen ONLY from the server using the service-role key
-- (which bypasses RLS). The anon role cannot read or write this table
-- by default. When the customer portal lands, add a SELECT policy that
-- joins on customer_email = auth.email() (or via a customer_user_id link).

create table if not exists public.orders (
  id                        uuid primary key default gen_random_uuid(),

  -- Stripe identifiers
  stripe_session_id         text unique,
  stripe_payment_intent_id  text,
  stripe_customer_id        text,

  -- Customer + product
  customer_email            text,
  product_slug              text,
  product_id                uuid references public.products(id) on delete set null,

  -- Money
  amount_total              integer,                  -- in smallest currency unit (cents)
  currency                  text default 'usd',

  -- Lifecycle
  status                    text not null default 'pending'
    check (status in ('pending','succeeded','failed','refunded')),

  -- Free-form blob for raw event metadata we want to keep around
  metadata                  jsonb not null default '{}'::jsonb,

  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create index if not exists orders_email_idx   on public.orders (customer_email);
create index if not exists orders_session_idx on public.orders (stripe_session_id);
create index if not exists orders_status_idx  on public.orders (status);

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

alter table public.orders enable row level security;

-- Intentionally no anon or authenticated policies yet.
-- Service-role key (used only by the webhook handler) bypasses RLS.
