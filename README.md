# Kitob Market

Kitob Market is a production-ready Next.js 15 bookstore marketplace scaffold focused entirely on books. It includes a premium purple marketplace UI, 1000+ generated seeded book records, cart and checkout, account pages, an admin dashboard, Supabase/PostgreSQL schema, Redux Toolkit, Zustand, Shadcn-style components, Material UI, and Ant Design.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Run `database/schema.sql` in the SQL editor.
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Generate seed SQL:

```bash
npm run seed
```

5. Run the generated `database/seed.sql` in Supabase.

Checkout stores orders in Supabase when environment variables are configured. Without Supabase keys, checkout falls back to local browser storage for demo mode.

## Architecture

- `app/` contains the Next.js App Router pages and API route.
- `components/` contains reusable UI, layout, product, and marketplace sections.
- `lib/books.ts` generates 1000+ books across Business, Programming, IELTS, English Learning, Self Development, Finance, Psychology, Novels, Fantasy, and Technology.
- `store/cart-store.ts` and `store/wishlist-store.ts` use Zustand for persistent shopping state.
- `store/redux-store.ts` uses Redux Toolkit for global UI/search state.
- `database/schema.sql` defines users, books, categories, authors, orders, order items, reviews, wishlist, cart, coupons, and promotions.
- `scripts/seed-books.ts` creates `database/seed.sql` for Supabase/PostgreSQL.

## Included pages

- Home with hero, flash sale, top 100, best sellers, new arrivals, categories, recommendations, authors, discount section, newsletter, and “Binafsha Shulasi 2” promotion.
- Books page with instant search, category, author, price, rating, and sorting filters.
- Product page with gallery, reviews, ratings, similar books, cart, wishlist, buy now, delivery information, and author details.
- Cart and checkout with coupon support and order total calculation.
- Account dashboard with profile, orders, wishlist, addresses, notifications, and settings.
- Admin dashboard with statistics and CRUD-ready management sections for books, categories, authors, orders, users, and promotions.
