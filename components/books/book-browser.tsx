"use client";

import { useEffect, useMemo, useState } from "react";
import { Select, Slider } from "antd";
import { Filter, Search } from "lucide-react";
import { BookGrid } from "@/components/book-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { books, categories, searchBooks } from "@/lib/books";

export function BookBrowser({ initialCategory = "All", initialAuthor = "", initialSort = "popular" }: { initialCategory?: string; initialAuthor?: string; initialSort?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [author, setAuthor] = useState(initialAuthor);
  const [rating, setRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(360000);
  const [sort, setSort] = useState(initialSort);
  const [loading, setLoading] = useState(false);

  const authors = useMemo(() => Array.from(new Set(books.map((book) => book.author))).slice(0, 80), []);
  const result = useMemo(() => {
    return searchBooks(query, { category, author, minRating: rating || undefined, maxPrice, sort }).slice(0, 120);
  }, [query, category, author, rating, maxPrice, sort]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 160);
    return () => clearTimeout(timer);
  }, [query, category, author, rating, maxPrice, sort]);

  return (
    <div className="container-x py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black">Books marketplace</h1>
        <p className="mt-1 text-muted-foreground">Instant search, filters, ratings, authors, and marketplace sorting.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border bg-card p-4">
          <div className="mb-4 flex items-center gap-2 font-black">
            <Filter className="h-5 w-5 text-primary" />
            Filters
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-bold">
              Category
              <Select className="mt-2 w-full" value={category} onChange={setCategory} options={["All", ...categories].map((value) => ({ value, label: value }))} />
            </label>
            <label className="block text-sm font-bold">
              Author
              <Select
                showSearch
                allowClear
                className="mt-2 w-full"
                value={author || undefined}
                onChange={(value) => setAuthor(value ?? "")}
                options={authors.map((value) => ({ value, label: value }))}
              />
            </label>
            <div>
              <p className="text-sm font-bold">Max price</p>
              <Slider min={40000} max={360000} step={10000} value={maxPrice} onChange={setMaxPrice} />
            </div>
            <div>
              <p className="text-sm font-bold">Minimum rating</p>
              <Slider min={0} max={5} step={0.5} value={rating} onChange={setRating} />
            </div>
          </div>
        </aside>
        <section>
          <div className="mb-4 grid gap-3 rounded-lg border bg-card p-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-10" placeholder="Instant search by title, author, category..." />
            </div>
            <Select
              value={sort}
              onChange={setSort}
              options={[
                { value: "popular", label: "Most popular" },
                { value: "rating", label: "Highest rated" },
                { value: "price-asc", label: "Price low to high" },
                { value: "price-desc", label: "Price high to low" }
              ]}
            />
          </div>
          <p className="mb-4 text-sm text-muted-foreground">{result.length} books found</p>
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="aspect-[3/4]" />
              ))}
            </div>
          ) : (
            <BookGrid books={result} />
          )}
        </section>
      </div>
    </div>
  );
}
