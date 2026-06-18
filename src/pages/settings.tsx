import { Languages, Moon, Shield } from "lucide-react";
import { Language } from "@/app/i18n/translations";
import { useI18n } from "@/app/i18n/i18n-store";
import { useThemeStore } from "@/features/settings/theme-store";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

export function SettingsPage() {
  const t = useI18n((state) => state.t);
  const language = useI18n((state) => state.language);
  const setLanguage = useI18n((state) => state.setLanguage);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <main className="container-page py-8">
      <h1 className="text-4xl font-black">{t("settingsTitle")}</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <Languages className="h-5 w-5 text-primary" />
          <h2 className="mt-3 font-black">{t("language")}</h2>
          <div className="mt-4 flex gap-2">
            {(["uz", "en", "ru"] as Language[]).map((item) => (
              <button key={item} onClick={() => setLanguage(item)} className={cn("rounded-md border px-4 py-2 text-sm font-black uppercase", language === item && "bg-primary text-white")}>{item}</button>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <Moon className="h-5 w-5 text-primary" />
          <h2 className="mt-3 font-black">Appearance</h2>
          <p className="mt-2 text-sm text-muted-foreground">Persisted dark and light mode with accessible contrast.</p>
          <Button className="mt-4" onClick={toggleTheme}>{theme === "dark" ? "Light mode" : "Dark mode"}</Button>
        </Card>
        <Card className="p-5">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="mt-3 font-black">Security posture</h2>
          <p className="mt-2 text-sm text-muted-foreground">Input validation, route protection, authorization checks, and audit-ready admin actions.</p>
        </Card>
      </div>
    </main>
  );
}
