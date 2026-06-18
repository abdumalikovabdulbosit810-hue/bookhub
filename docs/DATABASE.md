# Database Schema and Scalability Notes

Use PostgreSQL with row-level security for multi-tenant production deployments.

## Core Tables

```sql
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  email citext not null unique,
  full_name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table roles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  name text not null,
  created_at timestamptz not null default now()
);

create table permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  description text
);

create table role_permissions (
  role_id uuid references roles(id) on delete cascade,
  permission_id uuid references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table user_roles (
  user_id uuid references users(id) on delete cascade,
  role_id uuid references roles(id) on delete cascade,
  primary key (user_id, role_id)
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  search_vector tsvector generated always as (to_tsvector('simple', name || ' ' || coalesce(bio, ''))) stored
);

create table books (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  author_id uuid references authors(id),
  title text not null,
  description text,
  cover_url text,
  price integer not null check (price > 0),
  discount_price integer not null check (discount_price > 0),
  stock integer not null default 0 check (stock >= 0),
  rating numeric not null default 0 check (rating >= 0 and rating <= 5),
  reviews_count integer not null default 0,
  sold_count integer not null default 0,
  search_vector tsvector generated always as (to_tsvector('simple', title || ' ' || coalesce(description, ''))) stored,
  created_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  status text not null default 'new',
  total integer not null check (total >= 0),
  created_at timestamptz not null default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  book_id uuid references books(id),
  quantity integer not null check (quantity > 0),
  unit_price integer not null check (unit_price > 0)
);

create table activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references users(id),
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);
```

## Indexing Strategy

```sql
create index books_category_id_idx on books(category_id);
create index books_author_id_idx on books(author_id);
create index books_price_idx on books(discount_price);
create index books_rating_idx on books(rating desc);
create index books_sold_count_idx on books(sold_count desc);
create index books_search_idx on books using gin(search_vector);
create index authors_search_idx on authors using gin(search_vector);
create index orders_user_created_idx on orders(user_id, created_at desc);
create index activity_logs_created_idx on activity_logs(created_at desc);
```

## Scalability Considerations

- Use read replicas for catalog and analytics reads.
- Keep order creation transactional.
- Use queue workers for email, SMS, inventory reconciliation, and analytics events.
- Partition activity logs and event tables by month at high volume.
- Cache book listing pages and category filters at the edge.
