import express from "express";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "../../db/supabaseAdmin.js";
import { ah } from "../../lib/ah.js";
import { validateBody } from "../../lib/validate.js";
import { signAdmin } from "../../lib/jwt.js";
import {
  AdminLoginSchema,
  AdminRegisterSchema,
} from "./auth.schemas.js";

const r = express.Router();

/**
 * ADMIN REGISTER
 * 👉 Use once to create your admin account
 */
r.post(
  "/admin/register",
  ah(async (req, res) => {
    const body = validateBody(AdminRegisterSchema, req);

    const hash = await bcrypt.hash(body.password, 10);

    const { data, error } = await supabaseAdmin
      .from("admins")
      .insert({
        email: body.email.toLowerCase(),
        password_hash: hash,
      })
      .select("id,email")
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = signAdmin({
      sub: data.id,
      role: "admin",
      email: data.email,
    });

    return res.json({
      token,
      admin: data,
    });
  })
);

/**
 * ADMIN LOGIN
 */
r.post(
  "/admin/login",
  ah(async (req, res) => {
    const body = validateBody(AdminLoginSchema, req);
    const email = body.email.toLowerCase();

    const { data, error } = await supabaseAdmin
      .from("admins")
      .select("id,email,password_hash")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(body.password, data.password_hash);

    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signAdmin({
      sub: data.id,
      role: "admin",
      email: data.email,
    });

    return res.json({
      token,
      admin: {
        id: data.id,
        email: data.email,
      },
    });
  })
);

export default r;