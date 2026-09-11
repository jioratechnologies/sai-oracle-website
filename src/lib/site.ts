import { supabaseServer } from "./supabase";
import {
  seedAnnouncements,
  seedEvents,
  seedExperiences,
  seedGallery,
  seedPages,
  seedSettings,
  seedTimings,
  seedVideos,
} from "./seed";
import type {
  AartiTiming,
  Announcement,
  GalleryImage,
  SitePage,
  SiteSettings,
  TempleEvent,
  YoutubeVideo,
} from "./types";

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

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getUpcomingEvents(limit = 6): Promise<TempleEvent[]> {
  const rows = await query<TempleEvent>("events", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any)
      .select("*")
      .eq("status", "published")
      .gte("event_date", todayISO())
      .order("event_date", { ascending: true })
      .limit(limit) as never,
  );
  if (rows) return rows;
  return seedEvents
    .filter((e) => e.status === "published" && e.event_date >= todayISO())
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, limit);
}

export async function getAllEvents(): Promise<TempleEvent[]> {
  const rows = await query<TempleEvent>("events", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").eq("status", "published").order("event_date", { ascending: true }) as never,
  );
  if (rows) return rows;
  return seedEvents
    .filter((e) => e.status === "published")
    .sort((a, b) => a.event_date.localeCompare(b.event_date));
}

export async function getEventBySlug(slug: string): Promise<TempleEvent | null> {
  try {
    const sb = await supabaseServer();
    if (sb) {
      const { data, error } = await sb
        .from("events")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();
      if (!error && data) return data as TempleEvent;
      if (sb) return null; // configured: DB is source of truth
    }
  } catch {
    // fall through to seed
  }
  return seedEvents.find((e) => e.slug === slug && e.status === "published") ?? null;
}

export async function getAnnouncements(limit = 5): Promise<Announcement[]> {
  const rows = await query<Announcement>("announcements", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any)
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(limit) as never,
  );
  if (rows) return rows;
  return seedAnnouncements
    .filter((a) => a.status === "published")
    .slice(0, limit);
}

export async function getVideos(limit = 6): Promise<YoutubeVideo[]> {
  const rows = await query<YoutubeVideo>("youtube_videos", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any)
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit) as never,
  );
  if (rows) return rows;
  return seedVideos.filter((v) => v.published).slice(0, limit);
}

export async function getGallery(limit = 12): Promise<GalleryImage[]> {
  const rows = await query<GalleryImage>("gallery", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").order("created_at", { ascending: false }).limit(limit) as never,
  );
  if (rows) return rows;
  return seedGallery.slice(0, limit);
}

export async function getTimings(): Promise<AartiTiming[]> {
  const rows = await query<AartiTiming>("temple_timings", (q) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (q as any).select("*").order("sort_order", { ascending: true }) as never,
  );
  if (rows) return rows;
  return seedTimings;
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const sb = await supabaseServer();
    if (sb) {
      const { data, error } = await sb.from("site_settings").select("*").limit(1).single();
      if (!error && data) {
        return {
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
      if (sb) return seedSettings; // configured but row missing → seed defaults
    }
  } catch {
    // fall through
  }
  return seedSettings;
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
    content: "Content coming soon. 🙏",
    updated_at: new Date().toISOString(),
  };
}
