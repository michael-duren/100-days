import api from "@/api/agent";
import { LoginFormRequest } from "@/features/auth/login/login-schema";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (loginForm: LoginFormRequest) => api.Auth.login(loginForm),
    onSuccess: (data) => {
      const userString = JSON.stringify(data);
      localStorage.setItem("user", userString);
    },
  });
};
