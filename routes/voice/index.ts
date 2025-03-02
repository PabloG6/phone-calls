import { env } from "@/lib/env";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import AccessToken, { VoiceGrant } from "twilio/lib/jwt/AccessToken";
import { z } from "zod";

export const voiceRouter = createTRPCRouter({
  createToken: publicProcedure
    .input(z.string().nullish())
    .mutation(async () => {
      const token = new AccessToken(
        env.TWILIO_ACCOUNT_SID,
        env.TWILIO_API_KEY_SID,
        env.TWILIO_API_KEY_SECRET,
        { identity: "user" },
      );

      const voiceGrant = new VoiceGrant({
        outgoingApplicationSid: "",
        incomingAllow: false,
      });
      token.addGrant(voiceGrant);

      return { token: token.toJwt(), identity: "user" };
    }),
});
