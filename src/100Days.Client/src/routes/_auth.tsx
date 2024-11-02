import AuthLayout from "@/features/layout/auth-layout";
import { Button } from "@/features/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import {
  Calendar,
  CheckCircleIcon,
  Lightbulb,
  ListTodo,
  Mail,
  Settings,
  Timer,
  TrophyIcon,
  UserCircle,
} from "lucide-react";

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
