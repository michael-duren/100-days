import type { LoginFormRequest } from "@/features/auth/login/login-schema";
import type { RegisterFormRequest } from "@/features/auth/register/register-schema";
import { NewGoalFormRequest } from "@/features/goals/new-goal-form-schema";
import { NewEntryFormRequest } from "@/features/today/new-entry-form-schema";
import { GoalDto } from "@/types/dtos/GoalDto";
import { UserDto } from "@/types/dtos/UserDto";
import { EntryDto } from "@/types/dtos/EntryDto";

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

const Goals = {
  list: () => requests.get<GoalDto[]>("/api/goals/all"),
  active: () => requests.get<GoalDto>("/api/goals/active"),
  details: (id: string) => requests.get<GoalDto>(`/api/goals/${id}`),
  create: (goal: NewGoalFormRequest) =>
    requests.post<GoalDto>("/api/goals/create", goal),
  update: (goal: GoalDto) =>
    requests.put<GoalDto>(`/api/goals/${goal.id}`, goal),
  delete: (id: string) => requests.delete(`/api/goals/${id}`),
};

const Entries = {
  list: () => requests.get("/api/entries"),
  listByGoal: (goalId: number) =>
    requests.get<EntryDto[]>(`/api/entries/goal/${goalId}`),
  details: (id: string) => requests.get(`/api/entries/${id}`),
  create: (entry: NewEntryFormRequest) =>
    requests.post("/api/entries/create", entry),
};

const api = {
  Auth,
  Goals,
  Entries,
};

export default api;
