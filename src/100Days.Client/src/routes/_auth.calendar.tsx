import { useGetEntriesByGoalQuery } from "@/api/queries/entries/useGetEntriesByGoalQuery";
import { useGetActiveGoalQuery } from "@/api/queries/goal/useGetActiveGoal";
import Calendar from "@/features/calendar/calendar";
import NoGoal from "@/features/shared/no-goal";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const { user } = useAuthStore();
  const {
    data: goal,
    isSuccess: isGoalSuccess,
    isPending: isGoalPending,
  } = useGetActiveGoalQuery(user);
  const {
    data: entries,
    isSuccess: isEntrySuccess,
    isPending: isEntryPending,
  } = useGetEntriesByGoalQuery(Number(goal?.data.goalId));

  if (isGoalPending || isEntryPending) {
    return <div>Loading...</div>;
  }

  if (isGoalSuccess && !goal?.data) {
    return <NoGoal />;
  }

  return (
    <div>
      {isEntrySuccess ? (
        <Calendar entries={entries.data} />
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
