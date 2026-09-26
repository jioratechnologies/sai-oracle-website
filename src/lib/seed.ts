import type {
  AartiTiming,
  Announcement,
  DevoteeExperience,
  ExperienceStory,
  GalleryImage,
  SitePage,
  SiteSettings,
  TempleEvent,
  TrustSettings,
  YoutubeVideo,
} from "./types";

/**
 * Seed / fallback content.
 *
 * Used when Supabase is not configured yet, and as the initial
 * `supabase/seed.sql` data. Carries over the key facts from the
 * legacy saioracle.com site (Meerut temple, Gurumaa, Trinity).
 */

export const seedSettings: SiteSettings = {
  organization_name: "Sai Oracle",
  tagline: "A temple of Love, Service and Unity",
  description:
    "Satyadeep Sai Organisation is a non-political, non-profit organisation founded by Maa under the inspiration of Bhagwan Sri Sathya Sai Baba — a sacred sanctuary of Love, Service and Unity.",
  phone: "+91-9997815743",
  email: "saioracle7@gmail.com",
  address:
    "H.No- 23, Godwin Estate, Roorkee Road, Meerut, Uttar Pradesh – 250001, India",
  maps_url: "https://maps.google.com/?q=Sai+Oracle+Meerut",
  instagram_url: "https://www.instagram.com",
  facebook_url: "https://www.facebook.com",
  youtube_url: "https://www.youtube.com",
  whatsapp_url: "https://wa.me/919997815743",
  x_url: "",
  morning_opening: "6:30 AM",
  afternoon_closing: "12:30 PM – 4:00 PM",
  night_closing: "8:30 PM",
};

export const seedTrustSettings: TrustSettings = {
  upi_id: "30350015946@sbi",
  payee_name: "Sri Sai Sansthan Charitable Trust",
  account_name: "SRI SAI SANSTHAN CHARITABLE TRUST",
  bank_name: "State Bank of India (SBI)",
  account_number: "30350015946",
  ifsc_code: "SBIN0001562",
  branch_address: "Begum Pul, Meerut, Uttar Pradesh",
  mailing_address:
    "The Managing Trustee\nSri Sai Sansthan Charitable Trust\nH.No- 23, Godwin Estate, Roorkee Road\nMeerut, Uttar Pradesh – 250001, India",
  trust_email: "saioracle7@gmail.com",
  trust_phone: "+91-9997815743",
  tax_exemption_note:
    "This Trust is registered under Section 80G of the Income Tax Act. Donors are eligible for 50% tax exemption on their contribution.",
};

export const seedTimings: AartiTiming[] = [
  { id: "seed-1", label: "Temple Opening", time: "6:30 AM", sort_order: 1 },
  { id: "seed-2", label: "Morning Aarti", time: "9:00 AM", sort_order: 2 },
  { id: "seed-3", label: "Afternoon Aarti", time: "12:00 PM", sort_order: 3 },
  { id: "seed-4", label: "Evening Aarti", time: "6:30 PM", sort_order: 4 },
  { id: "seed-5", label: "Temple Closing", time: "8:30 PM", sort_order: 5 },
];

export const seedEvents: TempleEvent[] = [
  {
    id: "seed-e0",
    title: "The 101st Birthday of Bhagawan Sri Sathya Sai Baba",
    slug: "101st-birthday-bhagawan-sri-sathya-sai-baba",
    description:
      "With hearts full of devotion and gratitude, we joyfully invite you to join us in celebrating The 101st Birthday of Bhagawan Sri Sathya Sai Baba.\n\nLet us come together to honor His divine teachings, share in soulful bhajans, and spread the message of Love, Peace, and Service to Humanity.\n\nDate: 23 Nov 2026\nTiming: 5:00 PM onwards\nVenue: Satyadeep Sai baba temple, NH-58, Godwin Estate, Roorkee Road, Meerut, UP",
    event_date: "2026-11-23",
    start_time: "17:00",
    end_time: "21:00",
    location: "Satyadeep Sai baba temple, NH-58, Godwin Estate, Roorkee Road, Meerut, UP",
    image_url: "/assets/content/universe/sai_baba4_b.webp",
    registration_url: null,
    status: "published",
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "seed-e1",
    title: "Guru Purnima Celebration",
    slug: "guru-purnima-celebration",
    description:
      "Join us for Guru Purnima — a day dedicated to our Guru and spiritual guides. The celebration includes morning aarti, special bhajans, Guru Paduka Pooja, discourses by Maa, and Narayan Seva (Annadanam) for all devotees.\n\nAll devotees and families are cordially invited.",
    event_date: "2026-10-26",
    start_time: "06:00",
    end_time: "13:00",
    location: "Sai Oracle Temple, Meerut",
    image_url: null,
    registration_url: null,
    status: "published",
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "seed-e2",
    title: "Weekly Sai Bhajan Sandhya",
    slug: "weekly-sai-bhajan-sandhya",
    description:
      "Every Thursday evening the temple resounds with Sai bhajans, Naam Smaranam and Dhoop Aarti. Come, sing, and soak in the divine vibration.",
    event_date: "2026-09-10",
    start_time: "18:00",
    end_time: "20:00",
    location: "Sai Oracle Temple, Meerut",
    image_url: null,
    registration_url: null,
    status: "published",
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "seed-e3",
    title: "Narayan Seva — Annadanam",
    slug: "narayan-seva-annadanam",
    description:
      "Monthly food service for the poor and needy. Devotees may volunteer or contribute provisions. Serving food is serving Sai.",
    event_date: "2026-09-20",
    start_time: "11:00",
    end_time: "14:00",
    location: "Sai Oracle Temple, Meerut",
    image_url: null,
    registration_url: null,
    status: "published",
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "seed-e4",
    title: "Diwali — Festival of Lights at the Temple",
    slug: "diwali-festival-of-lights",
    description:
      "Celebrate Diwali at Sai Oracle with Lakshmi Pooja, deepotsav (lamp lighting), special Shej Aarti and prasad distribution. Draft programme — details will be announced soon.",
    event_date: "2026-11-08",
    start_time: "18:00",
    end_time: "21:30",
    location: "Sai Oracle Temple, Meerut",
    image_url: null,
    registration_url: null,
    status: "draft",
    created_at: "2026-09-01T00:00:00Z",
  },
];

export const seedAnnouncements: Announcement[] = [
  {
    id: "seed-a1",
    title: "Temple Timing Update",
    content:
      "During the festive week the temple will remain open until 10:00 PM. Shej Aarti will be held at 9:30 PM followed by prasad distribution.",
    status: "published",
    created_at: "2026-09-02T00:00:00Z",
  },
  {
    id: "seed-a2",
    title: "Narayan Seva Volunteers Needed",
    content:
      "Sevadals and devotees are requested to register at the temple office for the upcoming Annadanam. Your small service is Baba's biggest blessing.",
    status: "published",
    created_at: "2026-09-01T00:00:00Z",
  },
];

export const seedVideos: YoutubeVideo[] = [
  {
    id: "seed-v1",
    title: "Sacred Abhishek & Divine Darshan — Satyadeep Sai Universe",
    youtube_url: "https://www.youtube.com/watch?v=Nfr_LeJq6bM",
    thumbnail_url: "https://img.youtube.com/vi/Nfr_LeJq6bM/hqdefault.jpg",
    published: true,
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "seed-v2",
    title: "Divine Bhajans & Aarti Celebration — Holy Satsang",
    youtube_url: "https://www.youtube.com/watch?v=Y6L_3PZLBAg",
    thumbnail_url: "https://img.youtube.com/vi/Y6L_3PZLBAg/hqdefault.jpg",
    published: true,
    created_at: "2026-09-01T00:00:00Z",
  },
];

