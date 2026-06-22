import { useMemo, useState } from "react";
import { Bell, BookOpen, CheckCircle2, Clock3, LogOut, Phone, ShoppingBag, Trash2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { BOOK_COUNT } from "@/entities/book/generator";
import { ADMIN_PHONE, useAdminStore } from "@/features/admin/admin-store";
import { useOrdersStore } from "@/features/orders/orders-store";
import { useI18n } from "@/app/i18n/i18n-store";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { formatCurrency } from "@/shared/lib/utils";

export function AdminPage() {
  const t = useI18n((state) => state.t);
  const authenticated = useAdminStore((state) => state.authenticated);
  const login = useAdminStore((state) => state.login);
  const logout = useAdminStore((state) => state.logout);
  const orders = useOrdersStore((state) => state.orders);
  const markRead = useOrdersStore((state) => state.markRead);
  const updateStatus = useOrdersStore((state) => state.updateStatus);
  const removeOrder = useOrdersStore((state) => state.removeOrder);
  const [phone, setPhone] = useState("");

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const unread = orders.filter((o) => !o.read).length;
    return { revenue, unread, total: orders.length };
  }, [orders]);

  if (!authenticated) {
    return (
      <main className="container-page flex min-h-[70vh] items-center justify-center py-12">
        <Card className="w-full max-w-md p-8 shadow-premium">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Phone className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-center font-serif text-3xl font-black">{t("adminLoginTitle")}</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">{t("adminLoginHint")}</p>
          <div className="mt-6 space-y-3">
            <Input
              placeholder={t("adminPhone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
            />
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                if (login(phone)) toast.success(t("adminLogin"));
                else toast.error(t("adminWrongPhone"));
              }}
            >
              {t("adminLogin")}
            </Button>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            +998 {ADMIN_PHONE}
          </p>
        </Card>
      </main>
    );
  }

  return (
    <main className="container-page py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge className="bg-primary/10 text-primary">{t("footerAdminLink")}</Badge>
          <h1 className="mt-3 font-serif text-4xl font-black">{t("adminTitle")}</h1>
          <p className="mt-1 text-muted-foreground">{t("adminSubtitle")}</p>
          <p className="mt-2 text-sm font-bold text-primary">+998 {ADMIN_PHONE}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="h-4 w-4" />
          {t("adminLogout")}
        </Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { label: t("adminStatsOrders"), value: String(stats.total), icon: ShoppingBag },
          { label: t("adminStatsNew"), value: String(stats.unread), icon: Bell },
          { label: t("adminStatsRevenue"), value: formatCurrency(stats.revenue), icon: TrendingUp },
          { label: t("adminStatsBooks"), value: BOOK_COUNT.toLocaleString(), icon: BookOpen }
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-5">
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-black">{value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8 overflow-hidden">
        <div className="border-b bg-muted/50 px-5 py-4">
          <h2 className="text-xl font-black">{t("adminOrders")}</h2>
        </div>
        {!orders.length ? (
          <div className="px-5 py-16 text-center">
            <Clock3 className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-bold">{t("adminNoOrders")}</p>
            <p className="text-sm text-muted-foreground">{t("adminNoOrdersHint")}</p>
          </div>
        ) : (
          <div className="divide-y">
            {orders.map((order) => (
              <article
                key={order.id}
                className={`px-5 py-5 ${!order.read ? "bg-primary/5" : ""}`}
                onMouseEnter={() => !order.read && markRead(order.id)}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black">{order.customerName}</h3>
                      {!order.read && <Badge className="bg-danger text-white">{t("adminNew")}</Badge>}
                      <Badge>{order.status === "new" ? t("adminNew") : order.status === "processing" ? t("adminProcessing") : t("adminDone")}</Badge>
                    </div>
                    <a href={`tel:${order.customerPhone}`} className="mt-1 flex items-center gap-1 text-sm text-primary">
                      <Phone className="h-3.5 w-3.5" />
                      {order.customerPhone}
                    </a>
                    <p className="mt-1 text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="text-xl font-black text-primary">{formatCurrency(order.total)}</p>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {order.items.map((item) => (
                    <div key={item.bookId} className="flex gap-3 rounded-lg border p-3">
                      <img src={item.cover} alt={item.title} className="h-16 w-12 rounded object-cover" loading="lazy" />
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-bold">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.author}</p>
                        <p className="text-xs">× {item.quantity} · {formatCurrency(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {order.status !== "processing" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(order.id, "processing")}>
                      <Clock3 className="h-4 w-4" />
                      {t("adminMarkProcessing")}
                    </Button>
                  )}
                  {order.status !== "done" && (
                    <Button size="sm" onClick={() => updateStatus(order.id, "done")}>
                      <CheckCircle2 className="h-4 w-4" />
                      {t("adminMarkDone")}
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => removeOrder(order.id)}>
                    <Trash2 className="h-4 w-4" />
                    {t("adminDelete")}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
