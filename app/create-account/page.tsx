"use client";
import { AuthForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm
          authType="signup"
          submit={async (data) => {
            await signUp.email({
              fetchOptions: {
                onRequest: () => {
                  setLoading(true);
                },
                onError: (ctx) => {
                  toast({
                    title: "An error occurred",
                    variant: "destructive",
                    description: ctx.error.message,
                  });
                  setLoading(false);
                },

                onSuccess: () => {
                  setLoading(false);
                  router.push("/home");
                },
              },
              email: data.email,
              password: data.password,
              name: data.name,
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
              "Sign Up"
            )}
          </Button>
        </AuthForm>
      </div>
    </div>
  );
}
