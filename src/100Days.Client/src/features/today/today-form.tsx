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
import z from "zod";
import { Button } from "@/features/ui/button";

const todaySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

type TodayForm = z.infer<typeof todaySchema>;

export default function TodayForm() {
  const form = useForm<TodayForm>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form className="h-full w-full">
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
