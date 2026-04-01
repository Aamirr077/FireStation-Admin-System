"use client";

import { useEffect, useMemo, useState } from "react";
import YTShell from "../../components/Shell";
import { apiGet } from "../../lib/api";
import { getAdminToken } from "../../lib/auth";

export default function DashboardPage() {
  const token = getAdminToken();

  const [stats, setStats] = useState({
    total_incidents: 0,
    pending: 0,
    dispatched: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const isError = useMemo(
    () =>
      msg.toLowerCase().includes("fail") ||
      msg.toLowerCase().includes("error"),
    [msg]
  );

  useEffect(() => {
    if (!token) {
      location.href = "/login";
      return;
    }

    (async () => {
      try {
        const data = await apiGet("/dashboard", token);
        setStats(data);
      } catch (e: any) {
        setMsg(e?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <YTShell title="Dashboard">
      <div className="max-w-[1200px] pb-10">
        {/* KPI Row */}
        <div className="grid grid-cols-4 bg-white border border-[#e5e5e5] divide-x divide-[#e5e5e5]">
          <div className="p-6">
            <div className="text-[13px] text-[#606060]">Total Incidents</div>
            <div className="text-[28px] mt-1">
              {loading ? "—" : stats.total_incidents}
            </div>
          </div>

          <div className="p-6">
            <div className="text-[13px] text-[#606060]">Pending</div>
            <div className="text-[28px] mt-1">
              {loading ? "—" : stats.pending}
            </div>
          </div>

          <div className="p-6">
            <div className="text-[13px] text-[#606060]">Dispatched</div>
            <div className="text-[28px] mt-1">
              {loading ? "—" : stats.dispatched}
            </div>
          </div>

          <div className="p-6">
            <div className="text-[13px] text-[#606060]">Resolved</div>
            <div className="text-[28px] mt-1">
              {loading ? "—" : stats.resolved}
            </div>
          </div>
        </div>

        {/* Placeholder section */}
        <div className="bg-white border-x border-b border-[#e5e5e5]">
          <div className="p-8 text-center text-[#909090] text-[13px]">
            Incident analytics will appear here
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 bg-white border border-[#e5e5e5] p-6 text-[13px]">
          <div>Total incidents: {stats.total_incidents}</div>
          <div>Pending: {stats.pending}</div>
          <div>Dispatched: {stats.dispatched}</div>
          <div>Resolved: {stats.resolved}</div>
        </div>

        {/* Error */}
        {msg && (
          <div
            className={`mt-6 px-4 py-3 text-[13px] border ${
              isError
                ? "bg-[#fef2f2] border-[#fee2e2] text-[#b91c1c]"
                : "bg-[#f0fdf4] border-[#dcfce7] text-[#15803d]"
            }`}
          >
            {msg}
          </div>
        )}
      </div>
    </YTShell>
  );
}