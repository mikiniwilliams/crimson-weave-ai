-- Lets authenticated users read THEIR OWN orders so the /my-vault portal
-- can show purchased artifacts.
--
-- Match rule: orders.customer_email = auth.email().
-- Limitation: a customer must sign up to the site with the same email
-- they used at Stripe checkout. When the customer portal evolves, we
-- can add a customer_user_id column populated via the webhook + a
-- "claim by email" flow.

drop policy if exists "Authenticated can read their own orders" on public.orders;
create policy "Authenticated can read their own orders"
  on public.orders
  for select
  to authenticated
  using (customer_email = auth.email());
