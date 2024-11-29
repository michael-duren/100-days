import { Input } from "@/features/ui/input";
import { Textarea } from "@/features/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form.tsx";
import { useForm } from "react-hook-form";
import { Button } from "@/features/ui/button";
import {
  NewEntryFormRequest,
  TodayFormSchema,
  todaySchema,
} from "./new-entry-form-schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEntryMutation } from "@/api/mutations/entries/useCreateEntryMutation.ts";
import { useAuthStore } from "@/store/useAuthStore.ts";
import { useGetActiveGoalQuery } from "@/api/queries/goal/useGetActiveGoal.ts";

export default function TodayForm() {
  const form = useForm<TodayFormSchema>({
    resolver: zodResolver(todaySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const mutation = useCreateEntryMutation();
  const { user } = useAuthStore();
  const { data: goalResponse, isSuccess } = useGetActiveGoalQuery(user);

  if (!isSuccess) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const onSubmit = (values: TodayFormSchema) => {
    const goalId = goalResponse.data.goalId;
    const goalRequest: NewEntryFormRequest = { ...values, goalId };
    mutation.mutate(goalRequest);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full">
        <div className="flex flex-col px-24 w-full h-full gap-4 mt-8">
          <h2 className="text-2xl font-bold">What did you do today?</h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input className="w-full" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Short summary of what you did today
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="w-full" {...field} />
                </FormControl>
                <FormDescription>
                  Overview of what you accomplished towards your goal.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"outline"}>Submit</Button>
        </div>
      </form>
    </Form>
  );
}
