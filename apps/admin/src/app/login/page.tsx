"use client";

import { useMemo, useState } from "react";
import { apiPost } from "../../lib/api";
import { setAdminToken } from "../../lib/auth";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isError = useMemo(() => {
    const t = msg.toLowerCase();
    return t.includes("fail") || t.includes("error") || t.includes("invalid");
  }, [msg]);

  async function submit() {
    setMsg("");

    const e = email.trim();
    const p = password;

    if (!e) return setMsg("Email is required.");
    if (!p) return setMsg("Password is required.");

    setLoading(true);
    try {
      const r = await apiPost("/auth/admin/login", {
        email: e,
        password: p,
      });

      if (!r?.token) {
        setMsg("Login failed: token not returned.");
        return;
      }

      setAdminToken(r.token);

      // ✅ better navigation
      window.location.href = "/dashboard";
    } catch (e: any) {
      setMsg(e?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black mb-4">
            <Lock className="text-white" size={32} />
          </div>

          <h1 className="text-[28px] font-bold text-[#0d0d0d] tracking-tight">
            Firestation Admin
          </h1>
          <p className="text-[14px] text-[#606060] mt-1">
            Manage incidents and dispatch firetrucks
          </p>
        </div>

        <div className="px-6 pb-8 flex flex-col gap-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#606060] uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-[#cccccc] bg-white px-3 py-2 text-[14px] outline-none focus:border-black transition-all placeholder:text-[#909090]"
              placeholder="admin@firestation.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#606060] uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-[#cccccc] bg-white px-3 py-2 text-[14px] outline-none focus:border-black transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
            />
          </div>

          {/* Button */}
          <button
            onClick={submit}
            disabled={loading}
            className={[
              "w-full bg-black text-white font-bold text-[13px] py-2.5 uppercase tracking-wide mt-2",
              "hover:bg-gray-800 transition-colors",
              loading ? "opacity-60 cursor-not-allowed" : "",
            ].join(" ")}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {/* Message */}
          {msg ? (
            <div
              className={[
                "text-[12px] border p-2.5 text-center",
                isError
                  ? "text-red-600 bg-red-50 border-red-200"
                  : "text-green-600 bg-green-50 border-green-200",
              ].join(" ")}
            >
              {msg}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}