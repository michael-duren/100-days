import { useGetAllGoalsQuery } from "@/api/queries/goal/useGetGoals";
import CurrentGoal from "@/features/goals/current-goal";
import NewGoalForm from "@/features/goals/new-goal-form";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/_auth/goal")({
  component: AuthGoal,
});

function AuthGoal() {
  const { user } = useAuthStore();
  const { data: goals, isSuccess } = useGetAllGoalsQuery(user);

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {goals.data.length > 0 ? (
        goals.data.map((g) => {
          if (!g.isCompleted) {
            return (
              <Fragment key={g.id}>
                <CurrentGoal goal={g} />
              </Fragment>
            );
          }
        })
      ) : (
        <NewGoalForm />
      )}
    </div>
  );
}
