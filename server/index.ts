import { voiceRouter as callRouter } from "@/routes/voice";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  tele: callRouter,
});
export type AppRouter = typeof appRouter;
