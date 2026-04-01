import { z } from "zod";

export const CreateVehicleSchema = z.object({
  name: z.string().min(2), // e.g. "Truck 1"
});

export const UpdateVehicleSchema = z.object({
  name: z.string().min(2).optional(),
  status: z.enum(["available", "busy"]).optional(),
});