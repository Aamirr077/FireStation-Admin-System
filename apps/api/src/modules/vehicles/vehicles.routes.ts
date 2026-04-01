import express from "express";
import { supabaseAdmin } from "../../db/supabaseAdmin.js";
import { ah } from "../../lib/ah.js";
import { validateBody } from "../../lib/validate.js";
import { authAdmin } from "../../middleware/authAdmin.js";
import {
  CreateVehicleSchema,
  UpdateVehicleSchema,
} from "./vehicles.schemas.js";

const r = express.Router();

/**
 * CREATE FIRETRUCK
 */
r.post(
  "/",
  authAdmin,
  ah(async (req, res) => {
    const body = validateBody(CreateVehicleSchema, req);

    const { data, error } = await supabaseAdmin
      .from("vehicles")
      .insert({
        name: body.name,
        status: "available",
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  })
);

/**
 * GET ALL FIRETRUCKS
 */
r.get(
  "/",
  authAdmin,
  ah(async (_req, res) => {
    const { data, error } = await supabaseAdmin
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  })
);

/**
 * GET SINGLE FIRETRUCK
 */
r.get(
  "/:id",
  authAdmin,
  ah(async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("vehicles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    return res.json(data);
  })
);

/**
 * UPDATE FIRETRUCK
 */
r.patch(
  "/:id",
  authAdmin,
  ah(async (req, res) => {
    const { id } = req.params;
    const body = validateBody(UpdateVehicleSchema, req);

    const { data, error } = await supabaseAdmin
      .from("vehicles")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  })
);

/**
 * DELETE FIRETRUCK (optional)
 */
r.delete(
  "/:id",
  authAdmin,
  ah(async (req, res) => {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from("vehicles")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ ok: true });
  })
);

export default r;