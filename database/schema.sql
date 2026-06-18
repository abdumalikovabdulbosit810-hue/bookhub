create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  full_name text,
  phone text,
  role text default 'customer',
  created_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz default now()
);

create table if not exists authors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  bio text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists books (
  id text primary key,
  slug text not null unique,
  title text not null,
  author_id uuid references authors(id),
  category_id uuid references categories(id),
  cover_image text,
  gallery jsonb default '[]',
  description text,
  rating numeric default 0,
  reviews_count integer default 0,
  price integer not null,
  discount_price integer not null,
  stock integer default 0,
  isbn text,
  pages integer,
  language text,
  sold integer default 0,
  is_new boolean default false,
  is_bestseller boolean default false,
  is_top100 boolean default false,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  full_name text not null,
  phone text not null,
  region text not null,
  district text not null,
  address text not null,
  notes text,
  status text default 'new',
  coupon_code text,
  total integer not null,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  book_id text references books(id),
  title text not null,
  quantity integer not null,
  price integer not null
);

create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  book_id text references books(id) on delete cascade,
  rating numeric not null,
  comment text,
  created_at timestamptz default now()
);

create table if not exists wishlist (
  user_id uuid references users(id) on delete cascade,
  book_id text references books(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, book_id)
);

create table if not exists cart (
  user_id uuid references users(id) on delete cascade,
  book_id text references books(id) on delete cascade,
  quantity integer not null default 1,
  updated_at timestamptz default now(),
  primary key (user_id, book_id)
);

create table if not exists coupons (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  discount_percent integer not null,
  active boolean default true,
  expires_at timestamptz
);

create table if not exists promotions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  book_id text references books(id),
  badge text,
  discount_percent integer,
  starts_at timestamptz default now(),
  ends_at timestamptz
);

create index if not exists books_search_idx on books using gin (to_tsvector('english', title || ' ' || coalesce(description, '')));
create index if not exists orders_created_at_idx on orders(created_at desc);
