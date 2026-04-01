import cors from "cors";
import { env } from "../config/env.js";

export const corsMw = cors({
  origin: [env.CORS_ORIGIN_ADMIN, env.CORS_ORIGIN_DRIVER],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});
