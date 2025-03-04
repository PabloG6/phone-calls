import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

type Props = {
  children: React.ReactNode;
  authType: "signup" | "login";
  submit: (a: z.infer<typeof authSchema>) => Promise<void>;
};

const goToSignUp = "Don't have an account?";
const gotoLogin = "Already have an account?";

export function AuthForm({
  className,
  submit,
  children,
  authType,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & Props) {
  const form = useForm<z.infer<typeof authSchema>>({
    defaultValues: {
      email: "",
      name: "login",
      password: "",
    },
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (
    data: z.infer<typeof authSchema>,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    await submit(data);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
              <div className="text-center text-sm">
                {authType == "signup" && gotoLogin}
                {authType == "login" && goToSignUp}{" "}
                {authType == "signup" && (
                  <Link href="/login" className="underline underline-offset-4">
                    Sign In
                  </Link>
                )}
                {authType == "login" && (
                  <Link
                    href="/create-account"
                    className="underline underline-offset-4"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {authType === "signup" && (
                <FormField
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          required
                        />
                      </FormItem>
                    );
                  }}
                />
              )}
              <FormField
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="*******"
                        required
                      />
                    </FormItem>
                  );
                }}
              ></FormField>
              {children}
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
