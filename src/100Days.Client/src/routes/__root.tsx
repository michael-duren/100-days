import Layout from "@/features/layout/layout";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  ),
});
