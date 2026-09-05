import type {
  AartiTiming,
  Announcement,
  DevoteeExperience,
  GalleryImage,
  SitePage,
  SiteSettings,
  TempleEvent,
  YoutubeVideo,
} from "./types";

/**
 * Seed / fallback content.
 *
 * Used when Supabase is not configured yet, and as the initial
 * `supabase/seed.sql` data. Carries over the key facts from the
 * legacy saioracle.com site (Meerut temple, Pujniye Maa, Trinity).
 */

export const seedSettings: SiteSettings = {
  organization_name: "Sai Oracle",
  tagline: "A place of devotion, faith and service",
  description:
    "Satyadeep Sai Organisation is a non-political, non-profit organisation founded by Pujniye Maa under the inspiration of Bhagwan Satya Sai Baba — home to the Trinity of Sai Avatars (Shirdi Sai, Satya Sai, Prema Sai).",
  phone: "+91-XXXXXXXXXX",
  email: "saioracle@hotmail.com",
  address:
    "NH-58, Roorkee Road, Godwin Estate, Sofipur, Near 3rd Milestone Restaurant, Meerut Cantt, Uttar Pradesh – 250001, India",
  maps_url: "https://maps.google.com/?q=Sai+Oracle+Meerut",
  instagram_url: "",
  facebook_url: "",
  youtube_url: "https://www.youtube.com",
  whatsapp_url: "",
  x_url: "",
  morning_opening: "5:30 AM",
  night_closing: "10:00 PM",
};

export const seedTimings: AartiTiming[] = [
  { id: "seed-1", label: "Temple Opening (Kakad / Morning)", time: "5:30 AM", sort_order: 1 },
  { id: "seed-2", label: "Kakad Aarti", time: "5:45 AM", sort_order: 2 },
  { id: "seed-3", label: "Madhyan Aarti", time: "12:00 PM", sort_order: 3 },
  { id: "seed-4", label: "Dhoop Aarti", time: "6:30 PM", sort_order: 4 },
  { id: "seed-5", label: "Shej Aarti", time: "9:30 PM", sort_order: 5 },
  { id: "seed-6", label: "Temple Closing", time: "10:00 PM", sort_order: 6 },
];

export const seedEvents: TempleEvent[] = [
  {
    id: "seed-e1",
    title: "Guru Purnima Celebration",
    slug: "guru-purnima-celebration",
    description:
      "Join us for Guru Purnima — a day dedicated to our Guru and spiritual guides. The celebration includes Kakad Aarti, special bhajans, Guru Paduka Pooja, discourses by Pujniye Maa, and Narayan Seva (Annadanam) for all devotees.\n\nAll devotees and families are cordially invited.",
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
    title: "Sai Baba — Kakad Aarti (Morning Aarti)",
    youtube_url: "https://www.youtube.com/watch?v=7ecGB9BIpY0",
    thumbnail_url: null,
    published: true,
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "seed-v2",
    title: "Om Sai Shree Sai Jai Jai Sai — Sai Dhun",
    youtube_url: "https://www.youtube.com/watch?v=oqtpyY-yhEw",
    thumbnail_url: null,
    published: true,
    created_at: "2026-09-01T00:00:00Z",
  },
  {
    id: "seed-v3",
    title: "Sai Baba — Full Kakad Aarti",
    youtube_url: "https://www.youtube.com/watch?v=RmOjeTBEKtk",
    thumbnail_url: null,
    published: true,
    created_at: "2026-09-01T00:00:00Z",
  },
];

