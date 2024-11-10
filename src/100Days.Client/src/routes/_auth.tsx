import AuthLayout from "@/features/layout/auth-layout";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },

  component: Auth,
});

function Auth() {
  const { user } = useAuthStore();

  return (
    <AuthLayout user={user}>
      <Outlet />
    </AuthLayout>
  );
}
