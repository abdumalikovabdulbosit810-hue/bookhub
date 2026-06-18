import { BookCard } from "@/components/book-card";
import { Book } from "@/lib/types";

export function BookGrid({ books }: { books: Book[] }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">{books.map((book) => <BookCard key={book.id} book={book} />)}</div>;
}
