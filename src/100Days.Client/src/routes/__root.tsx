// import { useGetUserQuery } from "@/api/queries/auth/useGetUser";
import Layout from "@/features/layout/layout";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { AuthStore } from "@/store/useAuthStore";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
// import { useEffect } from "react";

interface AuthContext {
  auth: AuthStore;
}

export const Route = createRootRouteWithContext<AuthContext>()({
  component: RouteComponent,
});

function RouteComponent() {
  // const { user, setUser } = useAuthStore();
  // const { data: userDto, isLoading, isSuccess, error } = useGetUserQuery(user);

  // useEffect(() => {
  //   if (isSuccess && userDto.data.userid !== user?.userid && !error) {
  //     setUser(userDto.data);
  //   } else {
  //     setUser(null);
  //   }
  // }, [isLoading]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </>
  );
}
