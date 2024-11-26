import { GoalDto } from "@/types/dtos/GoalDto";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BellRing, Check, Goal } from "lucide-react";
import { Button } from "../ui/button";

interface CurrentGoalProps {
  goal: GoalDto;
}

export default function CurrentGoal({ goal: g }: CurrentGoalProps) {
  return (
    <div className="flex flex-col px-24 w-full h-full gap-4 mt-8">
      <div>
        <h1 className="text-2xl font-bold">Goals</h1>
      </div>
      <Card className="w-[380px] hover:animate-pulse">
        <CardHeader>
          <CardTitle>{g.title}</CardTitle>
          <CardDescription>Your current goal</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-center py-8">
            <Goal size={56} />
          </div>
          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm">Description</p>
                <p className="text-sm text-muted-foreground">{g.description}</p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm">Why?</p>
                <p className="text-sm text-muted-foreground">{g.why}</p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm">Entries:</p>
                <p className="text-sm text-muted-foreground">0</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled className="w-full">
            <Check /> Complete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

{
  /* <div className="flex flex-col px-24 w-full h-full gap-4 mt-8" key={g.id}> */
}
{
  /*   <h1 className="text-2xl font-bold">Current Goal</h1> */
}
{
  /*   <div className="flex gap-2 items-center"> */
}
{
  /*     <p className="font-semibold text-xl">Title</p> */
}
{
  /*     <p>{g.title}</p> */
}
{
  /*   </div> */
}
{
  /*   <div></div> */
}
{
  /*   <p>{g.description}</p> */
}
{
  /*   <p>{g.why}</p> */
}
{
  /* </div> */
}
