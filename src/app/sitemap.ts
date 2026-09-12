import type { MetadataRoute } from "next";
import { getAllEvents } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://saioracle.com";
  const staticPages = ["", "/about", "/temple", "/events", "/experiences", "/aims", "/gallery", "/contact", "/privacy", "/terms"];
  const events = await getAllEvents().catch(() => []);
  return [
    ...staticPages.map((p) => ({
      url: `${base}${p || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...events.map((e) => ({
      url: `${base}/events/${e.slug}`,
      lastModified: new Date(e.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
