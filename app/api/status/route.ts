import { db } from "@/db";
import { callHistory } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const from = data.get("From") as string;
  const duration = data.get("Duration")! as string;
  if (from === null) {
    console.error("no from returned. unable to generate call history");
    return new NextResponse(null, {
      status: 200,
      headers: { "content-type": "text/xml" },
    });
  }

  const values = from.split(":");
  const userId = values[1];
  const extCallId = values[2];

  await db
    .update(callHistory)
    .set({ duration: Number.parseInt(duration) })
    .where(
      and(eq(callHistory.extCallId, extCallId), eq(callHistory.userId, userId)),
    );
  return new NextResponse(null, {
    status: 200,
    headers: { "content-type": "text/xml" },
  });
}
