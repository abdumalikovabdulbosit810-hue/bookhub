import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderItem = {
  bookId: string;
  title: string;
  author: string;
  cover: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: "new" | "processing" | "done";
  createdAt: string;
  read: boolean;
};

type OrdersState = {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "status" | "createdAt" | "read">) => Order;
  markRead: (id: string) => void;
  updateStatus: (id: string, status: Order["status"]) => void;
  removeOrder: (id: string) => void;
  unreadCount: () => number;
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (payload) => {
        const order: Order = {
          ...payload,
          id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          status: "new",
          read: false,
          createdAt: new Date().toISOString()
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
      markRead: (id) => set((state) => ({ orders: state.orders.map((o) => (o.id === id ? { ...o, read: true } : o)) })),
      updateStatus: (id, status) => set((state) => ({ orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
      removeOrder: (id) => set((state) => ({ orders: state.orders.filter((o) => o.id !== id) })),
      unreadCount: () => get().orders.filter((o) => !o.read).length
    }),
    { name: "kitob-orders" }
  )
);
