import { Link, NavLink, Outlet } from "react-router-dom";
import { BookOpen, Heart, Languages, Moon, ShoppingCart, Sun } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/app/i18n/i18n-store";
import { Language } from "@/app/i18n/translations";
import { useCartStore } from "@/features/cart/cart-store";
import { useWishlistStore } from "@/features/wishlist/wishlist-store";
import { useThemeStore } from "@/features/settings/theme-store";
import { CartDrawer } from "@/widgets/cart-drawer";
import { SiteFooter } from "@/widgets/site-footer";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-muted",
    isActive && "bg-primary text-white hover:bg-primary"
  );

export function AppShell() {
  const t = useI18n((state) => state.t);
  const language = useI18n((state) => state.language);
  const setLanguage = useI18n((state) => state.setLanguage);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const likesCount = useWishlistStore((state) => state.count());
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center gap-3">
          <Link to="/" className="flex items-center gap-2 font-serif text-lg font-black text-primary">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white shadow-glow">K</span>
            {t("app")}
          </Link>
          <nav className="ml-2 flex items-center gap-1">
            <NavLink to="/books" className={linkClass}>
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">{t("navBooks")}</span>
            </NavLink>
            <NavLink to="/likes" className={linkClass}>
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">{t("navLikes")}</span>
              {likesCount > 0 && <span className="text-xs">({likesCount})</span>}
            </NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border bg-card p-1">
              {(["uz", "en", "ru"] as Language[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setLanguage(item)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-bold uppercase transition",
                    language === item && "bg-primary text-white"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon" className="relative" aria-label={t("cartTitle")} onClick={() => setCartOpen(true)}>
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-danger px-1 text-[10px] font-black text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <SiteFooter />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
