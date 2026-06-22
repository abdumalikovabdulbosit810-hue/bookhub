import { Link } from "react-router-dom";
import { Phone, Shield } from "lucide-react";
import { useI18n } from "@/app/i18n/i18n-store";
import { ADMIN_PHONE } from "@/features/admin/admin-store";

export function SiteFooter() {
  const t = useI18n((state) => state.t);

  return (
    <footer className="mt-auto border-t bg-card/80">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl font-black text-primary">{t("app")}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{t("footerAbout")}</p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide">{t("footerContact")}</h3>
          <a href={`tel:+998${ADMIN_PHONE}`} className="mt-4 flex items-center gap-2 text-lg font-black hover:text-primary">
            <Phone className="h-5 w-5" />
            +998 {ADMIN_PHONE}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">{t("footerPhoneHint")}</p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide">{t("footerAdmin")}</h3>
          <Link to="/admin" className="mt-4 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-bold transition hover:border-primary hover:text-primary">
            <Shield className="h-4 w-4" />
            {t("footerAdminLink")}
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">{t("footerAdminHint")}</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t("app")}. {t("footerRights")}
      </div>
    </footer>
  );
}
