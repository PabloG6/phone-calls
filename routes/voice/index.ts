import { callHistory, contacts } from "@/db/schema";
import { env } from "@/lib/env";
import { authProcedure, createTRPCRouter } from "@/server/trpc";
import AccessToken, { VoiceGrant } from "twilio/lib/jwt/AccessToken";
import { z } from "zod";
import { eq } from "drizzle-orm";
export const voiceRouter = createTRPCRouter({
  createOutgoingCallToken: authProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const extCallIdHash = crypto.randomUUID();

      const token = new AccessToken(
        env.TWILIO_ACCOUNT_SID,
        env.TWILIO_API_KEY_SID,
        env.TWILIO_API_KEY_SECRET,
        { identity: `${ctx.user!.id}:${extCallIdHash}` },
      );
      console.log(input, "input");
      const contactList = await ctx.db
        .select()
        .from(contacts)
        .where(eq(contacts.e164Rep, input))
        .limit(1);

      console.log(contactList);
      if (contactList.length > 0) {
        const contact = contactList[0];
        await ctx.db
          .insert(callHistory)
          .values({
            direction: "outgoing",
            userId: ctx.user!.id,
            contact: contact.id,
            status: "initiated",
            extCallId: extCallIdHash,
          })
          .returning();
      } else {
        await ctx.db
          .insert(callHistory)
          .values({
            direction: "outgoing",
            anonymousCall: input,
            extCallId: extCallIdHash,
            status: "initiated",
            userId: ctx.user!.id,
          })
          .returning();
      }
      const voiceGrant = new VoiceGrant({
        outgoingApplicationSid: env.TWILIO_TWIML_SID,
        incomingAllow: false,
      });
      token.addGrant(voiceGrant);

      return { token: token.toJwt() };
    }),
});
