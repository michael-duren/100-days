import api from "@/api/agent";
import { queryKeys } from "@/api/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetEntriesByGoalQuery = (goalId: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.entries.byGoal(goalId!),
    queryFn: () => {
      return api.Entries.listByGoal(goalId!);
    },
    enabled: Boolean(goalId),
  });
};
