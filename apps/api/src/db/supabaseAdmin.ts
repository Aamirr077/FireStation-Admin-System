import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

export const supabaseAdmin = createClient(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE!, {
  auth: { persistSession: false },
});

async function testConnection() {
  try {
    const { data, error } = await supabaseAdmin
      .from("admins")
      .select("id")
      .limit(1);

    if (error) throw error;

    console.log("✅ Supabase connected successfully!");
  } catch (err: any) {
    console.error("❌ Supabase connection failed:", err.message);
  }
}

testConnection();

