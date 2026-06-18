import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "owner" | "admin" | "manager" | "customer";

export type Permission = "books:read" | "books:write" | "users:manage" | "roles:manage" | "analytics:read" | "settings:write";

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
};

type AuthState = {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  can: (permission: Permission) => boolean;
};

const owner: User = {
  id: "usr_owner",
  name: "Kitob Market Owner",
  email: "owner@kitob.market",
  role: "owner",
  permissions: ["books:read", "books:write", "users:manage", "roles:manage", "analytics:read", "settings:write"]
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: owner,
      signIn: () => set({ user: owner }),
      signOut: () => set({ user: null }),
      can: (permission) => Boolean(get().user?.permissions.includes(permission))
    }),
    { name: "kitob-auth" }
  )
);
