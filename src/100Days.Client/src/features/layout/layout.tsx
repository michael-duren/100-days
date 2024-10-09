import { ModeToggle } from "../theme/mode-toggle";
import Logo from "@/assets/camera.svg?react";
import { Button } from "../ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center mx-8 mt-2 mb-4 border-b-cyan-700 border-b pb-4">
        <div className="flex gap-1 items-center">
          <h1 className="text-2xl font-bold italic">100 Days</h1>

          <Logo className="w-16 h-16" />
        </div>
        <div className="flex gap-2">
          <div className="flex">
            <Button variant={"ghost"}>About</Button>
            <Button variant={"ghost"}>Login</Button>
            <Button variant={"ghost"}>Register</Button>
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-screen-lg h-full">{children}</main>
      <footer className="bg-cyan-700">
        <div className="text-center p-4"></div>
      </footer>
    </div>
  );
}
