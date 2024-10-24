import RegisterForm from "@/features/auth/register/register-form";
import Camera from "@/assets/camera.svg?react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: () => Register(),
});

function Register() {
  return (
    <div className="flex h-full items-center gap-4">
      <div className="hidden lg:block">
        <Camera className="w-[18rem] flex-1" />
      </div>
      <div className="overflow-y-auto flex-1 max-w-screen-md mx-auto rounded-2xl border-2 h-[38rem] p-8 flex flex-col gap-4">
        <h1 className="text-4xl">Welcome!</h1>
        <p className="text-sm text-muted-foreground">
          Start your quest for learning and register below
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}
