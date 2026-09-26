"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  ExternalLink,
  Heart,
  Images,
  LayoutDashboard,
  Megaphone,
  Menu,
  MonitorPlay,
  Settings,
  Sliders,
  Users,
  X,
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
  [Heart, "Trust & Donation", "/admin/trust"],
  [Users, "Users", "/admin/users"],
  [Settings, "Settings", "/admin/settings"],
] as const;

// Bottom tabs: most-used items for quick access on mobile
const BOTTOM_TABS = [
  [LayoutDashboard, "Home", "/admin"],
  [CalendarDays, "Events", "/admin/events"],
  [Megaphone, "Notices", "/admin/announcements"],
  [Images, "Gallery", "/admin/gallery"],
  [Settings, "Settings", "/admin/settings"],
] as const;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";
  if (isLoginPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-cream-100 lg:flex lg:h-screen lg:overflow-hidden">

      {/* ═══════════════════════════════════════════
          DESKTOP SIDEBAR (unchanged, lg+ only)
      ═══════════════════════════════════════════ */}
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:h-screen lg:overflow-y-auto bg-maroon-950 text-cream-100 shadow-xl z-20">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0">
          <OmMark className="h-10 w-10 shrink-0" />
          <div className="leading-tight">
            <p className="font-display text-lg font-bold tracking-tight text-white">Sai Oracle</p>
            <p className="text-[10px] tracking-[0.22em] text-gold-300 font-bold uppercase">Admin</p>
          </div>
        </div>
        <nav aria-label="Admin" className="flex flex-1 flex-col gap-1 p-3 overflow-y-auto">
          {NAV.map(([Icon, label, href]) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-white/15 text-gold-200 font-bold shadow-xs"
                  : "text-cream-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon aria-hidden className="h-4 w-4 shrink-0 text-gold-300/90" />
              <span>{label}</span>
            </Link>
          ))}
          <div className="mt-auto border-t border-white/10 pt-3">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* ═══════════════════════════════════════════
          MOBILE LAYOUT (below lg)
      ═══════════════════════════════════════════ */}

      {/* Mobile Top Bar */}
      <div className="fixed top-0 inset-x-0 z-40 flex items-center justify-between bg-maroon-950 px-4 py-3 shadow-lg lg:hidden">
        <div className="flex items-center gap-2.5">
          <OmMark className="h-8 w-8 shrink-0" />
          <div>
            <p className="font-display text-sm font-bold text-white leading-tight">Sai Oracle</p>
            <p className="text-[9px] tracking-[0.22em] text-gold-300 font-bold uppercase leading-none">Admin Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-cream-100/30 px-2.5 py-1 text-[11px] font-semibold text-cream-200 hover:bg-white/10 transition-colors"
          >
            View Site <ExternalLink className="h-3 w-3" />
          </a>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors active:scale-95"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-In Drawer Overlay */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-maroon-950 shadow-2xl lg:hidden animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <OmMark className="h-9 w-9 shrink-0" />
                <div>
                  <p className="font-display text-base font-bold text-white">Sai Oracle</p>
                  <p className="text-[9px] tracking-[0.2em] text-gold-300 font-bold uppercase">Admin</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-cream-200 hover:bg-white/20 transition-colors active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Drawer Nav */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
              <p className="px-3 pb-2 pt-1 text-[10px] font-bold tracking-[0.2em] text-gold-400/60 uppercase">Navigation</p>
              {NAV.map(([Icon, label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                    pathname === href
                      ? "bg-gold-400/20 text-gold-200 font-bold border border-gold-400/30"
                      : "text-cream-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    pathname === href ? "bg-gold-400/20" : "bg-white/5"
                  }`}>
                    <Icon aria-hidden className="h-4 w-4 text-gold-300" />
                  </span>
                  <span>{label}</span>
                  {pathname === href && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-400" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Drawer Footer */}
            <div className="border-t border-white/10 p-4">
              <LogoutButton />
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════ */}
      <div className="flex-1 lg:min-w-0 lg:h-screen lg:overflow-y-auto flex flex-col">
        {/* Desktop top bar (lg only) */}
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

        {/* Page content — padded for mobile top bar (pt-16) and bottom tab bar (pb-20) */}
        <div className="mx-auto w-full max-w-5xl px-4 py-6 pt-20 pb-28 sm:px-6 lg:px-8 lg:pt-6 lg:pb-8">
          {children}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE BOTTOM TAB BAR
      ═══════════════════════════════════════════ */}
      <nav
        aria-label="Bottom navigation"
        className="fixed bottom-0 inset-x-0 z-40 flex items-stretch bg-maroon-950/98 backdrop-blur-md border-t border-white/10 shadow-2xl lg:hidden safe-area-inset-bottom"
      >
        {BOTTOM_TABS.map(([Icon, label, href]) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold tracking-wide transition-all active:scale-90 ${
                active ? "text-gold-300" : "text-cream-400/70 hover:text-cream-200"
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all ${
                active ? "bg-gold-400/20 scale-110" : ""
              }`}>
                <Icon aria-hidden className={`h-4.5 w-4.5 ${active ? "text-gold-300" : "text-cream-300/70"}`} />
              </span>
              <span className={active ? "text-gold-300" : ""}>{label}</span>
              {active && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-gold-400" />}
            </Link>
          );
        })}

        {/* "More" button opens full drawer */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold tracking-wide text-cream-400/70 hover:text-cream-200 active:scale-90 transition-all"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-lg">
            <Menu className="h-4.5 w-4.5 text-cream-300/70" />
          </span>
          <span>More</span>
        </button>
      </nav>
    </div>
  );
}

