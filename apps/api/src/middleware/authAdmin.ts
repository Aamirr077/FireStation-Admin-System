import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function authAdmin(req: Request, res: Response, next: NextFunction) {
  // ✅ DEV bypass: allow any request
  if (env.DEV_BYPASS_AUTH) {
    (req as any).admin = { sub: "dev-admin" };
    return next();
  }

  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const decoded = jwt.verify(token, env.JWT_ADMIN_SECRET) as any;
    (req as any).admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

