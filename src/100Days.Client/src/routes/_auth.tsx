import { Button } from "@/features/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Calendar, ListTodo, Mail, Timer, UserCircle } from "lucide-react";

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

  component: AuthLayout,
});

function AuthLayout() {
  const { user } = useAuthStore();

  return (
    <div className="grid h-full grid-cols-12 gap-4 p-4">
      <div className="col-span-3 h-full rounded-lg border shadow p-8 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="md:w-32 md:h-32 xl:w-48 xl:h-48 rounded-full bg-gray-500 flex items-center justify-center md:text-4xl xl:text-6xl font-bold capitalize">
            {user?.userName[0]}
          </div>
          <div className="md:text-sm xl:text-base flex flex-col w-full gap-2 border rounded-md p-4">
            <h2 className="flex gap-2">
              <UserCircle /> {user?.userName}
            </h2>
            <h2 className="flex gap-2">
              <Mail />
              {user?.email}
            </h2>
          </div>
          <div className="flex w-28 md:w-44 xl:w-60 flex-col gap-2">
            <div className="bg-indigo-600 text-white rounded-lg p-4 shadow-2xl shadow-indigo-300 dark:shadow-indigo-700">
              <p>12 Days Streak! 🎉</p>
            </div>
          </div>
          <div className="md:text-sm xl:text-base flex flex-col w-full gap-2 border rounded-md p-4">
            <h2 className="text-xl">Current Goal: Goal Name</h2>
            <div className="flex flex-col gap-1">
              <p>Days on goal: 10</p>
              <p>Posts: 10</p>
              <p>Days Left: 10</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-9 h-full rounded-lg border shadow p-4 flex flex-col items-center">
        <div className="flex gap-2">
          <Button className="flex gap-2" variant={"outline"} size={"lg"}>
            <ListTodo size={18} />
            Today
          </Button>
          <Button className="flex gap-2" variant={"outline"} size={"lg"}>
            <Timer size={18} />
            Time Estimate
          </Button>
          <Button className="flex gap-2" variant={"outline"} size={"lg"}>
            <Calendar size={18} />
            Calendar
          </Button>
        </div>
      </div>
    </div>
  );
}
