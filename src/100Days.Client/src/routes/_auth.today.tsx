import { useGetEntriesByGoalQuery } from "@/api/queries/entries/useGetEntriesByGoalQuery";
import { useGetActiveGoalQuery } from "@/api/queries/goal/useGetActiveGoal";
import TodayForm from "@/features/today/today-form";
import { Button } from "@/features/ui/button";
import { isSameDay } from "@/lib/date";
import { useAuthStore } from "@/store/useAuthStore";
import { EntryDto } from "@/types/dtos/EntryDto";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Frown, PartyPopper, Sparkle } from "lucide-react";
import { useMemo } from "react";

export const Route = createFileRoute("/_auth/today")({
  component: Today,
});

function Today() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const {
    data: activeGoal,
    isSuccess: isGoalSuccess,
    error: goalError,
  } = useGetActiveGoalQuery(user);
  const { data: currentEntry, error: entryError } = useGetEntriesByGoalQuery(
    Number(activeGoal?.data.goalId),
  );
  const todaysEntry: EntryDto | undefined = useMemo(() => {
    const entries = currentEntry?.data.length ? currentEntry.data : null;
    if (entries) {
      return entries.find((e) => isSameDay(new Date(e.created), new Date()));
    }
  }, [currentEntry]);

  if (goalError || entryError) {
    return (
      <div>
        <p>Oops an error occured</p>
      </div>
    );
  }

  if (!isGoalSuccess) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      {!activeGoal.data ? (
        <div className="flex flex-col items-center px-24 w-full h-full gap-4 mt-8">
          <Frown size={64} />
          <div className="flex flex-col gap-2">
            <p>Looks like you don't have an active goal...</p>
            <Button onClick={() => navigate({ to: "/goal" })}>
              Create a Goal
            </Button>
          </div>
        </div>
      ) : (
        <>
          {todaysEntry ? (
            <div className="mt-8">
              <div className="shadow-md border rounded-lg p-6 text-center max-w-md mx-auto">
                <div className="flex flex-col items-center justify-center p-8 m-8">
                  <PartyPopper size={64} />
                </div>
                <h1 className="text-2xl font-bold mb-4">Congratulations!</h1>
                <p className="text-lg text-gray-500 mb-6">
                  You've successfully logged your daily goal – way to stay
                  consistent and committed! 🌟
                </p>
                <p className="text-md mb-4 text-gray-500">
                  Want to see how far you've come? Check out your{" "}
                  <Link to="/calendar" className="">
                    Log Page{" "}
                  </Link>
                  to review your progress and celebrate your achievements!
                </p>
                <p className="text-md text-gray-500 font-medium">
                  💪 Keep crushing it, and see you tomorrow! 🚀
                </p>
              </div>
            </div>
          ) : (
            <TodayForm />
          )}
        </>
      )}
    </div>
  );
}
