import { z } from "zod";

export const CreateIncidentSchema = z.object({
  description: z.string().min(3),
  location: z.string().min(3),
});

export const UpdateIncidentSchema = z.object({
  status: z.enum(["pending", "dispatched", "resolved"]).optional(),
  description: z.string().min(3).optional(),
  location: z.string().min(3).optional(),
});