import { create } from "zustand";
import { persist } from "zustand/middleware";

export const ADMIN_PHONE = "911914499";

type AdminState = {
  authenticated: boolean;
  login: (phone: string) => boolean;
  logout: () => void;
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      authenticated: false,
      login: (phone) => {
        const normalized = phone.replace(/\D/g, "");
        if (normalized === ADMIN_PHONE || normalized.endsWith(ADMIN_PHONE)) {
          set({ authenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ authenticated: false })
    }),
    { name: "kitob-admin-auth" }
  )
);
