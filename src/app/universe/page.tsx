import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Compass, Clock, MapPin, ArrowRight, ShieldCheck, Sun, Play } from "lucide-react";
import SpotlightCard from "@/components/motion/SpotlightCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getMediaMap, getSettings, getTimings } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";
import UniverseVideoSection from "./UniverseVideoSection";
import { THURSDAY_NOTE } from "@/lib/thursdayHours";

export const metadata = {
  title: "Satyadeep Sai Universe of Divine Healing · Sai Oracle",
  description:
    "Explore Satyadeep Sai Universe of Divine Healing in Meerut — a sacred sanctuary of peace, divine healing, Sarva Dharma Sthal, and spiritual awakening under the grace of Bhagawan Sri Sathya Sai Baba and Maa.",
};

export default async function UniversePage() {
  const [settings, timings, mediaMap] = await Promise.all([getSettings(), getTimings(), getMediaMap()]);
  const aartis = timings.filter((t) => !/open|clos/i.test(t.label));
  const aartiSummary = aartis.length > 0
    ? aartis.slice(0, 3).map((a) => `${a.label}: ${a.time}`).join(" · ")
    : "Morning, Midday & Evening Daily Aartis";

  const healingPillars = [
    {
      title: "Divine Healing & Spiritual Peace",
      desc: "A sanctuary set apart from worldly distractions, where seekers experience profound inner peace, solace, and spiritual renewal.",
      icon: Sparkles,
      color: "from-amber-500/20 to-orange-500/10 border-amber-300/60",
    },
    {
      title: "Sarva Dharma Sthal",
      desc: "Sabka Malik Ek — 'One Lord for All'. Devotees of every faith, caste, and background come together in universal love and harmony.",
      icon: Compass,
      color: "from-rose-500/20 to-pink-500/10 border-rose-300/60",
    },
    {
      title: "Guided Meditation & Sadhana",
      desc: "Regular meditation camps and satsangs under the guided presence of beloved Maa, awakening inner energy and spiritual evolution.",
      icon: Sun,
      color: "from-yellow-500/20 to-amber-500/10 border-yellow-300/60",
    },
    {
      title: "Selfless Service (Nishkama Seva)",
      desc: "Narayan Seva, child education aid, and medical relief offered with love and devotion at the lotus feet of Bhagawan.",
      icon: Heart,
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-300/60",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-12 sm:space-y-16">
      {/* Compact In-Page Header */}
      <div className="mx-auto max-w-3xl text-center border-b border-maroon-100/80 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          Sacred Sanctum · Meerut Cantt
        </span>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          Satyadeep Sai Universe of Divine Healing
        </h1>
        <p className="mt-2.5 text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          A sanctum of divine love, selfless service, and universal healing in Meerut, blessed by Bhagawan Sri Sathya Sai Baba and guided by Maa.
        </p>
      </div>

      {/* Lead Sanctuary Banner with Front View Photo */}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300 bg-saffron-100/70 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
              A Sacred Sanctuary
            </span>
            <h2 className="font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl leading-tight">
              A Place of Solace, Faith &amp; Divine Grace
            </h2>
            <p className="text-[15.5px] leading-relaxed text-stone-600">
              Satyadeep Sai Universe is a spiritual haven established under the supreme divine inspiration
              of <strong>Bhagawan Sri Sathya Sai Baba</strong> and founded by <strong>Maa</strong>.
              Set apart from the hustle of everyday life, it offers a sacred atmosphere where thousands of
              devotees gather for daily worship, soulful bhajans, deep meditation, and selfless community seva.
            </p>
            <p className="text-[15px] leading-relaxed text-stone-600">
              Here, every seeker is welcomed with open arms. The temple enshrines life-sized murtis of
              Shirdi Sai Baba and Bhagawan Sri Sathya Sai Baba, along with a sacred singhasan for Prema Sai
              and shrines to Maa Durga, Lord Shiva, Radha-Krishna, and Hanuman Ji.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/how-to-reach"
                className="btn-festive inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg"
              >
                <span>Visit Temple &amp; Front View</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about#worship"
                className="inline-flex items-center gap-2 rounded-full border-2 border-maroon-300 bg-white px-5 py-2.5 text-xs font-bold text-maroon-800 hover:bg-maroon-50"
              >
                <span>Daily Aarti Timings</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border-4 border-gold-300/80 bg-white shadow-xl">
              <Image
                src={resolveMediaUrl(mediaMap, "/assets/content/universe/img_7403-copy.webp")}
                alt="Satyadeep Sai Universe of Divine Healing Front View"
                width={1200}
                height={800}
                className="aspect-4/3 w-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent p-6 text-white">
                <p className="text-xs font-bold text-yellow-300 uppercase tracking-widest">
                  Sanctum Sanctorum
                </p>
                <h3 className="font-display text-xl font-bold">
                  Satyadeep Sai Universe Temple Sanctum
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Godwin Estate, NH-58 Roorkee Road, Meerut, UP
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Divine Healing */}
        <div>
          <SectionHeading
            eyebrow="Spiritual Healing"
            title="The Pillars of Satyadeep Sai Universe"
            intro="Awakening peace, divine harmony, and the eternal spirit of selfless love in every heart."
          />
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {healingPillars.map((p) => {
              const Icon = p.icon;
              return (
                <RevealItem key={p.title}>
                  <SpotlightCard className={`h-full rounded-3xl border bg-linear-to-br ${p.color} p-6 shadow-xs flex flex-col justify-between`}>
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs text-saffron-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-maroon-950">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-stone-600">
                        {p.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        {/* Sacred Photo Showcase from Universe Folder */}
        <div className="rounded-3xl border border-maroon-100 bg-cream-50/80 p-8 sm:p-10">
          <SectionHeading
            eyebrow="Darshan Gallery"
            title="Moments from the Universe of Divine Healing"
            intro="Sacred glimpses of our revered deities, sanctum halls, and community satsangs."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-xs">
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/universe/satyadeep-serva-dharm-sthal.jpg")}
                  alt="Satyadeep Sarva Dharma Sthal"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-sm font-bold text-maroon-900">
                  Satyadeep Sarva Dharma Sthal
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Universal Faith Pillar &amp; Harmony</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-xs">
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/universe/sai_baba4_b.webp")}
                  alt="Bhagawan Sri Sathya Sai Baba"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-sm font-bold text-maroon-900">
                  Bhagawan Sri Sathya Sai Baba
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Divine Presence &amp; Eternal Blessings</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-xs">
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/universe/mata-rani-krishna.webp")}
                  alt="Mata Rani & Radha Krishna Darshan"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-sm font-bold text-maroon-900">
                  Divine Deities Darshan
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Radha-Krishna &amp; Mata Rani Sanctum</p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-xs">
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <Image
                  src={resolveMediaUrl(mediaMap, "/assets/content/universe/sssumix.webp")}
                  alt="Devotional Gathering and Abhishek"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-sm font-bold text-maroon-900">
                  Devotees Satsang &amp; Abhishek
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Continuous prayer and sacred vibrations</p>
              </div>
            </div>
          </div>

          {/* Watch Abhishek Videos Heading */}
          <div className="mt-8 flex items-center gap-3 border-t border-maroon-100/70 pt-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 shadow-2xs">
              <Play className="h-5 w-5" fill="currentColor" strokeWidth={0} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-saffron-700">Sacred Videos</p>
              <h3 className="font-display text-lg font-bold text-maroon-900">Watch Abhishek & Satsang</h3>
            </div>
          </div>
          <UniverseVideoSection />
        </div>

        {/* Timings & Visit Strip */}
        <div className="rounded-3xl border-2 border-gold-300 bg-linear-to-r from-amber-50 via-white to-orange-50 p-6 sm:p-8 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-center">
            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700">
                <Clock className="h-4 w-4" />
                Temple Visiting Hours
              </span>
              <h3 className="font-display text-xl font-bold text-maroon-900">
                Open All 7 Days
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                Sanctum Hours: {settings.morning_opening} – {settings.night_closing}
              </p>
              <p className="text-xs font-semibold text-saffron-700">{THURSDAY_NOTE}</p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700">
                <Sparkles className="h-4 w-4" />
                Daily Aarti Schedule
              </span>
              <h3 className="font-display text-sm sm:text-base font-bold text-maroon-900">
                {aartiSummary}
              </h3>
              <p className="text-xs text-stone-600">
                All devotees are warmly invited to take part and receive sacred prasad.
              </p>
            </div>

            <div className="flex sm:justify-end">
              <Link
                href="/how-to-reach"
                className="btn-festive inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:shadow-lg"
              >
                <span>How to Reach &amp; Maps</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
  );
}
