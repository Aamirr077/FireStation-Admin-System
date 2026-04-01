import express from "express";
import { ah } from "../../lib/ah.js";
import { authAdmin } from "../../middleware/authAdmin.js";
import { supabaseAdmin } from "../../db/supabaseAdmin.js";

const r = express.Router();

/**
 * GET /dashboard
 * Simple stats for admin dashboard
 */
r.get(
  "/",
  authAdmin,
  ah(async (_req, res) => {
    // fetch all incidents
    const { data, error } = await supabaseAdmin
      .from("incidents")
      .select("id,status");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // default counts
    let total = 0;
    let pending = 0;
    let dispatched = 0;
    let resolved = 0;

    for (const row of data || []) {
      total++;

      const status = (row.status || "").toLowerCase();

      if (status === "pending") pending++;
      if (status === "dispatched") dispatched++;
      if (status === "resolved") resolved++;
    }

    return res.json({
      total_incidents: total,
      pending,
      dispatched,
      resolved,
    });
  })
);

export default r;