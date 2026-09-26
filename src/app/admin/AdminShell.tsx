"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  ExternalLink,
  Images,
  LayoutDashboard,
  Megaphone,
  MonitorPlay,
  Settings,
  Sliders,
  Users,
} from "lucide-react";
import OmMark from "@/components/OmMark";
import LogoutButton from "@/components/admin/LogoutButton";

const NAV = [
  [LayoutDashboard, "Dashboard", "/admin"],
  [CalendarDays, "Events", "/admin/events"],
  [Megaphone, "Announcements", "/admin/announcements"],
  [MonitorPlay, "YouTube", "/admin/videos"],
  [Images, "Gallery", "/admin/gallery"],
  [Sliders, "Hero Slider", "/admin/slider"],
  [Clock, "Temple Timings", "/admin/timings"],
  [Users, "Users", "/admin/users"],
  [Settings, "Settings", "/admin/settings"],
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // When on login page, render child component full-screen without sidebar or admin header
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream-100 lg:flex lg:h-screen lg:overflow-hidden">
      {/* Fixed Desktop Sidebar */}
      <aside className="bg-maroon-950 text-cream-100 lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:h-screen lg:overflow-y-auto shadow-xl z-20">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0">
          <OmMark className="h-10 w-10 shrink-0" />
          <div className="leading-tight">
            <p className="font-display text-lg font-bold tracking-tight text-white">Sai Oracle</p>
            <p className="text-[10px] tracking-[0.22em] text-gold-300 font-bold uppercase">Admin</p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-cream-100/30 px-3 py-1 text-xs hover:bg-white/10 lg:hidden"
          >
            View Site <ExternalLink aria-hidden className="h-3 w-3" />
          </a>
        </div>
        <nav aria-label="Admin" className="flex flex-1 flex-col gap-1 overflow-x-auto p-3 lg:overflow-visible">
          {NAV.map(([Icon, label, href]) => (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === href
                  ? "bg-white/15 text-gold-200 font-bold shadow-xs"
                  : "text-cream-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon aria-hidden className="h-4 w-4 shrink-0 text-gold-300/90" />
              <span>{label}</span>
            </Link>
          ))}
          <div className="hidden lg:mt-auto lg:block lg:border-t lg:border-white/10 lg:pt-3">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Main Content Area (Independent scroll) */}
      <div className="flex-1 lg:min-w-0 lg:h-screen lg:overflow-y-auto flex flex-col">
        <div className="sticky top-0 z-10 hidden items-center justify-between border-b border-maroon-100 bg-white/95 backdrop-blur-xs px-8 py-3.5 lg:flex shadow-2xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-stone-500 tracking-wide">
              Temple Admin Control Panel
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-serif italic text-maroon-800">Om Sai Ram</span>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-maroon-200/90 bg-cream-50 px-4 py-1.5 text-xs font-bold text-maroon-900 hover:bg-maroon-50 shadow-2xs transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink aria-hidden className="h-3.5 w-3.5 text-maroon-700" />
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
