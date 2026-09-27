"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Heart,
  Eye,
  Flame,
  ShieldCheck,
  Building2,
  Calendar,
  Compass,
  ArrowRight,
  BookOpen,
  HandHeart,
  Sun,
  Quote,
} from "lucide-react";
import SpotlightCard from "@/components/motion/SpotlightCard";
import FloatingShowcase from "@/components/motion/FloatingShowcase";
import { resolveMediaUrl } from "@/lib/image";

type TabKey = "glorious-life" | "life-sketch" | "teachings" | "meditation" | "discourses" | "miracles";

const TABS: { id: TabKey; label: string; badge: string }[] = [
  { id: "glorious-life", label: "Glorious Life Journey", badge: "Divine Childhood & Darshan" },
  { id: "life-sketch", label: "Maa Life Sketch", badge: "Human Values & Guidance" },
  { id: "teachings", label: "Teachings of Maa", badge: "Love & Selfless Seva" },
  { id: "meditation", label: "Maa on Meditation", badge: "Jyoti Dhyana Technique" },
  { id: "discourses", label: "Divine Discourses", badge: "Truth & Dharma Wisdom" },
  { id: "miracles", label: "Miraculous Life of Maa", badge: "Documented Miracles" },
];

const MIRACLES_LIST = [
  {
    id: "astonishing-miracle",
    title: "Astonishing Miracle of History",
    subtitle: "How Baba showered His utmost blessings on Maa (7th Jan 2000)",
    date: "7 January 2000",
    image: "/assets/content/miracles/astonishing-miracle-photo.webp",
    aspect: "aspect-4/3",
    desc: "Sai is infinite love. Sathya is what He teaches, Dharma is what He lives, Shanti is the mark of His personality, and Prema is His very nature. On this historic day, Baba bestowed profound miraculous manifestations on beloved Maa, filling the entire atmosphere with divine celestial vibrations.",
  },
  {
    id: "paduka-miracle",
    title: "The Sacred Paduka Miracle",
    subtitle: "How Baba blessed Maa with His Divine Paduka at Prashanti Nilayam",
    date: "October 1996",
    image: "/assets/content/miracles/paduka-miracle-photo.webp",
    aspect: "aspect-4/3",
    desc: "During the 1008 Paduka Utsav at Prashanti Nilayam, an intense yearning arose in Maa's heart to obtain Padukas and have them blessed directly by Swami. Through Baba's grace, sacred Padukas manifested and were touched and sanctified by Bhagwan's divine hands, which are preserved with immense devotion.",
  },
  {
    id: "singhasan-miracle",
    title: "The Swami Singhasan Miracle",
    subtitle: "How Swami listened to Maa's prayer and manifested a divine Singhasan",
    date: "Satyadeep Sai Mandir",
    image: "/assets/content/miracles/swami-singhasan-miracle-photo.webp",
    aspect: "aspect-4/3",
    desc: "Bhagwan Sri Sathya Sai Baba always reminds us that pure love moves the heart of the Lord. When Maa prayed for an exquisite sanctum throne (Singhasan) worthy of the Lord, unexpected divine leelas occurred, materialising every detail exactly as envisioned for the mandir.",
  },
  {
    id: "laxmi-ganesh-miracle",
    title: "The Sacred Laxmi-Ganesh Miracle",
    subtitle: "How Baba gifted Maa with Gold Laxmi-Ganesh in deep dhyan at age 17",
    date: "Early Sadhana",
    image: "/assets/content/miracles/laxmi-ganesh-miracle-photo.webp",
    aspect: "aspect-4/3",
    desc: "While sitting in deep meditation early in the morning, a massive silver door embedded with radiant diamonds opened before Maa. Bhagwan Sri Sathya Sai Baba descended and gifted her the sacred murtis of Laxmi-Ganesh, marking her spiritual journey of abundance and benevolence.",
  },
  {
    id: "sea-shell-wonder",
    title: "The Sacred Sea Shell Wonder",
    subtitle: "Rain of holy sea shells during Shankh Aarti forming divine OM",
    date: "Bhajan Hall",
    image: "/assets/content/miracles/astonishing-miracle-2-photo.webp",
    aspect: "aspect-4/3",
    desc: "Swami advised Maa to sound the sacred Shankh during aarti. Upon blowing the conch, an astonishing downpour of sea shells took place. As guided by Bhagwan, those consecrated sea shells were installed in the sanctum to form a luminous OM emblem.",
  },
  {
    id: "vaikunth-darshan",
    title: "Divine Darshan of Vaikunth",
    subtitle: "Swami takes Maa beyond worldly bounds to witness Heaven on Earth",
    date: "24 October 1998",
    image: "/assets/content/maa/1.webp",
    aspect: "aspect-4/3",
    desc: "On 24th October 1998, Bhagwan Swami showed an awe-inspiring vision beyond human imagination — the realm of Vaikunth. Swami held her hand in deep spiritual absorption, revealing the transcendental beauty of the cosmic abode of the Lord.",
  },
  {
    id: "multiple-forms",
    title: "The Lord Appears in Multiple Forms",
    subtitle: "Manifestations of Shirdi Sai, Sathya Sai, and Shiva during Bhajans",
    date: "Wednesday Satsangs",
    image: "/assets/content/universe/sai_baba4_b.webp",
    aspect: "aspect-4/3",
    desc: "Swami granted Wednesday as the auspicious day for regular bhajans. During these deeply moving gatherings, devotees and Maa repeatedly witnessed Baba simultaneously manifesting in multiple swaroops — affirming that God is One, manifested throughout all forms.",
  },
  {
    id: "supreme-blessing",
    title: "The Supreme Lord's Blessing & Mission",
    subtitle: "Swami showers coins in Maa's hands in Puttaparthi for the upcoming Universe",
    date: "Puttaparthi, 1998",
    image: "/assets/content/maa/2.webp",
    aspect: "aspect-4/3",
    desc: "In Puttaparthi at 4:00 AM, Swami gave sakshaat darshan and asked Maa to open her palms, showering sacred coins into them. When Maa wondered why coins were gifted, Baba revealed that a grand responsibility was arriving: to build Satyadeep Sai Universe and serve thousands.",
  },
];

