
// export const env = EnvSchema.parse(process.env);
import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  DEV_BYPASS_AUTH: z
    .string()
    .optional()
    .transform((v) => String(v || "false").toLowerCase() === "true"),

  JWT_ADMIN_SECRET: z.string(),
  JWT_DRIVER_SECRET: z.string(),


  CORS_ORIGIN_ADMIN: z.string(),
  CORS_ORIGIN_DRIVER: z.string(),

  // keep these if your app requires them; or make them optional for now
  SUPABASE_URL: z.string().optional(),
  SUPABASE_SERVICE_ROLE: z.string().optional(),
  HOLIDAYTAXIS_BASE_URL: z.string().optional(),
  HOLIDAYTAXIS_API_KEY: z.string().optional(),
  HOLIDAYTAXIS_VERSION: z.string().optional(),
  API_PORT: z.coerce.number().optional().default(4100),
    ENABLE_30MIN_JOB: z
    .string()
    .optional()
    .transform((v) => (String(v || "").toLowerCase() === "true" ? true : false))
    .pipe(z.boolean().default(false)),
});

export const env = EnvSchema.parse(process.env);
