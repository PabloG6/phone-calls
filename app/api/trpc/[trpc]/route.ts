import { auth } from "@/lib/auth";
import { appRouter } from "@/server";
import { createTRPCContext } from "@/server/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

export const handler = async (req: NextRequest) => {
  const session = await auth.api.getSession({ headers: req.headers });
  const user = session?.user ?? null;
  return fetchRequestHandler({
    router: appRouter,
    req,
    endpoint: "/api/trpc",
    createContext: () =>
      createTRPCContext({ headers: req.headers, user: user }),
  });
};

export { handler as GET, handler as POST };
