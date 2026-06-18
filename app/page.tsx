"use client";

import Link from "next/link";
import { Avatar, Rate, Statistic } from "antd";
import { Chip } from "@mui/material";
import { BookGrid } from "@/components/book-grid";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { Section } from "@/components/section";
import { books, categories } from "@/lib/books";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const promo = books.find((book) => book.slug === "binafsha-shulasi-2") ?? books[0];
  const top100 = books.filter((book) => book.isTop100).slice(0, 12);
  const bestSellers = books.filter((book) => book.isBestseller).slice(0, 12);
  const newArrivals = books.filter((book) => book.isNew).slice(0, 12);
  const recommended = books.slice(140, 152);
  const authors = Array.from(new Set(books.map((book) => book.author))).slice(0, 12);

  return (
    <>
      <Hero promo={promo} />
      <Section title="Flash Sale" subtitle="Marketplace-style book deals with fast delivery" href="/books?sort=price-asc">
        <BookGrid books={books.slice(0, 12)} />
      </Section>
      <Section title="Categories" subtitle="Browse by reader goal">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {categories.map((category, index) => (
            <Link key={category} href={`/books?category=${encodeURIComponent(category)}`} className="rounded-lg border bg-card p-4 transition hover:-translate-y-1 hover:shadow-premium">
              <Chip label={`${100 + index * 8}+ books`} color="primary" size="small" />
              <h3 className="mt-4 text-lg font-black">{category}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Curated best picks and discounts.</p>
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Top 100 Books" subtitle="Highest demand titles this week" href="/books?sort=popular">
        <BookGrid books={top100} />
      </Section>
      <Section title="Best Sellers" subtitle="Books readers keep ordering" href="/books?sort=popular">
        <BookGrid books={bestSellers} />
      </Section>
      <Section title="Binafsha Shulasi 2 Promotion" subtitle="Special homepage discount with sale badge" href={`/books/${promo.slug}`}>
        <div className="grid gap-6 rounded-lg border bg-card p-5 md:grid-cols-[1fr_320px] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-primary">Limited campaign</p>
            <h2 className="mt-2 text-3xl font-black">{promo.title}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{promo.description}</p>
            <div className="mt-5 grid max-w-xl grid-cols-3 gap-3">
              <Statistic title="Discount price" value={formatCurrency(promo.discountPrice)} />
              <Statistic title="Rating" value={promo.rating} suffix="/5" />
              <Statistic title="In stock" value={promo.stock} />
            </div>
          </div>
          <Link href={`/books/${promo.slug}`} className="rounded-lg bg-primary p-5 text-white shadow-premium">
            <p className="text-sm text-white/80 line-through">{formatCurrency(promo.price)}</p>
            <p className="text-3xl font-black">{formatCurrency(promo.discountPrice)}</p>
            <Rate className="mt-3 text-amber-300" disabled allowHalf defaultValue={promo.rating} />
          </Link>
        </div>
      </Section>
      <Section title="New Arrivals" subtitle="Fresh books added to the shelf" href="/books?sort=new">
        <BookGrid books={newArrivals} />
      </Section>
      <Section title="Recommended Books" subtitle="Editorial picks across all categories" href="/books">
        <BookGrid books={recommended} />
      </Section>
      <Section title="Popular Authors" subtitle="Follow authors readers love">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {authors.map((author, index) => (
            <Link key={author} href={`/books?author=${encodeURIComponent(author)}`} className="rounded-lg border bg-card p-4 text-center hover:shadow-premium">
              <Avatar size={54} style={{ backgroundColor: "#6D28D9" }}>
                {author.slice(0, 1)}
              </Avatar>
              <p className="mt-3 text-sm font-bold">{author}</p>
              <p className="text-xs text-muted-foreground">{20 + index * 4} titles</p>
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Discount Section" subtitle="Budget-friendly reads with strong reviews" href="/books?sort=price-asc">
        <BookGrid books={books.slice(40, 52)} />
      </Section>
      <Newsletter />
    </>
  );
}
