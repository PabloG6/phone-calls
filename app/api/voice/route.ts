import { twilioNumber } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { twiml } from "twilio";
export async function POST(request: NextRequest) {
  const callData = await request.formData();
  const To = callData.get("To") as string;
  const voiceResponse = new twiml.VoiceResponse();
  return new NextResponse(
    voiceResponse.dial({ callerId: twilioNumber }, To).toString(),
    {
      headers: {
        "content-type": "text/xml",
      },
    },
  );
}
