import type { LoginFormRequest } from "@/features/auth/login/login-schema";
import type { RegisterFormRequest } from "@/features/auth/register/register-schema";
import { UserDto } from "@/types/dtos/UserDto";
import axios from "axios";

axios.defaults.withCredentials = true;

const requests = {
  get: <T>(url: string) => axios.get<T>(url),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body),
  delete: <T>(url: string) => axios.delete<T>(url),
};

const Auth = {
  login: (loginForm: LoginFormRequest) =>
    requests.post<UserDto>("/api/auth/login", loginForm),
  register: (registerRequest: RegisterFormRequest) =>
    requests.post<UserDto>("/api/auth/register", registerRequest),
  logout: () => requests.post("/api/auth/logout", {}),
  current: () => requests.get<UserDto>("/api/auth/me"),
};

const api = {
  Auth,
};

export default api;
