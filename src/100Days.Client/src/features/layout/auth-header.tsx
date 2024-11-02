import { Button } from "@/features/ui/button";
import { Link } from "@tanstack/react-router";
import { Calendar, GoalIcon, ListTodo, Settings, Timer } from "lucide-react";

type AuthLink = {
  to: string;
  Icon: typeof ListTodo;
  title: string;
};

const authLinks: AuthLink[] = [
  {
    to: "/today",
    Icon: ListTodo,
    title: "Today",
  },
  {
    to: "/goal",
    Icon: GoalIcon,
    title: "Goal",
  },
  {
    to: "/time-estimate",
    Icon: Timer,
    title: "Time Estimate",
  },
  {
    to: "/calendar",
    title: "Calendar",
    Icon: Calendar,
  },
  {
    to: "/settings",
    title: "Settings",
    Icon: Settings,
  },
];

export default function AuthHeader() {
  return (
    <div className="flex gap-2 flex-wrap">
      {authLinks.map(({ Icon, to, title }) => (
        <Link
          activeProps={{
            className:
              "transition-all duration-300 shadow-md border-b border-indigo-500 pb-2",
          }}
          key={to}
          to={to}
        >
          <Button className="flex gap-2" variant={"outline"} size={"lg"}>
            <Icon size={18} />
            <span className="hidden lg:inline-block">{title}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
}
