import { useGetEntriesByGoalQuery } from "@/api/queries/entries/useGetEntriesByGoalQuery";
import { useGetActiveGoalQuery } from "@/api/queries/goal/useGetActiveGoal";
import Calendar from "@/features/calendar/calendar";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const { user } = useAuthStore();
  const { data: goal, isSuccess: isGoalSuccess } = useGetActiveGoalQuery(user);
  const { data: entries, isSuccess: isEntrySuccess } = useGetEntriesByGoalQuery(
    Number(goal?.data.goalId),
  );

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
