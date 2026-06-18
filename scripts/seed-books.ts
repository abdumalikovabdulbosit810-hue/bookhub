import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { books, categories } from "../lib/books";
import { slugify } from "../lib/utils";

const output = join(process.cwd(), "database", "seed.sql");
mkdirSync(dirname(output), { recursive: true });

const authors = Array.from(new Set(books.map((book) => book.author)));
const escape = (value: string) => value.replaceAll("'", "''");

const sql = [
  "begin;",
  ...categories.map((category) => `insert into categories (name, slug) values ('${escape(category)}', '${slugify(category)}') on conflict (slug) do nothing;`),
  ...authors.map((author) => `insert into authors (name, bio) values ('${escape(author)}', '${escape(`${author} is featured on Kitob Market.`)}');`),
  ...books.map(
    (book) => `insert into books (id, slug, title, cover_image, gallery, description, rating, reviews_count, price, discount_price, stock, isbn, pages, language, sold, is_new, is_bestseller, is_top100)
values ('${book.id}', '${book.slug}', '${escape(book.title)}', '${book.coverImage}', '${JSON.stringify(book.gallery)}', '${escape(book.description)}', ${book.rating}, ${book.reviewsCount}, ${book.price}, ${book.discountPrice}, ${book.stock}, '${book.isbn}', ${book.pages}, '${book.language}', ${book.sold}, ${book.isNew ?? false}, ${book.isBestseller ?? false}, ${book.isTop100 ?? false})
on conflict (id) do update set price = excluded.price, discount_price = excluded.discount_price, stock = excluded.stock;`
  ),
  "insert into coupons (code, discount_percent, active) values ('KITOB10', 10, true) on conflict (code) do update set active = true;",
  "insert into promotions (title, book_id, badge, discount_percent) values ('Binafsha Shulasi 2', 'promo-binafsha-shulasi-2', 'Mega sale', 40);",
  "commit;"
].join("\n");

writeFileSync(output, sql);
console.log(`Generated ${books.length} books at ${output}`);
