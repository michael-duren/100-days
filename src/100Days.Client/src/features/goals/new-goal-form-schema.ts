import { z } from "zod";

export const newGoalSchema = z.object({
  title: z
    .string()
    .min(4, "Your goal title must be at least 4 characters long"),
  description: z
    .string()
    .min(10, "Be a little more descriptive of what your goal is"),
  why: z.string().min(5, "Your why must be at least 5 characters long"),
});

export type NewGoalFormSchema = z.infer<typeof newGoalSchema>;
export type NewGoalFormRequest = NewGoalFormSchema;
