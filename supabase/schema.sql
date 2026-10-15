-- Gaz Aron Full Database Schema
-- Run this in Supabase SQL Editor

-- Cities
create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Profiles (extends auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  email text,
  city_id uuid references cities,
  loyalty_points int default 0,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  size_kg numeric,
  price numeric not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  city_id uuid references cities,
  status text default 'pending' check (status in ('pending', 'confirmed', 'delivering', 'delivered', 'cancelled')),
  payment_method text check (payment_method in ('electronic', 'cash_on_delivery')),
  total_amount numeric not null,
  delivery_fee numeric default 5,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order Items
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders on delete cascade,
  product_id uuid references products,
  quantity int default 1,
  price numeric not null,
  is_exchange boolean default false
);

-- Ratings
create table if not exists ratings (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders unique,
  user_id uuid references profiles,
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- Notifications
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  title text not null,
  body text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Contact Messages
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text not null,
  created_at timestamptz default now()
);

-- Loyalty Transactions
create table if not exists loyalty_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  points int not null,
  reason text,
  order_id uuid references orders,
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table ratings enable row level security;
alter table notifications enable row level security;

-- Basic policies (expand as needed)
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders" on orders for insert with check (auth.uid() = user_id);
