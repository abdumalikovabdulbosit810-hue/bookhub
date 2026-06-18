"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Book } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function ProductActions({ book }: { book: Book }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggle = useWishlistStore((state) => state.toggle);

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      <Button
        size="lg"
        onClick={() => {
          addItem(book);
          toast.success("Added to cart");
        }}
      >
        <ShoppingCart className="h-5 w-5" />
        Add to cart
      </Button>
      <Button
        size="lg"
        variant="secondary"
        onClick={() => {
          addItem(book);
          toast.success("Ready for checkout");
        }}
        asChild
      >
        <Link href="/checkout">
          <Zap className="h-5 w-5" />
          Buy now
        </Link>
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => {
          toggle(book.id);
          toast.success("Wishlist updated");
        }}
      >
        <Heart className="h-5 w-5" />
        Wishlist
      </Button>
    </div>
  );
}
