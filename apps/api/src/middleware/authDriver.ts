import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function authDriver(req: Request, res: Response, next: NextFunction) {
  // ✅ DEV bypass
  if (env.DEV_BYPASS_AUTH) {
    (req as any).driver = { sub: "dev-driver" };
    return next();
  }

  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token, env.JWT_DRIVER_SECRET) as any;
    (req as any).driver = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

