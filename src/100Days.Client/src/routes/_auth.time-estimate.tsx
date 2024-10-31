import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/time-estimate")({
  component: TimeEstimate,
});

function TimeEstimate() {
  return (
    <div>
      <h1>Time estimate</h1>
    </div>
  );
}
