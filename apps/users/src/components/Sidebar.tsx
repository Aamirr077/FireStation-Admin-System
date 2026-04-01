"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users,           
  Car,             
  CalendarDays,    
  GitCompare,      
  Settings,
  HelpCircle,
  Menu 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const items = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/drivers", label: "Drivers", icon: Users }, 
  { href: "/vehicles", label: "Vehicles", icon: Car }, 
  { href: "/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/assign", label: "Assignments", icon: GitCompare }, 
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={`bg-black text-white h-screen flex flex-col select-none transition-all duration-200 shrink-0 ${
        isOpen ? "w-[256px]" : "w-[72px]"
      }`}
    >
      {/* top bar */}
      <div className="h-[56px] px-6 flex items-center gap-4 shrink-0">
        <div 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-white/80 cursor-pointer hover:bg-white/10 p-2 rounded-full transition-colors ml-[-8px]"
        >
          <Menu size={24} />
        </div>
        {isOpen && (
          <div className="flex items-center gap-1 animate-in fade-in duration-300">
             <div className="font-bold text-[20px] tracking-tight text-white">UBS</div>
          </div>
        )}
      </div>

      {/* avatar section */}
      {isOpen && (
        <div className="flex flex-col items-center py-6 shrink-0 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-white/20 mb-4 bg-white/10">
            <img 
              src="https://via.placeholder.com/120" 
              className="w-full h-full object-cover"
              alt="User"
            />
          </div>
          <div className="w-full px-6 text-center">
            <div className="text-[11px] font-medium text-white/60 uppercase tracking-wider">Management</div>
            <div className="text-[14px] text-white font-normal truncate mt-0.5">Fleet Dispatch</div>
          </div>
        </div>
      )}

      {/* navigation */}
      <nav className="flex-1 overflow-y-auto pt-2 overflow-x-hidden">
        {items.map((it) => {
          const active = pathname === it.href;
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              title={!isOpen ? it.label : ""}
              className={[
                "flex items-center text-[14px] transition-all relative group h-[48px]",
                isOpen ? "px-6 gap-6" : "justify-center px-0",
                active
                  ? "bg-white/20 text-white font-semibold" 
                  : "text-white/80 hover:bg-white/10 hover:text-white font-normal",
              ].join(" ")}
            >
              {/* Active bar is now white to stand out against blue */}
              {active && <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-white" />}
              
              <div className="flex items-center justify-center w-[24px] shrink-0">
                <Icon 
                  size={22} 
                  strokeWidth={active ? 2.5 : 2} 
                  className="transition-colors" 
                />
              </div>
              
              {isOpen && (
                <span className="truncate animate-in slide-in-from-left-2 duration-200">
                  {it.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Nav */}
      <div className="border-t border-white/10 py-2 shrink-0">
        <div className={`px-6 py-2.5 flex items-center text-[14px] text-white/80 hover:bg-white/10 hover:text-white cursor-pointer group ${isOpen ? "gap-6" : "justify-center px-0"}`}>
          <div className="w-[24px] flex justify-center shrink-0">
            <Settings size={22} />
          </div>
          {isOpen && <span>Settings</span>}
        </div>
        <div className={`px-6 py-2.5 flex items-center text-[14px] text-white/80 hover:bg-white/10 hover:text-white cursor-pointer group ${isOpen ? "gap-6" : "justify-center px-0"}`}>
          <div className="w-[24px] flex justify-center shrink-0">
            <HelpCircle size={22} />
          </div>
          {isOpen && <span>Feedback</span>}
        </div>
      </div>
    </aside>
  );
}