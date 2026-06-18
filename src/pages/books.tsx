import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { listBooks } from "@/entities/book/api";
import { categories } from "@/entities/book/data";
import { BookFilters } from "@/entities/book/model";
import { useI18n } from "@/app/i18n/i18n-store";
import { BookCard } from "@/widgets/book-card";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";

export function BooksPage() {
  const t = useI18n((state) => state.t);
  const [filters, setFilters] = useState<BookFilters>({
    search: "",
    category: "All",
    rating: 0,
    maxPrice: 400000,
    sort: "popular",
    page: 1,
    pageSize: 24
  });

  const queryKey = useMemo(() => ["books", filters], [filters]);
  const { data, isLoading, isError } = useQuery({ queryKey, queryFn: () => listBooks(filters) });
  const totalPages = Math.max(1, Math.ceil((data?.meta?.total ?? 0) / filters.pageSize));

  return (
    <main className="container-page py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-black">{t("navBooks")}</h1>
        <p className="mt-1 text-muted-foreground">Search, filter, sort, and paginate through the marketplace catalog.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <Card className="h-fit p-4">
          <h2 className="font-black">{t("filters")}</h2>
          <div className="mt-4 space-y-4">
            <label className="block text-sm font-bold">
              {t("category")}
              <select className="mt-2 h-11 w-full rounded-md border bg-card px-3" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value as BookFilters["category"], page: 1 })}>
                <option>All</option>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label className="block text-sm font-bold">
              {t("rating")}
              <input type="range" min="0" max="5" step="0.5" value={filters.rating} onChange={(event) => setFilters({ ...filters, rating: Number(event.target.value), page: 1 })} className="mt-3 w-full accent-primary" />
            </label>
            <label className="block text-sm font-bold">
              {t("price")}
              <input type="range" min="50000" max="400000" step="10000" value={filters.maxPrice} onChange={(event) => setFilters({ ...filters, maxPrice: Number(event.target.value), page: 1 })} className="mt-3 w-full accent-primary" />
            </label>
            <label className="block text-sm font-bold">
              {t("sort")}
              <select className="mt-2 h-11 w-full rounded-md border bg-card px-3" value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value as BookFilters["sort"] })}>
                <option value="popular">Popular</option>
                <option value="rating">Rating</option>
                <option value="priceAsc">Price low</option>
                <option value="priceDesc">Price high</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
        </Card>
        <section>
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input placeholder={t("search")} value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value, page: 1 })} className="pl-10" />
          </div>
          {isError && <Card className="border-danger p-5 text-danger">Error state: the catalog API could not be loaded.</Card>}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">{Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} className="aspect-[3/4]" />)}</div>
          ) : data?.data.length ? (
            <>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">{data.data.map((book) => <BookCard key={book.id} book={book} />)}</div>
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button variant="outline" disabled={filters.page === 1} onClick={() => setFilters({ ...filters, page: filters.page - 1 })}><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-sm font-bold">Page {filters.page} / {totalPages}</span>
                <Button variant="outline" disabled={filters.page === totalPages} onClick={() => setFilters({ ...filters, page: filters.page + 1 })}><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </>
          ) : (
            <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
          )}
        </section>
      </div>
    </main>
  );
}
