import { supabaseServer } from "./supabase";
import {
  seedAnnouncements,
  seedEvents,
  seedExperiences,
  seedExperienceStories,
  seedGallery,
  seedPages,
  seedSettings,
  seedTimings,
  seedVideos,
} from "./seed";
import type {
  AartiTiming,
  Announcement,
  ExperienceStory,
  GalleryImage,
  ShowcaseSlide,
  SitePage,
  SiteSettings,
  TempleEvent,
  YoutubeVideo,
} from "./types";
import { DEFAULT_SLIDES } from "./heroSlides";

/**
 * Public read layer.
 *
 * Tries Supabase first; falls back to built-in seed content when
 * Supabase is not configured (fresh clone / preview deploy) or when
 * a query fails. An *empty* table is respected as empty — seed data
 * is only a fallback, never merged.
 */

async function query<T>(table: string, apply: (q: never) => never): Promise<T[] | null> {
  try {
    const sb = await supabaseServer();
    if (!sb) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (apply as any)(sb.from(table));
    if (error) throw error;
    return (data ?? []) as T[];
  } catch {
    return null;
  }
}

import { getCollection } from "./dataStore";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getUpcomingEvents(limit = 6): Promise<TempleEvent[]> {
  const events = await getCollection<TempleEvent>("events", seedEvents);
  return events
    .filter((e) => e.status === "published" && e.event_date >= todayISO())
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, limit);
}

export async function getAllEvents(): Promise<TempleEvent[]> {
  const events = await getCollection<TempleEvent>("events", seedEvents);
  return events
    .filter((e) => e.status === "published")
    .sort((a, b) => a.event_date.localeCompare(b.event_date));
}

export async function getEventBySlug(slug: string): Promise<TempleEvent | null> {
  const events = await getCollection<TempleEvent>("events", seedEvents);
  return events.find((e) => e.slug === slug && e.status === "published") ?? null;
}

export async function getAnnouncements(limit = 5): Promise<Announcement[]> {
  const announcements = await getCollection<Announcement>("announcements", seedAnnouncements);
  return announcements
    .filter((a) => a.status === "published")
    .slice(0, limit);
}

export async function getVideos(limit = 6): Promise<YoutubeVideo[]> {
  const videos = await getCollection<YoutubeVideo>("youtube_videos", seedVideos);
  return videos.filter((v) => v.published).slice(0, limit);
}

export async function getHeroSlides(): Promise<ShowcaseSlide[]> {
  const slides = await getCollection<ShowcaseSlide>("hero_slides", DEFAULT_SLIDES);
  return slides;
}

