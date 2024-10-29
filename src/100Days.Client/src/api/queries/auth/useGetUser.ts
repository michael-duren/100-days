import api from "@/api/agent";
import { queryKeys } from "@/api/query-keys";
import { UserDto } from "@/types/dtos/UserDto";
import { useQuery } from "@tanstack/react-query";

export const useGetUserQuery = (user: UserDto | null) => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: api.Auth.current,
    enabled: Boolean(user),
  });
};
