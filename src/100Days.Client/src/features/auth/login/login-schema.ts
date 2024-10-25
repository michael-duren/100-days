import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Must be a valid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
export type LoginFormRequest = LoginFormSchema;
