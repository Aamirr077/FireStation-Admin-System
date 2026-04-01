"use client";

import { useEffect } from "react";
import { getAdminToken } from "../lib/auth";

export default function Page() {
  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      window.location.href = "/login";
    } else {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-sm text-gray-500">
      Redirecting...
    </div>
  );
}