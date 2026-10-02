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
  afternoon_closing?: string;
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

/** A single devotee-experience "miracle" story on the Experiences page. */
export interface ExperienceStory {
  slug: string;
  title: string;
  /** One-line teaser shown on the chapter card. */
  teaser: string;
  /** Full story text, one or more paragraphs. */
  body: string[];
  /** Optional closing pull-quote. */
  quote?: string;
  chapterNum: string;
  chapterTitle: string;
}

/** One photo in the homepage hero showcase. */
export interface ShowcaseSlide {
  src: string;
  tag: string;
  caption: string;
  /** Portrait murthis focus the top in cropped frames; wide scenes stay centered. */
  focus: "top" | "center";
  /** Optional destination — the caption pill renders as a link when set. */
  href?: string;
}

/** Trust & donation details editable from the admin panel. */
export interface TrustSettings {
  // UPI
  upi_id: string;
  payee_name: string;
  upi_enabled?: boolean;
  upi_status_note?: string;
  // Bank
  account_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  branch_address: string;
  // Cheque / DD address
  mailing_address: string;
  // Trust contact
  trust_email: string;
  trust_phone: string;
  // 80G info
  tax_exemption_note: string;
}
