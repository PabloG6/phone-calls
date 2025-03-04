"use client";
import { AuthForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm
          authType="login"
          submit={async (creds) => {
            await signIn.email({
              email: creds.email,
              password: creds.password,
              callbackURL: "/home",
              fetchOptions: {
                onRequest() {
                  setLoading(true);
                },

                onError(ctx) {
                  toast({
                    title: "An error occurred",
                    description: ctx.error.message,
                    variant: "destructive",
                  });
                  setLoading(false);
                },
                onSuccess() {
                  setLoading(false);
                  router.push("/dashboard");
                },
              },
            });
          }}
        >
          <Button type="submit" disabled={loading}>
            {" "}
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </AuthForm>
      </div>
    </div>
  );
}
