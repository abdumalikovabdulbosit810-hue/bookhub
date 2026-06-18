"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCartTotals, useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, coupon, removeItem, updateQuantity, applyCoupon } = useCartStore();
  const totals = getCartTotals(items, coupon);

  return (
    <div className="container-x py-8">
      <h1 className="text-3xl font-black">Cart</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.length === 0 && (
            <div className="rounded-lg border bg-card p-8 text-center">
              <p className="font-bold">Your cart is empty</p>
              <Button asChild className="mt-4">
                <Link href="/books">Browse books</Link>
              </Button>
            </div>
          )}
          {items.map((item) => (
            <div key={item.book.id} className="grid gap-4 rounded-lg border bg-card p-4 sm:grid-cols-[90px_1fr_auto]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
                <Image src={item.book.coverImage} alt={item.book.title} fill sizes="90px" className="object-cover" />
              </div>
              <div>
                <Link href={`/books/${item.book.slug}`} className="font-black hover:text-primary">{item.book.title}</Link>
                <p className="text-sm text-muted-foreground">{item.book.author}</p>
                <p className="mt-2 font-bold text-primary">{formatCurrency(item.book.discountPrice)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.book.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.book.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.book.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-lg border bg-card p-5">
          <h2 className="text-xl font-black">Order summary</h2>
          <div className="mt-4 flex gap-2">
            <Input placeholder="Coupon KITOB10" defaultValue={coupon} onBlur={(event) => applyCoupon(event.target.value)} />
            <Button onClick={() => applyCoupon("KITOB10")}>Apply</Button>
          </div>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><b>{formatCurrency(totals.subtotal)}</b></div>
            <div className="flex justify-between"><span>Coupon</span><b>-{formatCurrency(totals.discount)}</b></div>
            <div className="flex justify-between"><span>Delivery</span><b>{formatCurrency(totals.delivery)}</b></div>
            <div className="flex justify-between border-t pt-3 text-lg"><span>Total</span><b>{formatCurrency(totals.total)}</b></div>
          </div>
          <Button asChild size="lg" className="mt-5 w-full" disabled={items.length === 0}>
            <Link href="/checkout">Checkout</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
