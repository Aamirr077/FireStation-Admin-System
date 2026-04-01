"use client";

import { useState } from "react";
import { apiPost } from "../lib/api";

export default function Page() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!description.trim() || !location.trim()) {
      setMsg("Please fill all fields");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      await apiPost("/incidents", {
        description,
        location,
      });

      setMsg("Incident reported successfully 🚨");
      setDescription("");
      setLocation("");
    } catch (e: any) {
      setMsg(e?.message || "Failed to report incident");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4">
      <div className="w-full max-w-[500px] bg-white border p-6 space-y-4">
        <div className="text-center">
          <h1 className="text-[22px] font-bold">
            Report Fire Incident 🔥
          </h1>
          <p className="text-[13px] text-gray-500">
            Fill the form to alert the fire station
          </p>
        </div>

        {/* Description */}
        <input
          placeholder="What happened? (e.g. Fire in building)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2"
        />

        {/* Location */}
        <input
          placeholder="Location (e.g. Main street)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border px-3 py-2"
        />

        {/* Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white py-2 font-bold"
        >
          {loading ? "Submitting..." : "Report Incident"}
        </button>

        {/* Message */}
        {msg && (
          <div className="text-sm text-center border p-2">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}