import Link from "next/link";
import Image from "next/image";
import { ArrowIcon } from "@/components/ArrowLink";
import Markdown from "@/components/Markdown";
import SectionHeading from "@/components/SectionHeading";
import TimingsTable from "@/components/TimingsTable";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { getMediaMap, getPage, getSettings, getTimings } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";
import { Clock, MapPin } from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "About Sai Oracle · Sri Sai Sansthan Charitable Trust",
  description:
    "Learn about Sri Sai Sansthan Charitable Trust, Satyadeep Sai Universe, mission, vision, and daily temple worship schedules.",
};

export default async function AboutPage() {
  const [page, mediaMap, timings, settings] = await Promise.all([
    getPage("about"),
    getMediaMap(),
    getTimings(),
    getSettings(),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-12 sm:space-y-16">
      {/* Compact In-Page Header */}
      <div className="mx-auto max-w-3xl text-center border-b border-maroon-100/80 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          ॐ साई राम · Founding Vision
        </span>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          {page?.title ?? "About Sai Oracle"}
        </h1>
        <p className="mt-2.5 text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          A non-political, non-profit family of devotees walking the path of love and service under the guidance of beloved Maa.
        </p>
      </div>

      {/* Main Editorial Story */}
      <div className="mx-auto max-w-3xl">
        <Markdown content={page?.content ?? ""} />
      </div>

        {/* Mission & Vision Cards */}
        <div>
          <SectionHeading eyebrow="Our Compass" title="Mission & Vision" />
          <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Love",
                text: "To practise the Atmic principle — one Self in all beings.",
                color: "bg-gulal-500",
                icon: (
                  <path d="M12 20.5S4 15.4 4 9.6C4 7.1 6 5.2 8.4 5.2c1.6 0 3 .9 3.6 2.1.6-1.2 2-2.1 3.6-2.1 2.4 0 4.4 1.9 4.4 4.4 0 5.8-8 10.9-8 10.9Z" />
                ),
              },
              {
                title: "Service",
                text: "Narayan Seva, education and human values in daily life.",
                color: "bg-saffron-500",
                icon: (
                  <g>
                    <path d="M4 14.5h16a8 8 0 0 1-16 0Z" />
                    <path d="M12 3.5c1.2 1.9 2.5 3.2 2.5 5a2.5 2.5 0 0 1-5 0c0-1.8 1.3-3.1 2.5-5Z" />
                  </g>
                ),
              },
              {
                title: "Unity",
                text: "People of all faiths on one journey to the Divine.",
                color: "bg-peacock-500",
                icon: (
                  <g>
                    <circle cx="9.2" cy="12" r="5.2" />
                    <circle cx="14.8" cy="12" r="5.2" />
                  </g>
                ),
              },
            ].map((c) => (
              <RevealItem key={c.title}>
                <SpotlightCard className="group relative h-full overflow-hidden rounded-2xl border border-maroon-100 bg-white p-5 shadow-sm">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 origin-left scale-x-0 divider-festive transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <span
                    aria-hidden
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${c.color}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      {c.icon}
                    </svg>
                  </span>
                  <p className="mt-3 font-display text-xl font-bold text-maroon-900">{c.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-stone-600">{c.text}</p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* ── An Overview & Sarva Dharma Sthal (From An-Overview.htm) ── */}
        <div id="overview" className="scroll-mt-24 rounded-3xl border-2 border-gold-300/70 bg-linear-to-br from-amber-50/70 via-cream-50/80 to-white p-6 sm:p-9 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
                Sarva Dharma Sthal &amp; Sanctuary
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-maroon-900 leading-snug">
                Satyadeep Sai Universe &amp; Shiv Sai Universe: An Overview
              </h2>
              <p className="text-stone-600 text-[15px] sm:text-[16px] leading-relaxed">
                Satyadeep Sai Universe, Shiv Sai Universe, and Sarva Dharma Sthal is a sacred sanctuary away from
                the ups and downs of daily mundane life, where divine vibrations flow at their fullest.
                It is the eternal presence of <strong>Bhagwan Sri Sathya Sai Baba</strong> and beloved <strong>Maa</strong> that
                makes this place deeply divine.
              </p>
              <p className="text-stone-600 text-sm sm:text-[15px] leading-relaxed">
                The unique discourses and guided meditation camps delivered by beloved Maa help an individual
                discover inner peace, divine joy, and authentic spiritual development. All spiritual aspirants who
                yearn to perform selfless service (Nishkama Seva) are welcomed with open arms.
              </p>
              <div className="rounded-2xl border border-saffron-200 bg-saffron-50/80 p-4 text-xs sm:text-sm text-maroon-950 font-medium">
                <span className="font-bold">Sacred Sanctuary Hours:</span> Visitors and devotees can experience darshan daily from <strong>{settings.morning_opening} to {settings.night_closing}</strong>.
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border-4 border-gold-300/60 shadow-lg bg-white">
                <Image
                  src="/assets/content/archive/public.jpg"
                  alt="Satyadeep Sai Universe Sarva Dharma Sthal"
                  width={600}
                  height={450}
                  className="aspect-4/3 w-full object-cover"
                />
                <div className="p-3.5 bg-linear-to-r from-saffron-50 via-cream-50 to-amber-50 border-t border-maroon-100 text-xs font-bold text-maroon-900 text-center">
                  Sarva Dharma Sthal · Abode of Global Unity &amp; Peace
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Integrated Temple Worship & Timings Section ── */}
        <div id="worship" className="scroll-mt-24 rounded-3xl border border-maroon-100 bg-cream-50/70 p-6 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Temple & Worship"
            title="Darshan & Aarti Timings"
            intro={`The sanctum is open all 7 days from ${settings.morning_opening} to ${settings.night_closing}. All devotees are cordially invited to participate in daily worship.`}
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <TimingsTable timings={timings} />
              <p className="mt-3 text-center text-xs text-stone-500">
                Open {settings.morning_opening} – {settings.night_closing} · All 7 Days
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {/* Visit card */}
              <div id="visit" className="scroll-mt-24 rounded-2xl border border-gold-300/60 bg-white p-5 shadow-2xs text-stone-700">
                <span className="text-[11px] font-bold tracking-wider text-saffron-700 uppercase">
                  Location &amp; Visit Guide
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-maroon-900">
                  Visit the Temple
                </h3>
                <address className="mt-2 text-xs leading-relaxed text-stone-600 not-italic flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-saffron-600 shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </address>

                <p className="mt-2 flex items-center gap-2 text-xs text-stone-600">
                  <Clock className="h-4 w-4 text-saffron-600 shrink-0" />
                  <span>Daily: {settings.morning_opening} – {settings.night_closing}</span>
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {settings.maps_url && (
                    <a
                      href={settings.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-festive inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-xs"
                    >
                      Get Directions
                    </a>
                  )}
                  <Link
                    href="/rules-regulations"
                    className="rounded-full border border-maroon-200 bg-cream-50 px-4 py-2 text-xs font-semibold text-maroon-900 hover:border-saffron-400"
                  >
                    Visiting Etiquette
                  </Link>
                </div>
              </div>

              {/* Direct Contact link */}
              <div className="rounded-2xl border border-maroon-100 bg-white p-4 shadow-2xs flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-maroon-900">Need Guidance?</p>
                  <p className="text-stone-500">Contact the temple office directly</p>
                </div>
                <Link
                  href="/contact"
                  className="font-bold text-saffron-700 hover:text-saffron-800 underline"
                >
                  Contact Office →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Explore More Links */}
        <div>
          <SectionHeading eyebrow="Go Deeper" title="Explore More" />
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                href: "/aims",
                title: "Aims & Objectives",
                text: "Global oneness, Narayan Seva, Mission Karuna and the five human values.",
                color: "bg-maroon-700",
                icon: (
                  <g>
                    <circle cx="12" cy="12" r="7.5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
                  </g>
                ),
              },
              {
                href: "/mission-karuna",
                title: "Mission Karuna",
                text: "Empowering underprivileged children through educational support.",
                color: "bg-saffron-600",
                icon: (
                  <g>
                    <path d="M12 20.5S4 15.4 4 9.6C4 7.1 6 5.2 8.4 5.2c1.6 0 3 .9 3.6 2.1.6-1.2 2-2.1 3.6-2.1 2.4 0 4.4 1.9 4.4 4.4 0 5.8-8 10.9-8 10.9Z" />
                  </g>
                ),
              },
              {
                href: "/experiences",
                title: "Devotee's Experiences",
                text: "Miracles, cures and divine leelas lived by devotees of Bhagwan and Maa.",
                color: "bg-gulal-600",
                icon: (
                  <g>
                    <path d="M11 4l1.6 4.6L17.5 10l-4.9 1.4L11 16l-1.6-4.6L4.5 10l4.9-1.4L11 4Z" />
                    <path d="M18 15.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
                  </g>
                ),
              },
              {
                href: "/social",
                title: "Social Media & Community",
                text: "Stay connected across YouTube, Instagram, Facebook and WhatsApp.",
                color: "bg-peacock-600",
                icon: (
                  <g>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 3.5c2.5 2.4 3.8 5.4 3.8 8.5s-1.3 6.1-3.8 8.5c-2.5-2.4-3.8-5.4-3.8-8.5S9.5 5.9 12 3.5Z" />
                  </g>
                ),
              },
            ].map((c) => (
              <RevealItem key={c.href}>
                <SpotlightCard className="h-full overflow-hidden rounded-2xl border border-maroon-100 bg-white">
                  <Link href={c.href} className="group relative block p-6">
                    <div aria-hidden className="absolute inset-x-0 top-0 divider-festive" />
                    <span
                      aria-hidden
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${c.color}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        {c.icon}
                      </svg>
                    </span>
                    <p className="mt-3 inline-flex items-center gap-1.5 font-display text-2xl font-bold text-maroon-900 group-hover:text-maroon-600">
                      {c.title} <ArrowIcon />
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-stone-600">{c.text}</p>
                  </Link>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
  );
}
