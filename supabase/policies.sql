-- Additional RLS Policies
-- Run after schema.sql and functions.sql

-- Products: public read for active products
create policy "Anyone can view active products" on products
  for select using (is_active = true);

-- Ratings: users can insert own ratings
create policy "Users can insert own ratings" on ratings
  for insert with check (auth.uid() = user_id);

create policy "Users can view own ratings" on ratings
  for select using (auth.uid() = user_id);

-- Notifications: users can view and update own
create policy "Users can view own notifications" on notifications
  for select using (auth.uid() = user_id);

create policy "Users can update own notifications" on notifications
  for update using (auth.uid() = user_id);

-- Order items: users can view items of their orders
create policy "Users can view own order items" on order_items
  for select using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Loyalty: users can view own transactions
create policy "Users can view own loyalty" on loyalty_transactions
  for select using (auth.uid() = user_id);

-- Cities: public read
alter table cities enable row level security;
create policy "Anyone can view cities" on cities
  for select using (true);
