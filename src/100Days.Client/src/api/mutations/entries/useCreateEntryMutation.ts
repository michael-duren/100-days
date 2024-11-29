import api from "@/api/agent";
import { NewEntryFormRequest } from "@/features/today/new-entry-form-schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const useCreateEntryMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (newEntry: NewEntryFormRequest) => api.Entries.create(newEntry),
    onSuccess: () => {
      toast.success("Log completed! Great job!");
      navigate({ to: "/calendar" });
    },
  });
};
