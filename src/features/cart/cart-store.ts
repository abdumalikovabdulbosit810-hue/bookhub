import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Book } from "@/entities/book/model";

type CartItem = {
  book: Book;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (book: Book) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (book) =>
        set((state) => {
          const existing = state.items.find((item) => item.book.id === book.id);
          if (existing) return { items: state.items.map((item) => (item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item)) };
          return { items: [...state.items, { book, quantity: 1 }] };
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.book.id !== id) })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.book.discountPrice * item.quantity, 0)
    }),
    { name: "kitob-cart-v2" }
  )
);
