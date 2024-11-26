import api from "@/api/agent";
import { NewGoalFormRequest } from "@/features/goals/new-goal-form-schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const useCreateGoalMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newGoal: NewGoalFormRequest) => api.Goals.create(newGoal),
    onSuccess: () => {
      navigate({ to: "/today" });
      toast.success("Goal created!");
    },
  });
};
