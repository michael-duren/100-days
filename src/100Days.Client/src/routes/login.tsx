import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: () => Login(),
});

function Login() {
  return (
    <div>
      <form>
        <input />
        <input />
      </form>
    </div>
  );
}
