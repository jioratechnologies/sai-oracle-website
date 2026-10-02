export interface SearchItem {
  id: string;
  title: string;
  category: "About & Foundation" | "Beloved Maa" | "Temple & Sanctum" | "Trust & 80G" | "Worship & Timings" | "Media & Social" | "Community";
  url: string;
  description: string;
  keywords: string[];
  badge?: string;
}

export const SEARCH_INDEX: SearchItem[] = [
  // --- Pages & Foundation ---
  {
    id: "home",
    title: "Home",
    category: "About & Foundation",
    url: "/",
    description: "Welcome to Sai Oracle — A temple of Love, Service and Unity in Meerut.",
    keywords: ["home", "main", "welcome", "sai oracle", "meerut", "temple", "overview"],
    badge: "Main",
  },
  {
    id: "about",
    title: "About Sai Oracle",
    category: "About & Foundation",
    url: "/about",
    description: "History, founding philosophy, and sacred presence of Satyadeep Sai Universe.",
    keywords: ["about", "history", "foundation", "philosophy", "origin", "trust", "sanctuary"],
    badge: "History",
  },
  {
    id: "overview",
    title: "Temple Overview & Sarva Dharma Sthal",
    category: "About & Foundation",
    url: "/about#overview",
    description: "Overview of Satyadeep Sai Universe, Shiv Sai Universe and Sarva Dharma Sthal.",
    keywords: ["overview", "sarva dharma", "sanctuary", "shiv sai", "all faiths", "unity"],
    badge: "Overview",
  },
  {
    id: "aims",
    title: "Aims & Objectives",
    category: "About & Foundation",
    url: "/aims",
    description: "Global Oneness, Narayan Seva, spiritual education, and 5 human values.",
    keywords: ["aims", "objectives", "mission", "purpose", "oneness", "human values", "narayan seva"],
    badge: "Aims",
  },
  {
    id: "mission-karuna",
    title: "Mission Karuna",
    category: "About & Foundation",
    url: "/mission-karuna",
    description: "Empowering underprivileged children through educational scholarships, books & nutrition.",
    keywords: ["mission karuna", "children", "education", "aid", "scholarships", "karuna", "balvikas"],
    badge: "Child Aid",
  },
  {
    id: "rules-regulations",
    title: "Rules & Regulations",
    category: "About & Foundation",
    url: "/rules-regulations",
    description: "Temple etiquette, decorum, silence, and visitor guidelines.",
    keywords: ["rules", "regulations", "guidelines", "etiquette", "visitors", "dress code", "discipline"],
    badge: "Guidelines",
  },

  // --- Beloved Maa ---
  {
    id: "gurumaa",
    title: "Beloved Maa — Guiding Light",
    category: "Beloved Maa",
    url: "/gurumaa",
    description: "Spiritual preceptor, guiding light of unconditional love and Nishkama Seva.",
    keywords: ["maa", "guru", "guide", "preceptor", "mother", "divine soul", "life"],
    badge: "Preceptor",
  },
  {
    id: "teachings",
    title: "Teachings of Maa & Bhagwan Sai Baba",
    category: "Beloved Maa",
    url: "/gurumaa?tab=teachings",
    description: "The Five Human Values (Sathya, Dharma, Shanti, Prema, Ahimsa) and Nishkama Seva.",
    keywords: ["teachings", "human values", "sathya", "truth", "dharma", "shanti", "peace", "prema", "love", "ahimsa", "seedling", "current"],
    badge: "Wisdom",
  },
  {
    id: "meditation",
    title: "Maa on Meditation (Jyoti Dhyana)",
    category: "Beloved Maa",
    url: "/gurumaa?tab=meditation",
    description: "Jyoti (Flame) meditation technique, Soham breathing, and the rose plant analogy.",
    keywords: ["meditation", "dhyana", "jyoti", "flame", "soham", "pranayama", "brahmamuhurtham", "rose", "concentration", "inner peace"],
    badge: "Dhyana",
  },
  {
    id: "discourses",
    title: "Divine Discourses of Maa",
    category: "Beloved Maa",
    url: "/gurumaa?tab=discourses",
    description: "Discourses on speaking truth obligingly, actors in the divine play, and Atmic splendour.",
    keywords: ["discourses", "pravachan", "satsang", "speak obligingly", "actors", "cosmic play", "atma", "truth"],
    badge: "Discourses",
  },
  {
    id: "maa-life-sketch",
    title: "Maa Life Sketch",
    category: "Beloved Maa",
    url: "/gurumaa?tab=life-sketch",
    description: "Glorious and blissful life journey, childhood sadhana in Agra and temple service.",
    keywords: ["life sketch", "biography", "childhood", "agra", "manakameshwar", "journey", "kaushalya devi"],
    badge: "Life Story",
  },
  {
    id: "miracles",
    title: "Miracles & Divine Leelas of Maa",
    category: "Beloved Maa",
    url: "/gurumaa?tab=miracles",
    description: "Documented miracles: Sacred Padukas, Gold Laxmi-Ganesh, Sea Shell Wonder, Vaikunth Darshan.",
    keywords: ["miracles", "leela", "paduka", "singhasan", "laxmi ganesh", "sea shell", "vaikunth", "coins", "darshan"],
    badge: "Miracles",
  },

  // --- Worship & Timings ---
  {
    id: "aarti-timings",
    title: "Temple Worship & Aarti Timings",
    category: "Worship & Timings",
    url: "/about#worship",
    description: "Kakad Aarti (9 AM), Madhyan Aarti (12 PM), Dhoop & Shej Aarti schedules. Open 6:30 AM to 8:30 PM.",
    keywords: ["aarti", "timings", "hours", "schedule", "kakad", "madhyan", "dhoop", "shej", "darshan hours"],
    badge: "Timings",
  },
  {
    id: "how-to-reach",
    title: "Visit Temple & How to Reach",
    category: "Worship & Timings",
    url: "/how-to-reach",
    description: "Roorkee Road, Meerut Cantt address, road transit, railway station & airport directions.",
    keywords: ["visit", "how to reach", "directions", "map", "address", "meerut", "roorkee road", "godwin estate", "travel"],
    badge: "Directions",
  },

  // --- Temple & Sanctum ---
  {
    id: "universe",
    title: "Universe of Divine Healing",
    category: "Temple & Sanctum",
    url: "/universe",
    description: "Satyadeep Sai Universe — realm of divine healing, Atmic bliss, and cosmic oneness.",
    keywords: ["universe", "divine healing", "healing", "sanctum", "shrine", "shivji", "radha krishna", "peace"],
    badge: "Healing",
  },
  {
    id: "deities",
    title: "Deities & Divine Sanctum",
    category: "Temple & Sanctum",
    url: "/#deities",
    description: "Trinity of Sai Avatars (Shirdi Sai, Sathya Sai, Prema Sai), Radha-Krishna, Mata Rani, Hanuman Ji.",
    keywords: ["deities", "trinity", "shirdi sai", "sathya sai", "prema sai", "krishna", "mata rani", "hanuman", "shivling", "sanctum"],
    badge: "Deities",
  },

  // --- Trust & 80G ---
  {
    id: "trust",
    title: "Sri Sai Sansthan Charitable Trust",
    category: "Trust & 80G",
    url: "/trust",
    description: "Official Trust caretaker of Satyadeep Sai Universe. Registered under 80G for tax exemption.",
    keywords: ["trust", "charitable", "80g", "tax exemption", "donation", "donate", "sbi bank", "neft"],
    badge: "80G Trust",
  },
  {
    id: "contribution",
    title: "Contribution & 80G Tax Exemption",
    category: "Trust & 80G",
    url: "/trust#contribution",
    description: "Join hands in Nishkama Seva to support Narayan Seva and child education under Section 80G.",
    keywords: ["contribution", "contribute", "donate", "seva", "80g", "tax relief", "narayan seva", "help"],
    badge: "Tax Relief",
  },
  {
    id: "upi-donation",
    title: "Instant UPI & QR Code Donation",
    category: "Trust & 80G",
    url: "/trust#donation",
    description: "Scan UPI QR code or copy official SBI bank details for immediate tax-exempt offerings.",
    keywords: ["upi", "qr code", "donate", "bank details", "account", "ifsc", "sbi", "transfer"],
    badge: "UPI Pay",
  },

  // --- Media & Social ---
  {
    id: "gallery",
    title: "Media & Photo Gallery",
    category: "Media & Social",
    url: "/gallery",
    description: "High-resolution sacred photographs of temple sanctum, aartis, havans and seva celebrations.",
    keywords: ["gallery", "photos", "pictures", "images", "media", "darshan photos", "havan", "album"],
    badge: "Photos",
  },
  {
    id: "videos",
    title: "Temple Videos Showcase",
    category: "Media & Social",
    url: "/#temple-videos",
    description: "Sacred video recordings of daily aartis, festive bhajans, and satsangs.",
    keywords: ["videos", "recordings", "youtube", "aarti video", "bhajan video", "live"],
    badge: "Videos",
  },
  {
    id: "social",
    title: "Official Social Channels Hub",
    category: "Media & Social",
    url: "/social",
    description: "Connect on YouTube, Instagram Daily Darshan, Facebook Community, and WhatsApp Helpline.",
    keywords: ["social", "instagram", "youtube", "facebook", "whatsapp", "connect", "subscribe", "reels"],
    badge: "Social",
  },

  // --- Community & Events ---
  {
    id: "events",
    title: "Events & Festivals Calendar",
    category: "Community",
    url: "/events",
    description: "101st Birthday celebrations of Bhagwan Baba, Guru Purnima, Shivratri, and weekly bhajans.",
    keywords: ["events", "calendar", "festivals", "birthday", "guru purnima", "shivratri", "programs", "dates"],
    badge: "Events",
  },
  {
    id: "experiences",
    title: "Experiences of Faith & Devotees",
    category: "Community",
    url: "/experiences",
    description: "Real-life miraculous healing and spiritual transformation accounts from Sai devotees.",
    keywords: ["experiences", "devotees", "testimonies", "faith", "miracles", "stories", "healing"],
    badge: "Faith",
  },
  {
    id: "contact",
    title: "Contact Us & Temple Office",
    category: "Community",
    url: "/contact",
    description: "Helpline phone numbers, email address, mandir location, and enquiry form.",
    keywords: ["contact", "phone", "email", "address", "helpline", "inquiry", "reach out", "location"],
    badge: "Contact",
  },
];
