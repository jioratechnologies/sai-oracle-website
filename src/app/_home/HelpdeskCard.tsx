import Link from "next/link";
import { Clock, HandHeart, Mail, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

/**
 * Kashi "Helpdesk" card: helpline, hours, contact + maps shortcuts.
 */
export default function HelpdeskCard({ settings }: { settings: SiteSettings }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gold-400/40 bg-maroon-950 text-cream-100 shadow-sm">
      <div className="bg-linear-to-r from-maroon-900 via-maroon-800 to-gulal-700 px-5 py-3.5">
        <p className="flex items-center gap-2 font-display text-xl font-bold text-gold-300">
          <HandHeart aria-hidden className="h-5 w-5" />
          Temple Helpdesk
        </p>
        <p className="mt-0.5 text-[13px] text-cream-200/80">
          Darshan help, seva queries & programme info
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 py-4 text-[15px]">
        <p className="flex items-center gap-1.5 text-cream-200/90">
          <Clock aria-hidden className="h-4 w-4 shrink-0 text-gold-300" />
          Daily {settings.morning_opening} – {settings.night_closing} · all 7 days
        </p>
        {settings.phone && (
          <p className="flex items-center gap-1.5 text-cream-200/90">
            <Phone aria-hidden className="h-4 w-4 shrink-0 text-gold-300" />
            {settings.phone}
          </p>
        )}
        {settings.email && (
          <p className="flex items-center gap-1.5 break-all text-cream-200/90">
            <Mail aria-hidden className="h-4 w-4 shrink-0 text-gold-300" />
            <a href={`mailto:${settings.email}`} className="text-gold-300 hover:underline">
              {settings.email}
            </a>
          </p>
        )}
        <p className="line-clamp-2 text-sm text-cream-200/70">{settings.address}</p>
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
              className="rounded-full border border-gold-300/60 px-5 py-2 text-center font-semibold text-gold-300 hover:bg-gold-300 hover:text-maroon-950"
            >
              Open in Google Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
