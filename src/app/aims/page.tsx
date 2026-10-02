import Link from "next/link";
import {
  Globe2,
  Sparkles,
  Utensils,
  HeartHandshake,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { getMediaMap, getPageWithFallback } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";
import AimsInteractiveGrid, { type SevaSection, type SevaPhoto } from "./AimsInteractiveGrid";

export const revalidate = 300;

export const metadata = {
  title: "Aims & Objectives · Sri Sai Sansthan Charitable Trust",
  description:
    "Explore the aims and objectives of Sri Sai Sansthan Charitable Trust — Global Oneness, Spiritual Inspiration, Narayan Seva, Human Values, and Mission Karuna.",
};

const PILLARS_NAV = [
  { id: "global-oneness", label: "01 · Global Oneness", icon: Globe2 },
  { id: "spiritual-inspiration", label: "02 · Spiritual Inspiration", icon: Sparkles },
  { id: "narayan-seva", label: "03 · Narayan Seva", icon: Utensils },
  { id: "love-and-service", label: "04 · Love & Service", icon: HeartHandshake },
  { id: "mission-karuna", label: "05 · Mission Karuna", icon: GraduationCap },
];

const SECTIONS: SevaSection[] = [
  {
    id: "global-oneness",
    num: "01",
    eyebrow: "Universal Unity",
    title: "Global Oneness",
    subtitle: "Sarva Dharma Sthal & worldwide solidarity",
    iconName: "globe",
    photos: [
      {
        src: "/assets/content/universe/saibaba_uni.webp",
        alt: "Satyadeep Sarva Dharma Sthal Altar",
        title: "Sarva Dharma Sthal — Sanctuary of All Faiths",
        desc: "Devotees of all faiths worshipping side by side in sacred harmony under Baba's message of Sabka Malik Ek.",
      },
      {
        src: "/assets/content/universe/sai_baba4_b.webp",
        alt: "Bhagwan Sri Sathya Sai Baba Altar at Satyadeep",
        title: "Satyadeep Sai Baba Sanctum Sanctorum",
        desc: "The sacred altar of Bhagwan Sri Sathya Sai Baba crowned with the Sarva Dharma emblem at Satyadeep Sai Universe.",
      },
      {
        src: "/assets/content/universe/satyadeep-serva-dharm-sthal.jpg",
        alt: "Satyadeep Sarva Dharm Sthal",
        title: "Satyadeep Sarva Dharma Sthal",
        desc: "A sacred sanctuary uniting humanity in spiritual awareness and selfless service.",
      },
    ],
    quote: "“All faiths on one sacred journey to the Divine.” — Satyadeep Sai Universe · Sarva Dharma Sthal",
    paragraphs: [
      "Sri Sai Sansthan Charitable Trust aims at uniting people around the globe to perform sacred actions — in order not only to save what we have, but to transform the planet through spiritual awareness.",
      "Satyadeep Sai Universe is a place where people all over the globe, irrespective of caste, creed or religion, join hands to work on various social causes for the upliftment of humanity — and where they can worship their respective deities at the Sarva Dharma Sthal.",
    ],
    tags: ["Worldwide Unity", "Sarva Dharma Sthal", "Social Upliftment"],
  },
  {
    id: "spiritual-inspiration",
    num: "02",
    eyebrow: "Divine Awakening",
    title: "Spiritual Inspiration",
    subtitle: "Awakening inner untapped energies",
    iconName: "sparkles",
    photos: [
      {
        src: "/legacy/meditation/meditation.gif",
        alt: "Guided Dhyana and Meditation Session",
        title: "Guided Meditation & Inner Peace",
        desc: "Meditation and dhyana sessions held under holy guidance to calm the restless mind, open the heart, and awaken higher consciousness.",
      },
      {
        src: "/assets/content/meditation/maa-meditation.jpg",
        alt: "Beloved Maa in Sacred Meditation",
        title: "Dhyana & Spiritual Awakening",
        desc: "Maa guiding seekers to explore their untapped inner divine energies towards peace, wisdom, and universal love.",
      },
    ],
    paragraphs: [
      "Sri Sai Sansthan Charitable Trust is a sacred sanctuary where spiritual seekers from all over the world come for one supreme purpose — to attain full spiritual awakening and inner realization.",
      "The purpose is to create an opportunity for all seekers to explore the hidden inner source of strong energies lying unused and untapped within us, channelled towards peace, wisdom, and universal love.",
    ],
    tags: ["Inner Realization", "Meditation & Satsang", "Divine Energy"],
  },
  {
    id: "narayan-seva",
    num: "03",
    eyebrow: "Sacred Nourishment",
    title: "Narayan Seva",
    subtitle: "Feeding Balvikas children and devotees as direct worship of God",
    iconName: "utensils",
    photos: [
      {
        src: "/assets/content/aims/narayan-seva-1.webp",
        alt: "Devotees serving sacred prasad to children",
        title: "Anna Daan — Sacred Food Distribution",
        desc: "Devotees and trust volunteers serving sanctified prasad to children with love and reverence, living Baba's teaching that Manava Seva is Madhava Seva.",
      },
      {
        src: "/assets/content/aims/narayan-seva-2.webp",
        alt: "Community nutrition and welfare drive",
        title: "Community Seva Drive",
        desc: "Sri Sai Sansthan Charitable Trust providing nourishing meals, grains, and essentials to families and children facing economic hardship.",
      },
      {
        src: "/assets/content/aims/narayan-seva-3peg.webp",
        alt: "Nourishing Balvikas children",
        title: "Child Nutrition & Loving Care",
        desc: "Trust volunteers ensuring that nutritious meals and affection reach children in need, fostering health and genuine joy.",
      },
    ],
    paragraphs: [
      "Sri Sai Sansthan Charitable Trust aims at providing wholesome, nutritious food to Balvikas children and families facing hardship.",
      "Baba taught that 'Manava Seva is Madhava Seva' — service to humanity is worship of the Divine. Through daily and special Narayan Seva, hunger is replaced with warmth, nourishment, and heartfelt prayers.",
    ],
    tags: ["Wholesome Meals", "Child Nutrition", "Manava Seva is Madhava Seva"],
  },
  {
    id: "love-and-service",
    num: "04",
    eyebrow: "Moral Character",
    title: "Fostering Seeds of Love & Service",
    subtitle: "Instilling character under Maa's guidance",
    iconName: "heartHandshake",
    photos: [
      {
        src: "/assets/content/aims/love-and-service.webp",
        alt: "Fostering Seeds of Love and Service",
        title: "Living Love & Service",
        desc: "Devotees practicing the sacred five human values — Sathya, Dharma, Shanti, Prema, and Ahimsa under Maa's divine guidance.",
      },
      {
        src: "/legacy/aims/love.gif",
        alt: "Meditation and discourse session",
        title: "Meditation & Discourse Sessions",
        desc: "Devotees participating in discourses on divine love, courage, and moral fortitude, discovering true joy and inner harmony.",
      },
      {
        src: "/legacy/aims/love2.gif",
        alt: "Spiritual gathering and blessings",
        title: "Divine Satsang with Maa",
        desc: "Beloved Maa guiding the community of devotees towards equal-mindedness, compassionate service, and devotion.",
      },
    ],
    quote:
      "“Love is the seed, courage is the blossom, and peace is the fruit. The love of God and love for God are both eternally sweet and pure.”",
    paragraphs: [
      "Sri Sai Sansthan Charitable Trust, under the presence and guidance of Maa, propagates equal-mindedness among all devotees. Meditation and discourse sessions are held regularly to awaken inner joy, happiness, and moral fortitude.",
      "Under the guided presence of beloved Maa, the Trust helps people develop strong character by inducing in them five eternal human values:",
    ],
    tags: ["Universal Love", "Guided Meditation", "Character Building"],
  },
];

const MISSION_KARUNA_PHOTOS: SevaPhoto[] = [
  {
    src: "/assets/content/mission-karuna/karuna-children-darshan.jpg",
    alt: "Balvikas children walking joyfully in temple darshan",
    title: "Balvikas Children at Temple Darshan",
    desc: "Balvikas children participating in prayers, singing bhajans, and receiving blessings at Satyadeep Sai Universe.",
  },
  {
    src: "/assets/content/mission-karuna/20260521_192740.webp",
    alt: "Balvikas classroom and satsang with beloved Maa",
    title: "Values-Based Learning with Maa",
    desc: "Children receiving moral guidance, human values training, and spiritual mentorship from beloved Maa.",
  },
  {
    src: "/assets/content/aims/mission-karuna-1.webp",
    alt: "Mission Karuna festive celebration with children",
    title: "Festive Celebration & Fellowship",
    desc: "Bringing smiles, education, and dignified support to children in need.",
  },
];

export default async function AimsPage() {
  const [page, mediaMap] = await Promise.all([getPageWithFallback("aims"), getMediaMap()]);
  const resolvedSections: SevaSection[] = SECTIONS.map((sec) => ({
    ...sec,
    photos: sec.photos.map((p) => ({ ...p, src: resolveMediaUrl(mediaMap, p.src) })),
  }));
  const resolvedMissionKarunaPhotos: SevaPhoto[] = MISSION_KARUNA_PHOTOS.map((p) => ({
    ...p,
    src: resolveMediaUrl(mediaMap, p.src),
  }));

  return (
    <section className="mx-auto max-w-7xl px-3.5 pt-6 pb-14 sm:pt-10 sm:pb-20 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
      {/* Compact In-Page Header */}
      <div className="mx-auto max-w-4xl text-center border-b border-maroon-100/80 pb-6 sm:pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          Sri Sai Sansthan Charitable Trust
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          {page.title || "Aims & Objectives"}
        </h1>
        <p className="mt-2 text-[15px] sm:text-[16.5px] leading-relaxed text-stone-600">
          Uniting mankind in sacred action — spiritual awakening, selfless service, and universal love.
        </p>
      </div>

      {/* Landscape Mission Overview Bar */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gold-300/50 bg-linear-to-br from-cream-100/90 via-white to-amber-50/70 p-5 sm:p-8 shadow-xs">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 origin-left divider-festive"
        />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/60 bg-saffron-100/60 px-3 py-1 text-xs font-bold tracking-wider text-saffron-800 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron-500" />
              Guiding Sacred Mission
            </span>
            <h2 className="mt-2.5 font-display text-2xl font-bold text-maroon-900 sm:text-3xl">
              Serving Humanity, Awakening the Divine Within
            </h2>
            <p className="mt-2 text-[14.5px] sm:text-base leading-relaxed text-stone-600">
              Following are the core aims and objectives of Sri Sai Sansthan Charitable Trust.
              Guided by Bhagwan Sri Sai Baba and beloved Maa, every initiative bridges
              spiritual enlightenment with practical compassion for the upliftment of all beings.
            </p>
          </div>

          {/* Quick landscape jump pill row */}
          <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {PILLARS_NAV.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <a
                  key={pillar.id}
                  href={`#${pillar.id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-maroon-100/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-maroon-900 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-saffron-400 hover:bg-saffron-50/70 hover:text-saffron-700"
                >
                  <Icon className="h-3.5 w-3.5 text-saffron-600" />
                  <span>{pillar.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Responsive Grid with Details Dialog & Photo Lightbox */}
      <AimsInteractiveGrid
        sections={resolvedSections}
        missionKarunaPhotos={resolvedMissionKarunaPhotos}
      />

      {/* Explore More Landscape Strip */}
      <div className="border-t border-maroon-100/70 pt-8">
        <p className="mb-4 text-center text-xs font-bold tracking-[0.2em] text-saffron-800 uppercase">
          Discover Satyadeep Sai Universe
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/about"
            className="group flex items-center justify-between rounded-2xl border border-maroon-100 bg-white p-4 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-saffron-400 hover:shadow-xs"
          >
            <div>
              <p className="font-display font-bold text-maroon-900 group-hover:text-saffron-700 transition-colors">
                About the Sansthan
              </p>
              <p className="text-xs text-stone-500">History &amp; Divine Mission</p>
            </div>
            <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-saffron-600 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/universe"
            className="group flex items-center justify-between rounded-2xl border border-maroon-100 bg-white p-4 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-saffron-400 hover:shadow-xs"
          >
            <div>
              <p className="font-display font-bold text-maroon-900 group-hover:text-saffron-700 transition-colors">
                Satyadeep Sai Universe
              </p>
              <p className="text-xs text-stone-500">Sanctum &amp; Sarva Dharma Sthal</p>
            </div>
            <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-saffron-600 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/trust#bank"
            className="group flex items-center justify-between rounded-2xl border border-maroon-100 bg-white p-4 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-saffron-400 hover:shadow-xs"
          >
            <div>
              <p className="font-display font-bold text-maroon-900 group-hover:text-saffron-700 transition-colors">
                Seva Contribution
              </p>
              <p className="text-xs text-stone-500">Bank Transfer &amp; 80G Relief</p>
            </div>
            <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-saffron-600 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
