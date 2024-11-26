import { useForm } from "react-hook-form";
import { NewGoalFormSchema, newGoalSchema } from "./new-goal-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { Input } from "@/features/ui/input";
import { Button } from "@/features/ui/button";
import { Textarea } from "../ui/textarea";
import { useCreateGoalMutation } from "@/api/mutations/goals/useCreateGoalMutation";

export default function NewGoalForm() {
  const form = useForm<NewGoalFormSchema>({
    resolver: zodResolver(newGoalSchema),
    defaultValues: {
      title: "",
      description: "",
      why: "",
    },
  });
  const mutation = useCreateGoalMutation();

  const onSubmit = (values: NewGoalFormSchema) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full w-full space-y-8"
      >
        <div className="flex flex-col px-24 w-full h-full gap-4 mt-8">
          <h1 className="text-2xl font-bold">Create a new goal</h1>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Code every day" {...field} />
                </FormControl>
                <FormDescription>
                  A concise title that describes your goal.
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
                  <Textarea
                    placeholder="I will code everyday for one hundred days. During this time I want to focus on learning Python."
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Get specific here. What will you do, how will you do it?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="why"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Why</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I want to learn Python so I can learn how to automate tasks and build web applications. I also want to learn how to use Python for data analysis."
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Why do you want to complete this goal? What will you gain from
                  working hard and finishing it?
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
