"use client";

import { useEffect, useState } from "react";
import Shell from "../../../components/Shell";
import { apiGet } from "../../../lib/api";
import { getAdminToken } from "../../../lib/auth";

type Incident = {
  id: string;
  description: string;
  location: string;
  status: string;
  created_at?: string;
};

export default function ReportPage() {
  const token = getAdminToken();

  const [stats, setStats] = useState<any>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<
    "pending" | "dispatched" | "resolved" | null
  >(null);

  useEffect(() => {
    if (!token) {
      location.href = "/login";
      return;
    }

    (async () => {
      try {
        const [s, i] = await Promise.all([
          apiGet("/dashboard", token),
          apiGet("/incidents", token),
        ]);

        setStats(s);
        setIncidents(i || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const rows = view
    ? incidents.filter((i) => i.status === view)
    : [];

  return (
    <Shell title="Reports">
      <div className="max-w-[1200px] space-y-6">
        {loading && <div>Loading...</div>}

        {/* CARDS */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
              title="Total"
              value={stats.total_incidents}
              onClick={() => setView(null)}
            />

            <Card
              title="Pending"
              value={stats.pending}
              color="yellow"
              onClick={() => setView("pending")}
            />

            <Card
              title="Dispatched"
              value={stats.dispatched}
              color="blue"
              onClick={() => setView("dispatched")}
            />

            <Card
              title="Resolved"
              value={stats.resolved}
              color="green"
              onClick={() => setView("resolved")}
            />
          </div>
        )}

        {/* TABLE */}
        {view && (
          <div className="bg-white border">
            <div className="p-4 border-b flex justify-between">
              <div className="font-semibold uppercase">
                {view} incidents
              </div>
              <button onClick={() => setView(null)}>Close</button>
            </div>

            {!rows.length ? (
              <div className="p-6 text-[#606060]">No data</div>
            ) : (
              <div className="divide-y">
                {rows.map((i) => (
                  <div key={i.id} className="p-4">
                    <div className="font-medium">
                      {i.description}
                    </div>
                    <div className="text-sm text-gray-500">
                      {i.location}
                    </div>
                    <div className="text-xs mt-1">
                      {i.created_at
                        ? new Date(i.created_at).toLocaleString()
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Shell>
  );
}

/* SMALL CARD COMPONENT */
function Card({
  title,
  value,
  onClick,
  color,
}: {
  title: string;
  value: number;
  onClick: () => void;
  color?: "yellow" | "blue" | "green";
}) {
  const colors: any = {
    yellow: "text-yellow-600",
    blue: "text-blue-600",
    green: "text-green-600",
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border p-6 cursor-pointer hover:border-black"
    >
      <div className="text-[12px] text-[#606060] uppercase">
        {title}
      </div>
      <div
        className={`text-[32px] font-bold ${
          color ? colors[color] : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}