import Link from "next/link";
import { Clock, HandHeart, Mail, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

/**
 * Kashi "Helpdesk" card: helpline, hours, contact + maps shortcuts.
 */
export default function HelpdeskCard({ settings }: { settings: SiteSettings }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-saffron-300/60 bg-white text-stone-700 shadow-md">
      <div className="bg-linear-to-r from-saffron-500 via-gulal-500 to-gulal-600 px-5 py-3.5">
        <p className="flex items-center gap-2 font-display text-xl font-bold text-white">
          <HandHeart aria-hidden className="h-5 w-5" />
          Temple Helpdesk
        </p>
        <p className="mt-0.5 text-[13px] text-white/85">
          Darshan help, seva queries & programme info
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 py-4 text-[15px]">
        <p className="flex items-center gap-1.5 text-stone-600">
          <Clock aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
          Daily {settings.morning_opening} – {settings.night_closing} · all 7 days
        </p>
        {settings.phone && (
          <p className="flex items-center gap-1.5 text-stone-600">
            <Phone aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
            {settings.phone}
          </p>
        )}
        {settings.email && (
          <p className="flex items-center gap-1.5 break-all text-stone-600">
            <Mail aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
            <a href={`mailto:${settings.email}`} className="text-saffron-700 hover:underline">
              {settings.email}
            </a>
          </p>
        )}
        <p className="line-clamp-2 text-sm text-stone-500">{settings.address}</p>
        <div className="mt-auto flex flex-col gap-2 pt-3">
          <Link
            href="/contact"
            className="btn-festive min-h-11 rounded-full px-5 py-2 text-center font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
          >
            Contact & Directions
          </Link>
          {settings.maps_url && (
            <a
              href={settings.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-saffron-600/40 px-5 py-2 text-center font-semibold text-saffron-700 hover:border-saffron-500 hover:bg-saffron-500 hover:text-white"
            >
              Open in Google Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
