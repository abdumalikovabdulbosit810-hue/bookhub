"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCartTotals, useCartStore } from "@/store/cart-store";
import { createOrder } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, coupon, clear } = useCartStore();
  const totals = getCartTotals(items, coupon);
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    if (items.length === 0) return toast.error("Cart is empty");
    setLoading(true);
    try {
      await createOrder({
        fullName: String(formData.get("fullName")),
        phone: String(formData.get("phone")),
        region: String(formData.get("region")),
        district: String(formData.get("district")),
        address: String(formData.get("address")),
        notes: String(formData.get("notes") ?? ""),
        items,
        total: totals.total,
        coupon
      });
      clear();
      toast.success("Order saved");
      router.push("/account?tab=orders");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-x py-8">
      <h1 className="text-3xl font-black">Checkout</h1>
      <form action={submit} className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4 rounded-lg border bg-card p-5 md:grid-cols-2">
          {[
            ["fullName", "Full name"],
            ["phone", "Phone number"],
            ["region", "Region"],
            ["district", "District"],
            ["address", "Address"],
            ["notes", "Notes"]
          ].map(([name, label]) => (
            <label key={name} className={name === "address" || name === "notes" ? "md:col-span-2" : ""}>
              <span className="text-sm font-bold">{label}</span>
              <Input name={name} required={name !== "notes"} className="mt-2" />
            </label>
          ))}
        </div>
        <aside className="h-fit rounded-lg border bg-card p-5">
          <h2 className="text-xl font-black">Total</h2>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.book.id} className="flex justify-between gap-3">
                <span className="line-clamp-2">{item.book.title} x {item.quantity}</span>
                <b>{formatCurrency(item.book.discountPrice * item.quantity)}</b>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t pt-4 text-lg font-black">
            <span>Pay</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
          <Button disabled={loading || items.length === 0} size="lg" className="mt-5 w-full">
            {loading ? "Saving..." : "Place order"}
          </Button>
        </aside>
      </form>
    </div>
  );
}
