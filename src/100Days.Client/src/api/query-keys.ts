export const queryKeys = {
  auth: {
    login: ["auth", "login"],
    register: ["auth", "register"],
    logout: ["auth", "logout"],
    me: ["auth", "me"],
  },
  goals: {
    all: ["goals", "all"],
    active: ["goals", "active"],
    details: (id: string) => ["goals", id],
  },
  entries: {
    all: ["entries", "all"],
    byGoal: (goalId: number) => ["entries", "goals", goalId],
    details: (id: string) => ["entries", id],
  },
};