function cleanGalleryTitle(key: string): string {
  const filename = key.split("/").pop() || "";
  const name = filename.replace(/\.[^/.]+$/, "");
  return name
    .replace(/^\d+[-_]/, "")
    .replace(/^images_/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export async function getGallery(limit = 12): Promise<GalleryImage[]> {
  try {
    const sb = await supabaseServer();
    if (sb) {
      // 1. Try gallery table
      const { data: gData, error: gErr } = await sb
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (!gErr && gData && gData.length > 0) return gData as GalleryImage[];

      // 2. Query media_assets
      const { data: mData, error: mErr } = await sb
        .from("media_assets")
        .select("key, url, updated_at")
        .not("key", "like", "\\_\\_%")
        .order("updated_at", { ascending: false })
        .limit(limit);

      if (!mErr && mData && mData.length > 0) {
        const { data: meta } = await sb
          .from("media_assets")
          .select("url")
          .eq("key", "__meta:gallery_captions")
          .maybeSingle();

        let captions: Record<string, string> = {};
        if (meta?.url) {
          try {
            captions = JSON.parse(meta.url);
          } catch {}
        }

        const EXCLUDED_PATTERNS = [
          /gal[-_]?2022[-_]?0?5/i,
          /gal[-_]?2022[-_]?0?6/i,
          /gal[-_]?2020[-_]?0?7/i,
          /gal[-_]?2020[-_]?0?8/i,
          /gal[-_]?2020[-_]?0?9/i,
          /gal[-_]?2020[-_]?0?5/i,
          /gal[-_]?2020[-_]?12/i,
          /gal[-_]?2020[-_]?0?1/i,
          /gal[-_]?2019[-_]?0?4/i,
          /gal[-_]?2019[-_]?0?3/i,
          /gal[-_]?2019[-_]?0?1/i,
          /gal[-_]?2019[-_]?0?2/i,
          /gal[-_]?2019[-_]?0?9/i,
          /gal[-_]?2021[-_]?0?6/i,
          /gal[-_]?2021[-_]?0?7/i,
          /gal[-_]?2021[-_]?0?5/i,
          /mg[-_]?9500/i,
          /plan[-_]?t[-_]?0?6/i,
          /plan[-_]?t[-_]?0?5/i,
          /img[-_]?7416/i,
          /sai[-_]?06/i,
          /prema[-_]?sai/i,
          /singhasan/i,
          /saibaba[-_]?uni/i,
          /mission[-_]?karuna/i,
          /upi[-_]?qr/i,
          /\.svg$/i,
          /global[-_]oneness/i,
          /global[-_]one[-_]ness/i,
          /sarva[-_]dharma[-_]sthal/i,
          /universal[-_]solidarity/i,
        ];

        return mData
          .filter(
            (m) =>
              !m.key.startsWith("__") &&
              !EXCLUDED_PATTERNS.some((pat) => pat.test(m.key)) &&
              (m.url.startsWith("http://") || m.url.startsWith("https://") || m.url.startsWith("/"))
          )
          .map((m) => ({
            id: m.key,
            title: captions[m.key] || captions[m.url] || cleanGalleryTitle(m.key),
            image_url: m.url,
            created_at: m.updated_at || new Date().toISOString(),
          }));
      }
    }
  } catch {}
  return seedGallery.slice(0, limit);
}

/**
 * Maps former `public/assets/...` paths to their Supabase Storage public
 * URL, seeded by `scripts/migrate-assets-to-supabase.mjs`. Pass the result
 * to `resolveMediaUrl` (see `lib/image.ts`) wherever those paths are used.
 */
export async function getMediaMap(): Promise<Record<string, string>> {
  const rows = await query<{ key: string; url: string }>("media_assets", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any)
      .select("key, url")
      .not("key", "like", "\\_\\_%") as never,
  );
  if (!rows) return {};
  return Object.fromEntries(
    rows
      .filter((r) => !r.key.startsWith("__"))
      .map((r) => [r.key, r.url])
  );
}

export async function getTimings(): Promise<AartiTiming[]> {
  const timings = await getCollection<AartiTiming>("temple_timings", seedTimings);
  return [...timings].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getSettings(): Promise<SiteSettings> {
  let settings: SiteSettings = { ...seedSettings };
  try {
    const { getSettingsData } = await import("@/lib/dataStore");
    const data = await getSettingsData();
    if (data) {
      settings = {
        organization_name: data.organization_name ?? seedSettings.organization_name,
        tagline: data.tagline ?? seedSettings.tagline,
        description: data.description ?? seedSettings.description,
        phone: data.phone ?? "",
        email: data.email ?? "",
        address: data.address ?? "",
        maps_url: data.maps_url ?? "",
        instagram_url: data.instagram_url ?? "",
        facebook_url: data.facebook_url ?? "",
        youtube_url: data.youtube_url ?? "",
        whatsapp_url: data.whatsapp_url ?? "",
        x_url: data.x_url ?? "",
        morning_opening: data.morning_opening ?? seedSettings.morning_opening,
        night_closing: data.night_closing ?? seedSettings.night_closing,
      };
    }
  } catch {
    // fall through
  }

  // Dynamically sync morning_opening and night_closing from temple_timings collection
  try {
    const timings = await getTimings();
    if (timings && timings.length > 0) {
      const openTiming = timings.find((t) => /open/i.test(t.label)) || timings[0];
      const closeTiming = timings.find((t) => /clos/i.test(t.label)) || timings[timings.length - 1];
      if (openTiming?.time) {
        settings.morning_opening = openTiming.time;
      }
      if (closeTiming?.time) {
        settings.night_closing = closeTiming.time;
      }
    }
  } catch {
    // preserve base defaults
  }

  return settings;
}

export async function getPage(slug: string): Promise<SitePage | null> {
  try {
    const sb = await supabaseServer();
    if (sb) {
      const { data, error } = await sb.from("site_pages").select("*").eq("slug", slug).single();
      if (!error && data)
        return { slug: data.slug, title: data.title, content: data.content, updated_at: data.updated_at };
      return null;
    }
  } catch {
    // fall through
  }
  return seedPages.find((p) => p.slug === slug) ?? null;
}

export function getExperiences() {
  return seedExperiences;
}

/** Devotee "miracle" stories shown on the Experiences page — seed-only,
 * grouped into chapters (not admin-editable; there's no CMS UI for them). */
export function getExperienceStories(): ExperienceStory[] {
  return seedExperienceStories;
}

export function getExperienceStory(slug: string): ExperienceStory | null {
  return seedExperienceStories.find((s) => s.slug === slug) ?? null;
}

/**
 * Page content with built-in fallback: dedicated routes (/about,
 * /experiences, /aims) always render, even when Supabase is
 * configured but the row hasn't been created yet.
 */
export async function getPageWithFallback(slug: string): Promise<SitePage> {
  const page = await getPage(slug);
  if (page) return page;
  const seed = seedPages.find((p) => p.slug === slug);
  if (seed) return seed;
  return {
    slug,
    title: "Page",
    content: "Content coming soon.",
    updated_at: new Date().toISOString(),
  };
}
