"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Heart, Menu, Moon, Search, ShoppingCart, Sun, UserRound } from "lucide-react";
import { Badge as AntBadge, Drawer } from "antd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, searchBooks } from "@/lib/books";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function SiteHeader() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const suggestions = useMemo(() => (query ? searchBooks(query).slice(0, 6) : []), [query]);

  const nav = (
    <nav className="flex flex-col gap-3 text-sm font-semibold lg:flex-row lg:items-center">
      <Link href="/books">Books</Link>
      <Link href="/books?sort=popular">Top 100</Link>
      <Link href="/admin">Admin</Link>
      <Link href="/account">Account</Link>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center gap-3">
        <Button className="lg:hidden" variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/" className="flex min-w-fit items-center gap-2 text-xl font-black text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-white">K</span>
          Kitob Market
        </Link>
        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search books, authors, IELTS, programming..." className="h-11 pl-10" />
          {suggestions.length > 0 && (
            <div className="absolute top-12 z-50 w-full rounded-lg border bg-card p-2 shadow-premium">
              {suggestions.map((book) => (
                <Link key={book.id} href={`/books/${book.slug}`} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted" onClick={() => setQuery("")}>
                  <span>{book.title}</span>
                  <span className="text-muted-foreground">{book.author}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="hidden lg:block">{nav}</div>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
          <Sun className="h-5 w-5 dark:hidden" />
          <Moon className="hidden h-5 w-5 dark:block" />
        </Button>
        <Button asChild variant="ghost" size="icon" aria-label="Wishlist">
          <Link href="/account?tab=wishlist">
            <AntBadge count={wishlistCount} size="small">
              <Heart className="h-5 w-5" />
            </AntBadge>
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon" aria-label="Cart">
          <Link href="/cart">
            <AntBadge count={cartCount} size="small">
              <ShoppingCart className="h-5 w-5" />
            </AntBadge>
          </Link>
        </Button>
        <Button asChild className="hidden sm:inline-flex">
          <Link href="/account">
            <UserRound className="h-4 w-4" />
            Profile
          </Link>
        </Button>
      </div>
      <div className="container-x hidden gap-2 overflow-x-auto pb-3 text-sm md:flex">
        {categories.map((category) => (
          <Link key={category} href={`/books?category=${encodeURIComponent(category)}`} className="min-w-fit rounded-md bg-muted px-3 py-2 font-medium hover:bg-secondary">
            {category}
          </Link>
        ))}
      </div>
      <Drawer title="Kitob Market" open={open} onClose={() => setOpen(false)} placement="left">
        {nav}
      </Drawer>
    </header>
  );
}
