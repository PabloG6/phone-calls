import { callHistory, contacts } from "@/db/schema";
import { authProcedure, createTRPCRouter } from "@/server/trpc";
import { eq } from "drizzle-orm";

export const callLogs = createTRPCRouter({
  list: authProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        id: callHistory.id,
        name: contacts.name,
        phoneNumber: contacts.phoneNumber,
        anonymousCall: callHistory.anonymousCall,
        status: callHistory.status,
        duration: callHistory.duration,
        direction: callHistory.direction,
      })
      .from(callHistory)
      .innerJoin(contacts, eq(callHistory.contact, contacts.id))
      .where(eq(callHistory.userId, ctx.user!.id));

    // Post-process to handle anonymous calls
    return result.map((value) => ({
      ...value,
      name: value?.anonymousCall ? "Unknown" : value.name,
      phoneNumber: value.anonymousCall
        ? value.anonymousCall
        : value.phoneNumber,
    }));
  }),
  create: authProcedure.query(async () => {}),
});
