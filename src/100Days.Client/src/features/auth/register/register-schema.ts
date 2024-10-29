import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Must be a valid email address" }),
    username: z
      .string()
      .min(6, "Username must be at least 6 characters")
      .max(64, "Username must be less than 64 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterFormSchema = z.infer<typeof registerSchema>;
export type RegisterFormRequest = Omit<RegisterFormSchema, "confirmPassword">;
