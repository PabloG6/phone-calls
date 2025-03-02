import { db } from "@/db";
import superjson from "superjson";
import { initTRPC, TRPCError } from "@trpc/server";
import { User } from "better-auth";
export const createTRPCContext = async ({
  headers,
  user,
}: {
  user: User | null;
  headers: Headers;
}) => {
  return {
    db,
    user,
    headers,
  };
};

const t = initTRPC
  .context<typeof createTRPCContext>()
  .create({ transformer: superjson });
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const authProcedure = t.procedure.use(
  middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { user: ctx.user },
      },
    });
  }),
);
