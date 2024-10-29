import api from "@/api/agent";
import { LoginFormRequest } from "@/features/auth/login/login-schema";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore.ts";

export const useLoginMutation = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (loginForm: LoginFormRequest) => api.Auth.login(loginForm),
    onSuccess: (data) => setUser(data.data),
  });
};
