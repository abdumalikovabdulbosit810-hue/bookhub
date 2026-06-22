import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { Book } from "@/entities/book/model";
import { useCartStore } from "@/features/cart/cart-store";
import { useWishlistStore } from "@/features/wishlist/wishlist-store";
import { useI18n } from "@/app/i18n/i18n-store";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { cn, formatCurrency } from "@/shared/lib/utils";

export function BookCard({ book }: { book: Book }) {
  const add = useCartStore((state) => state.add);
  const t = useI18n((state) => state.t);
  const toggleLike = useWishlistStore((state) => state.toggle);
  const liked = useWishlistStore((state) => state.has(book.id));

  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-premium">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <Button
          variant="secondary"
          size="icon"
          className={cn("absolute right-2 top-2 bg-card/85 backdrop-blur", liked && "text-danger")}
          aria-label={t("navLikes")}
          onClick={() => toggleLike(book.id)}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-danger text-danger")} />
        </Button>
        <Badge className="absolute bottom-2 left-2 bg-warning text-slate-950">
          -{Math.round(((book.price - book.discountPrice) / book.price) * 100)}%
        </Badge>
      </div>
      <div className="space-y-2 p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm font-black">{book.title}</h3>
        <p className="text-xs text-muted-foreground">{book.author}</p>
        <div className="flex items-center gap-1 text-xs">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <b>{book.rating}</b>
          <span className="text-muted-foreground">({book.reviews})</span>
        </div>
        <p className="text-xs text-muted-foreground line-through">{formatCurrency(book.price)}</p>
        <p className="text-lg font-black text-primary">{formatCurrency(book.discountPrice)}</p>
        <Button
          className="w-full"
          onClick={() => {
            add(book);
            toast.success(t("addedToCart"));
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          {t("addToCart")}
        </Button>
      </div>
    </Card>
  );
}
