import Link from "next/link";
import { Bell, Flame, Phone } from "lucide-react";
import { getAnnouncements, getSettings } from "@/lib/site";

/**
 * Kashi-portal style utility bar: latest temple update on the left,
 * darshan hours + helpline + Live Darshan shortcut on the right.
 */
export default async function AnnouncementBar() {
  const [items, settings] = await Promise.all([getAnnouncements(3), getSettings()]);
  if (items.length === 0) return null;
  const latest = items[0];
  return (
    <div className="btn-festive relative text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_255_255/0.08),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-6xl items-center gap-2.5 px-4 py-2.5 text-[13px]">
        <span aria-hidden className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-white/15" />
          <Bell className="relative h-3 w-3" strokeWidth={2.5} />
        </span>
        <p className="relative min-w-0 flex-1 overflow-hidden whitespace-nowrap">
          <span className="mr-2 font-bold text-yellow-200">{latest.title}</span>
          <span className="hidden text-white/90 md:inline">{latest.content}</span>
          <span className="text-white/90 md:hidden">{latest.title}</span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-saffron-500/90 to-transparent"
          />
        </p>
        <span className="hidden shrink-0 items-center gap-4 text-[12px] text-white/85 lg:flex">
          <span className="inline-flex items-center gap-1.5">
            <Flame aria-hidden className="h-3.5 w-3.5 text-yellow-200" />
            {settings.morning_opening} – {settings.night_closing}
          </span>
          {settings.phone && settings.phone !== "+91-XXXXXXXXXX" && (
            <>
              <span aria-hidden className="h-3 w-px bg-white/25" />
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-yellow-200"
              >
                <Phone aria-hidden className="h-3.5 w-3.5" />
                {settings.phone}
              </a>
            </>
          )}
          <span aria-hidden className="h-3 w-px bg-white/25" />
          <Link href="/gallery?tab=videos" className="inline-flex items-center gap-1.5 transition-colors hover:text-yellow-200">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="h-2 w-2 rounded-full bg-red-500" />
            </span>
            Live Darshan
          </Link>
        </span>
        <Link
          href="/#announcements"
          className="shrink-0 rounded-full border border-white/40 bg-white/10 px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap transition-colors hover:border-white/70 hover:bg-white/20 hover:text-yellow-200 sm:border-0 sm:bg-transparent sm:p-0 sm:text-[13px] sm:underline sm:decoration-white/70 sm:underline-offset-2 sm:hover:bg-transparent"
        >
          All updates
        </Link>
      </div>
    </div>
  );
}
