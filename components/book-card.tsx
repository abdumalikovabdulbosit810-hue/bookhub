"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book } from "@/lib/types";
import { discountPercent, formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function BookCard({ book }: { book: Book }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggle = useWishlistStore((state) => state.toggle);
  const wished = useWishlistStore((state) => state.has(book.id));

  return (
    <motion.article layout whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-premium">
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-2 top-2 z-10 h-9 w-9"
        onClick={() => {
          toggle(book.id);
          toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
        }}
        aria-label="Wishlist"
      >
        <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
      </Button>
      <Link href={`/books/${book.slug}`} className="block">
        <div className="relative aspect-[3/4] bg-muted">
          <Image src={book.coverImage} alt={book.title} fill sizes="(max-width: 768px) 50vw, 220px" className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute bottom-2 left-2 flex gap-2">
            {book.promotion && <Badge className="bg-pink-600 text-white">Sale</Badge>}
            <Badge className="bg-amber-400 text-amber-950">-{discountPercent(book.price, book.discountPrice)}%</Badge>
          </div>
        </div>
        <div className="space-y-2 p-3">
          <h3 className="line-clamp-2 min-h-10 text-sm font-bold">{book.title}</h3>
          <p className="text-xs text-muted-foreground">{book.author}</p>
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{book.rating}</span>
            <span className="text-muted-foreground">({book.reviewsCount})</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground line-through">{formatCurrency(book.price)}</p>
            <p className="font-black text-primary">{formatCurrency(book.discountPrice)}</p>
          </div>
        </div>
      </Link>
      <div className="p-3 pt-0">
        <Button
          className="w-full"
          onClick={() => {
            addItem(book);
            toast.success("Added to cart");
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Add
        </Button>
      </div>
    </motion.article>
  );
}
