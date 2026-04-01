"use client";

import { useEffect, useState } from "react";
import YTShell from "../../../components/Shell";
import { apiGet, apiPost, apiDelete, apiPut } from "../../../lib/api";
import { getAdminToken } from "../../../lib/auth";

type Firefighter = {
  id: string;
  name: string;
  phone: string;
  active: boolean;
};

export default function FirefightersPage() {
  const token = getAdminToken();

  const [rows, setRows] = useState<Firefighter[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await apiGet("/drivers", token);
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
        setMsg(e?.message || "Failed to load firefighters");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  async function create() {
    if (!name.trim() || !phone.trim()) {
      setMsg("Name and phone required");
      return;
    }

    setSaving(true);
    try {
      await apiPost(
        "/drivers",
        { name, phone },
        token
      );

      setMsg("Firefighter added");
      setName("");
      setPhone("");
      await load();
    } catch (e: any) {
      setMsg(e?.message || "Failed to add");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete firefighter?")) return;

    try {
      await apiDelete(`/drivers/${id}`, token);
      setMsg("Deleted");
      await load();
    } catch (e: any) {
      setMsg(e?.message || "Failed to delete");
    }
  }

  return (
    <YTShell title="Firefighters">
      <div className="max-w-[900px] space-y-6">
        {/* CREATE */}
        <div className="bg-white border p-6 space-y-4">
          <div className="font-semibold text-sm">
            Add Firefighter
          </div>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            Firefighters
          </div>

          {loading ? (
            <div className="p-4 text-sm text-gray-500">
              Loading...
            </div>
          ) : rows.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">
              No firefighters yet
            </div>
          ) : (
            <div className="divide-y">
              {rows.map((f) => (
                <div
                  key={f.id}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{f.name}</div>
                    <div className="text-sm text-gray-500">
                      {f.phone}
                    </div>
                  </div>

                  <button
                    onClick={() => remove(f.id)}
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