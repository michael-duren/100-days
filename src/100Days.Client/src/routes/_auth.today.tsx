import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/today")({
  component: Today,
});

function Today() {
  return (
    <div>
      <p>User stuff goes here</p>
    </div>
  );
}
