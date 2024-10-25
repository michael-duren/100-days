import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormSchema } from "./login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { Input } from "@/features/ui/input";
import { Button } from "@/features/ui/button";
import { useLoginMutation } from "@/api/mutations/auth/useLoginMutation";
import { useNavigate } from "@tanstack/react-router";
import { Loader } from "lucide-react";

export default function LoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const mutation = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (values: LoginFormSchema) => {
    mutation.mutate(values);
  };

  if (mutation.isSuccess) {
    navigate({ to: "/user-dashboard" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="bob@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={mutation.isPending} className="w-full" type="submit">
          {mutation.isPending ? (
            <div className="animate-spin">
              <Loader />
            </div>
          ) : (
            <span>Login</span>
          )}
        </Button>
        {mutation.isError && (
          <div className="text-[0.8rem] font-medium text-destructive">
            <p>{mutation.error.message}</p>
          </div>
        )}
      </form>
    </Form>
  );
}
