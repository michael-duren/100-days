import api from "@/api/agent";
import { queryKeys } from "@/api/query-keys";
import { UserDto } from "@/types/dtos/UserDto";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveGoalQuery = (user: UserDto | null) => {
  return useQuery({
    queryKey: queryKeys.goals.active,
    queryFn: api.Goals.active,
    enabled: Boolean(user),
  });
};
