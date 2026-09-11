export type PublishStatus = "published" | "draft";

export interface TempleEvent {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  event_date: string; // YYYY-MM-DD
  start_time: string | null; // HH:MM
  end_time: string | null;
  location: string | null;
  image_url: string | null;
  registration_url: string | null;
  status: PublishStatus;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  status: PublishStatus;
  created_at: string;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  youtube_url: string;
  thumbnail_url: string | null;
  published: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string | null;
  image_url: string;
  created_at: string;
}

export interface AartiTiming {
  id: string;
  label: string;
  time: string;
  sort_order: number;
}

export interface SiteSettings {
  organization_name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  maps_url: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  whatsapp_url: string;
  x_url: string;
  morning_opening: string;
  night_closing: string;
}

export interface SitePage {
  slug: string;
  title: string;
  content: string;
  updated_at: string;
}

export interface DevoteeExperience {
  name: string;
  place: string;
  quote: string;
}

/** One photo in the homepage hero showcase. */
export interface ShowcaseSlide {
  src: string;
  tag: string;
  caption: string;
  /** Portrait murthis focus the top in cropped frames; wide scenes stay centered. */
  focus: "top" | "center";
}
