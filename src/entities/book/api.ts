import { books } from "@/entities/book/data";
import { Book, BookFilters } from "@/entities/book/model";
import { ApiResult, paginationSchema, secureRequest } from "@/shared/api/http";

export async function listBooks(filters: BookFilters): Promise<ApiResult<Book[]>> {
  return secureRequest(async () => {
    paginationSchema.parse({ page: filters.page, pageSize: filters.pageSize, search: filters.search });
    const search = filters.search.toLowerCase();
    let result = books.filter((book) => {
      const matchesSearch = [book.title, book.author, book.category].join(" ").toLowerCase().includes(search);
      const matchesCategory = filters.category === "All" || book.category === filters.category;
      const matchesRating = book.rating >= filters.rating;
      const matchesPrice = book.discountPrice <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesRating && matchesPrice;
    });

    result = [...result].sort((a, b) => {
      if (filters.sort === "rating") return b.rating - a.rating;
      if (filters.sort === "priceAsc") return a.discountPrice - b.discountPrice;
      if (filters.sort === "priceDesc") return b.discountPrice - a.discountPrice;
      if (filters.sort === "newest") return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      return b.sold - a.sold;
    });

    const start = (filters.page - 1) * filters.pageSize;
    return {
      data: result.slice(start, start + filters.pageSize),
      meta: { page: filters.page, pageSize: filters.pageSize, total: result.length }
    };
  });
}

export async function getBook(id: string) {
  return secureRequest(async () => books.find((book) => book.id === id) ?? null);
}
