import { UserDto } from "@/types/dtos/UserDto";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: UserDto | null;
  checkingUser: boolean;
}

interface AuthAction {
  setUser: (user: UserDto | null) => void;
  setCheckingUser: (checkingUser: boolean) => void;
}

export type AuthStore = AuthState & AuthAction;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => {
      return {
        user: null,
        setUser: (user: UserDto | null) => set({ user }),
        checkingUser: false,
        setCheckingUser: (checkingUser) => set({ checkingUser }),
      };
    },
    {
      name: "user",
    },
  ),
);
