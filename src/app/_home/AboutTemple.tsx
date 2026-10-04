import Image from "next/image";
import Link from "next/link";
import { Heart, HandHeart, Globe2, Sparkles, ArrowRight, Clock } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { resolveMediaUrl } from "@/lib/image";
import { getMediaMap, getSettings, getTimings } from "@/lib/site";

export default async function AboutTemple() {
  const [mediaMap, settings, timings] = await Promise.all([
    getMediaMap(),
    getSettings(),
    getTimings(),
  ]);
  const aartiCount = timings.filter((t) => /aarti/i.test(t.label)).length || 3;

  const pillars = [
    {
      title: "Love",
      subtitle: "Universal Teachings",
      desc: "Honor the sacred teachings of Bhagwan Sri Sathya Sai Baba — Love All, Serve All, and walk the path of inner peace.",
      href: "/gurumaa?tab=teachings",
      color: "bg-rose-50 border-rose-200 text-rose-800",
      badge: "Teachings",
      icon: Heart,
    },
    {
      title: "Service",
      subtitle: "Mission Karuna",
      desc: "Selfless service to humanity through child education aid, Narayan Seva, healthcare support, and compassion.",
      href: "/mission-karuna",
      color: "bg-saffron-50 border-saffron-200 text-saffron-800",
      badge: "Seva",
      icon: HandHeart,
    },
    {
      title: "Meditation",
      subtitle: "Jyoti Dhyana Practice",
      desc: "Sacred flame meditation technique guided by beloved Maa to discover inner peace and Atmic bliss.",
      href: "/gurumaa?tab=meditation",
      color: "bg-emerald-50 border-emerald-200 text-emerald-800",
      badge: "Dhyana",
      icon: Sparkles,
    },
    {
      title: "Unity",
      subtitle: "Divine Discourses",
      desc: "Global Oneness — realizing the divine light in every heart beyond caste, creed, religion, and nation.",
      href: "/gurumaa?tab=discourses",
      color: "bg-amber-50 border-amber-200 text-amber-800",
      badge: "Discourses",
      icon: Globe2,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal y={28} className="order-2 lg:order-1">
          <SectionHeading
            align="left"
            eyebrow="Temple of Devotion & Oneness"
            title="A Temple of Love, Service & Unity"
          />
          <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-stone-600">
            Satyadeep Sai Organisation, founded by beloved Maa under the divine inspiration of Bhagwan
            Sri Sathya Sai Baba, is a non-political, non-profit spiritual sanctuary. We are dedicated
            to awakening divine love, upholding selfless service, and fostering universal harmony across
            all humanity.
          </p>

          {/* Three Sub-Pillars: Love, Service, Unity */}
          <div className="mt-6 space-y-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.title}
                  href={p.href}
                  className={`group flex items-center justify-between rounded-2xl border p-3.5 sm:p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm ${p.color}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-2xs">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-stone-900 text-base">
                          {p.title}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                          — {p.subtitle}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5 line-clamp-1">{p.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-stone-700" />
                </Link>
              );
            })}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="btn-festive min-h-11 rounded-full px-6 py-2.5 font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
            >
              Read Our Story
            </Link>
            <Link
              href="/about#worship"
              className="min-h-11 rounded-full border-2 border-maroon-300 px-6 py-2.5 font-bold text-maroon-800 transition-colors hover:bg-maroon-50"
            >
              Temple &amp; Worship Timings
            </Link>
          </div>

          <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-maroon-100 pt-5">
            {[
              ["Love All", "Serve All"],
              [`${aartiCount} Daily`, "Aartis"],
              ["7 Days", `Open ${settings.morning_opening} – ${settings.night_closing} (Thu till 10:00 PM)`],
            ].map(([big, small]) => (
              <div key={big + small}>
                <dt className="sr-only">{big}</dt>
                <dd className="font-display text-lg sm:text-xl leading-tight font-extrabold text-maroon-900">
                  {big}
                </dd>
                <dd className="text-xs text-stone-500 mt-0.5">{small}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal y={28} delay={0.08} className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2">
          <span className="btn-festive absolute -top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide text-white uppercase shadow-lg">
            <Sparkles aria-hidden className="h-3.5 w-3.5" />
            Love · Service · Unity
          </span>
          <div className="overflow-hidden rounded-3xl border-4 border-gold-400/60 shadow-lg bg-white">
            <Image
              src={resolveMediaUrl(
                mediaMap,
                "/assets/content/home/love-and-service-main-page-photo.webp"
              )}
              alt="Temple of Love, Service and Devotion at Satyadeep Sai"
              width={1040}
              height={780}
              sizes="(max-width: 1024px) 90vw, 520px"
              className="aspect-4/3 w-full object-cover"
              priority
            />
          </div>
          <div className="absolute -right-3 -bottom-6 w-36 overflow-hidden rounded-2xl shadow-xl ring-4 ring-cream-50 sm:-right-6 sm:w-44 bg-white">
            <Image
              src={resolveMediaUrl(mediaMap, "/assets/content/universe/sai_baba4_b.webp")}
              alt="Bhagwan Sri Sathya Sai Baba"
              width={384}
              height={300}
              sizes="176px"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 hidden rounded-2xl border border-maroon-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:block">
            <p className="flex items-center gap-1.5 font-display text-lg leading-none font-extrabold text-maroon-900">
              <Clock aria-hidden className="h-4 w-4 text-saffron-600" />
              {settings.morning_opening}
            </p>
            <p className="mt-1 text-xs text-stone-500">Opens Daily · 7 Days</p>
            <p className="mt-0.5 text-xs font-semibold text-saffron-700">Thursdays till 10:00 PM</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
