import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/calendar")({
  component: Calendar,
});

function Calendar() {
  return (
    <div>
      <h1>Calendar</h1>
    </div>
  );
}
