import { getBookById } from "@/entities/book/generator";
import { useWishlistStore } from "@/features/wishlist/wishlist-store";
import { useI18n } from "@/app/i18n/i18n-store";
import { BookCard } from "@/widgets/book-card";
import { EmptyState } from "@/shared/ui/empty-state";

export function LikesPage() {
  const t = useI18n((state) => state.t);
  const ids = useWishlistStore((state) => state.ids);
  const books = ids.map((id) => getBookById(id)).filter(Boolean);

  return (
    <main className="container-page py-8">
      <div className="mb-6">
        <h1 className="font-serif text-4xl font-black md:text-5xl">{t("likesTitle")}</h1>
        <p className="mt-2 text-muted-foreground">{t("likesSubtitle")}</p>
      </div>
      {books.length ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          {books.map((book) => (
            <BookCard key={book!.id} book={book!} />
          ))}
        </div>
      ) : (
        <EmptyState title={t("likesEmpty")} description={t("likesEmptyHint")} />
      )}
    </main>
  );
}
