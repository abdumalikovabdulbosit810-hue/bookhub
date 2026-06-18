import { Link, NavLink, Outlet } from "react-router-dom";
import { BarChart3, BookOpen, Languages, LogOut, Moon, Settings, Shield, ShoppingCart, Sun } from "lucide-react";
import { useI18n } from "@/app/i18n/i18n-store";
import { Language } from "@/app/i18n/translations";
import { useKeyboardShortcuts } from "@/app/use-keyboard-shortcuts";
import { useAuthStore } from "@/features/auth/auth-store";
import { useCartStore } from "@/features/cart/cart-store";
import { useThemeStore } from "@/features/settings/theme-store";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition hover:bg-muted", isActive && "bg-primary text-white hover:bg-primary");

export function AppShell() {
  useKeyboardShortcuts();
  const t = useI18n((state) => state.t);
  const language = useI18n((state) => state.language);
  const setLanguage = useI18n((state) => state.setLanguage);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/78 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-black text-primary">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-white shadow-glow">K</span>
            {t("app")}
          </Link>
          <nav className="ml-4 hidden items-center gap-1 md:flex">
            <NavLink to="/books" className={linkClass}><BookOpen className="h-4 w-4" />{t("navBooks")}</NavLink>
            <NavLink to="/dashboard" className={linkClass}><BarChart3 className="h-4 w-4" />{t("navDashboard")}</NavLink>
            <NavLink to="/admin" className={linkClass}><Shield className="h-4 w-4" />{t("navAdmin")}</NavLink>
            <NavLink to="/settings" className={linkClass}><Settings className="h-4 w-4" />{t("navSettings")}</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-md border bg-card p-1 sm:flex">
              <Languages className="ml-2 h-4 w-4 text-muted-foreground" />
              {(["uz", "en", "ru"] as Language[]).map((item) => (
                <button key={item} onClick={() => setLanguage(item)} className={cn("rounded-sm px-2 py-1 text-xs font-bold uppercase", language === item && "bg-primary text-white")}>
                  {item}
                </button>
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-danger px-1 text-[10px] font-black text-white">{cartCount}</span>}
            </Button>
            {user ? (
              <Button variant="ghost" onClick={signOut}><LogOut className="h-4 w-4" />{t("signOut")}</Button>
            ) : (
              <Button asChild><Link to="/login">{t("signIn")}</Link></Button>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
