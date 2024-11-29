import { Frown } from "lucide-react";
import { Button } from "@/features/ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function NoGoal() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-24 w-full h-full gap-4 mt-8">
      <Frown size={64} />
      <div className="flex flex-col gap-2">
        <p>Looks like you don't have an active goal...</p>
        <Button onClick={() => navigate({ to: "/goal" })}>Create a Goal</Button>
      </div>
    </div>
  );
}
