import { Edit3, KeyRound, Lock, Plus, ShieldCheck, Trash2, Users, type LucideIcon } from "lucide-react";
import { books } from "@/entities/book/data";
import { useAuthStore } from "@/features/auth/auth-store";
import { useI18n } from "@/app/i18n/i18n-store";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { toast } from "sonner";

export function AdminPage() {
  const t = useI18n((state) => state.t);
  const user = useAuthStore((state) => state.user);
  const can = useAuthStore((state) => state.can);
  const stats: Array<{ label: string; value: string; icon: LucideIcon }> = [
    { label: "Current role", value: user?.role ?? "guest", icon: ShieldCheck },
    { label: "Users", value: "48,120", icon: Users },
    { label: "Permissions", value: "6 active", icon: KeyRound },
    { label: "Security", value: "CSRF + XSS controls", icon: Lock }
  ];

  return (
    <main className="container-page py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black">{t("adminTitle")}</h1>
          <p className="mt-1 text-muted-foreground">Governance, users, roles, permissions, activity logs, and settings management.</p>
        </div>
        <Button disabled={!can("books:write")}><Plus className="h-4 w-4" />Create book</Button>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-5">
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">{label}</p>
            <p className="text-xl font-black capitalize">{value}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-lg border bg-card shadow-soft">
        <div className="grid grid-cols-[1.4fr_1fr_130px_160px] gap-4 border-b bg-muted px-4 py-3 text-sm font-black">
          <span>Book</span><span>Author</span><span>Stock</span><span>Actions</span>
        </div>
        {books.slice(0, 12).map((book) => (
          <div key={book.id} className="grid grid-cols-[1.4fr_1fr_130px_160px] gap-4 border-b px-4 py-3 text-sm last:border-b-0">
            <span className="font-bold">{book.title}</span>
            <span className="text-muted-foreground">{book.author}</span>
            <span>{book.stock}</span>
            <span className="flex gap-2">
              <Button variant="outline" size="icon" disabled={!can("books:write")}><Edit3 className="h-4 w-4" /></Button>
              <ConfirmDialog title="Delete book?" description="This action is logged and requires the books:write permission." onConfirm={() => toast.success("Audit log recorded")}>
                <Button variant="outline" size="icon" disabled={!can("books:write")}><Trash2 className="h-4 w-4" /></Button>
              </ConfirmDialog>
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
