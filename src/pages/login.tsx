import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/auth-store";
import { useI18n } from "@/app/i18n/i18n-store";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";

export function LoginPage() {
  const t = useI18n((state) => state.t);
  const signIn = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="container-page grid min-h-[calc(100vh-64px)] place-items-center py-8">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-3xl font-black">{t("signIn")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Demo enterprise auth with persisted session and protected routes.</p>
        <div className="mt-5 space-y-3">
          <Input defaultValue="owner@kitob.market" aria-label="Email" />
          <Input defaultValue="••••••••" aria-label="Password" type="password" />
          <Button
            className="w-full"
            onClick={() => {
              signIn();
              toast.success(t("welcome"));
              navigate((location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/dashboard");
            }}
          >
            {t("signIn")}
          </Button>
        </div>
      </Card>
    </main>
  );
}
