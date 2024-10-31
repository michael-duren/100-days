import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore.ts";
import { useNavigate } from "@tanstack/react-router";
import api from "@/api/agent";
import { RegisterFormRequest } from "@/features/auth/register/register-schema";

export const useRegisterMutation = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (registerForm: RegisterFormRequest) =>
      api.Auth.register(registerForm),
    onSuccess: (data) => {
      navigate({ to: "/today" });
      setUser(data.data);
    },
  });
};
