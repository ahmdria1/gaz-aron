-- Gaz Aron Database Functions
-- Run after schema.sql

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Create order with transaction (secure - uses auth.uid())
create or replace function public.create_order(
  p_product_id uuid,
  p_quantity int,
  p_payment_method text,
  p_is_exchange boolean default false
)
returns json as $$
declare
  v_user_id uuid := auth.uid();
  v_product record;
  v_order record;
  v_total numeric;
  v_delivery_fee numeric := 5;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select * into v_product from products
  where id = p_product_id and is_active = true;

  if not found then
    raise exception 'Product not found or inactive';
  end if;

  if p_quantity < 1 then
    raise exception 'Quantity must be at least 1';
  end if;

  v_total := v_product.price * p_quantity + v_delivery_fee;

  insert into orders (user_id, status, payment_method, total_amount, delivery_fee)
  values (v_user_id, 'pending', p_payment_method, v_total, v_delivery_fee)
  returning * into v_order;

  insert into order_items (order_id, product_id, quantity, price, is_exchange)
  values (v_order.id, p_product_id, p_quantity, v_product.price, p_is_exchange);

  insert into loyalty_transactions (user_id, points, reason, order_id)
  values (v_user_id, 10, 'order', v_order.id);

  update profiles set loyalty_points = loyalty_points + 10 where id = v_user_id;

  insert into notifications (user_id, title, body)
  values (v_user_id, 'تم استلام طلبك', 'طلبك بقيمة ⃁ ' || v_total || ' قيد المعالجة');

  return row_to_json(v_order);
end;
$$ language plpgsql security definer;

-- Indexes
create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_created_at on orders(created_at desc);
create index if not exists idx_products_active on products(is_active);
create index if not exists idx_notifications_user on notifications(user_id, is_read);
