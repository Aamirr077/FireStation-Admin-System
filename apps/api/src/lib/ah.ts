import type { RequestHandler } from "express";

export const ah =
  (fn: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
