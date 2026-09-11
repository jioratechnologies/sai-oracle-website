import Link from "next/link";
import {
  CalendarDays,
  Clock,
  ExternalLink,
  FileText,
  Images,
  LayoutDashboard,
  Megaphone,
  MonitorPlay,
  Settings,
} from "lucide-react";
import OmMark from "@/components/OmMark";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

const NAV = [
  [LayoutDashboard, "Dashboard", "/admin"],
  [CalendarDays, "Events", "/admin/events"],
  [Megaphone, "Announcements", "/admin/announcements"],
  [MonitorPlay, "YouTube", "/admin/videos"],
  [Images, "Gallery", "/admin/gallery"],
  [Clock, "Temple Timings", "/admin/timings"],
  [FileText, "Pages", "/admin/pages"],
  [Settings, "Settings", "/admin/settings"],
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-100 lg:flex">
      {/* Sidebar */}
      <aside className="bg-maroon-950 text-cream-100 lg:flex lg:w-60 lg:shrink-0 lg:flex-col">
        <div className="flex items-center gap-2.5 px-4 py-4">
          <OmMark className="h-9 w-9" />
          <div className="leading-tight">
            <p className="font-display text-lg font-bold">Sai Oracle</p>
            <p className="text-[11px] tracking-[0.2em] text-gold-300 uppercase">Admin</p>
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
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {NAV.map(([Icon, label, href]) => (
            <Link
              key={href}
              href={href}
              className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap hover:bg-white/10"
            >
              <Icon aria-hidden className="h-4 w-4 shrink-0" /> {label}
            </Link>
          ))}
          <div className="hidden lg:mt-2 lg:block lg:border-t lg:border-white/10 lg:pt-2">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 lg:min-w-0">
        <div className="hidden items-center justify-end gap-3 border-b border-maroon-100 bg-cream-50 px-6 py-3 lg:flex">
          <span className="text-sm text-stone-500">Om Sai Ram</span>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-maroon-200 px-4 py-1.5 text-sm font-semibold text-maroon-800 hover:bg-maroon-50"
          >
            View Site <ExternalLink aria-hidden className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
