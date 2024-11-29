import z from "zod";

export const todaySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export type TodayFormSchema = z.infer<typeof todaySchema>;
export type NewEntryFormRequest = TodayFormSchema & { goalId: number | string };
