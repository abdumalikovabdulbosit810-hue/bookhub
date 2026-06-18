import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/lib/types";
import { discountPercent, formatCurrency } from "@/lib/utils";

export function Hero({ promo }: { promo: Book }) {
  return (
    <section className="market-gradient text-white">
      <div className="container-x grid min-h-[420px] items-center gap-8 py-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Badge className="bg-white/20 text-white">
            <Sparkles className="mr-1 h-3 w-3" />
            Marketplace mega sale
          </Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">Kitob Market</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/88">A premium online bookstore for IELTS, programming, business, novels, psychology, finance, fantasy, and technology books.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/books">
                Shop books
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <Link href={`/books/${promo.slug}`}>Binafsha Shulasi 2 deal</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="rounded-md bg-white/15 px-3 py-2">1000+ seeded books</span>
            <span className="rounded-md bg-white/15 px-3 py-2">Fast checkout</span>
            <span className="rounded-md bg-white/15 px-3 py-2">Supabase ready</span>
          </div>
        </div>
        <Link href={`/books/${promo.slug}`} className="relative mx-auto w-full max-w-sm">
          <div className="absolute -left-4 top-5 z-10 rounded-md bg-amber-400 px-3 py-2 text-sm font-black text-amber-950">-{discountPercent(promo.price, promo.discountPrice)}%</div>
          <div className="overflow-hidden rounded-lg bg-white/15 p-4 shadow-premium backdrop-blur">
            <div className="relative aspect-[3/4] overflow-hidden rounded-md">
              <Image src={promo.coverImage} alt={promo.title} fill priority sizes="360px" className="object-cover" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-white/75 line-through">{formatCurrency(promo.price)}</p>
              <p className="text-3xl font-black">{formatCurrency(promo.discountPrice)}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <Truck className="h-4 w-4" />
                Today only promotion
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
