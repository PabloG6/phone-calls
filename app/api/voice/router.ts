import { env } from "@/lib/env";
import {} from "@twilio/voice-sdk";
import AccessToken, { VoiceGrant } from "twilio/lib/jwt/AccessToken";
export async function POST(request: Request) {
  const token = new AccessToken(
    env.TWILIO_ACCOUNT_SID,
    env.TWILIO_API_KEY,
    env.TWILIO_AUTH_TOKEN,
    { identity: "user" },
  );

  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: "",
    incomingAllow: false,
  });
  token.addGrant(voiceGrant);
}