export default function MaaClientPortal({ mediaMap }: { mediaMap: Record<string, string> }) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const resolvedInitialTab: TabKey = useMemo(() => {
    if (tabParam === "miracles") return "miracles";
    if (tabParam === "life-sketch" || tabParam === "sketch") return "life-sketch";
    if (tabParam === "teachings" || tabParam === "teaching") return "teachings";
    if (tabParam === "meditation" || tabParam === "dhyana") return "meditation";
    if (tabParam === "discourses" || tabParam === "discourse") return "discourses";
    return "glorious-life";
  }, [tabParam]);

  const [activeTab, setActiveTab] = useState<TabKey>(resolvedInitialTab);

  useEffect(() => {
    if (tabParam === "miracles") setActiveTab("miracles");
    else if (tabParam === "life-sketch" || tabParam === "sketch") setActiveTab("life-sketch");
    else if (tabParam === "teachings" || tabParam === "teaching") setActiveTab("teachings");
    else if (tabParam === "meditation" || tabParam === "dhyana") setActiveTab("meditation");
    else if (tabParam === "discourses" || tabParam === "discourse") setActiveTab("discourses");
  }, [tabParam]);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Clean In-Page Header */}
      <div className="border-b border-maroon-100/80 pb-8 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
            Spiritual Preceptor &amp; Guiding Light
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/80 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 uppercase tracking-wider">
            Founder · Satyadeep Sai Universe
          </span>
        </div>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          Beloved Maa
        </h1>
        <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          Guiding light of unconditional love, selfless service (Nishkama Seva), and eternal communion
          with Bhagwan Sri Sathya Sai Baba.
        </p>

        {/* Tab Pills */}
        <div className="mt-7 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          {TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? "btn-festive text-white shadow-md"
                    : "border-2 border-maroon-200 bg-white text-maroon-800 hover:bg-maroon-50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`hidden sm:inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    isSelected ? "bg-white/20 text-white" : "bg-cream-100 text-stone-600"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Glorious Life Journey */}
      {activeTab === "glorious-life" && (
        <div className="space-y-12">
          {/* Top Story Block */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-saffron-700 uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                Spiritual Descent &amp; Early Sadhana
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-maroon-900 leading-snug">
                An Enlightened Soul Awaking the Divine Jyoti in Thousands
              </h2>
              <p className="text-[16px] leading-relaxed text-stone-600">
                There are certain spiritually blessed souls who take birth on this earth to enlighten the path
                of ultimate spiritual evolution. <strong>Maa</strong> is one such divine soul who, through her
                unflinching love and selfless sadhana, has awakened the divine jyoti (flame) in thousands of
                Sai devotees across the globe.
              </p>
              <p className="text-[15px] leading-relaxed text-stone-600">
                Born in January 1962 in Agra, her childhood was suffused with the wisdom of Lord Shiva and
                Lord Krishna. Her grandmother, Smt. Kaushalya Devi, would take young Maa barefoot at 4:00 AM
                across four kilometres to the holy <strong>Manakameshwar Temple</strong> in Ravat-Para, Agra,
                carrying milk for daily abhishek.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center py-4">
              <FloatingShowcase
                src="/assets/content/maa/1.webp"
                alt="Beloved Maa — Satyadeep Sai Universe"
                aspectClassName="aspect-[3/4]"
                className="w-full max-w-[360px]"
                imageClassName="object-contain bg-cream-50"
              />
            </div>
          </div>

          {/* Darshan of Lord Shiva & Sai Baba */}
          <div className="grid gap-6 md:grid-cols-2">
            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-800">
                <Flame className="h-6 w-6" />
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-900">
                Lord Shiva&apos;s Darshan at Age 5
              </h3>
              <p className="text-sm leading-relaxed text-stone-600">
                At the tender age of five, while performing abhishek at Manakameshwar Mandir, she had a
                sakshaat darshan of <strong>Lord Shiva in Ardhnarishwar swaroop</strong>. Lord Shiva smiled
                benevolently and instructed her: <em>&ldquo;My daughter, bring 100 kilos of milk on Mahashivratri for my abhishek.&rdquo;</em>
              </p>
              <p className="text-sm leading-relaxed text-stone-600">
                On Mahashivratri, when the temple doors opened, she was miraculously guided to the very front.
                As she offered sringar onto the holy Shivling, Lord Shiva opened His third eye three times and
                kept it half-open — commencing her lifetime of mystic communion.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 sm:p-8 shadow-xs space-y-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gulal-100 text-maroon-800">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-900">
                Sai Baba&apos;s Sakshaat Darshan at Age 17
              </h3>
              <p className="text-sm leading-relaxed text-stone-600">
                After continuous dream darshans and sheer penance, Bhagwan Sri Sathya Sai Baba gave her
                direct physical darshan between 4:00 AM and 5:00 AM. A silver door embedded with diamonds
                opened, with stairs leading up to Swami.
              </p>
              <p className="text-sm leading-relaxed text-stone-600">
                Swami smiled and said: <em>&ldquo;You come two steps up, and I will come down for you.&rdquo;</em> As she
                stepped forward, Swami came down the stairs, embraced her with infinite fatherly love, and
                declared: <em>&ldquo;You are my daughter for the past few janams.&rdquo;</em>
              </p>
            </SpotlightCard>
          </div>

          {/* Abhishek Tradition Showcase */}
          <div className="rounded-3xl border border-gold-300/80 bg-linear-to-br from-amber-50/80 via-white to-saffron-50/50 p-6 sm:p-8 shadow-xs">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="inline-block rounded-full bg-saffron-100 px-3 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
                  Living Spiritual Heritage
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-maroon-950">
                  The Continuous Abhishek Tradition at Satyadeep Shiv Sai Universe
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Even today, the sacred abhishek tradition begun in Maa&apos;s childhood continues at
                  Satyadeep Sai Universe and Satyadeep Shiv Sai Universe in Meerut. Devotees join in
                  reverent worship, meditating in an environment charged with divine purity.
                </p>
              </div>
              <div className="lg:col-span-4 overflow-hidden rounded-2xl border-2 border-gold-200 shadow-sm">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/maa-life-sketch/abhishek.webp")}
                  alt="Maa performing abhishek"
                  width={500}
                  height={350}
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Maa Life Sketch & Human Values */}
      {activeTab === "life-sketch" && (
        <div className="space-y-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-saffron-700 uppercase tracking-wider">
                <Heart className="h-4 w-4" />
                The Master Mother
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-maroon-900 leading-snug">
                &ldquo;Service to Mankind is Service to God&rdquo; — Love All, Serve All
              </h2>
              <p className="text-[16px] leading-relaxed text-stone-600">
                <strong>Maa</strong> means an enlightened divine mother, a guiding light of unconditional
                compassion. Her unsullied love, guided meditation techniques, and unwavering faith in Sai Baba
                lead seekers naturally to higher states of human consciousness.
              </p>
              <p className="text-[15px] leading-relaxed text-stone-600">
                She teaches humanity through four foundational yogas: <strong>Bhakti Yoga</strong> (unflinching
                love of God), <strong>Karma Yoga</strong> (desireless selfless action), <strong>Jnana Yoga</strong>{" "}
                (supreme knowledge of the true Self), and <strong>Dhyana Yoga</strong> (meditation).
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center py-4">
              <FloatingShowcase
                src="/assets/content/maa/3.webp"
                alt="Beloved Maa — Embodiment of Love, Humility and Wisdom"
                aspectClassName="aspect-[3/4]"
                className="w-full max-w-[360px]"
                imageClassName="object-contain bg-cream-50"
              />
            </div>
          </div>

          {/* The Five Human Values */}
          <div className="space-y-6">
            <div className="text-center sm:text-left">
              <span className="inline-block rounded-full bg-saffron-100 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
                Core Philosophy
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-maroon-900">
                The Five-Fold Path of Human Values
              </h3>
              <p className="mt-1 text-sm text-stone-600 max-w-2xl">
                Guided by Bhagwan Sri Sathya Sai Baba, Maa imparts the essential code for a wholesome,
                meaningful, and peaceful human life:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  value: "Sathya",
                  meaning: "Truth",
                  desc: "Speaking truth politely; truth is the inner spark of the divine in all.",
                  color: "border-amber-200 bg-amber-50/70",
                },
                {
                  value: "Dharma",
                  meaning: "Righteousness",
                  desc: "Right conduct, duty without egoism, acting well the part God assigned.",
                  color: "border-saffron-200 bg-saffron-50/70",
                },
                {
                  value: "Shanti",
                  meaning: "Peace",
                  desc: "Mental equanimity unaffected by worldly storms, surrendering fruits to God.",
                  color: "border-sky-200 bg-sky-50/70",
                },
                {
                  value: "Prema",
                  meaning: "Pure Love",
                  desc: "The unseen undercurrent connecting all beings; love is God, God is love.",
                  color: "border-rose-200 bg-rose-50/70",
                },
                {
                  value: "Ahimsa",
                  meaning: "Non-Violence",
                  desc: "Universal brotherhood, harming no creature in thought, word, or deed.",
                  color: "border-emerald-200 bg-emerald-50/70",
                },
              ].map((item) => (
                <div
                  key={item.value}
                  className={`rounded-2xl border p-5 transition-all hover:-translate-y-1 shadow-xs ${item.color}`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    {item.meaning}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-maroon-900">{item.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transforming Young Hearts & Mission Karuna */}
          <div className="grid gap-6 md:grid-cols-2">
            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 sm:p-8 shadow-xs space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-100 text-saffron-800">
                <BookOpen className="h-5 w-5" />
              </span>
              <h4 className="font-display text-lg font-bold text-maroon-900">
                Transforming Children &amp; Balvikas
              </h4>
              <p className="text-sm leading-relaxed text-stone-600">
                Maa&apos;s greatest joy lies in instilling divine virtues in children and youth. Through
                regular Balvikas programmes, young minds are grounded in moral fortitude, respecting parents,
                and cultivating compassion towards all beings.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 sm:p-8 shadow-xs space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h4 className="font-display text-lg font-bold text-maroon-900">
                Mission Karuna &amp; Selfless Seva
              </h4>
              <p className="text-sm leading-relaxed text-stone-600">
                Motivated by Baba, Maa established Mission Karuna — sponsoring tuition, uniforms, books,
                and daily sustenance for underprivileged children, enabling them to stand on their own
                feet as honorable citizens.
              </p>
              <div className="pt-2">
                <Link
                  href="/mission-karuna"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-700 hover:text-maroon-900"
                >
                  <span>Read more about Mission Karuna</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* Tab: Teachings of Maa */}
      {activeTab === "teachings" && (
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center sm:text-left space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              Universal Spiritual Wisdom &amp; Eternal Values
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon-900 leading-snug">
              Teachings of Maa: The Path of Love and Selfless Service
            </h2>
            <p className="text-stone-600 max-w-3xl text-[15px] sm:text-[16px] leading-relaxed">
              Sri Sathya Sai Baba and beloved Maa teach that God is One, and that all world religions
              are diverse streams flowing toward the same cosmic ocean. The foundation of spiritual life
              rests upon two pillars: <strong>Love (Prema)</strong> and <strong>Selfless Service (Nishkama Seva)</strong>.
            </p>
          </div>

          {/* Golden Quote Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold-300/70 bg-gradient-to-br from-amber-50 via-orange-50/60 to-cream-100 p-7 sm:p-9 shadow-sm">
            <Quote className="absolute -bottom-4 -right-4 h-32 w-32 text-gold-200/50 pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-saffron-700">
                Core Divine Maxim
              </span>
              <p className="font-display text-xl sm:text-2xl font-bold text-maroon-950 leading-relaxed italic">
                &ldquo;Start the day with Love; Spend the day with Love; Fill the day with Love; End the day with Love; This is the way to God.&rdquo;
              </p>
              <p className="text-sm font-semibold text-stone-600">
                — Bhagwan Sri Sathya Sai Baba &amp; Beloved Maa
              </p>
            </div>
          </div>

          {/* 1. The Five Human Values */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Foundational Truth
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                The Five Human Values (Sanathana Dharma)
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                Baba affirms: <em>&ldquo;Truth is my name, Righteousness is the way I walk, Peace is my very nature, and Love is the way of my life.&rdquo;</em>
                {" "}When Love manifests in human life, it takes five sacred expressions:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  value: "Sathya",
                  meaning: "Truth",
                  desc: "Love in speech. Speaking truth with gentleness, sincerity, and compassion.",
                  quote: "Truth is the eternal foundation of all creation.",
                  color: "border-amber-200 bg-amber-50/60 text-amber-900",
                  badge: "bg-amber-100 text-amber-800",
                },
                {
                  value: "Dharma",
                  meaning: "Right Conduct",
                  desc: "Love in action. Discharging daily duties selflessly with moral rectitude.",
                  quote: "Dharmo Rakshati Rakshitah — Dharma protects those who protect it.",
                  color: "border-orange-200 bg-orange-50/60 text-orange-900",
                  badge: "bg-orange-100 text-orange-800",
                },
                {
                  value: "Shanti",
                  meaning: "Peace",
                  desc: "Love in thought. Maintaining steady inner tranquility amidst worldly storms.",
                  quote: "True peace resides within your own purified heart.",
                  color: "border-emerald-200 bg-emerald-50/60 text-emerald-900",
                  badge: "bg-emerald-100 text-emerald-800",
                },
                {
                  value: "Prema",
                  meaning: "Divine Love",
                  desc: "Love as the supreme essence of God. Pure, unconditional, and universal.",
                  quote: "Love is God. God is Love. Live in Love.",
                  color: "border-rose-200 bg-rose-50/60 text-rose-900",
                  badge: "bg-rose-100 text-rose-800",
                },
                {
                  value: "Ahimsa",
                  meaning: "Non-Violence",
                  desc: "Love in understanding. Never causing pain to any living being in thought, word, or deed.",
                  quote: "Ahimsa Paramo Dharma — Non-injury is the highest righteousness.",
                  color: "border-sky-200 bg-sky-50/60 text-sky-900",
                  badge: "bg-sky-100 text-sky-800",
                },
                {
                  value: "Sarva Dharma",
                  meaning: "Unity of Faiths",
                  desc: "There is only one caste, the caste of Humanity; only one religion, the religion of Love; only one language, the language of the Heart.",
                  quote: "All paths lead to the same Divine Ocean.",
                  color: "border-purple-200 bg-purple-50/60 text-purple-900",
                  badge: "bg-purple-100 text-purple-800",
                },
              ].map((item) => (
                <div
                  key={item.value}
                  className={`rounded-2xl border p-5 transition-all hover:shadow-md ${item.color}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold">{item.value}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.badge}`}>
                      {item.meaning}
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-stone-700">
                    {item.desc}
                  </p>
                  <p className="mt-3 border-t border-stone-200/60 pt-2 text-[11.5px] font-medium italic text-stone-600">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Prema — The Highest Sadhana & Sacred Parables */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Profound Parables
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                Prema: The Highest Sadhana
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                Maa regularly shares Bhagwan Baba’s profound parables that illustrate how divine love
                must be nurtured and how the same divine energy flows through every soul:
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Parable 1: The Seedling & The Tree */}
              <SpotlightCard className="flex flex-col justify-between rounded-3xl border border-saffron-200 bg-white p-7 shadow-xs">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-saffron-100 px-3 py-1 text-xs font-bold text-saffron-800">
                    <Sparkles className="h-3.5 w-3.5" />
                    Parable of the Tender Seedling
                  </div>
                  <h4 className="font-display text-xl font-bold text-maroon-950">
                    Guarding the Tender Seedling of Divine Love
                  </h4>
                  <p className="text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
                    When a seed first sprouts, it is fragile and tender. If left exposed, grazing goats
                    and cattle may consume it before it can take root. The wise gardener erects a sturdy
                    fence around it, watering and tending it daily until its roots sink deep.
                  </p>
                  <p className="text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
                    Once the sapling matures into a magnificent, deep-rooted banyan tree, the protective
                    fence is no longer needed. The very same cattle that once threatened it now find
                    soothing shade and nourishment beneath its expansive branches.
                  </p>
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 font-medium italic">
                    &ldquo;In the beginning, your spiritual practice must be safeguarded with discipline,
                    holy company (satsang), and meditation. Once Love matures into universal oneness, it
                    gives shelter and peace to everyone around you.&rdquo;
                  </div>
                </div>
              </SpotlightCard>

              {/* Parable 2: The Electric Current & The Bulbs */}
              <SpotlightCard className="flex flex-col justify-between rounded-3xl border border-gold-200 bg-white p-7 shadow-xs">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                    <Sun className="h-3.5 w-3.5" />
                    Parable of the One Electric Current
                  </div>
                  <h4 className="font-display text-xl font-bold text-maroon-950">
                    One Divine Energy Expressed in Countless Vessels
                  </h4>
                  <p className="text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
                    Electric current flowing through the grid is invisible, uniform, and single.
                    When connected to a modest 10-watt bulb, it gives a soft, tender nightlight.
                    When connected to a 1,000-watt floodlight, it blazes with brilliant illumination across an entire hall.
                    When sent through a heater, it radiates warmth.
                  </p>
                  <p className="text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
                    The difference lies not in the current, but in the capacity and nature of the bulb.
                    Similarly, the same Supreme Atma (Divine Spirit) dwells in every heart.
                    As we purify our mind and thoughts, that same Divine Current radiates through us as
                    boundless Love, compassion, and divine radiance.
                  </p>
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 font-medium italic">
                    &ldquo;Bodies are different, minds are different, but the Divine Current animating
                    every single being is One and the same.&rdquo;
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>

          {/* 3. Nishkama Seva (Selfless Service) */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Worship Through Action
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                Nishkama Seva: Hands That Help Are Holier Than Lips That Pray
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                Beloved Maa teaches that spiritual wisdom remains incomplete if it is not translated
                into compassionate action for the suffering and needy:
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-maroon-100 bg-white p-6 shadow-xs space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-100 text-saffron-800">
                  <HandHeart className="h-5 w-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">
                  Love All, Serve All
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  Recognizing God in every suffering human being. Seva performed without expecting reward
                  or fame dissolves the ego and connects the soul with the infinite.
                </p>
              </div>

              <div className="rounded-2xl border border-maroon-100 bg-white p-6 shadow-xs space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">
                  Help Ever, Hurt Never
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  A sacred pledge for every devotee: to use our speech, hands, and resources only to
                  uplift, console, and heal, never uttering words that inflict sorrow.
                </p>
              </div>

              <div className="rounded-2xl border border-maroon-100 bg-white p-6 shadow-xs space-y-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-800">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">
                  Manava Seva Is Madhava Seva
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  Serving human beings in distress is the direct and highest worship of the Divine.
                  Narayan Seva (feeding the hungry) and Mission Karuna (child aid) embody this truth.
                </p>
              </div>
            </div>

            {/* Quick Links to Temple Seva Activities */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-saffron-200 bg-saffron-50/70 p-5 sm:p-6">
              <div className="space-y-1">
                <h5 className="font-display text-base sm:text-lg font-bold text-maroon-900">
                  Experience Nishkama Seva at Satyadeep Sai Universe
                </h5>
                <p className="text-xs sm:text-sm text-stone-600">
                  Participate in monthly Narayan Seva, child education aid, and mandir seva initiatives.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/mission-karuna"
                  className="rounded-full bg-saffron-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-saffron-700 transition-colors"
                >
                  Mission Karuna
                </Link>
                <Link
                  href="/trust"
                  className="rounded-full border border-maroon-300 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-maroon-800 hover:bg-cream-100 transition-colors"
                >
                  Support Trust
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Maa on Meditation */}
      {activeTab === "meditation" && (
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center sm:text-left space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
              <Sun className="h-3.5 w-3.5" />
              Sacred Sadhana &amp; Inner Communion
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon-900 leading-snug">
              Maa on Meditation: The Art of Jyoti Dhyana
            </h2>
            <p className="text-stone-600 max-w-3xl text-[15px] sm:text-[16px] leading-relaxed">
              Meditation is not mere concentration, but getting in tune with the inner source of Divine energy.
              Beloved Maa guides spiritual seekers along the sacred path of <strong>Jyoti (Flame) Meditation</strong> to
              awaken peace, purify the senses, and merge into cosmic consciousness.
            </p>
          </div>

          {/* Golden Quote Banner */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold-300/70 bg-gradient-to-br from-amber-50 via-orange-50/60 to-cream-100 p-7 sm:p-9 shadow-sm">
            <Quote className="absolute -bottom-4 -right-4 h-32 w-32 text-gold-200/50 pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-saffron-700">
                Essence of Meditation
              </span>
              <p className="font-display text-xl sm:text-2xl font-bold text-maroon-950 leading-relaxed italic">
                &ldquo;Meditation is getting absorbed in God as the only thought, the only goal. God only, only God.
                Think God, breathe God, love God.&rdquo;
              </p>
              <p className="text-sm font-semibold text-stone-600">
                — Beloved Maa &amp; Bhagwan Sri Sathya Sai Baba
              </p>
            </div>
          </div>

          {/* Rose Plant Analogy: Concentration, Contemplation, Meditation */}
          <div className="rounded-3xl border border-rose-200 bg-linear-to-br from-rose-50/70 via-white to-amber-50/60 p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                The Rose Plant Analogy
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                Concentration, Contemplation and Meditation
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                Beloved Maa illustrates the three stages of spiritual evolution through the analogy of the rose plant:
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-rose-200 bg-white p-5 shadow-xs space-y-2.5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700 font-bold text-sm">
                  1
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">Concentration</h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  A rose plant has leaves, thorns, and flowers. Concentration is identifying where the thorns are
                  and where the flower is by carefully observing the plant with outward senses.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-xs space-y-2.5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-bold text-sm">
                  2
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">Contemplation</h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  To carefully cut the flower of love away from the worldly desires (thorns). This is contemplation —
                  detaching the mind from external temptations through discrimination.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs space-y-2.5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm">
                  3
                </div>
                <h4 className="font-display text-lg font-bold text-maroon-900">Meditation</h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">
                  To offer that cut rose flower of pure divine love at the Lotus Feet of the Lord. In this offering,
                  the individual ego dissolves into the Divine Ocean.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-Step Jyoti Dhyana Practice & Image */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Step-by-Step Guidance
              </span>
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                The Sacred Jyoti (Flame) Meditation Technique
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                As advised by Bhagwan Baba and beloved Maa, <strong>&ldquo;Jyoti&rdquo; (Divine Flame)</strong> is the
                highest, most universal object of meditation because light has no form, no boundaries, and belongs
                equally to all religions and traditions.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    step: "1. Brahmamuhurtham Timing",
                    text: "Sit at the same sacred spot and the same time every day, preferably between 3:00 AM and 6:00 AM (Brahmamuhurtham), when cosmic stillness prevails.",
                  },
                  {
                    step: "2. Soham Breath Alignment",
                    text: "Sit with spine erect. Slowly breathe in mentally chanting 'So' (He/God), and breathe out mentally chanting 'Ham' (I/Am) — affirming 'I am Divine'.",
                  },
                  {
                    step: "3. Bringing the Light Within",
                    text: "Gaze at a lamp flame, close your eyes, and visualize that radiant flame descending into the lotus of your heart. Feel it dispelling all inner darkness.",
                  },
                  {
                    step: "4. Purifying the Senses",
                    text: "Guide the flame to your eyes (to see only the Divine), ears (to hear only sacred words), tongue (to speak kindly and obligingly), and hands (to serve).",
                  },
                  {
                    step: "5. Cosmic Expansion",
                    text: "Expand this flame outward to encompass family, friends, adversaries, all living beings, and the entire creation in boundless Golden Light.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="font-display text-sm font-bold text-maroon-950">{item.step}</h5>
                      <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative overflow-hidden rounded-3xl border-4 border-gold-300/70 shadow-xl bg-stone-900 p-2 max-w-sm w-full">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/archive/meditation.gif")}
                  alt="Jyoti Flame Meditation as taught by Maa"
                  width={400}
                  height={500}
                  unoptimized
                  className="w-full rounded-2xl object-cover"
                />
                <div className="p-3 bg-linear-to-r from-saffron-50 via-cream-50 to-amber-50 rounded-xl mt-2 text-center text-xs font-bold text-maroon-900">
                  Jyoti Dhyana · Light of Divine Consciousness
                </div>
              </div>
            </div>
          </div>

          {/* Threefold Benefits */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-xs space-y-2">
              <h4 className="font-display text-lg font-bold text-emerald-950">Benefits for Health</h4>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-700">
                Regulates blood pressure, calms the heartbeat, stabilizes breathing, and fills every cell with
                invigorating cosmic prana.
              </p>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-6 shadow-xs space-y-2">
              <h4 className="font-display text-lg font-bold text-sky-950">Psychological Benefits</h4>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-700">
                Dissolves anxiety, purifies emotional turbulence, enhances concentration, and bestows unfailing
                peace of mind.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 shadow-xs space-y-2">
              <h4 className="font-display text-lg font-bold text-amber-950">Spiritual Benefits</h4>
              <p className="text-xs sm:text-[13.5px] leading-relaxed text-stone-700">
                Breaks body attachment, removes the ego, awakens the indwelling Atma, and culminates in Divine
                Union (Atma Sakshatkar).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Divine Discourses */}
      {activeTab === "discourses" && (
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center sm:text-left space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5" />
              Living Wisdom for Daily Life
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-maroon-900 leading-snug">
              Divine Discourses of Maa: Sathya, Dharma &amp; Righteous Living
            </h2>
            <p className="text-stone-600 max-w-3xl text-[15px] sm:text-[16px] leading-relaxed">
              In regular satsangs at Satyadeep Sai Universe, beloved Maa delivers uplifting discourses that guide
              devotees on how to live peacefully, speak truth obligingly, and perform everyday duties as a sacred
              play of the Lord.
            </p>
          </div>

          {/* Discourse Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Discourse 1: Sathya (Truth) */}
            <SpotlightCard className="rounded-3xl border border-amber-200 bg-white p-7 shadow-xs space-y-4">
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 uppercase tracking-wider">
                Discourse on Sathya (Truth)
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-950">
                &ldquo;If You Cannot Oblige, Speak Obligingly&rdquo;
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Man should emphasize speaking the truth and speaking it politely. Have unwavering faith that truth
                will protect and save you in the long run. Stick to it regardless of what worldly troubles may befall.
                Avoid hypocrisy and crookedness in speech.
              </p>
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 font-medium italic">
                &ldquo;In everyone there is a spark of truth; life becomes dark without that spark. And that spark,
                that flame is God Himself, the eternal source of all truth and love.&rdquo;
              </div>
            </SpotlightCard>

            {/* Discourse 2: Dharma (The Role of the Actor) */}
            <SpotlightCard className="rounded-3xl border border-orange-200 bg-white p-7 shadow-xs space-y-4">
              <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-900 uppercase tracking-wider">
                Discourse on Dharma (Right Conduct)
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-950">
                Actors in the Divine Cosmic Play
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Everyone should perform their work as actors perform in a drama — playing their allotted part with
                total dedication, yet keeping their true inner identity separate and not getting attached to the role.
                Always remember that everything assigned to you is the Lord&rsquo;s play.
              </p>
              <div className="rounded-xl border border-orange-200 bg-orange-50/70 p-4 text-xs sm:text-sm text-orange-950 font-medium italic">
                &ldquo;We all are actors in the Divine Film and the Lord has assigned each of us a role. Act your
                part well; there all your duty ends. He is the Director, Designer, and Witness of the play.&rdquo;
              </div>
            </SpotlightCard>

            {/* Discourse 3: Inner Atmic Splendour */}
            <SpotlightCard className="rounded-3xl border border-gold-200 bg-white p-7 shadow-xs space-y-4">
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 uppercase tracking-wider">
                Discourse on the Indwelling Atma
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-950">
                Turning Vision from Outer Universe to Inner Glory
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Man today has forgotten the Atmic bliss hidden inside — the sacred Force that regulates the senses,
                mind, and intellect. The Lord resides in everyone as the Atma. Bodies change and perish, but the
                Atma is birthless, deathless, and eternal.
              </p>
              <div className="rounded-xl border border-gold-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 font-medium italic">
                &ldquo;Do not neglect the Lord within. Do not cling to the unreal and temporary. The Atma within you
                is the spring of joy, love, and everlasting peace.&rdquo;
              </div>
            </SpotlightCard>

            {/* Discourse 4: Nishkama Seva */}
            <SpotlightCard className="rounded-3xl border border-rose-200 bg-white p-7 shadow-xs space-y-4">
              <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-900 uppercase tracking-wider">
                Discourse on Selfless Service
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-950">
                Worship the Living God in Everyone
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                &ldquo;Let us not just worship the statue of Sai Baba; let us worship the living God in everyone.&rdquo;
                Serving the poor, comforting the distressed, and feeding the hungry is the direct worship of Bhagwan.
                Hands that serve are truly holier than lips that pray.
              </p>
              <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 text-xs sm:text-sm text-rose-950 font-medium italic">
                &ldquo;Duty without love is deplorable. Duty with love is desirable. Love without duty is Divine.&rdquo;
              </div>
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* Tab 3: Miraculous Life of Maa */}
      {activeTab === "miracles" && (
        <div className="space-y-10">
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
              Documented Divine Leelas
            </span>
            <h2 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold text-maroon-900 leading-snug">
              Miracles &amp; Divine Manifestations of Maa
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
              Witness the authentic accounts of divine communion between Bhagwan Sri Sathya Sai Baba and
              beloved Maa — from the miraculous Padukas and gold Murtis to the showers of sacred vibhuti
              and celestial visions.
            </p>
          </div>

          {/* Grid of Miracles */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {MIRACLES_LIST.map((item) => (
              <SpotlightCard
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-maroon-100/90 bg-white shadow-xs transition-all hover:border-gold-400/80 hover:shadow-lg"
              >
                <div className={`relative ${item.aspect} w-full overflow-hidden bg-cream-50/70 border-b border-maroon-100/60`}>
                  <Image
                    src={resolveMediaUrl(mediaMap, item.image)}
                    alt={item.title}
                    fill
                    className="object-contain p-2.5 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                    {item.date}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-saffron-700">
                    {item.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-bold text-maroon-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-stone-600 flex-1">
                    {item.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          <div className="rounded-3xl border border-maroon-100 bg-cream-50/80 p-6 sm:p-8 text-center space-y-3">
            <p className="font-display text-xl font-bold text-maroon-900">
              &ldquo;God always listens to those who call on Him sincerely and in faith.&rdquo;
            </p>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
              — Beloved Maa
            </p>
          </div>
        </div>
      )}

      {/* Bottom Devotional Footer */}
      <div className="border-t border-maroon-100/80 pt-8 text-center space-y-2">
        <p className="font-display text-2xl text-gold-500">ॐ साई राम</p>
        <p className="text-xs text-stone-500 font-medium">
          Satyadeep Sai Universe · Roorkee Road, Meerut Cantt, UP
        </p>
      </div>
    </div>
  );
}
