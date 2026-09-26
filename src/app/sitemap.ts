import type { MetadataRoute } from "next";
import { getAllEvents, getExperienceStories } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://saioracle.com";
  const staticPages = [
    "",
    "/about",
    "/social",
    "/events",
    "/experiences",
    "/aims",
    "/mission-karuna",
    "/gallery",
    "/contact",
    "/gurumaa",
    "/gurumaa-life-sketch",
    "/teachings",
    "/discourses",
    "/universe",
    "/trust",
    "/how-to-reach",
    "/meditation",
    "/meditation-technique",
    "/charitable-trust",
    "/contribution",
    "/rules-regulations",
    "/privacy",
    "/terms",
  ];
  const events = await getAllEvents().catch(() => []);
  const stories = getExperienceStories();
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
    ...stories.map((s) => ({
      url: `${base}/experiences/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
