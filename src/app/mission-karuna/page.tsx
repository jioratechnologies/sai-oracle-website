import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  HeartHandshake,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  Award,
  ArrowRight,
  Heart,
  ChevronRight,
} from "lucide-react";
import ArrowLink from "@/components/ArrowLink";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { getMediaMap } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";
import MissionKarunaGallery, { type GalleryPhoto } from "./MissionKarunaGallery";

export const revalidate = 300;

export const metadata = {
  title: "Mission Karuna — Empowering Balvikas Children · Sai Oracle",
  description:
    "Mission Karuna provides educational sponsorship, human values training (Balvikas), and nutritional care for children in need, inspired by Bhagwan Sri Sathya Sai Baba and beloved Maa.",
};

const HUMAN_VALUES = [
  {
    name: "Sathya",
    title: "Truth",
    desc: "Cultivating honesty, sincerity in speech, and purity of thought from an early age.",
    color: "from-peacock-500/15 to-peacock-600/5 border-peacock-200 text-peacock-900",
    badge: "bg-peacock-100 text-peacock-800",
  },
  {
    name: "Dharma",
    title: "Righteousness",
    desc: "Instilling moral duty, respectful conduct towards parents and teachers, and ethical living.",
    color: "from-saffron-500/15 to-saffron-600/5 border-saffron-200 text-saffron-900",
    badge: "bg-saffron-100 text-saffron-800",
  },
  {
    name: "Shanti",
    title: "Peace",
    desc: "Developing inner calmness, meditation (dhyana), emotional balance, and resilience.",
    color: "from-gold-500/15 to-gold-600/5 border-gold-200 text-maroon-900",
    badge: "bg-gold-100 text-maroon-900",
  },
  {
    name: "Prema",
    title: "Love",
    desc: "Unconditional kindness, compassion towards all living beings, and selfless friendship.",
    color: "from-gulal-500/15 to-gulal-600/5 border-gulal-200 text-gulal-900",
    badge: "bg-gulal-100 text-gulal-800",
  },
  {
    name: "Ahimsa",
    title: "Non-Violence",
    desc: "Practicing harmlessness in thought, word, and deed, fostering harmony with nature.",
    color: "from-emerald-500/15 to-emerald-600/5 border-emerald-200 text-emerald-900",
    badge: "bg-emerald-100 text-emerald-800",
  },
];

const IMPACT_HIGHLIGHTS = [
  {
    icon: GraduationCap,
    label: "Values & Academics",
    desc: "Blending school syllabus with Balvikas human values and moral education.",
  },
  {
    icon: ShieldCheck,
    label: "80G Tax Relief",
    desc: "All contributions eligible for tax deduction under Section 80G of the IT Act.",
  },
  {
    icon: Users,
    label: "Equal Care for All",
    desc: "Open to every child irrespective of caste, colour, creed, religion, or background.",
  },
  {
    icon: HeartHandshake,
    label: "100% Nishkama Seva",
    desc: "Administered purely as selfless service to the Divine without overhead deductions.",
  },
];

