import Link from "next/link";
import OmMark from "./OmMark";
import { ArrowIcon } from "./ArrowLink";
import SocialLinks, { buildSocialLinks } from "./SocialLinks";
import type { AartiTiming, SiteSettings } from "@/lib/types";

export default function Footer({
  settings,
  timings,
}: {
  settings: SiteSettings;
  timings: AartiTiming[];
}) {
  return (
    <footer className="section-dawn text-stone-700">
      <div aria-hidden className="divider-festive" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <OmMark />
            <div>
              <p className="font-display text-2xl font-bold text-stone-900">
                {settings.organization_name}
              </p>
              <p className="text-xs tracking-[0.2em] text-saffron-600 uppercase">Om Sai Ram</p>
            </div>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-600">
            {settings.tagline}. Home to the Trinity of Sai Avatars — Shirdi Sai, Satya Sai and
            Prema Sai.
          </p>
          <div className="mt-4">
            <SocialLinks links={buildSocialLinks(settings)} />
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 font-display text-lg font-bold text-saffron-700">Visit</p>
          <ul className="space-y-2 text-[15px]">
            {[
              ["About Sai Oracle", "/about"],
              ["Temple & Worship", "/temple"],
              ["Events & Programs", "/events"],
              ["Devotee Experiences", "/experiences"],
              ["Aims & Objectives", "/aims"],
              ["Gallery & Videos", "/gallery"],
              ["Contact Us", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-saffron-600">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 font-display text-lg font-bold text-gulal-700">Daily Aarti</p>
          <ul className="space-y-2 text-[15px]">
            {timings.slice(0, 6).map((t) => (
              <li key={t.id} className="flex items-baseline justify-between gap-3">
                <span className="min-w-0">{t.label}</span>
                <span className="shrink-0 font-semibold whitespace-nowrap text-stone-900">{t.time}</span>
              </li>
            ))}
          </ul>
          <Link href="/temple" className="group mt-3 inline-flex items-center gap-1.5 text-sm text-saffron-700 underline underline-offset-2">
            Full temple schedule <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div>
          <p className="mb-3 font-display text-lg font-bold text-peacock-700">Reach Us</p>
          <address className="text-[15px] leading-relaxed not-italic">
            {settings.address}
            <br />
            {settings.email && (
              <>
                Email:{" "}
                <a href={`mailto:${settings.email}`} className="break-all hover:text-saffron-600">
                  {settings.email}
                </a>
              </>
            )}
            {settings.phone && (
              <>
                <br />
                Phone:{" "}
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-saffron-600">
                  {settings.phone}
                </a>
              </>
            )}
          </address>
        </div>
      </div>
      <div className="border-t border-stone-900/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-[13px] text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {settings.organization_name}. All rights reserved.</p>
          <p className="flex gap-4">
            <Link href="/privacy" className="hover:text-saffron-600">Privacy</Link>
            <Link href="/terms" className="hover:text-saffron-600">Terms</Link>
            <Link href="/admin" className="hover:text-saffron-600">Admin Login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
