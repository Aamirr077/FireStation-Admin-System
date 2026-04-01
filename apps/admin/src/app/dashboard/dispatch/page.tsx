"use client";

import { useEffect, useState } from "react";
import YTShell from "../../../components/Shell";
import { apiGet, apiPost } from "../../../lib/api";
import { getAdminToken } from "../../../lib/auth";

type Incident = {
  id: string;
  description: string;
  location: string;
  status: string;
};

type Vehicle = {
  id: string;
  name: string;
  status: string;
};

export default function DispatchPage() {
  const token = getAdminToken();

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [incidentId, setIncidentId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      location.href = "/login";
      return;
    }

    (async () => {
      try {
        const [i, v] = await Promise.all([
          apiGet("/incidents", token),
          apiGet("/vehicles", token),
        ]);

        setIncidents(i || []);
        setVehicles(v || []);
      } catch (e: any) {
        setMsg(e?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  async function dispatch() {
    if (!incidentId || !vehicleId) {
      setMsg("Select incident and vehicle");
      return;
    }

    setBusy(true);
    setMsg("");

    try {
      await apiPost(
        "/dispatch/assign",
        {
          incident_id: incidentId,
          vehicle_id: vehicleId,
        },
        token
      );

      setMsg("Firetruck dispatched successfully");

      setIncidentId("");
      setVehicleId("");

      // refresh list
      const i = await apiGet("/incidents", token);
      setIncidents(i || []);
    } catch (e: any) {
      setMsg(e?.message || "Dispatch failed");
    } finally {
      setBusy(false);
    }
  }

  async function resolve(id: string) {
    try {
      await apiPost(
        "/dispatch/resolve",
        { incident_id: id },
        token
      );

      setMsg("Incident resolved");

      const i = await apiGet("/incidents", token);
      setIncidents(i || []);
    } catch (e: any) {
      setMsg(e?.message || "Failed to resolve");
    }
  }

  if (loading) {
    return (
      <YTShell title="Dispatch">
        <div className="p-10 text-sm text-gray-600">Loading...</div>
      </YTShell>
    );
  }

  return (
    <YTShell title="Dispatch Firetrucks">
      <div className="max-w-[900px] space-y-6">
        {/* MESSAGE */}
        {msg && (
          <div className="border px-4 py-3 text-sm">
            {msg}
          </div>
        )}

        {/* DISPATCH FORM */}
        <div className="bg-white border border-[#e5e5e5] p-6 space-y-4">
          <div className="text-sm font-semibold">
            Assign Firetruck to Incident
          </div>

          {/* INCIDENT */}
          <select
            value={incidentId}
            onChange={(e) => setIncidentId(e.target.value)}
            className="w-full border px-3 py-2"
          >
            <option value="">Select incident</option>
            {incidents
              .filter((i) => i.status === "pending")
              .map((i) => (
                <option key={i.id} value={i.id}>
                  {i.description} - {i.location}
                </option>
              ))}
          </select>

          {/* VEHICLE */}
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full border px-3 py-2"
          >
            <option value="">Select firetruck</option>
            {vehicles
              .filter((v) => v.status === "available")
              .map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
          </select>

          <button
            onClick={dispatch}
            disabled={busy}
            className="bg-black text-white px-4 py-2 font-bold disabled:opacity-50"
          >
            {busy ? "Dispatching..." : "Dispatch"}
          </button>
        </div>

        {/* INCIDENT LIST */}
        <div className="bg-white border border-[#e5e5e5]">
          <div className="p-4 font-semibold text-sm border-b">
            Active Incidents
          </div>

          <div className="divide-y">
            {incidents.map((i) => (
              <div
                key={i.id}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{i.description}</div>
                  <div className="text-sm text-gray-500">
                    {i.location}
                  </div>
                  <div className="text-xs mt-1">
                    Status: {i.status}
                  </div>
                </div>

                {i.status !== "resolved" && (
                  <button
                    onClick={() => resolve(i.id)}
                    className="border px-3 py-2 text-xs font-bold"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </YTShell>
  );
}