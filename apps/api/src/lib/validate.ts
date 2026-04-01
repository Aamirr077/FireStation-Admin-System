import type { ZodTypeAny, z } from "zod";
import type { Request } from "express";

export function validateBody<S extends ZodTypeAny>(
  schema: S,
  req: Request
): z.infer<S> {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    const msg = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join(", ");
    throw Object.assign(new Error(msg), { status: 400 });
  }
  return parsed.data as z.infer<S>;
}
