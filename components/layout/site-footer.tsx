import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-muted/50">
      <div className="container-x grid gap-8 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-black text-primary">Kitob Market</h3>
          <p className="mt-3 text-sm text-muted-foreground">Premium online bookstore marketplace with fast delivery, reader reviews, and curated deals.</p>
        </div>
        {["Marketplace", "Account", "For Sellers"].map((title) => (
          <div key={title}>
            <h4 className="font-bold">{title}</h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/books">Books</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/admin">Admin dashboard</Link>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
