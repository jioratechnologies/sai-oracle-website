import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import PublicSiteLayout from "@/components/PublicSiteLayout";
import { getAnnouncements, getMediaMap, getSettings, getTimings } from "@/lib/site";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const sans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Sai Oracle — Om Sai Ram | Sai Temple, Meerut",
    template: "%s | Sai Oracle",
  },
  description:
    "Sai Oracle (Satyadeep Sai Organisation), Meerut — a temple of Love, Service and Unity under the divine guidance of Bhagwan Sri Sathya Sai Baba and beloved Maa. Daily aartis, bhajans, events, Narayan Seva and discourses. Om Sai Ram.",
  metadataBase: new URL("https://saioracle.com"),
  openGraph: {
    title: "Sai Oracle — Om Sai Ram",
    description:
      "A place of devotion, faith and service. Daily aartis, events, bhajans and Narayan Seva in Meerut.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f77f00",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, timings, announcements, mediaMap] = await Promise.all([
    getSettings(),
    getTimings(),
    getAnnouncements(3),
    getMediaMap(),
  ]);

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <PublicSiteLayout
          settings={settings}
          timings={timings}
          announcements={announcements}
          mediaMap={mediaMap}
        >
          {children}
        </PublicSiteLayout>
      </body>
    </html>
  );
}
