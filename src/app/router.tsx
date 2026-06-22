import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/widgets/app-shell";
import { Skeleton } from "@/shared/ui/skeleton";

const HomePage = lazy(() => import("@/pages/home").then((module) => ({ default: module.HomePage })));
const BooksPage = lazy(() => import("@/pages/books").then((module) => ({ default: module.BooksPage })));
const LikesPage = lazy(() => import("@/pages/likes").then((module) => ({ default: module.LikesPage })));
const AdminPage = lazy(() => import("@/pages/admin").then((module) => ({ default: module.AdminPage })));
const NotFoundPage = lazy(() => import("@/pages/not-found").then((module) => ({ default: module.NotFoundPage })));

function PageLoader() {
  return (
    <div className="container-page py-8">
      <Skeleton className="h-72 w-full" />
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-48" />
        ))}
      </div>
    </div>
  );
}

const withSuspense = (node: React.ReactNode) => <Suspense fallback={<PageLoader />}>{node}</Suspense>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: "books", element: withSuspense(<BooksPage />) },
      { path: "likes", element: withSuspense(<LikesPage />) },
      { path: "admin", element: withSuspense(<AdminPage />) },
      { path: "*", element: withSuspense(<NotFoundPage />) }
    ]
  }
]);
