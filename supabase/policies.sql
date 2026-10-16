-- RLS Policies (Secure)
-- Run after schema.sql and functions.sql

-- Helper: check if user is admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Products: public read active, admin manage
create policy "Anyone can view active products" on products
  for select using (is_active = true);

create policy "Admins manage products" on products
  for all using (public.is_admin()) with check (public.is_admin());

-- Profiles: users update own but cannot change role or points
create policy "Users update own profile safely" on profiles
  for update using (auth.uid() = id)
  with check (
    auth.uid() = id and
    role = (select role from profiles p where p.id = profiles.id) and
    loyalty_points = (select loyalty_points from profiles p where p.id = profiles.id)
  );

-- Orders: users view own, admins manage all
create policy "Admins manage orders" on orders
  for all using (public.is_admin()) with check (public.is_admin());

-- Ratings: users insert own only for delivered orders
create policy "Users insert own ratings" on ratings
  for insert with check (
    auth.uid() = user_id and
    exists (
      select 1 from orders
      where orders.id = ratings.order_id
      and orders.user_id = auth.uid()
      and orders.status = 'delivered'
    )
  );

create policy "Users view own ratings" on ratings
  for select using (auth.uid() = user_id);

-- Notifications
create policy "Users view own notifications" on notifications
  for select using (auth.uid() = user_id);

create policy "Users update own notifications" on notifications
  for update using (auth.uid() = user_id);

-- Order items
create policy "Users view own order items" on order_items
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Loyalty
create policy "Users view own loyalty" on loyalty_transactions
  for select using (auth.uid() = user_id);

-- Cities: public read, admin manage
alter table cities enable row level security;
create policy "Anyone view cities" on cities for select using (true);
create policy "Admins manage cities" on cities
  for all using (public.is_admin()) with check (public.is_admin());
