import express from "express";
import { supabaseAdmin } from "../../db/supabaseAdmin.js";
import { ah } from "../../lib/ah.js";
import { validateBody } from "../../lib/validate.js";
import { authAdmin } from "../../middleware/authAdmin.js";
import { AssignDispatchSchema } from "./dispatch.schemas.js";

const r = express.Router();

/**
 * ASSIGN FIRETRUCK TO INCIDENT
 */
r.post(
  "/assign",
  authAdmin,
  ah(async (req, res) => {
    const body = validateBody(AssignDispatchSchema, req);

    const { incident_id, vehicle_id } = body;

    // 1. check if vehicle is available
    const { data: vehicle } = await supabaseAdmin
      .from("vehicles")
      .select("id,status")
      .eq("id", vehicle_id)
      .maybeSingle();

    if (!vehicle || vehicle.status !== "available") {
      return res.status(400).json({ error: "Vehicle not available" });
    }

    // 2. create dispatch record
    const { error: dispatchError } = await supabaseAdmin
      .from("dispatches")
      .insert({
        incident_id,
        vehicle_id,
      });

    if (dispatchError) {
      return res.status(500).json({ error: dispatchError.message });
    }

    // 3. update incident status → dispatched
    await supabaseAdmin
      .from("incidents")
      .update({ status: "dispatched" })
      .eq("id", incident_id);

    // 4. update vehicle → busy
    await supabaseAdmin
      .from("vehicles")
      .update({ status: "busy" })
      .eq("id", vehicle_id);

    return res.json({
      ok: true,
      message: "Firetruck dispatched successfully",
    });
  })
);

/**
 * MARK INCIDENT AS RESOLVED
 */
r.post(
  "/resolve",
  authAdmin,
  ah(async (req, res) => {
    const { incident_id } = req.body;

    if (!incident_id) {
      return res.status(400).json({ error: "incident_id required" });
    }

    // 1. update incident → resolved
    await supabaseAdmin
      .from("incidents")
      .update({ status: "resolved" })
      .eq("id", incident_id);

    // 2. free vehicle(s)
    const { data: dispatches } = await supabaseAdmin
      .from("dispatches")
      .select("vehicle_id")
      .eq("incident_id", incident_id);

    for (const d of dispatches || []) {
      await supabaseAdmin
        .from("vehicles")
        .update({ status: "available" })
        .eq("id", d.vehicle_id);
    }

    return res.json({
      ok: true,
      message: "Incident marked as resolved",
    });
  })
);

export default r;