import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
  server: {
    TWILIO_TWIML_SID: z.string(),
    TWILIO_AUTH_TOKEN: z.string(),
    TWILIO_ACCOUNT_SID: z.string(),
    TWILIO_API_KEY_SID: z.string(),
    TWILIO_API_KEY_SECRET: z.string(),
    DATABASE_URL: z.string(),
    PROD_URL: z.string().url().nullish(),
  },
  client: {
    NEXT_PUBLIC_NODE_ENV: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    PROD_URL: process.env.PROD_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_TWIML_SID: process.env.TWILIO_TWIML_SID,
    TWILIO_API_KEY_SID: process.env.TWILIO_API_KEY_SID,
    TWILIO_API_KEY_SECRET: process.env.TWILIO_API_KEY_SECRET,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  },
});
