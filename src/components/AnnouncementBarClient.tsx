"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Flame, Phone, ArrowDown } from "lucide-react";
import type { Announcement, SiteSettings } from "@/lib/types";

interface AnnouncementBarClientProps {
  latest: Announcement;
  settings: SiteSettings;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function AnnouncementBarClient({ latest, settings }: AnnouncementBarClientProps) {
  const pathname = usePathname();
  const router = useRouter();

  function triggerScrollToAnnouncements() {
    if (pathname === "/") {
      const el = document.getElementById("announcements");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("ring-4", "ring-saffron-400/80", "rounded-3xl", "shadow-xl");
        setTimeout(() => {
          el.classList.remove("ring-4", "ring-saffron-400/80", "shadow-xl");
        }, 2500);
        window.history.pushState(null, "", "#announcements");
        return;
      }
    }
    router.push("/#announcements");
  }

  // Handle direct navigation when loading with #announcements hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#announcements") {
      const timer = setTimeout(() => {
        const el = document.getElementById("announcements");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div className="relative w-full bg-gradient-to-r from-maroon-950 via-[#450a14] to-maroon-950 text-white border-b border-gold-500/25 shadow-xs overflow-hidden z-30">
      {/* Subtle sacred ambient pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(212,175,55,0.08),transparent_50%),radial-gradient(circle_at_80%_50%,rgba(247,127,0,0.08),transparent_50%)]"
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-3.5 sm:px-6 py-2 text-[12.5px] leading-tight">
        {/* Left: Notice Badge + Clickable Headline */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
          <button
            type="button"
            onClick={triggerScrollToAnnouncements}
            className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500/25 border border-saffron-400/50 px-2.5 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wider text-gold-200 shrink-0 hover:bg-saffron-500/35 transition-colors cursor-pointer shadow-2xs"
            title="Jump to Announcements"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
            </span>
            <span>Notice</span>
          </button>

          <button
            type="button"
            onClick={triggerScrollToAnnouncements}
            className="group flex items-center gap-1.5 text-left min-w-0 truncate hover:text-gold-200 transition-colors cursor-pointer"
            title={`${latest.title}: ${latest.content}`}
          >
            <span className="font-bold text-gold-200 group-hover:underline truncate shrink-0 max-w-[200px] sm:max-w-none">
              {latest.title}
            </span>
            <span className="hidden md:inline text-cream-100/85 truncate font-normal">
              — {latest.content}
            </span>
          </button>
        </div>

        {/* Right: Quick Temple Details + All Updates Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Darshan Hours */}
          {settings.morning_opening && settings.night_closing && (
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-cream-200/90 font-medium">
              <Flame className="h-3.5 w-3.5 text-gold-400 shrink-0" />
              <span>
                Darshan: {settings.morning_opening} – {settings.night_closing} · Thu till 10:00 PM
              </span>
            </div>
          )}

          {/* Divider */}
          {settings.phone && settings.phone !== "+91-XXXXXXXXXX" && (
            <>
              <span className="hidden xl:inline text-gold-500/40 text-xs">•</span>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="hidden xl:inline-flex items-center gap-1.5 text-xs text-cream-200/90 hover:text-gold-200 transition-colors"
                title="Call Temple Office"
              >
                <Phone className="h-3 w-3 text-gold-400 shrink-0" />
                <span>{settings.phone}</span>
              </a>
            </>
          )}

          {/* Instagram Daily Darshan */}
          {settings.instagram_url && (
            <>
              <span className="hidden lg:inline text-gold-500/40 text-xs">•</span>
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 px-2.5 py-0.5 text-[11px] font-medium text-cream-100 hover:text-white transition-all shadow-2xs"
                title="Daily Darshan Photos on Instagram"
              >
                <InstagramIcon className="h-3 w-3 text-pink-300" />
                <span>Daily Darshan</span>
              </a>
            </>
          )}

          {/* All Updates Navigation Button */}
          <button
            type="button"
            onClick={triggerScrollToAnnouncements}
            className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-400 hover:to-amber-400 text-maroon-950 font-bold px-3 py-1 text-xs shadow-2xs hover:shadow-xs transition-all shrink-0 cursor-pointer"
            title="Navigate to announcements at bottom of homepage"
          >
            <span>All Updates</span>
            <ArrowDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
