import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { books, categories } from "@/entities/book/data";
import { useI18n } from "@/app/i18n/i18n-store";
import { BookCard } from "@/widgets/book-card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { formatCurrency, formatNumber } from "@/shared/lib/utils";

export function HomePage() {
  const t = useI18n((state) => state.t);
  const promo = books.find((book) => book.title === "Binafsha Shulasi 2") ?? books[0];

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="container-page grid min-h-[620px] items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <Badge className="bg-primary/10">
              <Sparkles className="mr-1 h-3 w-3" />
              Enterprise marketplace platform
            </Badge>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight md:text-7xl">{t("heroTitle")}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("heroSubtitle")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/books">
                  {t("shopNow")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">View analytics</Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["800+", "Curated books"],
                ["3", "Languages"],
                ["99.9%", "Platform target"]
              ].map(([value, label]) => (
                <Card key={label} className="glass p-4">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </Card>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} className="relative">
            <div className="absolute inset-6 rounded-full bg-primary/20 blur-3xl" />
            <Card className="glass relative overflow-hidden p-5 shadow-premium">
              <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                <img src={promo.cover} alt={promo.title} className="aspect-[3/4] rounded-lg object-cover shadow-premium" />
                <div>
                  <Badge className="bg-warning text-slate-950">Binafsha Shulasi 2 Sale</Badge>
                  <h2 className="mt-4 text-3xl font-black">{promo.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{promo.description}</p>
                  <p className="mt-5 text-sm text-muted-foreground line-through">{formatCurrency(promo.price)}</p>
                  <p className="text-4xl font-black text-primary">{formatCurrency(promo.discountPrice)}</p>
                  <div className="mt-5 grid gap-2 text-sm">
                    {[ShieldCheck, Zap, CheckCircle2].map((Icon, index) => (
                      <p key={index} className="flex items-center gap-2 font-semibold"><Icon className="h-4 w-4 text-primary" />Secure, fast, marketplace-grade flow</p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
      <section className="container-page py-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">Featured categories</h2>
            <p className="text-muted-foreground">Responsive, searchable, and optimized for conversion.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {categories.map((category, index) => (
            <Card key={category} className="p-4 transition hover:-translate-y-1 hover:shadow-premium">
              <p className="text-sm font-bold text-primary">{formatNumber(80 + index * 12)} books</p>
              <h3 className="mt-3 font-black">{category}</h3>
            </Card>
          ))}
        </div>
      </section>
      <section className="container-page py-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black">Best sellers</h2>
            <p className="text-muted-foreground">High-performance card grid with lazy-loaded images.</p>
          </div>
          <Button asChild variant="ghost"><Link to="/books">All books</Link></Button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          {books.slice(0, 12).map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>
    </main>
  );
}
