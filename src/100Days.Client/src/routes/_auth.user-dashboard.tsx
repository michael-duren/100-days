import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/user-dashboard")({
  component: UserDashboard,
});

function UserDashboard() {
  return (
    <div>
      <p>User stuff goes here</p>
    </div>
  );
}
