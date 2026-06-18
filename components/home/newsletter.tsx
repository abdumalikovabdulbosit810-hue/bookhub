import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="container-x py-8">
      <div className="grid gap-4 rounded-lg bg-primary p-6 text-white md:grid-cols-[1fr_420px] md:items-center">
        <div>
          <h2 className="text-2xl font-black">Weekly reading deals</h2>
          <p className="mt-1 text-white/80">Get discounts, author picks, and new arrivals from Kitob Market.</p>
        </div>
        <form className="flex gap-2">
          <Input className="bg-white text-foreground" placeholder="Email address" type="email" />
          <Button className="bg-amber-400 text-amber-950 hover:bg-amber-300">
            <Send className="h-4 w-4" />
            Join
          </Button>
        </form>
      </div>
    </section>
  );
}
