import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/protected-route";
import { AppShell } from "@/widgets/app-shell";
import { Skeleton } from "@/shared/ui/skeleton";

const HomePage = lazy(() => import("@/pages/home").then((module) => ({ default: module.HomePage })));
const BooksPage = lazy(() => import("@/pages/books").then((module) => ({ default: module.BooksPage })));
const DashboardPage = lazy(() => import("@/pages/dashboard").then((module) => ({ default: module.DashboardPage })));
const AdminPage = lazy(() => import("@/pages/admin").then((module) => ({ default: module.AdminPage })));
const SettingsPage = lazy(() => import("@/pages/settings").then((module) => ({ default: module.SettingsPage })));
const LoginPage = lazy(() => import("@/pages/login").then((module) => ({ default: module.LoginPage })));
const NotFoundPage = lazy(() => import("@/pages/not-found").then((module) => ({ default: module.NotFoundPage })));

function PageLoader() {
  return (
    <div className="container-page py-8">
      <Skeleton className="h-72 w-full" />
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-48" />)}
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
      { path: "login", element: withSuspense(<LoginPage />) },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: withSuspense(<DashboardPage />) },
          { path: "admin", element: withSuspense(<AdminPage />) },
          { path: "settings", element: withSuspense(<SettingsPage />) }
        ]
      },
      { path: "*", element: withSuspense(<NotFoundPage />) }
    ]
  }
]);