export const seedGallery: GalleryImage[] = [
  { id: "seed-g1", title: "Baba's Birthday Celebrations", image_url: "/legacy/gallery/baba-birth-01.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g2", title: "Baba's Birthday Celebrations", image_url: "/legacy/gallery/baba-birth-02.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g3", title: "Baba's Birthday Celebrations", image_url: "/legacy/gallery/baba-birth-03.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g4", title: "Baba's Birthday Celebrations", image_url: "/legacy/events/baba-birth.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g5", title: "Temple Celebrations 2022", image_url: "/legacy/gallery/gal-2022-01.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g6", title: "Temple Celebrations 2022", image_url: "/legacy/gallery/gal-2022-02.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g7", title: "Temple Celebrations 2021", image_url: "/legacy/gallery/gal-2021-01.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g8", title: "Temple Celebrations 2021", image_url: "/legacy/gallery/gal-2021-02.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g9", title: "Temple Celebrations 2020", image_url: "/legacy/gallery/gal-2020-01.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g10", title: "Temple Celebrations 2019", image_url: "/legacy/gallery/gal-2019-01.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g11", title: "Temple Project", image_url: "/legacy/gallery/plan-t-01.jpg", created_at: "2026-09-01T00:00:00Z" },
  { id: "seed-g12", title: "Temple Project", image_url: "/legacy/gallery/plan-t-02.jpg", created_at: "2026-09-01T00:00:00Z" },
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

const aboutContent = `## About Sai Oracle

Satyadeep Sai Organisation is a non-political, non-profit organisation, founded by **Pujniye Maa** under the inspiration of **Bhagwan Satya Sai Baba**.

The organisation exists for one purpose — helping mankind. It invites people of all walks of life and all religions to participate in service activities such as:

- **Narayan Seva** — providing food to the poor and destitute
- **Educating the poor child** — helping children become self-reliant
- **Human values** — practising truth, righteousness, peace, love and non-violence in daily life

## The Trinity of Sai Avatars

With the supreme blessings of Sai Baba, this temple became one of the first in India dedicated to the **Trinity of Sai Avatars — Shirdi Sai, Satya Sai and Prema Sai**.

Life-sized statues of Shirdi Sai and Satya Sai, with a beautiful singhasan for the forthcoming Prema Sai Avatar, are placed adjacent to each other for worship.

## Temple Life

The mandir is open 7 days a week and conducts:

- Daily aartis — Kakad, Madhyan, Dhoop and Shej
- Bhajans, regular pujas and Naam Smaranam
- Narayan Seva (food service)

The **Satyadeep Sai Baba Charitable School** runs five days a week, giving small children spiritual and secular education for all-round development.

## Mission

To bring together people of all faiths for sacred activities — personal spiritual development, selfless service, and spreading Swami's message of universal love.

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

const experiencesContent = `## Devotee's Experiences — Miracles and Experiences

The Miracles of Bhagwan are a manifestation of His divine powers of omnipresence, omnipotence and omniscience. Bhagwan calls miracles His visiting cards, and leelas (divine sport) are in the very nature of the Avatar. They are, in fact, a source of delight and bliss to His devotees.

Thousands of people all around the world have experienced the divinity of Bhagwan in a number of ways. Some have been miraculously saved from dire situations or calamities, while others have had spiritually illumining experiences.

In these pages, we present some of the experiences of devotees of Bhagwan, along with their Pujniye Maa.

## 1. The Power of Prayer

- **The Unbelievable Cure** — how Baba brought Sai Neha back to life.
- **The Fruit of Unflinching Faith** — how Baba responded to Sai Roma, raised up her faith in Maa, and changed her way of life.
- **Sai Sadhika Miracle** — how, through Maa's prayer, a child Sadhika was gifted to her parents.

## 2. Transformation of the Heart

- **The Story of Sai Suman** — how Baba and the love of Maa brought a change of heart in Sai Suman.
- **The Gift of Grace** — how the faith of Sai Roma gave her a new, transformed life.
- **The Story of Sai Suchita** — how Baba transformed her, and how she had a darshan of the Trinity of Sai Avatars.

## 3. Miracle Saves

- **Special Saving Grace** — how Baba saved Sai Neha from fire.
- **Science Behind the Removal of Sufferings of a Beloved Devotee** — how Baba saved the life of Sai Sanjana.

## 4. Miracle Cures

- **Special Curing Grace** — how Baba miraculously saved the life of Sai Suresh.
- **I Just Had a Typhoid** — how Swami's blessings and Maa's prayer saved Sai Pragyan from typhoid.

## 5. The One Appears as Many

- **Divine Teachings to Balvikas** — how Baba taught Balvikas students the way to live life.
- **The Lord — Ever Alert for His Devotee** — how Baba appeared as a stranger to save the documents of Sai Neha.
- **Sai Leela Miracle** — how Swami's blessing and Maa's prayer led a devotee to Satyadeep Sai Universe.

## 6. Divine Sport

- **The Master (Sai Baba) Plays with Matter** — how Swami revealed the importance of the Guru to His devotee Sai Neha.

## 7. Divine Leelas — Divine Darshans

How Sai Baba showed the importance of the Guru and gave darshan to His devotees.

## 8. Divine Manifestations

- **The Shivling Miracle** — how Baba created the Shivling, and the formation of Satyadeep Shiv Sai Universe.

*Full stories of each miracle are being added to this section. If Baba has blessed your life with an experience you wish to share, please write to the temple office — see the Contact page.*`;

const aimsContent = `## Aims & Objectives

Following are the aims and objectives of Sri Sai Sansthan Charitable Trust.

## 1. Global Oneness

Sri Sai Sansthan Charitable Trust aims at uniting people around the globe to perform sacred actions — in order not only to save what we have, but to transform the planet through spiritual awareness. Satyadeep Sai Universe is a place where people all over the globe, irrespective of caste, creed or religion, join hands to work on various social causes for the upliftment of humanity — and where they can worship their respective deities at the Sarva Dharma Sthal.

## 2. Spiritual Inspiration

Sri Sai Sansthan Charitable Trust is a place where spiritual seekers from all over the world come for one purpose — to attain full spiritual awakening. The purpose is to create an opportunity for all seekers to explore the hidden inner source of strong energies lying unused and untapped within us.

## 3. Narayan Seva

Sri Sai Sansthan Charitable Trust aims at providing food to poor children whose parents are not wealthy enough to provide for them.

## 4. Fostering Seeds of Love and Service

Sri Sai Sansthan Charitable Trust, under the presence and guidance of Maa, propagates the message of equal-mindedness among the army of devotees. From time to time, meditation and discourse sessions are held to awaken inner joy and happiness. Love is the seed, courage is the blossom, and peace is the fruit. The love of God and love for God are both eternally sweet and pure. Under the guided presence of Her Holiness Pujniye Maa, the Trust helps people develop strong character by inducing in them the five human values — **Sathya, Dharma, Shanti, Prema and Ahimsa**.

## 5. Sacred Cause — Mission Karuna

**Mission Karuna — "Empowering the Poor Children."**

Maa, motivated by Bhagwan Sri Sai Baba, has launched a mission called Karuna. This mission aims at providing financial support to poor children to complete their education and strengthen their educational background — irrespective of caste, colour, creed or religion — so that one day they can support themselves and be free of dependence on others.

You are all requested to raise funds for this noble education mission. **Join hands to be a part of this noble mission.**`;

export const seedPages: SitePage[] = [
  { slug: "about", title: "About Sai Oracle", content: aboutContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "temple", title: "Temple & Worship", content: templeContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "experiences", title: "Devotee's Experience", content: experiencesContent, updated_at: "2026-09-01T00:00:00Z" },
  { slug: "aims", title: "Aims & Objectives", content: aimsContent, updated_at: "2026-09-01T00:00:00Z" },
  {
    slug: "privacy",
    title: "Privacy Policy",
    content: `## Privacy Policy\n\nSai Oracle (Satyadeep Sai Organisation) respects your privacy.\n\n- We do not create public user accounts and do not sell personal data.\n- If you contact us by email or phone, your details are used only to respond to your enquiry.\n- Embedded YouTube videos are governed by Google's privacy policy.\n- The contact form (if enabled) sends your message to the temple office and stores nothing beyond normal email records.\n\nFor any privacy questions, write to us at the email listed on the Contact page.`,
    updated_at: "2026-09-01T00:00:00Z",
  },
  {
    slug: "terms",
    title: "Terms of Use",
    content: `## Terms of Use\n\n- Content on this website is for devotional and informational purposes.\n- Event dates, timings and programmes may change; please confirm with the temple office before travelling.\n- Photos and videos of temple programmes may be published in the gallery; inform the office if you prefer not to appear.\n- External links (YouTube, social media, maps) are provided for convenience and follow their own terms.\n\nOm Sai Ram.`,
    updated_at: "2026-09-01T00:00:00Z",
  },
];
