"use client";

import { useEffect, useState } from "react";
import YTShell from "../../../components/Shell";
import { apiGet, apiPost, apiDelete } from "../../../lib/api";
import { getAdminToken } from "../../../lib/auth";

type Vehicle = {
  id: string;
  name: string;
  status: string;
};

export default function FiretrucksPage() {
  const token = getAdminToken();

  const [rows, setRows] = useState<Vehicle[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await apiGet("/vehicles", token);
    setRows(r || []);
  }

  useEffect(() => {
    if (!token) {
      location.href = "/login";
      return;
    }

    (async () => {
      try {
        await load();
      } catch (e: any) {
        setMsg(e?.message || "Failed to load firetrucks");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  async function create() {
    if (!name.trim()) {
      setMsg("Firetruck name required");
      return;
    }

    setSaving(true);
    try {
      await apiPost("/vehicles", { name }, token);

      setMsg("Firetruck added");
      setName("");
      await load();
    } catch (e: any) {
      setMsg(e?.message || "Failed to add");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete firetruck?")) return;

    try {
      await apiDelete(`/vehicles/${id}`, token);
      setMsg("Deleted");
      await load();
    } catch (e: any) {
      setMsg(e?.message || "Failed to delete");
    }
  }

  return (
    <YTShell title="Firetrucks">
      <div className="max-w-[900px] space-y-6">
        {/* CREATE */}
        <div className="bg-white border p-6 space-y-4">
          <div className="font-semibold text-sm">
            Add Firetruck
          </div>

          <input
            placeholder="e.g. Truck 1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2"
          />

          <button
            onClick={create}
            disabled={saving}
            className="bg-black text-white px-4 py-2 font-bold"
          >
            {saving ? "Saving..." : "Add"}
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white border">
          <div className="p-4 border-b font-semibold text-sm">
            Firetrucks
          </div>

          {loading ? (
            <div className="p-4 text-sm text-gray-500">
              Loading...
            </div>
          ) : rows.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No firetrucks yet
            </div>
          ) : (
            <div className="divide-y">
              {rows.map((v) => (
                <div
                  key={v.id}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{v.name}</div>
                    <div className="text-xs text-gray-500">
                      Status: {v.status}
                    </div>
                  </div>

                  <button
                    onClick={() => remove(v.id)}
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