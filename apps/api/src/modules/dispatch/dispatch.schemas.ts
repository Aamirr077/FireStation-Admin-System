import { z } from "zod";

export const AssignDispatchSchema = z.object({
  incident_id: z.string().uuid(),
  vehicle_id: z.string().uuid(),
});