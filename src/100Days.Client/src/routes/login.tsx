import LoginForm from "@/features/auth/login/login-form";
import Photo from "@/assets/polaroid.svg?react";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.auth.user) {
      throw redirect({
        to: "/user-dashboard",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => Login(),
});

function Login() {
  return (
    <div className="flex h-full items-center gap-8">
      <div className="hidden lg:block">
        <Photo className="h-[38rem] flex-1" />
      </div>
      <div className="flex-1 max-w-screen-md mx-auto rounded-2xl border-2 h-[38rem] p-8 flex flex-col gap-8">
        <h1 className="text-4xl">Welcome Back!</h1>
        <p className="text-sm text-muted-foreground">
          Continue your quest for learning and login below
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