export default async function MissionKarunaPage() {
  const mediaMap = await getMediaMap();

  // Curated, verified authentic photos of Balvikas children and seva with beloved Maa
  const galleryPhotos: GalleryPhoto[] = [
    {
      src: resolveMediaUrl(mediaMap, "/assets/content/mission-karuna/karuna-children-darshan.jpg"),
      alt: "Balvikas children walking in temple darshan",
    },
    {
      src: resolveMediaUrl(mediaMap, "/assets/content/mission-karuna/20260521_192740.webp"),
      alt: "Balvikas children in satsang class with beloved Maa",
    },
    {
      src: resolveMediaUrl(mediaMap, "/assets/content/mission-karuna/dsc_0205.webp"),
      alt: "Special care school children visiting temple with beloved Maa",
    },
    {
      src: resolveMediaUrl(mediaMap, "/assets/content/mission-karuna/photo140-1.webp"),
      alt: "Children gathered joyfully with beloved Maa",
    },
    {
      src: resolveMediaUrl(mediaMap, "/assets/content/aims/mission-karuna-1.webp"),
      alt: "Children celebrating festive occasion with beloved Maa",
    },
    {
      src: resolveMediaUrl(mediaMap, "/assets/content/aims/mission-karuna-3.webp"),
      alt: "Youth and children gathered at beloved Maa's feet in temple",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8 space-y-8 sm:space-y-12">
      {/* ── Breadcrumb: Clean, wraps gracefully on mobile ── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500">
        <Link href="/" className="hover:text-saffron-700 transition-colors py-1">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 shrink-0 text-stone-400" />
        <Link href="/aims" className="hover:text-saffron-700 transition-colors py-1">
          Aims &amp; Objectives
        </Link>
        <ChevronRight className="h-3 w-3 shrink-0 text-stone-400" />
        <span className="font-semibold text-maroon-900 truncate">Mission Karuna</span>
      </nav>

      {/* ── Hero Header: Mobile-First Stacking with Satyadeep Sai Image ── */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gold-300/80 bg-linear-to-br from-cream-100/90 via-white to-amber-50/70 p-4 sm:p-7 lg:p-9 shadow-xs">
        <div aria-hidden className="absolute inset-x-0 top-0 origin-left divider-festive" />

        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-100/70 px-3 py-1 text-[11px] sm:text-xs font-bold text-saffron-800 uppercase tracking-wider">
              <GraduationCap className="h-3.5 w-3.5 text-saffron-600 shrink-0" />
              Sacred Cause · Educational Seva
            </span>

            <h1 className="font-display text-2xl font-extrabold text-maroon-900 sm:text-4xl lg:text-5xl leading-tight">
              Mission Karuna
            </h1>

            <p className="font-display text-base sm:text-xl font-bold text-saffron-800 leading-snug">
              Empowering Balvikas Children — Cultivating Values, Knowledge &amp; Lifelong Dignity
            </p>

            <p className="text-[14.5px] sm:text-[16px] leading-relaxed text-stone-600">
              Launched by beloved Maa under the divine inspiration of Bhagwan Sri Sathya Sai Baba,
              <strong> Mission Karuna</strong> is dedicated to sponsoring education, providing wholesome
              nutrition, and nurturing human values (Balvikas) for children in need — completely
              irrespective of caste, colour, creed, or religion.
            </p>

            {/* Action CTA Buttons: Full width on mobile, inline on tablet+ */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <ArrowLink
                href="/trust#bank"
                variant="solid"
                className="btn-festive text-white shadow-xs px-6 py-3 text-center justify-center font-bold text-sm"
              >
                Support Mission Karuna (Bank Transfer)
              </ArrowLink>

              <ArrowLink
                href="/aims"
                variant="outline"
                className="border-maroon-300 text-maroon-900 hover:border-saffron-500 hover:bg-saffron-50 hover:text-saffron-800 px-5 py-3 text-center justify-center text-sm font-semibold"
              >
                All Aims &amp; Objectives
              </ArrowLink>
            </div>
          </div>

          {/* Satyadeep Sai Altar Image */}
          <div className="lg:col-span-5">
            <div className="group relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl border-2 border-gold-300/80 shadow-md">
              <Image
                src={resolveMediaUrl(mediaMap, "/assets/content/universe/sai_baba4_b.webp")}
                alt="Satyadeep Sai Baba Sanctum Sanctorum"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-linear-to-t from-maroon-950/75 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-display text-sm font-bold text-cream-100">
                  Bhagwan Sri Sathya Sai Baba
                </p>
                <p className="text-[11px] text-cream-200/90">
                  Satyadeep Sai Universe — Divine Guide &amp; Inspiration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Key Impact Highlights: Mobile-First Grid (1 col on mobile, 2 col sm, 4 col lg) ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {IMPACT_HIGHLIGHTS.map((item) => {
          const Icon = item.icon;
          return (
            <SpotlightCard
              key={item.label}
              className="rounded-2xl border border-gold-200/80 bg-white p-4 sm:p-5 shadow-2xs"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-saffron-100 text-saffron-800">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold text-maroon-900">{item.label}</h4>
                  <p className="mt-0.5 text-xs text-stone-600 leading-snug">{item.desc}</p>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* ── Featured Visual & Story: Stacks cleanly on mobile ── */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-10 lg:items-center">
        {/* Visual Card */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gold-300/80 shadow-md">
            <Image
              src={resolveMediaUrl(mediaMap, "/assets/content/mission-karuna/karuna-children-darshan.jpg")}
              alt="Balvikas children walking joyfully in temple darshan"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 540px"
              className="object-cover"
            />
          </div>

          {/* Sacred Quote Card */}
          <blockquote className="rounded-2xl border-l-4 border-saffron-500 bg-saffron-50/80 p-3.5 sm:p-4 text-xs sm:text-sm italic leading-relaxed text-maroon-950 shadow-2xs">
            &ldquo;Children are the most precious trust given to humanity. Train them in character,
            truth, and selfless service, and they will transform the world.&rdquo;
            <span className="block mt-1 font-semibold text-saffron-800 not-italic text-[11px]">
              — Bhagwan Sri Sathya Sai Baba
            </span>
          </blockquote>
        </div>

        {/* Story & Philosophy */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300 bg-saffron-100/70 px-3 py-0.5 text-xs font-bold text-saffron-800 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-saffron-600 shrink-0" />
            The Vision of Beloved Maa
          </span>

          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-maroon-900 leading-snug">
            Nurturing Young Minds with Character &amp; Compassion
          </h2>

          <div className="space-y-3 text-[14.5px] sm:text-base leading-relaxed text-stone-600">
            <p>
              Under the divine guidance of Bhagwan Sri Sathya Sai Baba, beloved Maa launched
              <strong> Mission Karuna</strong> with a deep conviction: true charity lies in providing
              children with the education and spiritual foundation they need to stand proudly on
              their own feet.
            </p>
            <p>
              At <strong>Satyadeep Sai Baba Charitable School</strong>, operating five days a week,
              children receive free quality schooling alongside moral guidance. They are taught that
              honesty, compassion, and respect are just as vital as academic success.
            </p>
            <p>
              Through Mission Karuna, the Trust ensures that every child receives school fees,
              uniforms, textbooks, learning kits, and nourishing prasad — removing every obstacle in
              their educational path.
            </p>
          </div>

          <div className="rounded-2xl border border-maroon-100 bg-cream-50/80 p-3.5 sm:p-4 text-xs sm:text-sm text-maroon-950 font-medium">
            <span className="font-bold text-saffron-800">Our Core Objective:</span> Ensuring every
            child grows with self-respect, moral courage, and practical capabilities to lead an
            independent, honourable life.
          </div>
        </div>
      </div>

      {/* ── Five Human Values Section (Balvikas Core): Mobile-first cards ── */}
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto px-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300 bg-saffron-100/80 px-3 py-0.5 text-xs font-bold text-saffron-800 uppercase tracking-wider">
            <Award className="h-3.5 w-3.5 text-saffron-600 shrink-0" />
            The Foundation of Balvikas
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-maroon-900">
            The Five Eternal Human Values
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            In Mission Karuna, character building rests on these five timeless pillars:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 sm:gap-4">
          {HUMAN_VALUES.map((val) => (
            <SpotlightCard
              key={val.name}
              className={`rounded-2xl border bg-linear-to-b p-4 flex flex-col justify-between shadow-2xs ${val.color}`}
            >
              <div>
                <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase ${val.badge}`}>
                  {val.title}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold">{val.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-700">{val.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* ── Photo Gallery: Mobile-First & Image-Only (No text boxes) ── */}
      <MissionKarunaGallery photos={galleryPhotos} />

      {/* ── Pathways to Support: Mobile-First Cards ── */}
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto px-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Heart className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            Sacred Nishkama Seva
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-maroon-900">
            How You Can Support Balvikas Children
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Join hands with beloved Maa in transforming young lives. Every contribution directly
            empowers a child&apos;s education and wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {/* Card 1: School Sponsorship */}
          <SpotlightCard className="rounded-2xl sm:rounded-3xl border border-gold-300/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-800">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-maroon-900">
                Educational Sponsorship
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Sponsor school tuition and examination fees for young learners, enabling them to
                continue their studies without interruption.
              </p>
            </div>
            <Link
              href="/trust#bank"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-saffron-800 hover:text-saffron-950 transition-colors pt-2"
            >
              <span>Transfer via Bank</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </SpotlightCard>

          {/* Card 2: Learning Materials & Uniforms */}
          <SpotlightCard className="rounded-2xl sm:rounded-3xl border border-gold-300/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-100 text-maroon-900">
                <BookOpen className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-maroon-900">
                Books &amp; Learning Kits
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Provide essential textbooks, notebooks, school bags, pens, and school uniforms for
                Balvikas children each academic year.
              </p>
            </div>
            <Link
              href="/trust#bank"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-saffron-800 hover:text-saffron-950 transition-colors pt-2"
            >
              <span>Transfer via Bank</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </SpotlightCard>

          {/* Card 3: Daily Nutrition */}
          <SpotlightCard className="rounded-2xl sm:rounded-3xl border border-gold-300/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gulal-100 text-gulal-800">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-maroon-900">
                Narayan Seva (Nutrition)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Support healthy daily meals, fruits, and nutritious sanctified prasad for growing
                children during classes and temple gatherings.
              </p>
            </div>
            <Link
              href="/trust#bank"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-saffron-800 hover:text-saffron-950 transition-colors pt-2"
            >
              <span>Transfer via Bank</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </SpotlightCard>
        </div>
      </div>

      {/* ── Bank Details & 80G Call to Action Banner: Mobile-First Responsive ── */}
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gold-400/80 bg-linear-to-br from-cream-100 via-white to-amber-50 p-4 sm:p-8 lg:p-10 shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              50% Tax Relief under Section 80G
            </span>
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-maroon-900 leading-snug">
              Offer Your Support Directly via Bank Transfer
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Sri Sai Sansthan Charitable Trust is recognized under Section 80G of the Income Tax
              Act 1961. Donors receive an official 80G tax receipt for their voluntary seva offerings.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/trust#bank"
              className="btn-festive inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all"
            >
              <Building2 className="h-4 w-4 text-gold-300 shrink-0" />
              <span>Official Bank Details</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-maroon-200 bg-white px-5 py-3 text-sm font-bold text-maroon-900 hover:border-saffron-500 hover:bg-saffron-50 transition-all"
            >
              Contact Temple
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
