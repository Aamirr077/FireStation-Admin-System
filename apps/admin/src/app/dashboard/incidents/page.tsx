"use client";

import { useEffect, useState } from "react";
import YTShell from "../../../components/Shell";
import { apiGet, apiPost, apiDelete } from "../../../lib/api";
import { getAdminToken } from "../../../lib/auth";

type Incident = {
  id: string;
  description: string;
  location: string;
  status: string;
  created_at?: string;
};

export default function IncidentsPage() {
  const token = getAdminToken();

  const [rows, setRows] = useState<Incident[]>([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await apiGet("/incidents", token);
    setRows(r || []);
  }

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    (async () => {
      try {
        await load();
      } catch (e: any) {
        setMsg(e?.message || "Failed to load incidents");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  async function create() {
    if (!description.trim() || !location.trim()) {
      setMsg("Description and location required");
      return;
    }

    setSaving(true);
    try {
      await apiPost(
        "/incidents",
        {
          description,
          location,
        },
        token
      );

      setMsg("Incident created");
      setDescription("");
      setLocation("");

      await load();
    } catch (e: any) {
      setMsg(e?.message || "Failed to create");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete incident?")) return;

    try {
      await apiDelete(`/incidents/${id}`, token);
      setMsg("Deleted");
      await load();
    } catch (e: any) {
      setMsg(e?.message || "Failed to delete");
    }
  }

  return (
    <YTShell title="Incidents">
      <div className="max-w-[1000px] space-y-6">
        {/* CREATE */}
        <div className="bg-white border p-6 space-y-4">
          <div className="font-semibold text-sm">
            Report New Incident
          </div>

          <input
            placeholder="Description (e.g. Fire in building)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2"
          />

          <input
            placeholder="Location (e.g. Main Street)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border px-3 py-2"
          />

          <button
            onClick={create}
            disabled={saving}
            className="bg-black text-white px-4 py-2 font-bold"
          >
            {saving ? "Saving..." : "Create Incident"}
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white border">
          <div className="p-4 border-b font-semibold text-sm">
            All Incidents
          </div>

          {loading ? (
            <div className="p-4 text-sm text-gray-500">
              Loading...
            </div>
          ) : rows.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No incidents yet
            </div>
          ) : (
            <div className="divide-y">
              {rows.map((i) => (
                <div
                  key={i.id}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">
                      {i.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      {i.location}
                    </div>
                    <div className="text-xs mt-1">
                      Status:{" "}
                      <span className="font-semibold">
                        {i.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => remove(i.id)}
                    className="text-red-600 text-xs font-bold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MESSAGE */}
        {msg && (
          <div className="border px-4 py-3 text-sm">
            {msg}
          </div>
        )}
      </div>
    </YTShell>
  );
}