export const queryKeys = {
  auth: {
    login: ["auth", "login"],
    register: ["auth", "register"],
    logout: ["auth", "logout"],
    me: ["auth", "me"],
  },
  goals: {
    all: ["goals", "all"],
    details: (id: string) => ["goals", id],
  },
};
