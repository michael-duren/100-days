import Header from "./header";
import { useAuthStore } from "@/store/useAuthStore.ts";
import { Loader } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { checkingUser } = useAuthStore();

  console.log("checking user:", checkingUser)
  
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="w-full mx-auto max-w-screen-lg h-full">
        {checkingUser ? (
          <div className={"flex justify-center items-center w-full"}>
            <div className={"animate-spin"}>
              <Loader />
            </div>
          </div>
        ) : (
          <>{children}</>
        )}
      </main>
      <footer className="bg-cyan-700">
        <div className="text-center p-4"></div>
      </footer>
    </div>
  );
}
