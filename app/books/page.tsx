import { Metadata } from "next";
import { BookBrowser } from "@/components/books/book-browser";

export const metadata: Metadata = {
  title: "Books",
  description: "Search and filter 1000+ books on Kitob Market."
};

export default async function BooksPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  return <BookBrowser initialCategory={params.category ?? "All"} initialAuthor={params.author ?? ""} initialSort={params.sort ?? "popular"} />;
}
