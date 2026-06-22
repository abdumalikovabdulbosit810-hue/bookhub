import { BOOK_COUNT, categories, generateBook } from "@/entities/book/generator";
import { Book, BookFilters } from "@/entities/book/model";
import { ApiResult, paginationSchema, secureRequest } from "@/shared/api/http";

const BOOKS_PER_CATEGORY = BOOK_COUNT / categories.length;

function matchesFilters(book: Book, filters: BookFilters) {
  const search = filters.search.toLowerCase();
  const matchesSearch = !search || [book.title, book.author, book.category].join(" ").toLowerCase().includes(search);
  const matchesRating = book.rating >= filters.rating;
  const matchesPrice = book.discountPrice <= filters.maxPrice;
  return matchesSearch && matchesRating && matchesPrice;
}

function compareBooks(a: Book, b: Book, sort: BookFilters["sort"]) {
  if (sort === "rating") return b.rating - a.rating;
  if (sort === "priceAsc") return a.discountPrice - b.discountPrice;
  if (sort === "priceDesc") return b.discountPrice - a.discountPrice;
  if (sort === "newest") return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  return b.sold - a.sold;
}

function collectMatches(filters: BookFilters): Book[] {
  const matched: Book[] = [];

  if (filters.category === "All") {
    for (let i = 0; i < BOOK_COUNT; i++) {
      const book = generateBook(i);
      if (matchesFilters(book, filters)) matched.push(book);
    }
  } else {
    const categoryIndex = categories.indexOf(filters.category);
    for (let j = 0; j < BOOKS_PER_CATEGORY; j++) {
      const i = categoryIndex + j * categories.length;
      const book = generateBook(i);
      if (matchesFilters(book, filters)) matched.push(book);
    }
  }

  matched.sort((a, b) => compareBooks(a, b, filters.sort));
  return matched;
}

export async function listBooks(filters: BookFilters): Promise<ApiResult<Book[]>> {
  return secureRequest(async () => {
    paginationSchema.parse({ page: filters.page, pageSize: filters.pageSize, search: filters.search });
    const matched = collectMatches(filters);
    const start = (filters.page - 1) * filters.pageSize;
    return {
      data: matched.slice(start, start + filters.pageSize),
      meta: { page: filters.page, pageSize: filters.pageSize, total: matched.length, hasMore: start + filters.pageSize < matched.length }
    };
  });
}

export async function getBook(id: string) {
  const index = Number(id);
  if (!Number.isInteger(index) || index < 0 || index >= BOOK_COUNT) {
    return secureRequest(async () => null);
  }
  return secureRequest(async () => generateBook(index));
}
