import api from "@/api/agent";
import { queryKeys } from "@/api/query-keys";
import { UserDto } from "@/types/dtos/UserDto";
import { useQuery } from "@tanstack/react-query";

export const useGetAllGoalsQuery = (user: UserDto | null) => {
  return useQuery({
    queryKey: queryKeys.goals.all,
    queryFn: api.Goals.list,
    enabled: Boolean(user),
  });
};
