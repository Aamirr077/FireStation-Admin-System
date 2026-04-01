import cors from "cors";

export const corsMw = cors({
  origin: [
    "http://localhost:3000",
    "https://fire-station-admin.vercel.app",
    "https://fire-station-users.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});