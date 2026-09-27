"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBarClient from "@/components/AnnouncementBarClient";
import type { SiteSettings, AartiTiming, Announcement } from "@/lib/types";

export default function PublicSiteLayout({
  settings,
  timings,
  announcements = [],
  mediaMap = {},
  children,
}: {
  settings: SiteSettings;
  timings: AartiTiming[];
  announcements?: Announcement[];
  mediaMap?: Record<string, string>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main id="main" className="flex-1">{children}</main>;
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-gold-300 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="sticky top-0 z-40">
        {announcements.length > 0 && (
          <AnnouncementBarClient latest={announcements[0]} settings={settings} />
        )}
        <Header organizationName={settings.organization_name} mediaMap={mediaMap} />
      </div>
      <main id="main" className="flex-1">
        {children}
      </main>
      <div className="pb-24 sm:pb-0">
        <Footer settings={settings} timings={timings} />
      </div>
    </>
  );
}
