// @ts-check
import { z } from "zod";

export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_MESSAGING_SERVICE_SID: z.string(),
});

export const clientSchema = z.object({});

export const clientEnv = {};
