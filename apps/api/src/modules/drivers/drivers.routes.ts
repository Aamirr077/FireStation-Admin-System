import express from "express";
import { supabaseAdmin } from "../../db/supabaseAdmin.js";
import { ah } from "../../lib/ah.js";
import { validateBody } from "../../lib/validate.js";
import { authAdmin } from "../../middleware/authAdmin.js";
import {
  CreateDriverSchema,
  UpdateDriverSchema,
} from "./drivers.schemas.js";

const r = express.Router();

/**
 * CREATE FIREFIGHTER (driver)
 */
r.post(
  "/",
  authAdmin,
  ah(async (req, res) => {
    const body = validateBody(CreateDriverSchema, req);

    const { data, error } = await supabaseAdmin
      .from("drivers")
      .insert({
        name: body.name,
        phone: body.phone,
        active: true,
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
 * GET ALL FIREFIGHTERS
 */
r.get(
  "/",
  authAdmin,
  ah(async (_req, res) => {
    const { data, error } = await supabaseAdmin
      .from("drivers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  })
);

/**
 * UPDATE FIREFIGHTER
 */
r.patch(
  "/:id",
  authAdmin,
  ah(async (req, res) => {
    const { id } = req.params;
    const body = validateBody(UpdateDriverSchema, req);

    const { data, error } = await supabaseAdmin
      .from("drivers")
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
 * DELETE FIREFIGHTER (optional)
 */
r.delete(
  "/:id",
  authAdmin,
  ah(async (req, res) => {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from("drivers")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ ok: true });
  })
);

export default r;