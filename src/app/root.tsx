import { RouterProvider } from "react-router-dom";
import { AppProviders } from "@/app/providers";
import { router } from "@/app/router";

export function Root() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
