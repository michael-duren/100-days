import { ModeToggle } from "../theme/mode-toggle";
import Logo from "@/assets/camera.svg?react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
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
            <Link to="/login">
              <Button variant={"ghost"}>Login</Button>
            </Link>
            <Link to="/register">
              <Button variant={"ghost"}>Register</Button>
            </Link>
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="w-full mx-auto max-w-screen-lg h-full">{children}</main>
      <footer className="bg-cyan-700">
        <div className="text-center p-4"></div>
      </footer>
    </div>
  );
}
