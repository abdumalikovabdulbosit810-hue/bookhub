import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { BOOK_COUNT, categories, getBestSellers, getPromoBook } from "@/entities/book/generator";
import { categoryKeys } from "@/app/i18n/translations";
import { useI18n } from "@/app/i18n/i18n-store";
import { BookCard } from "@/widgets/book-card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { formatCurrency, formatNumber } from "@/shared/lib/utils";

export function HomePage() {
  const t = useI18n((state) => state.t);
  const promo = getPromoBook();
  const bestSellers = getBestSellers(12);

  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div className="container-page grid min-h-[560px] items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge className="bg-primary/10">
              <Sparkles className="mr-1 h-3 w-3" />
              {t("homePromoBadge")}
            </Badge>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-black leading-tight md:text-6xl">{t("heroTitle")}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t("heroSubtitle")}</p>
            <div className="mt-7">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/books">
                  {t("shopNow")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                [formatNumber(BOOK_COUNT), t("homeStatBooks")],
                ["3", t("homeStatLang")],
                ["99.9%", t("homeStatQuality")]
              ].map(([value, label]) => (
                <Card key={label} className="glass p-4">
                  <p className="font-serif text-2xl font-black">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative">
            <Card className="glass relative overflow-hidden p-5 shadow-premium">
              <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                <img src={promo.cover} alt={promo.title} className="aspect-[3/4] rounded-lg object-cover shadow-premium" loading="eager" />
                <div>
                  <Badge className="bg-warning text-slate-950">{t("homePromoSale")}</Badge>
                  <h2 className="mt-4 font-serif text-3xl font-black">{promo.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{promo.description}</p>
                  <p className="mt-5 text-sm text-muted-foreground line-through">{formatCurrency(promo.price)}</p>
                  <p className="font-serif text-4xl font-black text-primary">{formatCurrency(promo.discountPrice)}</p>
                  <div className="mt-5 grid gap-2 text-sm">
                    {[ShieldCheck, Zap, CheckCircle2].map((Icon, index) => (
                      <p key={index} className="flex items-center gap-2 font-semibold">
                        <Icon className="h-4 w-4 text-primary" />
                        {[t("homeTrust1"), t("homeTrust2"), t("homeTrust3")][index]}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-5">
          <h2 className="font-serif text-3xl font-black">{t("homeFeatured")}</h2>
          <p className="text-muted-foreground">{t("homeFeaturedHint")}</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Link key={category} to="/books" className="shrink-0">
              <Card className="min-w-[160px] p-4 transition hover:-translate-y-1 hover:border-primary hover:shadow-premium">
                <p className="text-sm font-bold text-primary">{formatNumber(Math.floor(BOOK_COUNT / categories.length) + index * 120)}</p>
                <h3 className="mt-2 font-black">{t(categoryKeys[category])}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-black">{t("homeBestSellers")}</h2>
            <p className="text-muted-foreground">{t("homeBestSellersHint")}</p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/books">{t("homeAllBooks")}</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          {bestSellers.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}
