import { voiceRouter as callRouter } from "@/routes/voice";
import { createTRPCRouter } from "./trpc";
import { contactsRouter } from "@/routes/contacts";
import { callLogs as callLogsRouter } from "@/routes/callHistory/route";

export const appRouter = createTRPCRouter({
  tele: callRouter,
  contacts: contactsRouter,
  callLogs: callLogsRouter,
});
export type AppRouter = typeof appRouter;
