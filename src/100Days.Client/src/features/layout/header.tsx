import { ModeToggle } from "../theme/mode-toggle";
import Logo from "@/assets/camera.svg?react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "lucide-react";
import api from "@/api/agent.ts";

export default function Header() {
  const { user, setUser } = useAuthStore();
  console.log("user: ", user);

  const logout = async () => {
    setUser(null);
    await api.Auth.logout();
  };

  return (
    <header className="flex justify-between items-center mx-8 mt-2 mb-4 border-b-cyan-700 border-b pb-4">
      <Link to="/" className="flex gap-1 items-center">
        <h1 className="text-2xl font-bold italic">100 Days</h1>
        <Logo className="w-16 h-16" />
      </Link>
      <div className="flex gap-2">
        <div className="flex">
          <Link to="/about">
            <Button variant={"ghost"}>About</Button>
          </Link>
          {user ? (
            <>
              <Link to="/login">
                <Button onClick={logout} variant={"ghost"}>
                  Logout
                </Button>
              </Link>
              <Link to={"/today"}>
                <Button variant={"ghost"}>
                  <User size={20} />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant={"ghost"}>Login</Button>
              </Link>
              <Link to="/register">
                <Button variant={"ghost"}>Register</Button>
              </Link>
            </>
          )}
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
