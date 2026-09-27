import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase";
import {
  seedAnnouncements,
  seedEvents,
  seedGallery,
  seedTimings,
  seedVideos,
  seedSettings,
  seedTrustSettings,
} from "@/lib/seed";
import { DEFAULT_SLIDES } from "@/lib/heroSlides";
import type {
  Announcement,
  TempleEvent,
  YoutubeVideo,
  AartiTiming,
  ShowcaseSlide,
  SiteSettings,
  TrustSettings,
} from "@/lib/types";

export function getAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    return null;
  }
  return createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function verifyAuthUser() {
  const sb = await supabaseServer();
  if (!sb) return null;
  const {
    data: { user },
    error,
  } = await sb.auth.getUser();
  if (error || !user) return null;
  return user;
}

export async function getCollection<T>(table: string, defaultSeed: T[]): Promise<T[]> {
  const sb = getAdminClient();
  if (!sb) {
    return defaultSeed;
  }

  // 1. Try querying native table first
  try {
    const { data, error } = await sb.from(table).select("*");
    if (!error && data && data.length > 0) {
      return data as T[];
    }
  } catch {
    // native table does not exist or failed
  }

  // 2. Fall back to Supabase metadata in media_assets
  try {
    const metaKey = `__data:${table}`;
    const { data: meta } = await sb
      .from("media_assets")
      .select("url")
      .eq("key", metaKey)
      .maybeSingle();

    if (meta?.url) {
      try {
        const parsed = JSON.parse(meta.url);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as T[];
        }
      } catch {}
    }

    // 3. Initialize default seed into Supabase
    if (defaultSeed && defaultSeed.length > 0) {
      await sb.from("media_assets").upsert({
        key: metaKey,
        url: JSON.stringify(defaultSeed),
        updated_at: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.warn(`Error in getCollection for ${table}:`, err);
  }

  return defaultSeed;
}

export async function saveCollection<T>(table: string, items: T[]): Promise<void> {
  const sb = getAdminClient();
  if (!sb) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY");
  }
  const metaKey = `__data:${table}`;

  // 1. Always save into Supabase media_assets metadata store
  await sb.from("media_assets").upsert({
    key: metaKey,
    url: JSON.stringify(items),
    updated_at: new Date().toISOString(),
  });

  // 2. Best-effort write to native table if it exists
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await sb.from(table).upsert(items as any);
  } catch {
    // table doesn't exist yet
  }
}

export async function getSettingsData(): Promise<SiteSettings> {
  const sb = getAdminClient();
  if (!sb) {
    return seedSettings;
  }
  const metaKey = "__data:site_settings";

  // 1. Try querying native table first
  try {
    const { data, error } = await sb.from("site_settings").select("*").limit(1).single();
    if (!error && data) {
      return data as SiteSettings;
    }
  } catch {
    // native table does not exist or failed
  }

  // 2. Fall back to Supabase metadata in media_assets
  try {
    const { data: meta } = await sb
      .from("media_assets")
      .select("url")
      .eq("key", metaKey)
      .maybeSingle();

    if (meta?.url) {
      try {
        const parsed = JSON.parse(meta.url);
        return parsed as SiteSettings;
      } catch {}
    }

    // 3. Initialize default seed into Supabase
    await sb.from("media_assets").upsert({
      key: metaKey,
      url: JSON.stringify(seedSettings),
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn(`Error in getSettingsData:`, err);
  }

  return seedSettings;
}

export async function saveSettingsData(settings: SiteSettings): Promise<void> {
  const sb = getAdminClient();
  if (!sb) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY");
  }
  const metaKey = "__data:site_settings";

  // 1. Always save into Supabase media_assets metadata store
  await sb.from("media_assets").upsert({
    key: metaKey,
    url: JSON.stringify(settings),
    updated_at: new Date().toISOString(),
  });

  // 2. Best-effort write to native table if it exists
  try {
    await sb.from("site_settings").upsert(settings as any);
  } catch {
    // table doesn't exist yet
  }
}

export async function getTrustSettings(): Promise<TrustSettings> {
  const sb = getAdminClient();
  if (!sb) {
    return seedTrustSettings;
  }
  const metaKey = "__data:trust_settings";

  try {
    const { data: meta } = await sb
      .from("media_assets")
      .select("url")
      .eq("key", metaKey)
      .maybeSingle();

    if (meta?.url) {
      const parsed = JSON.parse(meta.url);
      return { ...seedTrustSettings, ...parsed } as TrustSettings;
    }
    // Init seed
    await sb.from("media_assets").upsert({
      key: metaKey,
      url: JSON.stringify(seedTrustSettings),
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Error in getTrustSettings:", err);
  }

  return seedTrustSettings;
}

export async function saveTrustSettings(trust: TrustSettings): Promise<void> {
  const sb = getAdminClient();
  if (!sb) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY");
  }
  const metaKey = "__data:trust_settings";

  await sb.from("media_assets").upsert({
    key: metaKey,
    url: JSON.stringify(trust),
    updated_at: new Date().toISOString(),
  });
}
export async function getDataStats() {
  const today = new Date().toISOString().slice(0, 10);

  const [videos, announcements, events] = await Promise.all([
    getCollection<YoutubeVideo>("youtube_videos", seedVideos),
    getCollection<Announcement>("announcements", seedAnnouncements),
    getCollection<TempleEvent>("events", seedEvents),
  ]);

  const sb = getAdminClient();

  // Count photos in Supabase media_assets (excluding __meta and __data)
  let galleryCount = seedGallery.length;
  if (sb) {
    try {
      const { count } = await sb
        .from("media_assets")
        .select("key", { count: "exact", head: true })
        .not("key", "like", "\\_\\_%");
      galleryCount = count ?? seedGallery.length;
    } catch {
      galleryCount = seedGallery.length;
    }
  }

  const publishedEvents = events.filter((e) => e.status === "published");
  const publishedAnnouncements = announcements.filter((a) => a.status === "published");
  const publishedVideos = videos.filter((v) => v.published);

  const upcoming = publishedEvents
    .filter((e) => e.event_date >= today)
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, 5)
    .map((e) => ({
      id: e.id,
      title: e.title,
      event_date: e.event_date,
    }));

  return {
    eventsCount: publishedEvents.length,
    announcementsCount: publishedAnnouncements.length,
    galleryCount,
    videosCount: publishedVideos.length,
    upcoming,
  };
}
