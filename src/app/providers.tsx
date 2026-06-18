import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { Toaster } from "sonner";
import { useI18n } from "@/app/i18n/i18n-store";
import { useThemeStore } from "@/features/settings/theme-store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } }), []);
  const theme = useThemeStore((state) => state.theme);
  const language = useI18n((state) => state.language);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [theme, language]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
