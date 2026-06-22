import * as Dialog from "@radix-ui/react-dialog";
import { Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/app/i18n/i18n-store";
import { useCartStore } from "@/features/cart/cart-store";
import { useOrdersStore } from "@/features/orders/orders-store";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { formatCurrency } from "@/shared/lib/utils";
import { sanitizeText } from "@/shared/lib/utils";

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const t = useI18n((state) => state.t);
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore((state) => state.total);
  const addOrder = useOrdersStore((state) => state.addOrder);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleOrder = () => {
    const customerName = sanitizeText(name.trim());
    const customerPhone = sanitizeText(phone.trim());
    if (!customerName || customerPhone.length < 9) {
      toast.error(t("orderValidation"));
      return;
    }
    setSubmitting(true);
    addOrder({
      customerName,
      customerPhone,
      items: items.map((item) => ({
        bookId: item.book.id,
        title: item.book.title,
        author: item.book.author,
        cover: item.book.cover,
        quantity: item.quantity,
        price: item.book.discountPrice
      })),
      total: total()
    });
    clear();
    setName("");
    setPhone("");
    setSubmitting(false);
    onOpenChange(false);
    toast.success(t("orderSuccess"));
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l bg-card shadow-premium outline-none">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <Dialog.Title className="text-xl font-black">{t("cartTitle")}</Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground">{t("cartSubtitle")}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label={t("close")}>
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {!items.length ? (
              <div className="grid h-full place-items-center text-center">
                <ShoppingBag className="mb-3 h-12 w-12 text-muted-foreground" />
                <p className="font-bold">{t("cartEmpty")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("cartEmptyHint")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(({ book, quantity }) => (
                  <article key={book.id} className="flex gap-3 rounded-lg border p-3">
                    <img src={book.cover} alt={book.title} loading="lazy" className="h-24 w-18 shrink-0 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-black">{book.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
                      <p className="mt-2 text-sm font-black text-primary">{formatCurrency(book.discountPrice)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">× {quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => remove(book.id)} aria-label={t("remove")}>
                          <Trash2 className="h-4 w-4 text-danger" />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold">{t("total")}</span>
                <span className="text-xl font-black text-primary">{formatCurrency(total())}</span>
              </div>
              <div className="space-y-3">
                <Input placeholder={t("yourName")} value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder={t("yourPhone")} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
                <Button className="w-full" size="lg" disabled={submitting} onClick={handleOrder}>
                  <Plus className="h-4 w-4" />
                  {t("placeOrder")}
                </Button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
