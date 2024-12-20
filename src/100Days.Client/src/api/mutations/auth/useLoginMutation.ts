import api from "@/api/agent";
import { LoginFormRequest } from "@/features/auth/login/login-schema";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore.ts";
import { useNavigate } from "@tanstack/react-router";

export const useLoginMutation = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (loginForm: LoginFormRequest) => api.Auth.login(loginForm),
    onSuccess: (data) => {
      navigate({ to: "/today" });
      setUser(data.data);
    },
  });
};
