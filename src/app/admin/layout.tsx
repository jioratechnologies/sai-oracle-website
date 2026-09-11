import Link from "next/link";
import OmMark from "@/components/OmMark";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

const NAV = [
  ["🏠", "Dashboard", "/admin"],
  ["📅", "Events", "/admin/events"],
  ["📢", "Announcements", "/admin/announcements"],
  ["📺", "YouTube", "/admin/videos"],
  ["🖼️", "Gallery", "/admin/gallery"],
  ["⏰", "Temple Timings", "/admin/timings"],
  ["📝", "Pages", "/admin/pages"],
  ["⚙️", "Settings", "/admin/settings"],
];

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
            className="ml-auto rounded-full border border-cream-100/30 px-3 py-1 text-xs hover:bg-white/10 lg:hidden"
          >
            View Site ↗
          </a>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {NAV.map(([icon, label, href]) => (
            <Link
              key={href}
              href={href}
              className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap hover:bg-white/10"
            >
              <span aria-hidden>{icon}</span> {label}
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
          <span className="text-sm text-stone-500">🙏 Om Sai Ram</span>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-maroon-200 px-4 py-1.5 text-sm font-semibold text-maroon-800 hover:bg-maroon-50"
          >
            View Site ↗
          </a>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
