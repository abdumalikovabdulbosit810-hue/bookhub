import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="max-w-md text-muted-foreground">The shelf you opened is empty. Return to the marketplace and keep browsing.</p>
      <Button asChild>
        <Link href="/">Go home</Link>
      </Button>
    </section>
  );
}
