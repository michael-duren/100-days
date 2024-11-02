import TodayForm from "@/features/today/today-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/today")({
  component: Today,
});

function Today() {
  return (
    <div className="h-full w-full">
      <TodayForm />
    </div>
  );
}
