import { UserDto } from "@/types/dtos/UserDto";
import { ReactNode } from "react";
import {
  CheckCircleIcon,
  Lightbulb,
  Mail,
  TrophyIcon,
  UserCircle,
} from "lucide-react";
import AuthHeader from "./auth-header";
import { useGetAllGoalsQuery } from "@/api/queries/goal/useGetGoals";
import { useAuthStore } from "@/store/useAuthStore";

interface AuthLayoutProps {
  user: UserDto | null;
  children: ReactNode;
}

export default function AuthLayout({ user, children }: AuthLayoutProps) {
  const { data: goals, isSuccess } = useGetAllGoalsQuery(user);

  return (
    <div className="flex flex-col md:grid h-full md:grid-cols-12 p-4">
      <div className="hidden md:flex col-span-3 h-full rounded-lg shadow p-8 flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="md:w-32 md:h-32 xl:w-44 xl:h-44 rounded-full bg-gray-500 flex items-center justify-center md:text-4xl xl:text-5xl font-bold capitalize">
            {user?.userName[0]}
          </div>

          <div className="flex w-28 md:w-44 xl:w-60 flex-col gap-2">
            <div className="w-full flex items-center justify-center bg-indigo-600 text-white rounded-lg lg:text-base text-sm p-2 lg:p-4 shadow-2xl shadow-indigo-300 dark:shadow-indigo-700">
              <p className="text-xs lg:text-base flex items-center gap-2">
                <TrophyIcon size={18} />
                12 Day Streak
              </p>
            </div>
          </div>
          <div className="md:text-sm xl:text-base flex flex-col w-full gap-2 border rounded-md p-4">
            <p className="flex gap-2 items-center">
              Logged Today:{" "}
              {true ? (
                <CheckCircleIcon size={20} className="text-green-400" />
              ) : (
                <Lightbulb />
              )}
            </p>
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
      <div className="col-span-9 h-full rounded-lg shadow p-4 flex flex-col items-center gap-4">
        <AuthHeader />
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
