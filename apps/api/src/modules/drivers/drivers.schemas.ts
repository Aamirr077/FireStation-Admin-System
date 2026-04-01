import { z } from "zod";

export const CreateDriverSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
});

export const UpdateDriverSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(7).optional(),
  active: z.boolean().optional(),
});