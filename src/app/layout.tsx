import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppFab from "@/components/WhatsAppFab";
import { getSettings, getTimings } from "@/lib/site";

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
    "Sai Oracle (Satyadeep Sai Organisation), Meerut — a temple dedicated to the Trinity of Sai Avatars. Daily aartis, bhajans, events, Narayan Seva and discourses. Om Sai Ram.",
  metadataBase: new URL("https://saioracle.com"),
  openGraph: {
    title: "Sai Oracle — Om Sai Ram",
    description:
      "A place of devotion, faith and service. Daily aartis, events, bhajans and Narayan Seva in Meerut.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#33080f",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, timings] = await Promise.all([getSettings(), getTimings()]);
  const headerList = await headers();
  const isAdmin = headerList.get("x-admin-route") === "1";

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {isAdmin ? (
          <main id="main" className="flex-1">
            {children}
          </main>
        ) : (
          <>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-gold-300 focus:px-4 focus:py-2"
            >
              Skip to content
            </a>
            <AnnouncementBar />
            <Header organizationName={settings.organization_name} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer settings={settings} timings={timings} />
            <WhatsAppFab whatsappUrl={settings.whatsapp_url} />
          </>
        )}
      </body>
    </html>
  );
}
