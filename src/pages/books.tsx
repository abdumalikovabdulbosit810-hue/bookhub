import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { listBooks } from "@/entities/book/api";
import { categories } from "@/entities/book/data";
import { BookFilters, Category } from "@/entities/book/model";
import { categoryKeys } from "@/app/i18n/translations";
import { useI18n } from "@/app/i18n/i18n-store";
import { BookCard } from "@/widgets/book-card";
import { Card } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";

export function BooksPage() {
  const t = useI18n((state) => state.t);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<BookFilters["category"]>("All");
  const loadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 280);
    return () => window.clearTimeout(timer);
  }, [search]);

  const baseFilters = useMemo<Omit<BookFilters, "page">>(
    () => ({
      search: debouncedSearch,
      category,
      rating: 0,
      maxPrice: 400000,
      sort: "popular",
      pageSize: 30
    }),
    [debouncedSearch, category]
  );

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["books", baseFilters],
    queryFn: ({ pageParam }) => listBooks({ ...baseFilters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.meta?.hasMore ? (last.meta.page ?? 1) + 1 : undefined)
  });

  const books = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const node = loadRef.current;
    if (!node || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { rootMargin: "400px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <main className="container-page py-8">
      <div className="mb-6 max-w-3xl">
        <h1 className="font-serif text-4xl font-black md:text-5xl">{t("navBooks")}</h1>
        <p className="mt-2 text-muted-foreground">{t("booksSubtitle")}</p>
      </div>

      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder={t("search")}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-12 rounded-full border-2 pl-12 text-base shadow-soft"
        />
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategory("All")}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition",
            category === "All" && "border-primary bg-primary text-white"
          )}
        >
          {t("all")}
        </button>
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item as Category)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition",
              category === item && "border-primary bg-primary text-white"
            )}
          >
            {t(categoryKeys[item])}
          </button>
        ))}
      </div>

      {isError && <Card className="border-danger p-5 text-danger">{t("emptyTitle")}</Card>}

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[3/4]" />
          ))}
        </div>
      ) : books.length ? (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div ref={loadRef} className="py-8 text-center text-sm text-muted-foreground">
            {isFetchingNextPage ? t("loadMore") : hasNextPage ? "" : "—"}
          </div>
        </>
      ) : (
        <EmptyState title={t("emptyTitle")} description={t("emptyDescription")} />
      )}
    </main>
  );
}
