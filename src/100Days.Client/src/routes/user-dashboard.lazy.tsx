import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/user-dashboard")({
  component: () => UserDashboardPage,
});

function UserDashboardPage() {
  return (
    <div>
      <p>User stuff goes here</p>
    </div>
  );
}
