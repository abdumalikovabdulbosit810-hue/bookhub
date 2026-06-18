import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";

export function NotFoundPage() {
  return (
    <main className="container-page grid min-h-[calc(100vh-64px)] place-items-center text-center">
      <div>
        <p className="font-black text-primary">404</p>
        <h1 className="mt-2 text-4xl font-black">Page not found</h1>
        <Button asChild className="mt-5"><Link to="/">Go home</Link></Button>
      </div>
    </main>
  );
}
