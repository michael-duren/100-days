import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen.ts";
import { useAuthStore } from "@/store/useAuthStore.ts";
import { useEffect } from "react";
import api from "@/api/agent.ts";

function InnerApp() {
  const auth = useAuthStore();
  const authContext = {
    auth,
  };

  useEffect(() => {
    // when page initially loads if there is a user
    // in local storage validate with backend
    if (auth.user !== null) {
      auth.setCheckingUser(true);
      api.Auth.current()
        .then((data) => {
          auth.setUser(data.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => auth.setCheckingUser(false));
    }
  }, []);

  return <RouterProvider context={authContext} router={router} />;
}

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

export default function App() {
  return <InnerApp />;
}
