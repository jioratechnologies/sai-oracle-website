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
    <div className="bg-maroon-950 text-cream-100">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 text-[13px]">
        <span
          aria-hidden
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-saffron-400 to-gulal-500 text-cream-50"
        >
          <Bell className="h-3 w-3" strokeWidth={2.5} />
        </span>
        <p className="min-w-0 flex-1 truncate">
          <span className="mr-2 font-bold text-saffron-300">{latest.title}</span>
          <span className="hidden text-cream-200/90 md:inline">{latest.content}</span>
          <span className="text-cream-200/90 md:hidden">{latest.title}</span>
        </p>
        <span className="hidden shrink-0 items-center gap-3 text-[12px] text-cream-200/80 lg:flex">
          <span className="inline-flex items-center gap-1">
            <Flame aria-hidden className="h-3.5 w-3.5 text-saffron-300" />
            {settings.morning_opening} – {settings.night_closing}
          </span>
          {settings.phone && settings.phone !== "+91-XXXXXXXXXX" && (
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 hover:text-gold-300">
              <Phone aria-hidden className="h-3.5 w-3.5" />
              {settings.phone}
            </a>
          )}
          <Link href="/videos" className="inline-flex items-center gap-1 hover:text-gold-300">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="h-2 w-2 rounded-full bg-red-500" />
            </span>
            Live Darshan
          </Link>
        </span>
        <Link
          href="/#announcements"
          className="shrink-0 rounded-full border border-gold-400/50 px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap hover:border-gold-300 hover:text-gold-300 sm:border-0 sm:p-0 sm:text-[13px] sm:underline sm:decoration-gold-400 sm:underline-offset-2"
        >
          All updates
        </Link>
      </div>
    </div>
  );
}
