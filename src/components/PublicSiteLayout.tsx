"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import DonationFab from "@/components/DonationFab";
import type { SiteSettings, AartiTiming } from "@/lib/types";

export default function PublicSiteLayout({
  settings,
  timings,
  children,
}: {
  settings: SiteSettings;
  timings: AartiTiming[];
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
        <AnnouncementBar />
        <Header organizationName={settings.organization_name} />
      </div>
      <main id="main" className="flex-1">
        {children}
      </main>
      <div className="pb-24 sm:pb-0">
        <Footer settings={settings} timings={timings} />
      </div>
      <DonationFab />
    </>
  );
}
