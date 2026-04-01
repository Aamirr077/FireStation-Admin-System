import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export type AdminToken = { sub: string; role: "admin"; email: string };
export type DriverToken = { sub: string; role: "driver"; phone: string };

export function signAdmin(payload: AdminToken) {
  return jwt.sign(payload, env.JWT_ADMIN_SECRET, { expiresIn: "7d" });
}

export function signDriver(payload: DriverToken) {
  return jwt.sign(payload, env.JWT_DRIVER_SECRET, { expiresIn: "30d" });
}

export function verifyAdmin(token: string): AdminToken {
  return jwt.verify(token, env.JWT_ADMIN_SECRET) as AdminToken;
}

export function verifyDriver(token: string): DriverToken {
  return jwt.verify(token, env.JWT_DRIVER_SECRET) as DriverToken;
}
