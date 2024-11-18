import { useGetAllGoalsQuery } from "@/api/queries/goal/useGetGoals";
import { useAuthStore } from "@/store/useAuthStore";
import { createFileRoute } from "@tanstack/react-router";

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
      <h1>Auth Goal</h1>
      {goals.data.length === 0 ? (
        goals.data.map((g) => (
          <div>
            <p>{g.title}</p>
          </div>
        ))
      ) : (
        <div>No goals</div>
      )}
    </div>
  );
}
