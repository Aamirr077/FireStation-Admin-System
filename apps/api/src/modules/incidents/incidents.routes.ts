import express from "express";
import { supabaseAdmin } from "../../db/supabaseAdmin.js";
import { ah } from "../../lib/ah.js";
import { validateBody } from "../../lib/validate.js";
import { authAdmin } from "../../middleware/authAdmin.js";
import {
  CreateIncidentSchema,
  UpdateIncidentSchema,
} from "./incidents.schemas.js";

const r = express.Router();

/**
 * CREATE INCIDENT (PUBLIC)
 * 👉 No auth (user reports fire)
 */
r.post(
  "/",
  ah(async (req, res) => {
    const body = validateBody(CreateIncidentSchema, req);

    const { data, error } = await supabaseAdmin
      .from("incidents")
      .insert({
        description: body.description,
        location: body.location,
        status: "pending",
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
 * GET ALL INCIDENTS (ADMIN)
 */
r.get(
  "/",
  authAdmin,
  ah(async (_req, res) => {
    const { data, error } = await supabaseAdmin
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  })
);

/**
 * GET SINGLE INCIDENT (ADMIN)
 */
r.get(
  "/:id",
  authAdmin,
  ah(async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("incidents")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: "Incident not found" });
    }

    return res.json(data);
  })
);

/**
 * UPDATE INCIDENT (ADMIN)
 */
r.patch(
  "/:id",
  authAdmin,
  ah(async (req, res) => {
    const { id } = req.params;
    const body = validateBody(UpdateIncidentSchema, req);

    const { data, error } = await supabaseAdmin
      .from("incidents")
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
 * DELETE INCIDENT (ADMIN) – optional
 */
r.delete(
  "/:id",
  authAdmin,
  ah(async (req, res) => {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from("incidents")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ ok: true });
  })
);

export default r;