export const seedGallery: GalleryImage[] = [
  { id: "seed-g1", title: "Temple Sanctum Darshan", image_url: "/assets/content/gallery/20241024_195531.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g2", title: "Devotees Satsang & Bhajans", image_url: "/assets/content/gallery/20250112_182606.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g3", title: "Aarti and Evening Lamps", image_url: "/assets/content/gallery/20250112_182620.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g4", title: "Swami Singhasan Darshan", image_url: "/assets/content/gallery/20250112_182623.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g5", title: "Sacred Puja Offerings", image_url: "/assets/content/gallery/20250112_182637.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g6", title: "Devotees Gathering", image_url: "/assets/content/gallery/20250112_184206.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g7", title: "Temple Anniversary Moments", image_url: "/assets/content/gallery/20251015_192749.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g8", title: "Anniversary Deepotsav", image_url: "/assets/content/gallery/20251015_192752.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g9", title: "Baba's 100th Birthday Utsav", image_url: "/assets/content/gallery/20241123_191950.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g10", title: "Evening Havan Seva", image_url: "/assets/content/gallery/20251119_202119.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g11", title: "Divine Sanctum Glow", image_url: "/assets/content/gallery/20251119_215111.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g12", title: "Narayan Seva Food Distribution", image_url: "/assets/content/narayan-seva/20241123_192235.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g13", title: "Annadanam for Devotees", image_url: "/assets/content/narayan-seva/copy-of-img_1602.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g14", title: "Seva Offerings by Devotees", image_url: "/assets/content/narayan-seva/img_1561.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g15", title: "Sacred Flower Garlands", image_url: "/assets/content/gallery/dsc_0048.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g16", title: "Temple Murti Darshan", image_url: "/assets/content/gallery/dsc_0058.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g17", title: "Temple Sanctum Hall", image_url: "/assets/content/gallery/dsc_0060.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g18", title: "Mission Karuna Children Seva", image_url: "/assets/content/gallery/dsc_0205.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g19", title: "Festive Evening Assembly", image_url: "/assets/content/gallery/20151224_200630.webp", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g20", title: "Devotional Prasad Distribution", image_url: "/assets/content/gallery/20151223_124437.webp", created_at: "2026-09-01T00:00:00Z" },

  // ── Baba's Birthday Celebration (Utsav) ──
  { id: "legacy-bb-01", title: "Baba's Birthday Utsav — Procession", image_url: "/assets/content/gallery/legacy/images_baba-birth-01.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-02", title: "Baba's Birthday Utsav — Blessings", image_url: "/assets/content/gallery/legacy/images_baba-birth-02.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-03", title: "Baba's Birthday Utsav — Aarti", image_url: "/assets/content/gallery/legacy/images_baba-birth-03.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-04", title: "Baba's Birthday Utsav — Celebration", image_url: "/assets/content/gallery/legacy/images_baba-birth-04.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-05", title: "Baba's Birthday Utsav — Devotees", image_url: "/assets/content/gallery/legacy/images_baba-birth-05.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-06", title: "Baba's Birthday Utsav — Prasad", image_url: "/assets/content/gallery/legacy/images_baba-birth-06.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-07", title: "Baba's Birthday Utsav — Bhajans", image_url: "/assets/content/gallery/legacy/images_baba-birth-07.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-08", title: "Baba's Birthday Utsav — Darshan", image_url: "/assets/content/gallery/legacy/images_baba-birth-08.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-09", title: "Baba's Birthday Utsav — Prayers", image_url: "/assets/content/gallery/legacy/images_baba-birth-09.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-10", title: "Baba's Birthday Utsav — Satsang", image_url: "/assets/content/gallery/legacy/images_baba-birth-010.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-11", title: "Baba's Birthday Utsav — Mandir", image_url: "/assets/content/gallery/legacy/images_baba-birth-011.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-12", title: "Baba's Birthday Utsav — Havan", image_url: "/assets/content/gallery/legacy/images_baba-birth-012.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-13", title: "Baba's Birthday Utsav — Abhishek", image_url: "/assets/content/gallery/legacy/images_baba-birth-013.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-14", title: "Baba's Birthday Utsav — Seva", image_url: "/assets/content/gallery/legacy/images_baba-birth-014.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-15", title: "Baba's Birthday Utsav — Community", image_url: "/assets/content/gallery/legacy/images_baba-birth-015.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-16", title: "Baba's Birthday Utsav — Morning Aarti", image_url: "/assets/content/gallery/legacy/images_baba-birth-016.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-17", title: "Baba's Birthday Utsav — Narayana", image_url: "/assets/content/gallery/legacy/images_baba-birth-017.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-18", title: "Baba's Birthday Utsav — Sacred Flame", image_url: "/assets/content/gallery/legacy/images_baba-birth-018.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-19", title: "Baba's Birthday Utsav — Garlands", image_url: "/assets/content/gallery/legacy/images_baba-birth-019.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-20", title: "Baba's Birthday Utsav — Group Photo", image_url: "/assets/content/gallery/legacy/images_baba-birth-020.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-21", title: "Baba's Birthday Utsav — Celebration 2", image_url: "/assets/content/gallery/legacy/images_baba-birth-021.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-22", title: "Baba's Birthday Utsav — Sanctum Decor", image_url: "/assets/content/gallery/legacy/images_baba-birth-022.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-23", title: "Baba's Birthday Utsav — Evening Lamps", image_url: "/assets/content/gallery/legacy/images_baba-birth-023.jpg", created_at: "2024-11-23T00:00:00Z" },
  { id: "legacy-bb-24", title: "Baba's Birthday Utsav — Closing", image_url: "/assets/content/gallery/legacy/images_baba-birth-024.jpg", created_at: "2024-11-23T00:00:00Z" },

  // ── Annual Satsang 2019 ──
  { id: "legacy-g19-01", title: "Satsang 2019 — Opening Ceremony", image_url: "/assets/content/gallery/legacy/images_gal-2019-01.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-02", title: "Satsang 2019 — Aarti", image_url: "/assets/content/gallery/legacy/images_gal-2019-02.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-03", title: "Satsang 2019 — Bhajans", image_url: "/assets/content/gallery/legacy/images_gal-2019-03.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-04", title: "Satsang 2019 — Discourse", image_url: "/assets/content/gallery/legacy/images_gal-2019-04.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-05", title: "Satsang 2019 — Devotees", image_url: "/assets/content/gallery/legacy/images_gal-2019-05.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-06", title: "Satsang 2019 — Mandir", image_url: "/assets/content/gallery/legacy/images_gal-2019-06.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-07", title: "Satsang 2019 — Seva", image_url: "/assets/content/gallery/legacy/images_gal-2019-07.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-08", title: "Satsang 2019 — Prasad", image_url: "/assets/content/gallery/legacy/images_gal-2019-08.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-09", title: "Satsang 2019 — Gathering", image_url: "/assets/content/gallery/legacy/images_gal-2019-09.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-10", title: "Satsang 2019 — Celebrations", image_url: "/assets/content/gallery/legacy/images_gal-2019-010.jpg", created_at: "2019-11-01T00:00:00Z" },
  { id: "legacy-g19-11", title: "Satsang 2019 — Closing Ceremony", image_url: "/assets/content/gallery/legacy/images_gal-2019-011.jpg", created_at: "2019-11-01T00:00:00Z" },

  // ── Annual Satsang 2020 ──
  { id: "legacy-g20-01", title: "Satsang 2020 — Sacred Gathering", image_url: "/assets/content/gallery/legacy/images_gal-2020-01.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-02", title: "Satsang 2020 — Aarti", image_url: "/assets/content/gallery/legacy/images_gal-2020-02.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-03", title: "Satsang 2020 — Bhajans", image_url: "/assets/content/gallery/legacy/images_gal-2020-03.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-04", title: "Satsang 2020 — Discourse", image_url: "/assets/content/gallery/legacy/images_gal-2020-04.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-05", title: "Satsang 2020 — Devotees", image_url: "/assets/content/gallery/legacy/images_gal-2020-05.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-06", title: "Satsang 2020 — Prasad", image_url: "/assets/content/gallery/legacy/images_gal-2020-06.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-07", title: "Satsang 2020 — Narayan Seva", image_url: "/assets/content/gallery/legacy/images_gal-2020-07.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-08", title: "Satsang 2020 — Mandir Darshan", image_url: "/assets/content/gallery/legacy/images_gal-2020-08.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-09", title: "Satsang 2020 — Prayers", image_url: "/assets/content/gallery/legacy/images_gal-2020-09.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-10", title: "Satsang 2020 — Group Satsang", image_url: "/assets/content/gallery/legacy/images_gal-2020-010.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-11", title: "Satsang 2020 — Closing Aarti", image_url: "/assets/content/gallery/legacy/images_gal-2020-011.jpg", created_at: "2020-11-01T00:00:00Z" },
  { id: "legacy-g20-12", title: "Satsang 2020 — Sanctum", image_url: "/assets/content/gallery/legacy/images_gal-2020-012.jpg", created_at: "2020-11-01T00:00:00Z" },

  // ── Annual Satsang 2021 ──
  { id: "legacy-g21-01", title: "Satsang 2021 — Morning Darshan", image_url: "/assets/content/gallery/legacy/images_gal-2021-01.jpg", created_at: "2021-11-01T00:00:00Z" },
  { id: "legacy-g21-02", title: "Satsang 2021 — Bhajans", image_url: "/assets/content/gallery/legacy/images_gal-2021-02.jpg", created_at: "2021-11-01T00:00:00Z" },
  { id: "legacy-g21-03", title: "Satsang 2021 — Discourse", image_url: "/assets/content/gallery/legacy/images_gal-2021-03.jpg", created_at: "2021-11-01T00:00:00Z" },
  { id: "legacy-g21-04", title: "Satsang 2021 — Devotees", image_url: "/assets/content/gallery/legacy/images_gal-2021-04.jpg", created_at: "2021-11-01T00:00:00Z" },
  { id: "legacy-g21-05", title: "Satsang 2021 — Seva Camp", image_url: "/assets/content/gallery/legacy/images_gal-2021-05.jpg", created_at: "2021-11-01T00:00:00Z" },
  { id: "legacy-g21-06", title: "Satsang 2021 — Prasad", image_url: "/assets/content/gallery/legacy/images_gal-2021-06.jpg", created_at: "2021-11-01T00:00:00Z" },
  { id: "legacy-g21-07", title: "Satsang 2021 — Blessings", image_url: "/assets/content/gallery/legacy/images_gal-2021-07.jpg", created_at: "2021-11-01T00:00:00Z" },
  { id: "legacy-g21-08", title: "Satsang 2021 — Group Prayer", image_url: "/assets/content/gallery/legacy/images_gal-2021-08.jpg", created_at: "2021-11-01T00:00:00Z" },
  { id: "legacy-g21-09", title: "Satsang 2021 — Evening Aarti", image_url: "/assets/content/gallery/legacy/images_gal-2021-09.jpg", created_at: "2021-11-01T00:00:00Z" },

  // ── Annual Satsang 2022 ──
  { id: "legacy-g22-01", title: "Satsang 2022 — Opening Ceremony", image_url: "/assets/content/gallery/legacy/images_gal-2022-01.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-02", title: "Satsang 2022 — Bhajans", image_url: "/assets/content/gallery/legacy/images_gal-2022-02.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-03", title: "Satsang 2022 — Discourse", image_url: "/assets/content/gallery/legacy/images_gal-2022-03.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-04", title: "Satsang 2022 — Sacred Havan", image_url: "/assets/content/gallery/legacy/images_gal-2022-04.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-05", title: "Satsang 2022 — Devotees", image_url: "/assets/content/gallery/legacy/images_gal-2022-05.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-06", title: "Satsang 2022 — Prasad", image_url: "/assets/content/gallery/legacy/images_gal-2022-06.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-07", title: "Satsang 2022 — Narayan Seva", image_url: "/assets/content/gallery/legacy/images_gal-2022-07.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-08", title: "Satsang 2022 — Group Photo", image_url: "/assets/content/gallery/legacy/images_gal-2022-08.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-09", title: "Satsang 2022 — Evening Aarti", image_url: "/assets/content/gallery/legacy/images_gal-2022-09.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-10", title: "Satsang 2022 — Mandir Decor", image_url: "/assets/content/gallery/legacy/images_gal-2022-010.jpg", created_at: "2022-11-01T00:00:00Z" },
  { id: "legacy-g22-11", title: "Satsang 2022 — Closing Celebration", image_url: "/assets/content/gallery/legacy/images_gal-2022-011.jpg", created_at: "2022-11-01T00:00:00Z" },

  // ── Temple Planning & Architecture ──
  { id: "legacy-pt-01", title: "Temple Planning — Site View 1", image_url: "/assets/content/gallery/legacy/images_plan-t-01.jpg", created_at: "2018-01-01T00:00:00Z" },
  { id: "legacy-pt-02", title: "Temple Planning — Site View 2", image_url: "/assets/content/gallery/legacy/images_plan-t-02.jpg", created_at: "2018-01-01T00:00:00Z" },
  { id: "legacy-pt-03", title: "Temple Planning — Site View 3", image_url: "/assets/content/gallery/legacy/images_plan-t-03.jpg", created_at: "2018-01-01T00:00:00Z" },
  { id: "legacy-pt-04", title: "Temple Planning — Construction", image_url: "/assets/content/gallery/legacy/images_plan-t-04.jpg", created_at: "2018-01-01T00:00:00Z" },
  { id: "legacy-pt-05", title: "Temple Planning — Blueprint", image_url: "/assets/content/gallery/legacy/images_plan-t-05.jpg", created_at: "2018-01-01T00:00:00Z" },
  { id: "legacy-pt-06", title: "Temple Planning — Foundation", image_url: "/assets/content/gallery/legacy/images_plan-t-06.jpg", created_at: "2018-01-01T00:00:00Z" },

  // ── Darshan Archives (vlb_images1) ──
  { id: "legacy-vlb-2", title: "Darshan Archive — Sacred Moment 1", image_url: "/assets/content/gallery/legacy/vlb_images1_2.jpg", created_at: "2017-01-01T00:00:00Z" },
  { id: "legacy-vlb-3", title: "Darshan Archive — Sacred Moment 2", image_url: "/assets/content/gallery/legacy/vlb_images1_3.jpg", created_at: "2017-01-01T00:00:00Z" },
  { id: "legacy-vlb-4", title: "Darshan Archive — Sacred Moment 3", image_url: "/assets/content/gallery/legacy/vlb_images1_4.jpg", created_at: "2017-01-01T00:00:00Z" },
  { id: "legacy-vlb-5", title: "Darshan Archive — Sacred Moment 4", image_url: "/assets/content/gallery/legacy/vlb_images1_5.jpg", created_at: "2017-01-01T00:00:00Z" },
  { id: "legacy-vlb-6", title: "Darshan Archive — Sacred Moment 5", image_url: "/assets/content/gallery/legacy/vlb_images1_6.jpg", created_at: "2017-01-01T00:00:00Z" },
  { id: "legacy-vlb-7", title: "Darshan Archive — Sacred Moment 6", image_url: "/assets/content/gallery/legacy/vlb_images1_7.jpg", created_at: "2017-01-01T00:00:00Z" },
  { id: "legacy-vlb-8", title: "Darshan Archive — Sacred Moment 7", image_url: "/assets/content/gallery/legacy/vlb_images1_8.jpg", created_at: "2017-01-01T00:00:00Z" },
  { id: "legacy-vlb-9", title: "Darshan Archive — Sacred Moment 8", image_url: "/assets/content/gallery/legacy/vlb_images1_9.jpg", created_at: "2017-01-01T00:00:00Z" },
  { id: "legacy-vlb-about", title: "About Satyadeep Sai Universe", image_url: "/assets/content/gallery/legacy/vlb_images1_about_us_2u.jpg", created_at: "2017-01-01T00:00:00Z" },
];

export const seedExperiences: DevoteeExperience[] = [
  {
    name: "A Sai Devotee",
    place: "Meerut",
    quote:
      "The Thursday bhajans at Sai Oracle fill the heart with peace. Every visit feels like coming home to Baba.",
  },
  {
    name: "A Sevadal Member",
    place: "Delhi",
    quote:
      "Serving in Narayan Seva here taught me what Baba meant — love all, serve all. The Annadanam runs with so much devotion.",
  },
  {
    name: "A Devotee Family",
    place: "Muzaffarnagar",
    quote:
      "We attended Guru Purnima celebrations with our children. The discourses and the atmosphere left us deeply moved.",
  },
];

const aboutContent = `Satyadeep Sai Organisation is a non-political, non-profit organisation, founded by Gurumaa, under the inspiration of Bhagwan Satya Sai Baba. The organisation was formed by Gurumaa for the sole benefit of helping mankind, and providing opportunities to participate in service activities such as Narayan Seva (providing food to the poor and destitute persons), educating a poor child to make him self-reliant, and promoting the practice of human values in daily life.

People from all walks of life and religions are cordially invited by Satyadeep Organisation to come forward and spread the mission left by Sathya Sai Baba, under the guidance of Gurumaa. This organisation was established with the sole purpose of bringing together people of all faiths, to spare some time in this fast-paced life to progress towards personal spiritual development, and to help others also in the same spiritual journey.

## Satyadeep Sai Universe

To accomplish this purpose of uniting mankind for sacred activities, Satyadeep Sai Organisation developed Satyadeep Sai Universe, Satyadeep Shiv Sai Universe and Satyadeep Sai Baba Charitable School — to spread the universal unitary faith, the Atmic principle (principle of the spirit), the path of love (Prema), the path of Dharma (righteousness), the path of Ahimsa (non-violence), and the path of Shanti (peace and happiness).

For fulfilling this mission of Sai Baba, Gurumaa embarked upon constructing and developing Satyadeep Sai Baba Universe and a charitable school, where the mission of Sai Baba could be easily accomplished. With the supreme blessings of Sai Baba, this temple became the very first temple in India dedicated to the Trinity of Sai Avatars — Shirdi Sai, Satya Sai and Prema Sai.

## Temple Life

Presently this Sai Universe is open for all regular activities of a temple — a life-sized statue of Shirdi Sai and Satya Sai, and a beautiful singhasan for the forthcoming avatar Prema Sai, are placed adjacent to each other for worship. The mandir is open seven days a week, and conducts devotional programmes such as aartis, bhajans, regular pujas, naam smaranam, and Narayan Seva (food service).

Satyadeep Sai Baba Charitable School is also open five days a week, where small children are given spiritual and secular education for overall development, right from the start of their life journey.

## Our Mission Online

The organisation's official website is [www.saioracle.com](/), carrying a vast knowledge and information for spiritual awakening for internet users. This website is dedicated to the lotus feet of Lord Sai Baba, and to spreading the message of Swami through all means.

Special thanks to all the sevadals of this organisation, who are performing selfless service in carrying out its regular activities, and spreading the message of God to humanity. We would like to request all devotees to come forward and join this noble mission carried out by Gurumaa.

As we endeavour upon this spiritual journey, we would like to thank everyone for their co-operation. We pray to Swami to give all of us strength and blessings to help mankind in its overall spiritual upliftment.

**Sai Ram — Satyadeep Sai Organisation**

**Om Sai Ram** — Satyadeep Sai Organisation`;

const templeContent = `## Daily Programme

The temple follows the sacred rhythm of the four aartis, as in Shirdi:

- **Kakad Aarti** — dawn awakening of the Lord
- **Madhyan Aarti** — midday worship
- **Dhoop Aarti** — evening lamp worship with bhajans
- **Shej Aarti** — night rest ceremony

Devotees are welcome to attend all programmes. Thursday bhajan sandhyas and festival celebrations are announced on the Events page.

## Sevas & Activities

- Daily aartis, bhajans, pujas and Naam Smaranam
- Narayan Seva (Annadanam) — monthly food service
- Charitable school for underprivileged children
- Discourses and meditation guidance

## Temple Etiquette

- Please dress modestly and maintain silence in the sanctum
- Switch off mobile phones inside the prayer hall
- Photography is restricted inside the sanctum — please follow volunteer guidance
- Prasad is distributed after aartis; please partake respectfully

## Reaching the Temple

Sai Oracle is located on NH-58, Roorkee Road, Meerut Cantt — near the 3rd Milestone Restaurant. Ample parking is available. See the Contact page for the map and directions.`;

const experiencesContent = `The Miracles of Bhagwan are a manifestation of His divine powers of omnipresence, omnipotence and omniscience. Bhagwan calls miracles His visiting cards, and leelas (divine sport) are in the very nature of the Avatar. They are, in fact, a source of delight and bliss to His devotees.

Thousands of people all around the world have experienced the divinity of Bhagwan in a number of ways. Some have been miraculously saved from dire situations or calamities, while others have had spiritually illumining experiences. In these pages, we present some of the experiences of devotees of Bhagwan, along with their Gurumaa.`;

export const experiencesClosingNote =
  "If Baba has blessed your life with an experience you wish to share, please write to the temple office — see the [Contact page](/contact).";

const aimsContent = `## Aims & Objectives

Following are the aims and objectives of Sri Sai Sansthan Charitable Trust.

![Aims & Objectives](/legacy/aims/aims.webp)

## 1. Global Oneness

Sri Sai Sansthan Charitable Trust aims at uniting people around the globe to perform sacred actions — in order not only to save what we have, but to transform the planet through spiritual awareness. Satyadeep Sai Universe is a place where people all over the globe, irrespective of caste, creed or religion, join hands to work on various social causes for the upliftment of humanity — and where they can worship their respective deities at the Sarva Dharma Sthal.

## 2. Spiritual Inspiration

Sri Sai Sansthan Charitable Trust is a place where spiritual seekers from all over the world come for one purpose — to attain full spiritual awakening. The purpose is to create an opportunity for all seekers to explore the hidden inner source of strong energies lying unused and untapped within us.

![Spiritual Inspiration](/legacy/aims/inspiration.gif)

## 3. Narayan Seva

Sri Sai Sansthan Charitable Trust aims at providing food to poor children whose parents are not wealthy enough to provide for them.

## 4. Fostering Seeds of Love and Service

Sri Sai Sansthan Charitable Trust, under the presence and guidance of Maa, propagates the message of equal-mindedness among the army of devotees. From time to time, meditation and discourse sessions are held to awaken inner joy and happiness. Love is the seed, courage is the blossom, and peace is the fruit. The love of God and love for God are both eternally sweet and pure. Under the guided presence of Her Holiness Gurumaa, the Trust helps people develop strong character by inducing in them the five human values — **Sathya, Dharma, Shanti, Prema and Ahimsa**.

![Fostering Seeds of Love and Service](/legacy/aims/love.gif)
![Fostering Seeds of Love and Service](/legacy/aims/love2.gif)`;

export const missionKarunaContent = `Maa, motivated by Bhagwan Sri Sai Baba, has launched a mission called Karuna — "Empowering the Poor Children." This mission aims at providing financial support to poor children to complete their education and strengthen their educational background — irrespective of caste, colour, creed or religion — so that one day they can support themselves and be free of dependence on others.

You are all requested to raise funds for this noble education mission.`;

export const pujniyeMaaContent = `## Glorious & Blissful Life of Maa

There are certain spiritually blessed souls, sants, on this earth which took birth in human forms and in different stages of life to enlighten the path of ultimate spiritual evolution. Maa is one such blessed soul, who through her sincere efforts, is enlightening the divine jyoti (flame) in thousands of Sai devotees. Today thousands of people from various parts of the world, through her satsang, sadhana and selfless seva practice, have reached the divine path towards the lotus feet of the Lord and are gaining rapid spiritual progress.

![Maa](/assets/content/maa/1.webp)

Certain spiritually blessed souls, sants, mystics, descend from time to time in this material world to re-establish the teachings of spiritual science. Whenever there is a decline in righteousness, a predominant rise of irreligion, at that time Bhagwan along with his mystic souls (in different forms) descends on earth — to deliver the pious and to annihilate the evildoers, as well as to establish the principles of Vedas and truth. Bhagwan himself appears millennium after millennium.

## Born in Jan 1962

Her mother and grandmother were strongly devoted to Lord Krishna and Lord Shiva. They began to shower the words of wisdom of Lord Shiva and Krishna, and those words touched her deeply. Her grandmother, Kaushalya Devi, was a religious lady — she used to take her barefoot, early in the morning at 4am, to Manakameshwar Mandir. At seven years of age she made her read the "Shiv Puran". She used to carry a bucket of milk to the Manakameshwar Temple at 4am, situated 4 km from their house in Ravat-Para, Agra (India), where they used to perform Lord Shiva's abhishek regularly.

When she was at the tender age of five she had a divine darshan of Lord Shiva while performing abhishek. What a wonderful experience it was — Lord Shiva was in Ardhnarishwar swaroop in front of her; He gave a welcoming smile and told her, "My daughter, bring 100 kilos of milk on Mahashivratri for my abhishek." It was such an astonishing darshan that could make anyone overwhelmed. She was desperately waiting for that day to come.

That day came, and she started preparing for Lord Shiva's abhishek — every ingredient such as milk, curd, ghee, sugar, honey, etc. was ready. Early in the morning before dawn, at 4 o'clock, she started her journey towards the Shiv temple. When she reached there she saw a huge line of devotees standing for abhishek — as soon as the doors of the Manakameshwar Mandir opened, no one knows how she reached the front of that line. She performed Lord Shiva's abhishek with all vidhi-vidhan. After that, as she was putting sringar on the shivling, she saw Lord Shiva open His third eye three times and close it — thereafter, Almighty Lord Shiva kept His third eye half open.

![Maa performing abhishek](/assets/content/maa-life-sketch/abhishek.webp)

This was the wonderful experience after which her mystic life started. She started practicing meditation, and through her immense spiritual sadhana over years and unselfish love towards God, she started having darshan of Lord Krishna, Lord Hanuman and Maa Kali. Even today, the routine of Lord Shiva's and Bhagwan Sai Baba's abhishek is still carried out by her at Satyadeep Sai Universe and Shiv Sai Universe.

![Abhishek at Satyadeep Sai Universe](/assets/content/maa-life-sketch/dscn05600001amit-shirdi.webp)

Her family members were very fond of going to Mathura-Vrindavan — at that time there were kunj-galiyan where Lord Krishna used to walk. When she first visited the kunj-galiyan she had a divine darshan of Lord Krishna running through them, and she used to run behind Him — sometimes He would disappear, all Krishna leelas. One can win the grace of the Lord through unflinching devotion and sheer penance.

Slowly and slowly time passed. After some time Sai Baba started giving her dream darshan, coming in her dream and blessing her — that's it. Till then there was not even a single photo of Sai Baba in her home. After some time she went to Mumbai, brought a Sai Baba photo, and kept it in her mandir.

Many times Swami gave her darshan in dreams. She was not satisfied with this alone — she started going into deep meditation, praying to Swami for a sakshaat (direct) darshan, and through her sheer penance and firm devotion, she had a sakshaat darshan at the very age of 17. It was before dawn, between 4am and 5am; she was meditating as usual, when Sai Baba came and said very softly, "My dear daughter, open your eyes." At first she thought it a mere delusion, but Swami repeated His words. As soon as she opened her eyes she saw Swami standing between a beautifully diamond-embedded silver door — there were some stairs between her and Swami, and He was standing at the top.

Swami looked at her and called her to come up. She glared at Swami, thinking that she had been calling Him for past years, and now that He had come, He should come down the stairs. Then Swami smiled and told her, "You come two steps up, and I will come down for you." She felt she was talking to that Parmatma. As soon as she moved two steps up, Swami suddenly came down the stairs at once — He put her in His arms and loved her like a father, enriching His daughter with His utmost caringness and affection. Baba said, "You are my daughter for the past few janams." This was the wonderful experience after which she progressed further in her spiritual journey.

![Maa in Satsang](/assets/content/maa/2.webp)`;

const liveSketchContent = `## Maa Life Sketch

"Service to Mankind is Service to God" — Love all, serve all.

Maa means an enlightened divine mother, a guiding light of unconditional love. Her unsullied love, her divine grace, her ways to remove agonies and sorrows, her guided meditation techniques, her unflinching faith in Sai Baba, her teachings for spiritual upliftment, her ways of leading everyone to the divine lotus feet of Bhagwan Sri Sai Baba, her ways of leading towards higher stages of human consciousness and in-depth divine energies, are some of the traits of Maa.

![Maa](/assets/content/maa/3.webp)

A symbol of Ahimsa, human values and universal brotherhood, Maa is one such spiritually blessed divine soul among a galaxy of divine souls — one such upcoming shining star who is teaching mankind "Bhakti Yoga" (unflinching love towards God), "Karma Yoga" (merits and demerits of good and bad deeds), "Jnana Yoga" (supreme knowledge of the true self), and "Dhyana Yoga" (meditation).

Maa was born in Agra, north India; her life showed miraculous symptoms of the divine powers inherited in her. Her unflinching and unsullied love towards Sai Baba, and her way of performing Nishkama Karma (desireless action), have motivated and transformed the hearts of thousands of innocent people towards Sai Baba. From the very beginning, various spiritual incidents took place which strengthened her path to unite with God — various sants and sages visited her house and showed special affection for this child.

Even as a young child, Maa was often found in deep meditation, and at the age of seven she surprised her parents with her deep meditations — many times her parents shook her but were unable to disturb her, as the body was there, but the soul was attached to Sai Baba, who took her soul and gave her darshans of Vaikunth and every spiritual pilgrimage in India.

From the tender age of nine she had a divine darshan of Bhagwan Sri Sai Baba; thereafter, through her extraordinary signs of divine powers and her innocent offerings to Sai Baba, she connected herself with Lord Shiva. She often used to go to the Manakameshwar temple early every morning at 4am with 100 litres of milk for the abhishek of Lord Shiva, and used to run through the streets of Vrindavan behind Lord Krishna. At the age of twelve she had darshan of Lord Hanuman, Bhagwan Sri Satya Sai Baba and Shirdi Sai Baba at her home — a practice still carried on by her till now.

Soon Maa started delivering discourses, and propagated the glory of Bhagwan Sri Sai Baba in such an amazing manner that people were drawn to her satsang, making themselves part of the divine blessings showered by this spiritually blessed soul. Her unsullied love towards Lord Sri Sai Baba, and her selfless service to mankind, attracted thousands. Till now, Maa, through her presence, has transformed thousands of hearts towards Bhagwan Sri Sathya Sai Baba. Immense divine vibrations surround the satsang hall in her presence, together with the almighty presence of Bhagwan Sri Sai Baba. Many people and children have her darshan in their dreams, where they are guided by their divine Maa.

Her formula for man to lead a meaningful life is the five-fold path guided to her by Bhagwan Sri Sai Baba — Sathya (Truth), Dharma (Righteousness), Shanti (Peace), Prema (Love) and Ahimsa (Non-violence). Love for God, fear of sin and morality in society — these are her prescriptions for our ailing world. She is an inexhaustible reservoir of pure love.

Her greatest success lies in this: that she has transformed thousands of young children towards the lotus feet of the Lord, and they receive the divine bliss thereafter.

Those are fortunate who are being guided by Bhagwan Sri Sai Baba and Maa.`;

const teachingsContent = `## Love & Service

Maa is the embodiment of divine bliss. Her love is the unseen undercurrent binding all the four values — that is, love in thought is Sathya (Truth), love in feeling is Shanti (Peace), love in action is Dharma (Righteousness), and love in understanding is Ahimsa (Non-violence). The grace of God cannot be won — love alone can win it. Love should not be rationed based on caste, creed or the economic status of the recipient; it should flow fully and freely, regardless of consequence. Love saturates all the activities of joy and peace.

![Love, Service and Devotion](/assets/content/home/love-and-service-main-page-photo.webp)

Love yourself for the God that it embodies. Love others for the sake of God enshrined in them. Love human beings, and one who fails to nourish this love is a beast. "I bless you that you cultivate love towards all beings. Love is God, God is Love."

## Prema (The Highest Sadhana)

Cultivate Prema (Love) towards all — that will destroy envy, anger and hatred. "The farmer plants the seedling and watches over it with care; he waters it as and when necessary, removes the weeds, destroys the pests, spreads manure, and waits for the day when he can reap the harvest and fill his granary. So too you must nourish Prema and pluck out the weeds of hatred and envy. If you wear red glasses everything appears red — wear the glasses of Prema and all will appear lovable and good." The eye of Prema will see all as embodiments of love. Love more and more people, love them more and more intensely, transform love into service, transform the service into worship — that is the highest sadhana. The grace of God is always flowing like the electric current through the wire — fix the bulb, and the current, according to the wattage of the bulb, will illumine your home. The bulb is the sadhana (spiritual practice) you perform; the home is your heart.

## Service

"The Best Way to Love God Is to Love All, Serve All."

"Hands That Help Are Holier Than the Lips That Pray." Cows generously give their milk to humans. The trees yield fruits for the benefit of others. Rivers carry water for others. Man should also, without considering his own personal interests, use his body for the benefit of others.

Help Ever, Hurt Never. Selfless service is a more exalted means of attaining spiritual progress than other means such as meditation or bhajan — this is so because when we undertake meditation or japa, we do it exclusively for our own benefit, for our own individual desires and securing happiness for ourselves. However, we should aspire for the attainment of the good of others without any desire for personal gain. "Seva broadens the heart and widens one's vision." It fills one with joy, promotes unity, and drives out all the evil qualities in man. Everyone in this world is a servant, not a master — selfless service is always at the highest level in the hierarchy of spiritual disciplines. Service to man eradicates egoism and selfishness. Service to man will help your divinity to blossom — service to any being amounts to serving God, for God is in all. The relief and joy that you give to the sick, or education to the poor, reaches God, for God is in their hearts. Become the servants of the Lord — train yourselves to serve God by serving man, in whose heart God is installed.

Service is worship — each act of service is a flower placed at the feet of the Lord. "Seva is the best sadhana." The body has been given to man for the performance of right action. Consider social service as service to God — this is the easiest way to earn the love of God. Your entire life will be sanctified thereby.`;

const discoursesContent = `## Sathya (Truth)

Man should emphasise speaking the truth, and speaking it politely — "If you cannot oblige, you can at least speak obligingly." Have faith that truth will save you in the long run; stick to it regardless of what may befall. Don't have hypocrisy or crookedness in your speech — both unpleasant truth and pleasant untruth have to be avoided. Truth is God Himself. "The chief duty of man is investigation into truth. Truth can be won only through dedication and devotion, and they are dependent on the grace of God, which is showered only on hearts saturated with love."

![Divine Discourses & Unity](/assets/content/universe/sai_baba4_b.webp)

In everyone there is a spark of truth — no one can live without that spark. In everyone there is a flame of love — life becomes dark without it. And that spark, that flame, is God itself, as He is the source of all truth and love.

## Dharma (Right Conduct)

Everyone should perform his work as actors perform in their play, keeping their identity separate and not getting attached to their role. Always remember that everything assigned to you is totally a play — we are all actors in the Divine's film, and the Lord has assigned you a part. Act well at your part — there all your duty ends. He (the Lord) is the director, the designer of the play, and He enjoys it.

See what is good. Hear what is good. Speak what is good. Think what is good. Do what is good. This is the way to God.

Diminish your egoism, conquer your selfish desires, destroy your bestial feelings and impulses — he is surely on the path of Dharma. We have no choice but to follow, and we cannot modify Dharma.

## Shanti (Peace)

Faith in God and faith in oneself is the key to achieving mental peace. When man overcomes his excessive desires and unwanted expectations, he can experience peace. It's a common tendency that the mind always clings to something — we cannot easily detach ourselves from activities. Make your mind cling to God, let it do all things for God, and leave the results thereof — whether success or failure, loss or profit — to God. Only then can you attain peace (Shanti). One should engage in all activities but never get attached to them — perform them as your duty. Just as the sky is unaffected by rains, storms, clouds, lightning or thunder, and remains the same in spite of temporary disturbances, in the same way the mind of man should stay clear and clean in spite of all the thoughts and stress of life.`;

const overviewContent = `## An Overview

Satyadeep Sai Universe, Shiv Sai Universe and Sarva Dharma Sthal are a place away from the ups and downs of daily mundane life, where divine vibrations flow at their fullest. It is the presence of Bhagwan Sri Sai Baba that makes the place divine.

![Satyadeep Sai Universe](/assets/content/universe/img_7403-copy.webp)

The unique discourses delivered by Maa help an individual discover inner peace and happiness, and also ways towards spiritual development.

## Divine Place

Various events and programmes are organised with the consent of Maa, and in the presence of Bhagwan Sri Sai Baba, in the premises of Satyadeep Sai Universe on various occasions — offering tremendous opportunities for all spiritual aspirants who love to perform selfless service.

Visitors are welcomed, with their efforts and suggestions, to enhance the beauty of Satyadeep Sai Universe.

From time to time, meditation camps are organised under the guidance of Maa, which is necessary to gain the supreme knowledge of one's own self and to discover the peace within.

## Darshan Timings

Visitors can visit Satyadeep Sai Universe and Shiv Sai Universe in the morning from 6:30am to 12:30pm, and in the evening from 4:00pm to 8:30pm.

The timings for Maa's darshan are between 6:00pm and 7:30pm, contingent upon her availability at Satyadeep Sai Universe.

Every Thursday, devotional bhajans in the melodious voice of devotees and Maa are also organised at Satyadeep Sai Universe.

Visitors may take part in Nishkama Seva (selfless service) without expectation of the fruit of their actions.

Satyadeep Sai Universe has built Sarva Dharma Sthal, which symbolises that every caste, creed and religion are forms of one God — "Sabka Malik Ek". Every spiritual aspirant who is on the path of seeking divinity is welcomed to Satyadeep Sai Universe — come and rejoice and flow in divinity.

Manav Seva is Madhav Seva.

## Universe of Divine Healing

Satyadeep Sai Universe of divine healing is a place away from the city. It gives you an opportunity to turn your vision from the outer universe into the inner glory, the Atmic splendour, which you really are. With the help of the body, the Atma within can be realised. Do not neglect the Lord within. Do not hold on to the unreal and the temporary.

Man today has forgotten the atmic bliss hidden inside (the force that rules and regulates the senses, the mind and the intellect — that force is Atma). The Lord is in everyone as Atma. Atma never dies — it is the body that dies. Atma is the source and spring of joy and happiness. This Satyadeep Sai Universe is a divine healing place where you can explore the inner atmic bliss.

The presence of Bhagwan Sri Sai Baba, and His blessed soul Maa, showers the place with divine bliss. The guidance of Maa helps one discover the divine path to reach the lotus feet of the Lord, and to discover inner joy and happiness everywhere.

Nowadays Satyadeep Sai Universe is a divine centre for all spiritual aspirants from every part of the world, where you commune with the Lord. This Satyadeep Sai Universe is a symbol of every religion, where there are no barriers of caste, creed or religion — it is open for every spiritual aspirant who is on the path of seeking peace at all three levels: physical, mental and spiritual. Welcome to Satyadeep Sai Universe — rejoice and be divine.

The devotees who visit Satyadeep Sai Universe can attend aarti according to the schedule below. Darshan timings of Maa can be asked about at the office, depending on her availability. During aarti, devotees receive immense divine vibrations in the prayer hall.

Bhajan means singing aloud the glory of God — bhajans, prayers for universal peace ("loka samastha sukhino bhavantu"), in the divine presence of Bhagwan Sri Sai Baba, are unique as they express unity among diversities — "sabka malik ek". Always sit awhile after the aarti, where you may enter the stillness and receive the divine Lord's blessings.

From time to time, various meditation camps, events and programmes are organised under the guidance of Maa in the premises of Satyadeep Sai Universe, offering immense opportunities for all spiritual aspirants.

Visitors are welcomed to be part of the peaceful environment of Satyadeep Sai Universe, Shiv Sai Universe and Sarva Dharma Sthal — they are offered bountiful opportunities to perform seva-service activities, and a way to live life to its fullest. Satyadeep Sai Universe is open for visits for fixed hours during the day — in the morning from 7:00am to 12:00pm, and in the evening from 4:00pm to 8:30pm.

Discourses are held by Maa every Thursday from 7:00pm to 7:45pm.

Satyadeep Sai Universe is a platform for every spiritual aspirant for self-transformation, and to enjoy the eternal divine bliss.

## Darshan & Bhajan Timings

- Darshan — 6:00am to 8:30pm
- Bhajan — 6:00pm to 7:00pm (Thursday)
- Aarti — 9:00am, 12:00pm & 6:00pm

![Satyadeep Sai Universe](/assets/content/universe/saibaba_uni.webp)`;

const meditationContent = `## Essence of Meditation

Meditation is not concentration — rather it is getting in tune with the inner source of energy.

Meditation is getting absorbed in God as the only thought, the only goal — God only, only God. Think God, breathe God, love God. As long as one is thinking that he is meditating, he is not meditating — one has to get absorbed in God, put aside every thought and merge in God. In that process the mind naturally stops. As long as there is attachment to body, kith and kin, one can't progress in meditation. The physical body has to be dedicated to Nishkama Karma for the benefit of others.

For one who desires to practice meditation, it is advisable to have "jyoti" (flame) as the object of meditation. It is also advisable to sit at the same place and same time for meditation — it should preferably be in Brahmamuhurtham, that is, morning between 3am and 6am. Before you start meditation (dhyana), your meditation session, chant "Soham" — inhaling "So" and exhaling "Ham".

A rose plant has leaves, thorns and flowers. Concentration helps you identify where the thorns are and where the flower is. To cut the love (the rose flower) away from worldly desires (the thorns) is contemplation. Concentration is identifying the various locations of the thorns and flowers by looking at the rose plant. To offer the flower, so cut, to the Lord — that is meditation.`;

const meditationTechniqueContent = `## Satyadeep Meditation

To accomplish the purpose of uniting mankind for sacred activities, Satyadeep Sai Organisation developed Satyadeep Sai Universe, Satyadeep Shiv Sai Universe and Satyadeep Sai Baba Charitable School, to spread the universal unitary faith — the Atmic principle (principle of the spirit), the path of love (Prema), the path of Dharma (righteousness), the path of Ahimsa (non-violence), and the path of Shanti (peace and happiness).

Following are step-by-step directions for Satyadeep meditation:

1. We should set a few minutes and a place every day for meditation, either in the morning or in the evening depending on your convenience. But it is preferable to sit in the early hours of the morning before dawn, as the dealings of daytime won't disturb us.
2. We should sit on a thin mattress for meditation. Our sitting pose should be entirely comfortable for our body and mind.
3. We should now start chanting "OM", the universal mantra, at least 21 times. The outcome of this is that the mind, under the influence of this divine sound, slowly loses its momentum of thinking and reaches a calm and peaceful stage.
4. The very next step is to put the breath in rhythm — "inhale", "exhale" — keeping your eyes closed. When we inhale, the breath sounds "So"; when we exhale, it sounds "Hum" — which means "He" (God) and "I", or "God am I". This makes the process of meditation longer and calmer.
5. Look at the Satyadeep (flame) for some time, and closing your eyes, try to feel this flame inside you, right in the centre of the heart — thereby bathing every thought pervading your heart, so there is no space for darkness to hide, thereby purifying the heart. Now gently move this light to the other parts of your body:
   - As the light fills the eyes, they get purified and see no evil.
   - As the light moves towards the ears, they will never hear evil or bad.
   - As the light pervades the tongue, there is no space for it to utter harsh words.
   - As the light moves towards the hands, now they will do right things.
   - As the light moves towards the legs, now they will always be engaged in good actions and good work.

   Now our entire body is purified by this light (Satyadeep) — the flame.
6. This way, the one flame on which we concentrate cleanses our mind and body, and spreads its light and radiance to envelope the entire world.
7. Now slowly open your eyes and look at the Satyadeep (flame) for 2 to 3 minutes.
8. Imagine the figure or form of your choice (Sai Baba, your Ishta Devta, or the deity) on that Satyadeep, followed by namasmaran — "Om Sai Ram" or your personal mantra — effortlessly.
9. You should be relaxed, without any tension, and be natural.
10. Now slowly close the eyes and meditate for a few minutes (10–15 min).
11. You have to stop repeating the mantra while you are meditating.
12. Now slowly and slowly open your eyes and end the meditation softly and slowly.

**"AUM SAI RAM"**`;

const charitableTrustContent = `## Sai Sansthan Charitable Trust

Motivated by Bhagwan Sri Sai Baba, Gurumaa established Sri Sai Sansthan Charitable Trust to propagate the divine message of Sai Baba to the whole world. Sri Sai Sansthan Charitable Trust organises, from time to time, various meditation camps, divine discourses, bhajans, cultural and heritage programmes, and Narayan Sevas for the poor — thereby spreading the message of "love all, serve all" to humanity.

Sri Sai Sansthan Charitable Trust is the caretaker of all the activities of Satyadeep Sai Universe. It invites you to come forward for a social cause and join hands with it, and to support the sacred mission of the generous development of Satyadeep Sai Universe and Mission Karuna, so as to spread the message of love and selfless service to humanity.

Sri Sai Sansthan Charitable Trust is registered under the Income Tax Act 1961 under section 80G, and all contributions are eligible for deduction of income tax up to 50%.

*"The kindness towards the poor is the devotion to God."*

![Trust activities](/legacy/charitable/chart-trust-147.jpg)`;

const contributionContent = `## Contribution... The Phenomena

Sri Satyadeep Sai Universe is a growing divine centre inspired by Bhagwan Sri Sai Baba — His life and message are inspiring millions of people throughout the world to lead more purposeful and moral lives, and it is developing in all its spheres (love and service). Satyadeep Sai Universe, a divine centre carried out by Maa to enhance the noble mission of Sai Baba to the masses, aims at organising various events and programmes which may produce a positive effect among all spiritual aspirants who are on the divine path to reach the lotus feet of the Lord.

The Trust also aims at providing immense opportunities for every person to develop his or her skills in meditation, and also provides opportunities to be part of Nishkama Seva (service).

So come forward to enhance the mission of selfless service of Bhagwan Sai Baba, carried out by Maa, and join hands to inculcate secular and spiritual education in poor children, irrespective of their caste, creed or religion. Come forward to perform Nishkama Seva with Maa.

"Let us not just worship the statue of Sai Baba — let's worship the living God in everyone." — said by Sai Baba

"Hands that serve are much more holier than lips." — said by Sai Baba. It doesn't mean that doing prayers is inferior to service; it purely means that prayer along with selfless service is most admired by God.

Your generous efforts will be highly appreciated.

**"Love All, Serve All"**

To contribute, please write to the temple office — see the [Contact page](/contact).

![Contribution](/legacy/contribution/contribution.jpg)`;

const rulesContent = `## Rules & Regulations

- Please dress modestly and maintain silence in the sanctum and prayer hall.
- Switch off mobile phones before entering the prayer hall.
- Photography inside the sanctum is restricted — please follow volunteer guidance.
- Footwear should be removed before entering the prayer hall.
- Prasad is distributed after aarti — please receive and partake respectfully.
- Please arrive a few minutes ahead of aarti and bhajan timings so as not to disturb worship already in progress.

For visiting hours and darshan timings, see the [Satyadeep Sai Universe](/universe) page.`;

export const seedExperienceStories: ExperienceStory[] = [
  {
    slug: "the-unbelievable-cure",
    title: "The Unbelievable Cure",
    chapterNum: "1",
    chapterTitle: "The Power of Prayer",
    teaser: "How Baba brought Sai Neha back to life.",
    body: [
      '4 March 07, 4:00am — when one of a Sai Bhakt (Sai Neha) was suffering from regular stomach pain since childhood. She had undergone a number of treatments but never got relief from her pain. On that very day she had a dream that Maa is sitting in a hall on her chair and was saying that today I am going to give you a lesson on "How to attain Moksha". Maa told that there are five steps to attain Moksha. When she heard the steps to attain Moksha, she went to Maa and asked — these very steps were given by Lord Krishna to Arjun in the Mahabharat — and on that, Maa gave her a sweet smile.',
      "Next day, as she was suffering from severe stomach ache, she again consulted the doctor and got an ultrasound and CT scan done, and it was diagnosed that she is suffering from chronic pancreatitis with four stones in her pancreatic duct — if she is not operated on time she could even lose her life. The case was so complicated that she was referred to Hyderabad, and for ten days she went under tough treatment. It was Swami's blessings and Maa's prayer that she was finally saved and blessed with a new life.",
      "Guru is the person who teaches the human to leave the path of darkness and reach the path of light, i.e. the \"gyan of God\". To realise divinity, God slides the door of delusion, parts the curtain of ignorance and opens the closed eye. He is right before you. The fog of sensual pleasure is hiding Him from you. Switch on the light — the darkness disappears and He becomes visible.",
    ],
    quote: "Doctor is found where patients gather, the surgeon stays in the operation ward — so too the Lord is ever with the suffering and struggling; when the people cry out in agony, there God will be. — Sri Sathya Sai Baba",
  },
  {
    slug: "the-fruit-of-unflinching-faith",
    title: "The Fruit of Unflinching Faith",
    chapterNum: "1",
    chapterTitle: "The Power of Prayer",
    teaser: "How Baba responded to Sai Roma, raised up her faith in Maa, and changed her way of life.",
    body: [
      "Sai Roma's spiritual journey starts from her faith in Shirdi Sai Baba since her childhood days. Her steady faith in Shirdi Sai Baba has carried her through all struggles in her life. 20th July 2007 was the day she first met Gurumaa in satsang organised in Satyadeep Sai Universe. At that time she didn't realise what was going to happen with her the very next moment. She listened to Maa, watched her, admired her — but could not completely surrender herself at the feet of Maa. Why it was so, even today she finds herself with no words for.",
      "Now it was Guru Poornima. On this auspicious occasion, early morning at her place, she was sitting in dhyan to remember Shirdi Sai Baba. But when she closed her eyes she could only see Maa, and not Shirdi Sai Baba. She got quite disturbed, because her faith starts and ends with Shirdi Sai Baba. But as she looked towards Maa's feet she got shocked and could not control her emotions — she saw Shirdi Sai Baba's feet. When she looked up again it was Maa's face, but when she looked down again it was Shirdi Sai Baba's feet.",
      "She was wonderstruck to see this, and then she realised that she had found her faith — it is none other than Maa. From that day, her moral life has been the best prescription for a joyful life.",
    ],
  },
  {
    slug: "sai-sadhika-miracle",
    title: "Sai Sadhika Miracle",
    chapterNum: "1",
    chapterTitle: "The Power of Prayer",
    teaser: "How, through Maa's prayer, a child Sadhika was gifted to her parents.",
    body: [
      "Today Sai Sadhika is the gift of prayers offered by Gurumaa at the charan of Bhagwan Satya Sai Baba. Sai Sadhika's parents spent five years without any child. They consulted a number of doctors, took a number of treatments, but failed. At one point they thought they could never become parents.",
      'But one day they came in contact with Gurumaa. She told them, "God always listens to those who call on Him sincerely and in faith." These words again brought hope in them, and finally they had Babaji\'s blessed vibhuti from Maa for one month. The result was that when Sai Sadhika\'s parents went to the doctor, the doctor surprisingly said, "you can become parents" — and after nine months, on 23rd Nov 1999, they were blessed with a beautiful baby girl.',
      "What God gives can never be priced. He just wants to arouse the divine consciousness that is latent in us.",
    ],
    quote: "Prayer alone makes life happy, harmonious and worth living in this Universe. Prayer brings man and God together, with every sigh nearer and nearer.",
  },
  {
    slug: "the-story-of-sai-suman",
    title: "The Story of Sai Suman",
    chapterNum: "2",
    chapterTitle: "Transformation of the Heart",
    teaser: "How Baba and the love of Maa brought a change of heart in Sai Suman.",
    body: [
      "Gurumaa's love is supreme, because it is said that the love of the Lord is Purna. Her love has no boundation, and thus it is the reason for divine bliss in each life. Sai Suman is a Balvikas student; before coming in contact with Maa, his life was a tragedy, as he was involved in anti-social activities. His brother brought him to Maa for the first time.",
      'At that time Maa didn\'t speak to him. She just looked at him and gave him vibhuti. The way she looked at Sai Suman was a changing point in his life — he still remembers those eyes, which proved to be the most effective tonic against all illness. He started going daily for Maa\'s darshan, and Maa used to tell him, "Command the mind, regulate your conduct, keep your heart straight and clear, then you will get the Grace of God."',
      "Today this Grace of God has made him a responsible and successful human being, and set an example of true sadhana and selfless service.",
    ],
  },
  {
    slug: "the-gift-of-grace",
    title: "The Gift of Grace",
    chapterNum: "2",
    chapterTitle: "Transformation of the Heart",
    teaser: "How the faith of Sai Roma gave her a new, transformed life.",
    body: [
      "No one can escape the leelas of Sai Baba, because Swami believes that God is all names and all forms — the whole universe is inhabited by God. One such leela Sai Baba showered on Sai Roma, who had never visited Puttaparthi — and thus her faith grew stronger and stronger. It was on 5th Oct 07 that she found herself, along with her family and a number of other devotees, waiting for Bhagwan Sathya Sai Baba's darshan in Puttaparthi.",
      "As Swami came to give darshan, He called Sai Roma and her parents into the interview room. She was thrilled to hear this — when she entered Swami's interview room, the grace on Swami's face appeared to her as Shirdi Sai Baba, whereas her family could see Sathya Sai Baba only. Swami called Sai Roma, sprinkled vibhuti on her head, and blessed her. When she came to, she was amazed to believe that she had been invited by Swami into His interview room.",
      'She told Maa about her experience, and Maa replied, "God enters your heart and fills it with love, so that you may love all His creations on this land."',
    ],
  },
  {
    slug: "the-story-of-sai-suchita",
    title: "The Story of Sai Suchita",
    chapterNum: "2",
    chapterTitle: "Transformation of the Heart",
    teaser: "How Baba transformed her, and how she had a darshan of the Trinity of Sai Avatars.",
    body: [
      'Time is God — time spent in thought of God is indeed well spent, for it rewards you with a rich harvest of mental peace and courage. To learn the importance of "time", Sai Suchita, a 12-year-old Balvikas student, followed the words of Gurumaa, when she first listened to Maa giving pravachan in Satyadeep Sai Universe on 7th Aug 2007. While listening to Maa she was so influenced that she started regularly coming to Satyadeep Sai Universe for Maa\'s darshan. She learned the essence of spiritualism, i.e. "time waste is life waste."',
      'From that moment her lifestyle underwent a tremendous change, and instead of wasting her time watching television, gossiping or chatting, she utilised her time in meditation. This change in Sai Suchita brought smiles and satisfaction to her parents\' faces. Sai Suchita\'s mother gladly informed Maa that her daughter is blessed by a true "Guru" and that they are very thankful to Maa for her kirpa on their child. On listening to these words, Maa replied, "Every student must reach a stage of enlightenment where he can derive inner happiness, fulfilment, and complete freedom, thereby achieving the divine bliss."',
      "On 10th Oct 07, Sai Suchita was sitting in meditation at her home. Suddenly she realised that a sunset was taking place, and Sathya Sai Baba was standing there. The next moment she saw a well, and Shirdi Sai Baba was standing there. The very next moment she saw a flowing river, and Prema Sai Baba, the third avatar of Sai incarnation, was standing there. After this she saw Satyadeep Sai Universe, and Gurumaa was seated there.",
      "How beautiful a darshan Sai Baba has given Suchita can never be described in words, because the deeds one performs, the individuals one meets, and the thoughts that walk in one's mind, should all be seen according to the act of the Divine.",
    ],
  },
  {
    slug: "special-saving-grace",
    title: "Special Saving Grace",
    chapterNum: "3",
    chapterTitle: "Miracle Saves",
    teaser: "How Baba saved Sai Neha from fire.",
    body: [
      "Dec 2004 was a day when she realised that chanting the God name from the bottom of the heart can do any wonder. She was working in the chemistry lab in R.G. Degree College, Meerut, all alone. Since she was left alone in the lab, she was feeling bored, and even tried standing out and watching the change in the reaction taking place. Suddenly she recalled Gurumaa's words, that do whatever you feel like, but never stop chanting Sai Ram in your heart.",
      "On remembering these words she started chanting Sai Ram in her heart and singing a Sai Ram bhajan (Manas Bhaj Re Guru Charnam), but suddenly something unusual happened. As she was busy singing the bhajan, the reaction taking place in the lab caught fire, and the blow of fire hit her face. She felt the heat, the fire on her face, and screamed as she got scared. Suddenly her professor and lab assistant reached there, and the condition was brought under control.",
      'Her lab assistant asked her, "Is everything alright, didn\'t you get burnt from any side" — and soon she realised that the fire had not caused her any harm, and she was in safe hands. Her professor was shocked, because he told her that it rarely happens that no one gets injured if butanol catches fire. She just thanked God at that moment, that He saved her life.',
      "In the evening, when she met Maa as usual in Satyadeep Sai Universe and told her about the incident, Maa explained that if we remember God in any form in our every breath, then He looks after His child and minimises the problem in no time. Maa therefore always reminds us: visualise God, seek God, merge in God — that is the duty of the human being.",
    ],
  },
  {
    slug: "science-behind-the-removal",
    title: "Science Behind the Removal of Sufferings of a Beloved Devotee",
    chapterNum: "3",
    chapterTitle: "Miracle Saves",
    teaser: "How Baba saved the life of Sai Sanjana.",
    body: [
      "23rd Oct 2005, Satyadeep Sai Universe. It was 7:30pm in the evening, when every bhakta, as usual after attending aarti, took prasad and vibhuti. Among the number of bhaktas, one bhakta, Sai Hema, moved out of Sai Universe towards her car, where her daughter Sai Sanjana was waiting to get in. When Sai Hema came close to the car she was frightened and unable to utter a single word — she saw a golden-coloured yellow snake near the door of the car where her daughter was standing. Since it was a cloudy evening, Sai Sanjana was unable to see the snake near her feet, and her mother Sai Hema found herself helpless.",
      "At that moment she just kept praying to Maa that this snake should somehow move, otherwise it would bite Sai Sanjana's feet. On that very day Maa was out of town on a holy visit. After 10 minutes of terrible waiting, the snake itself moved away from that place, and Sai Sanjana was safe in her mother's hands.",
      "On the other hand, within that very 10 minutes, a very unusual incident happened with Maa. Maa was sitting in her car waiting for someone to come, when suddenly she felt something had bitten her foot — she looked around but found nothing. The pain turned out to be unbearable for her; seeing this, the driver of the car ran to the nearest medical store, but there was none in the surrounding area. Maa at once advised him to take her to the nearest Sai temple, and as she climbed the stairs there, the pain completely disappeared. She sat at one corner and went under deep meditation, and enquired of Sai Baba the reason for the whole incident.",
      'Sai Baba appeared in front of her and told her that it was the suffering of her beloved bhakta Sai Sanjana, which Swami had transferred to her, in order to save the child Sai Sanjana from the snake bite. This is, in fact, the "Sai leela" of how He transfers the sufferings of His beloved devotees onto Himself, and a part of it to His beloved Maa, in order to save Sai Sanjana from trouble.',
      "The next day Maa went to her home town, but the pain kept on increasing — no painkiller was effective on it. When Maa went to Satyadeep Sai Universe, she was unable to walk properly; seeing this, devotees asked Maa about the whole incident. When Maa narrated the whole scene, all devotees were surprised that a snake was going to harm Sai Sanjana, but the prayer of her mother to Maa at once reached Swami, and in no time Swami rescued her and transferred the suffering onto Himself and to Maa. Finally all devotees, and Sai Hema, realised that it was Sai Baba who saved Sai Sanjana from the snake bite.",
    ],
    quote:
      "I am the creator, preserver and the destroyer. Nothing will harm him who throws his attention towards Me. I am in you, you are in Me. There is no distance and no distinction between you and Me. — Sathya Sai Baba · \"Jako Rakhe Sai, Maar Sakey Na Koi\"",
  },
  {
    slug: "special-curing-grace",
    title: "Special Curing Grace",
    chapterNum: "4",
    chapterTitle: "Miracle Cures",
    teaser: "How Baba miraculously saved the life of Sai Suresh.",
    body: [
      "5 September 05, Thursday, Delhi — a day when Sai Suresh was sitting in his office as usual. It was postnoon when Sai Suresh felt sudden pain in his chest, but continued seated quietly in his office. Since he was feeling uneasy, he walked half a km and reached Saint Stephen Hospital, Delhi, where he got himself diagnosed. The doctor immediately told him that he had suffered a major heart attack and should be admitted immediately, otherwise the condition could worsen.",
      "When he got admitted, his wife, staying in Meerut, was informed in the meantime. On hearing this news, Sai Suresh's wife couldn't control herself and ran to inform Maa at her place. Without wasting time, Maa went under deep meditation and started her prayer. On being admitted, doctors took Sai Suresh for surgery, which lasted two hours — the doctors said his arteries were blocked, and they needed to place two stents in his artery.",
      "Sai Suresh remembers that when his surgery was taking place, he could visualise Sai Baba and Maa with his naked eyes, standing in front of him and blessing him. Surgery was completed at around 3:30pm in the evening, and 15 minutes after surgery, Suresh immediately called Maa on mobile and talked to Maa and to his wife comfortably. After the successful conversation, doctors told Sai Suresh that it is not possible for a patient to talk on mobile for at least half an hour after heart surgery — and in his case, he had talked just 15 minutes after surgery, which is very unusual.",
      "After his surgery, Sai Suresh again had a minor attack. When he informed Maa about it, doctor advised him to undergo angiography — on which Maa replied that there was now no use for him to undergo any type of operation. Sai Suresh faithfully followed the words of Maa, and from that day till today he has never faced any pain again. Sai Suresh feels that Sai Baba's blessings and Maa's prayer have blessed him with a unique source of energy, which has become his inspiration for living life gracefully.",
    ],
  },
  {
    slug: "i-just-had-a-typhoid",
    title: "I Just Had a Typhoid",
    chapterNum: "4",
    chapterTitle: "Miracle Cures",
    teaser: "How Swami's blessings and Maa's prayer saved Sai Pragyan from typhoid.",
    body: [
      '23 Nov 2000 — it was the 75th birthday of Bhagwan Sathya Sai Baba, which was being celebrated in Satyadeep Sai Universe. Sai Pragyan, a Balvikas student, 5 years old, participated in the cultural programme. But on that very day he was suffering from fever — his temperature kept rising, and by evening it went up to 104 degrees. At this moment Sai Jyoti, Pragyan\'s mother, refused to let her son participate in the programme. On hearing this, Sai Pragyan replied, "Mumma, I love Maa and I will perform in the programme."',
      "At 9pm, when the programme was over, Sai Pragyan's mother took him to Maa. As Maa looked at Pragyan, she told his mother to take him to the doctor immediately. But Pragyan's health was not good enough for that, since he had not eaten anything since morning. To bring his condition under control, Maa laid Pragyan down on her lap and gave him vibhuti. After an hour his health was under control, and Maa told his mother to take him to the doctor. After examining him, the doctor told his mother that he was suffering from typhoid, and gave him medicine immediately. Pragyan had the medicine on an empty stomach and went to sleep.",
      "The next day he woke up and told his mother that Maa was with him the whole night, caring for him. The love of Maa is priceless, because it is pure and bright as the light of the sun, which sparkles today also in Pragyan's eyes. Sai Pragyan was able to understand that, despite the high temperature, he was able to take part in the programme — it was none other than Sai Baba's blessing and Maa's prayer that provided the source of energy that enabled him to take part.",
    ],
  },
  {
    slug: "divine-teachings-to-balvikas",
    title: "Divine Teachings to Balvikas",
    chapterNum: "5",
    chapterTitle: "The One Appears as Many",
    teaser: "How Baba taught Balvikas students the way to live life.",
    body: [
      'On 4th October 07, at Sarva Dharma Sthal in Satyadeep Sai Universe, it was 7 o\'clock in the evening when Sai Ishu, one of the Balvikas students, was sitting in meditation. Suddenly she saw Shirdi Sai Baba sitting in a garden amid beautiful flowers on His aasan, a wide aura surrounding Him. Shirdi Sai Baba was taking a Balvikas class in the garden, and all the students were listening to Him quietly. In the meantime, Baba asked Sai Mahima, one of the students, "What do you want, Mahima?" She asked for a mango, and Baba replied, "Only a mango, Mahima? Ok, have it." Then Baba asked Sai Sanjana, another student, "What do you want, Sanjana?" She answered, "Nothing, Baba."',
      'After this, Baba turned towards Sai Kamini, one of the Balvikas gurus, and said that He was not going to ask her what she wanted — "You take this gift wrapped in blue paper, since you are my child and I am your father. I am not going to ask you for anything." Then Shirdi Sai Baba handed her that box, and she just kept thanking Sai Baba. Now Baba said to everyone present in the garden that they would all go together for bhiksha. Along with Baba, every Balvikas student and Sai Kamini, wearing torn, old clothes, moved for bhiksha with Baba.',
      'When all were moving with Baba, Sai Ishu was left far behind and fell down. She shouted for help from Sai Baba. Sai Baba said to her, "My child, walk properly, hold my hand." Sai Ishu told Baba, "How can I hold your hand, you are so distant from me." When Sai Ishu said this, she was astonished to see a very long hand of Sai Baba coming towards her, so that she could hold Him tightly.',
      "In the meantime all of them reached near a house, and Sai Baba asked for bhiksha. On hearing Baba's voice, Tataya came out, but Tataya's face appeared as a combination of Sai Rakshita and Sai Sanjna, the Balvikas students. Everyone was shocked to see that. In the meantime, one of Baba's bhaktas, Kamini, came, and her face appeared as a mixture of all the Balvikas students — her nose resembled Sai Cheena's, her lips Sai Tripti's, her cheek Sai Ishu's, her chin Sai Sheene's, her forehead Sai Akansha's. Again all the students were shocked to see this.",
      "After asking for bhiksha, Shirdi Sai Baba told everyone to move towards Dwarikamai, so that Baba could cook food for everyone. On reaching Dwarikamai, Baba placed a big pot on the fire and started mixing the food with His bare hand. All got frightened, because the pot was so hot that anyone touching it would get burnt — but Babaji did not get even a single part of His hand burnt. After cooking, Babaji served the food equally, with the same hand, to everyone.",
      'While Babaji was serving food, Sai Mahima got up and complained to Sai Baba, "Why don\'t you give me more food than others?" On hearing her complaint, Babaji replied that whatever you get, be satisfied in that — "Don\'t become selfish." On hearing this, Sai Mahima started crying, and Sai Baba hugged her. At that moment all the Balvikas students hugged Baba, and Sai Kamini bowed herself at Babaji\'s charan.',
      "At this moment Shirdi Baba stood and crossed His feet in the form of Lord Krishna, and said that He loves children and cannot live without them, because they are true and pure from their heart. After saying this, Shirdi Baba started moving, and along with Him, Sathya Sai Baba, Prema Sai Baba and Maa started moving too. All the swaroops of Sai merged into Shirdi Sai Baba, and a wide, bright aura surrounded Him.",
    ],
  },
  {
    slug: "the-lord-ever-alert-for-his-devotee",
    title: "The Lord — Ever Alert for His Devotee",
    chapterNum: "5",
    chapterTitle: "The One Appears as Many",
    teaser: "How Baba appeared as a stranger to save the documents of Sai Neha.",
    body: [
      "Firm belief in God, whether in thoughts, words or action, always enlightens one's heart and sharpens one's brain. It was in July 2005, when Neha had to go for an interview at IIMT College, Ganganagar, Meerut. I was on a bike with my father, carrying my original documents kept in a polybag. After giving my interview I came back to my place and went for some work in the market. It had been 2 hours since I came back from the interview.",
      'Around 2:00pm I got a call that my original documents were found lying somewhere on the road, and were now safe with the caller — I could come and receive them. I was shocked, and when I looked at my polybag, there were no documents. Without wasting a minute I went with my brother to that place, and at last my documents were safe in my hand. I just thanked that person, who was so good that he cared for my documents.',
      'In the evening, when I met Maa and was just about to tell her about the incident, she prompted, "Where have you left your documents?" I was surprised, because I hadn\'t told her anything. When I requested her to tell me how she came to know, she said the person who safely returned my documents was Swami Bhagwan Shri Sathya Sai Baba. On this I have no words, and I firmly believe that God alone is your true friend — follow Him.',
    ],
  },
  {
    slug: "sai-iila-miracle",
    title: "Sai Iila Miracle",
    chapterNum: "5",
    chapterTitle: "The One Appears as Many",
    teaser: "How Swami's blessing and Maa's prayer led a devotee to Satyadeep Sai Universe.",
    body: [
      "4th July 05, 2:00pm — Sai Ila's mother-in-law was abusing Sai Ila, as she goes every Tuesday to Satyadeep Sai Universe to conduct Sundarkaand. She used to say that Sai Ila could read Sundarkaand even at home, no need to go there. Since her mother-in-law did not permit her happily to conduct Sundarkaand at Satyadeep Sai Universe, she stopped going.",
      'On that very day, around 2pm in the afternoon, her mother-in-law was sitting in her room. As she moved her head to say something, she saw a swaroop like Ardnareshwar — half the swaroop of a short-heighted man in an orange chola with curly black hair and a distinct sparkle on his face, and half the swaroop of Gurumaa. She was shocked, because she hadn\'t called anyone. Then the man in the orange chola looked at her and asked, "Kiski mahima bhari hai?" — whose glory is greater, Maa\'s or Swami\'s? She didn\'t utter a single word.',
      'Then Baba told her that God and Guru are inter-related and have a direct contact — the prayer offered through the Guru reaches God in no time. "So why do you refuse your daughter-in-law to conduct Sundarkaand in Satyadeep Sai Universe? Satyadeep Sai Universe is not just a pilgrimage — it is a place where your Guru, your God, resides, and your prayers reach me directly. Always watch your action. Purify your heart, your thoughts, feelings, emotions, speech, and strengthen your nobler impulses. This leads to the entrance of the abode of divine bliss."',
      "As she realised her mistake, she simply bowed at the feet of Sai Baba, and as she moved her head to thank Him, Baba disappeared. She was surprised, and called her daughter-in-law and said that just now Sri Satya Sai Baba and Maa had come there, talked to her, told her the mahima of the Guru, and blessed her. From that day, Sai Ila's mother-in-law never objected to her conducting Sundarkaand at Satyadeep Sai Universe again.",
    ],
    quote: "When you take one step towards God, God takes ten steps towards you.",
  },
  {
    slug: "the-master-and-maa",
    title: "The Master and Maa",
    chapterNum: "6",
    chapterTitle: "Divine Sport",
    teaser: "How Swami revealed the importance of the Guru to His devotee Sai Neha.",
    body: [
      "7th October 2007, 2:00am — Sai Neha was in Satyadeep Sai Universe; huge preparation and decoration were going on. In the meantime Maa arrived, and as Maa was on her way to the Universe, someone hit her very hard. She stood still and started chanting Sai Ram. As I saw this I got worried and ran towards Maa and held her.",
      "As I held her I felt something amazing — Maa's feet were not on the earth, and I was flying with Maa in the sky. I got frightened for a minute, but as I realised I was with Maa, I hugged her tightly, I could hear her heartbeats, and we were in the sky. When I came back to earth, I saw that Maa had taken the swaroop of a small child and was jumping here and there in Satyadeep Sai Universe.",
      "As I moved out of Satyadeep Sai Universe I saw that Maa was in her original swaroop, sitting with bhaktas and giving pravachan. As I turned back again I was astonished to see that Maa was attending to a news reporter and answering them. It signifies that the Guru is the richest and most powerful guardian — the Guru is the content of everybody that we see around.",
    ],
  },
  {
    slug: "divine-darshans",
    title: "Divine Darshans",
    chapterNum: "7",
    chapterTitle: "Divine Leelas — Divine Darshans",
    teaser: "How Sai Baba showed the importance of the Guru and gave darshan to His devotees.",
    body: [
      "1st Sep 2007, around 2:00 in the midnight — I, Sai Neha, was reading Sai Gyan Ganga. As I was busy reading the book, I suddenly realised someone was moving towards me. I was confused at that moment; as I moved, I saw the Shirdi Sai Baba pratima, the one in Satyadeep Sai Universe, Sofipur, Meerut — but from that pratima, Gurumaa was moving towards me. It was the Shirdi Sai Baba murti, but instead of Shirdi Sai Baba, Maa was coming out of that murti. I was amazed to see this.",
      'As Maa came towards me, she sat cross-legged on the floor in front of me, called my mother, and told her to sit by my side. Maa put her palm on her cheek and took a deep breath. Then Maa looked at both of us and said, "I want to come close to you, but Sai Baba doesn\'t permit me to take this step." When she said so, I just kept looking into Maa\'s eyes, and the whole atmosphere turned even more silent.',
      'After saying so, Maa looked at my mother\'s face, and then at mine, and said, "You never do pooja on time, no aarti on time, neither in morning nor in evening." When we heard this our heads bent down in shame, and we had no words in response. After this, Maa paused for a moment, and in the meantime my mother asked Maa, by my pet name, "You brought guriyaa out of the well of death — but now what is going to be next?" On this Maa answered spontaneously — "What next? Now she will work for Baba. You need not worry about her anymore. She is our daughter."',
      'Listening to these words, my mother kept a pin-drop silence, and after some time asked about my brother by his name, "What about Nitin, Maa?" On hearing my brother\'s name, Maa just pointed her index finger to the sky, with a sweet and calm smile on her face. After having all this conversation, Maa stood up, moved back, and merged into the Shirdi Sai Baba pratima.',
    ],
  },
  {
    slug: "the-shivling-miracle",
    title: "The Shivling Miracle",
    chapterNum: "8",
    chapterTitle: "Divine Manifestations",
    teaser: "How Baba created the Shivling, and the formation of Satyadeep Shiv Sai Universe.",
    body: [
      "The old site's page for this story served the wrong content when we archived it (a duplicate of \"Divine Darshans\", not its own text) — so unlike the other fifteen stories here, we don't have the institution's original wording for this one to carry over.",
      "What's known from the chapter listing on the old site: Baba created the Shivling, and this event led to the formation of Satyadeep Shiv Sai Universe alongside Satyadeep Sai Universe — the abhishek tradition begun in Maa's childhood continues there today.",
      "If you have the original write-up for this story (a printed copy, an old backup, or the institution's own records), send it over and this page will be updated with the real text.",
    ],
  },
];

export const seedPages: SitePage[] = [
  { slug: "about", title: "About Sai Oracle", content: aboutContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "temple", title: "Temple & Worship", content: templeContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "experiences", title: "Devotee's Experience", content: experiencesContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "aims", title: "Aims & Objectives", content: aimsContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "maa", title: "Maa", content: pujniyeMaaContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "gurumaa", title: "Maa", content: pujniyeMaaContent, updated_at: "2026-09-01T00:00:00Z" },
  {
    slug: "maa-life-sketch",
    title: "Maa — A Life Sketch",
    content: liveSketchContent,
    updated_at: "2026-09-01T00:00:00Z",
  },
  {
    slug: "gurumaa-life-sketch",
    title: "Maa — A Life Sketch",
    content: liveSketchContent,
    updated_at: "2026-09-01T00:00:00Z",
  },
  { slug: "teachings", title: "Teachings of Sai", content: teachingsContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "discourses", title: "Discourses", content: discoursesContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "universe", title: "Satyadeep Sai Universe of Divine Healing", content: overviewContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "trust", title: "Sri Sai Sansthan Charitable Trust", content: charitableTrustContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "charitable-trust", title: "Sri Sai Sansthan Charitable Trust", content: charitableTrustContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "contribution", title: "Contribution", content: contributionContent, updated_at: "2026-09-01T00:00:00Z" },
  {
    slug: "rules-regulations",
    title: "Rules & Regulations",
    content: rulesContent,
    updated_at: "2026-09-01T00:00:00Z",
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    content: `## Privacy Policy\n\nSai Oracle (Satyadeep Sai Organisation) respects your privacy.\n\n- We do not create public user accounts and do not sell personal data.\n- If you contact us by email or phone, your details are used only to respond to your enquiry.\n- Linked YouTube videos are governed by Google's privacy policy.\n- The contact form (if enabled) sends your message to the temple office and stores nothing beyond normal email records.\n\nFor any privacy questions, write to us at the email listed on the Contact page.`,
    updated_at: "2026-09-01T00:00:00Z",
  },
  {
    slug: "terms",
    title: "Terms of Use",
    content: `## Terms of Use\n\n- Content on this website is for devotional and informational purposes.\n- Event dates, timings and programmes may change; please confirm with the temple office before travelling.\n- Photos and videos of temple programmes may be published in the gallery; inform the office if you prefer not to appear.\n- External links (YouTube, social media, maps) are provided for convenience and follow their own terms.\n\nOm Sai Ram.`,
    updated_at: "2026-09-01T00:00:00Z",
  },
];
