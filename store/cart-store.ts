"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Book, CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  coupon?: string;
  addItem: (book: Book) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  applyCoupon: (coupon: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (book) =>
        set((state) => {
          const existing = state.items.find((item) => item.book.id === book.id);
          if (existing) {
            return { items: state.items.map((item) => (item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item)) };
          }
          return { items: [...state.items, { book, quantity: 1 }] };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.book.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({ items: state.items.map((item) => (item.book.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)) })),
      clear: () => set({ items: [], coupon: undefined }),
      applyCoupon: (coupon) => set({ coupon })
    }),
    { name: "kitob-cart" }
  )
);

export function getCartTotals(items: CartItem[], coupon?: string) {
  const subtotal = items.reduce((sum, item) => sum + item.book.discountPrice * item.quantity, 0);
  const discount = coupon?.toUpperCase() === "KITOB10" ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 300000 || subtotal === 0 ? 0 : 19000;
  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}
