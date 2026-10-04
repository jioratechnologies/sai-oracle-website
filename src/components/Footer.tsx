import Link from "next/link";
import OmMark from "./OmMark";
import { ArrowIcon } from "./ArrowLink";
import SocialLinks, { buildSocialLinks } from "./SocialLinks";
import type { AartiTiming, SiteSettings } from "@/lib/types";
import { THURSDAY_NOTE } from "@/lib/thursdayHours";

export default function Footer({
  settings,
  timings,
}: {
  settings: SiteSettings;
  timings: AartiTiming[];
}) {
  const opening = settings.morning_opening || timings?.find((t) => /open/i.test(t.label))?.time || "6:30 AM";
  const closing = settings.night_closing || timings?.find((t) => /clos/i.test(t.label))?.time || "8:30 PM";
  const aartis = timings?.filter((t) => !/open|clos/i.test(t.label)) ?? [];
  const aartiSummary = aartis.length > 0
    ? aartis.slice(0, 2).map((a) => `${a.label}: ${a.time}`).join(" · ")
    : "Daily Aartis & Sanctum Darshan";

  return (
    <footer className="section-dawn text-stone-700">
      <div aria-hidden className="divider-festive" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Col 1: Brand & Sacred Presence (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <OmMark className="h-10 w-10 shrink-0" />
            <div>
              <p className="font-display text-2xl font-bold text-maroon-900">
                {settings.organization_name}
              </p>
              <p className="text-xs font-bold tracking-[0.2em] text-saffron-600 uppercase">Om Sai Ram</p>
            </div>
          </div>
          <p className="text-[14.5px] leading-relaxed text-stone-600 max-w-sm">
            A sacred sanctuary of Love, Service and Unity under the divine guidance of Bhagwan Sri Sathya Sai Baba and beloved Maa.
          </p>
          <div className="pt-1">
            <SocialLinks links={buildSocialLinks(settings)} />
          </div>
        </div>

        {/* Col 2: Sanctuary & Trust (2.5 cols on lg) */}
        <div className="lg:col-span-3">
          <p className="mb-3.5 text-xs font-bold tracking-[0.18em] text-maroon-900 uppercase">
            Sanctuary &amp; Trust
          </p>
          <ul className="space-y-2.5 text-[14px]">
            {[
              ["About Sai Oracle", "/about"],
              ["Beloved Maa", "/gurumaa"],
              ["Charitable Trust (80G)", "/trust"],
              ["Satyadeep Sai Universe", "/universe"],
              ["Mission Karuna", "/mission-karuna"],
              ["Aims & Objectives", "/aims"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-stone-600 transition-colors hover:text-saffron-700 hover:translate-x-0.5 inline-block"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Devotion & Media (2.5 cols on lg) */}
        <div className="lg:col-span-2">
          <p className="mb-3.5 text-xs font-bold tracking-[0.18em] text-maroon-900 uppercase">
            Devotion
          </p>
          <ul className="space-y-2.5 text-[14px]">
            {[
              ["Devotee Experiences", "/experiences"],
              ["Aarti & Worship", "/about#worship"],
              ["Events & Programs", "/events"],
              ["Photo Gallery", "/gallery"],
              ["Social Media", "/social"],
              ["How to Reach", "/how-to-reach"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-stone-600 transition-colors hover:text-saffron-700 hover:translate-x-0.5 inline-block"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Timings & Location (3 cols on lg) */}
        <div className="lg:col-span-3 space-y-3.5">
          <p className="text-xs font-bold tracking-[0.18em] text-maroon-900 uppercase">
            Temple &amp; Timings
          </p>

          <div className="rounded-2xl border border-gold-200/80 bg-white/70 p-3 text-xs text-stone-700 space-y-1.5 shadow-xs">
            <p className="font-bold text-maroon-950 flex items-center justify-between">
              <span>Open All 7 Days</span>
              <span className="text-emerald-700 font-semibold">{opening} – {closing}</span>
            </p>
            <p className="font-semibold text-saffron-700">{THURSDAY_NOTE}</p>
            <p className="text-stone-500">
              {aartiSummary}
            </p>
            <Link
              href="/about#worship"
              className="mt-1 inline-flex items-center gap-1 font-semibold text-saffron-700 hover:underline"
            >
              Full schedule <ArrowIcon className="h-3 w-3" />
            </Link>
          </div>

          <address className="text-xs leading-relaxed text-stone-600 not-italic space-y-1">
            <p className="font-medium text-stone-800">{settings.address}</p>
            {settings.phone && (
              <p>
                Phone:{" "}
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-saffron-700 font-semibold">
                  {settings.phone}
                </a>
              </p>
            )}
            {settings.email && (
              <p>
                Email:{" "}
                <a href={`mailto:${settings.email}`} className="hover:text-saffron-700">
                  {settings.email}
                </a>
              </p>
            )}
          </address>
        </div>
      </div>
      <div className="border-t border-stone-900/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2.5 px-4 py-4 text-[12.5px] text-stone-500 sm:flex-row sm:gap-3">
          {/* Copyright */}
          <p className="text-center sm:text-left">
            &copy; 2016–{new Date().getFullYear()}{" "}
            <span className="font-semibold text-stone-600">Sri Sai Sansthan Charitable Trust</span>.{" "}
            All rights reserved.
          </p>

          {/* Right side: Legal links + Powered by */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <Link href="/privacy" className="hover:text-saffron-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-saffron-600 transition-colors">Terms</Link>
            <Link href="/admin" className="hover:text-saffron-600 transition-colors">Admin</Link>
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="flex items-center gap-1 text-stone-500">
              Powered by{" "}
              <a
                href="https://jioratech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-maroon-800 hover:text-saffron-700 transition-colors underline-offset-2 hover:underline"
              >
                JioraTech
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
