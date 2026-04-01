"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Flame,
  Truck,
  Send,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

const items = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Incidents",
    href: "/dashboard/incidents",
    icon: Flame,
  },
  {
    label: "Dispatch",
    href: "/dashboard/dispatch",
    icon: Send,
  },
  {
    label: "Firetrucks",
    href: "/dashboard/firetrucks",
    icon: Truck,
  },
  {
    label: "Firefighters",
    href: "/dashboard/firefighters",
    icon: Users,
  },
  {
    label: "Reports",
    href: "/dashboard/report",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-[#e5e5e5] bg-white flex flex-col">
      {/* Logo / Title */}
      <div className="px-6 py-4 border-b border-[#e5e5e5]">
        <h1 className="text-lg font-bold tracking-wide">
          FIRESTATION
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium border 
                ${
                  active
                    ? "bg-black text-white border-black"
                    : "text-gray-700 border-transparent hover:bg-gray-100"
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-[#e5e5e5]">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 border border-transparent">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}