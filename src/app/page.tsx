import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Clock,
  Mail,
  Phone,
  Play,
  Flame,
  Calendar,
  ChevronRight,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import ArrowLink, { ArrowIcon } from "@/components/ArrowLink";
import HeroCarousel from "@/components/HeroCarousel";
import SectionHeading from "@/components/SectionHeading";
import VideoCard from "@/components/VideoCard";
import SocialLinks, { buildSocialLinks } from "@/components/SocialLinks";
import Testimonials from "@/components/Testimonials";
import DeitiesSection from "@/components/DeitiesSection";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import {
  getAnnouncements,
  getExperiences,
  getGallery,
  getHeroSlides,
  getMediaMap,
  getSettings,
  getTimings,
  getUpcomingEvents,
  getVideos,
} from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";
import { DEFAULT_SLIDES } from "@/lib/heroSlides";
import { formatEventDate, formatTime } from "@/lib/format";
import { seedEvents, seedTimings } from "@/lib/seed";
import type { AartiTiming } from "@/lib/types";
import GalleryPreview from "./_home/GalleryPreview";
import SevaServices from "./_home/SevaServices";
import AboutTemple from "./_home/AboutTemple";
import { THURSDAY_NOTE } from "@/lib/thursdayHours";

export const revalidate = 60;

const AARTI_DESCRIPTIONS: Record<string, string> = {
  Kakad: "Dawn awakening of the Lord — begin the day at Baba's feet.",
  Morning: "Morning prayers, bhajans and sacred offerings at the sanctum.",
  Madhyan: "Midday worship and offerings in the sanctum.",
  Afternoon: "Midday worship and offerings in the sanctum.",
  Dhoop: "Evening lamp worship with bhajans and Naam Smaranam.",
  Evening: "Evening lamp worship with bhajans and Naam Smaranam.",
  Shej: "Night rest ceremony and prasad distribution.",
  Night: "Night rest ceremony and prasad distribution.",
  Opening: "Temple doors open for morning darshan and prayer.",
  Closing: "Temple sanctum closing after night aarti.",
};

export default async function Home() {
  const [settings, events, timings, announcements, videos, gallery, savedSlides, mediaMap] =
    await Promise.all([
      getSettings(),
      getUpcomingEvents(3),
      getTimings(),
      getAnnouncements(3),
      getVideos(3),
      getGallery(6),
      getHeroSlides(),
      getMediaMap(),
    ]);
  const experiences = getExperiences();
  const rawSlides = savedSlides && savedSlides.length > 0 ? savedSlides : DEFAULT_SLIDES;
  const heroSlides = rawSlides.map((s) => ({
    ...s,
    src: resolveMediaUrl(mediaMap, s.src),
  }));

  // Render all active temple timings configured in Admin
  const displayTimings = timings.length > 0 ? timings : seedTimings;
  const aartiRows = displayTimings.map((t, i) => {
    const key = Object.keys(AARTI_DESCRIPTIONS).find((k) =>
      t.label.toLowerCase().includes(k.toLowerCase())
    );
    let desc = "Daily worship at the sanctum — all devotees welcome.";
    if (key && AARTI_DESCRIPTIONS[key]) {
      desc = AARTI_DESCRIPTIONS[key];
    } else if (/open/i.test(t.label)) {
      desc = "Sanctum gates open for morning darshan and prayer.";
    } else if (/clos/i.test(t.label)) {
      desc = "Sanctum gates close after evening prayers and Shej Aarti.";
    }
    return {
      ...t,
      desc,
      accent: [
        "text-white bg-linear-to-br from-amber-500 to-orange-600 shadow-[0_2px_12px_rgba(251,146,60,0.45)]",
        "text-white bg-linear-to-br from-rose-500 to-red-600 shadow-[0_2px_12px_rgba(244,63,94,0.45)]",
        "text-white bg-linear-to-br from-sky-500 to-blue-600 shadow-[0_2px_12px_rgba(56,189,248,0.45)]",
        "text-white bg-linear-to-br from-violet-600 to-purple-700 shadow-[0_2px_12px_rgba(139,92,246,0.45)]",
        "text-white bg-linear-to-br from-slate-600 to-stone-700 shadow-[0_2px_12px_rgba(100,116,139,0.45)]",
        "text-white bg-linear-to-br from-fuchsia-500 to-pink-600 shadow-[0_2px_12px_rgba(217,70,239,0.45)]",
      ][i % 6],
    };
  });

  const openingTime =
    timings.find((t) => /open/i.test(t.label))?.time ??
    timings[0]?.time ??
    settings.morning_opening;

  // Dynamic Featured Event (connects to live events from DB, falling back to seedEvents[0])
  const featuredEvent = events[0] || seedEvents[0];
  const featuredDate = featuredEvent.event_date ? formatEventDate(featuredEvent.event_date) : "23 Nov 2026";
  const featuredImage = resolveMediaUrl(
    mediaMap,
    featuredEvent.image_url || "/assets/content/universe/sai_baba4_b.webp"
  );
  const featuredTime = featuredEvent.start_time
    ? `${formatTime(featuredEvent.start_time)} onwards`
    : "5:00 PM onwards";
  const featuredVenue =
    featuredEvent.location ||
    "Satyadeep Sai baba temple, NH-58, Godwin Estate, Roorkee Road, Meerut, UP";
  const featuredLink = featuredEvent.slug ? `/events/${featuredEvent.slug}` : "/events";

  return (
    <>
      <HeroCarousel
        organizationName={settings.organization_name}
        tagline={settings.tagline}
        openingTime={openingTime}
        slides={heroSlides}
      />

      {/* ── Quick seva services ── */}
      <SevaServices />

      {/* ── Welcome / About Temple ── */}
      <AboutTemple />

      {/* ── Sacred stories from the temple ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-14">
        <RevealGroup className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {[
            {
              src: resolveMediaUrl(mediaMap, "/assets/temple/other/20250112_182623.webp"),
              alt: "Children at the temple during Mission Karuna outreach",
              eyebrow: "Sacred Cause",
              eyebrowColor: "text-saffron-600",
              title: "Mission Karuna",
              text: "Empowering Balvikas children through education — helping them grow in human values and build their future with dignity.",
              href: "/mission-karuna",
            },
            {
              src: resolveMediaUrl(mediaMap, "/legacy/home/Pujniye_maa.webp"),
              alt: "Maa",
              eyebrow: "Our Guide",
              eyebrowColor: "text-gulal-600",
              title: "Miraculous Life of Maa",
              text: "Guru — Gu (darkness) and Ru (light): the preceptor who leads us from darkness to light, under Baba's blessings.",
              href: "/experiences?tab=miracles",
            },
          ].map((c) => (
            <RevealItem key={c.title}>
              <SpotlightCard className="h-full overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <Link href={c.href} className="group block">
                  <div className="relative">
                    <Image
                      src={c.src}
                      alt={c.alt}
                      width={768}
                      height={400}
                      sizes="(max-width: 768px) 90vw, 360px"
                      className="aspect-19/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div aria-hidden className="absolute inset-x-0 top-0 divider-festive" />
                  </div>
                  <div className="p-5">
                    <p className={`text-xs font-bold tracking-[0.2em] uppercase ${c.eyebrowColor}`}>
                      {c.eyebrow}
                    </p>
                    <h3 className="mt-1 font-display text-[22px] leading-snug font-bold text-maroon-900 group-hover:text-maroon-600">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{c.text}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-saffron-600 group-hover:text-saffron-500">
                      Read more <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ── Deities of the temple ── */}
      <DeitiesSection />

      {/* ── Consolidated Temple Worship & Updates Hub (Premium Revamp) ── */}
      <section id="worship" className="relative mx-auto max-w-[1360px] px-4 py-16 sm:py-20 lg:py-24">
        {/* Sacred Decorative Background */}
        <div className="absolute inset-0 bg-linear-to-br from-cream-100 via-white to-amber-50/40 rounded-[3rem] -z-10 shadow-sm border border-maroon-50" />
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold-200 to-transparent opacity-50" />
        
        <SectionHeading
          eyebrow="Temple Life"
          title="Daily Worship & Updates"
          intro={`Open all 7 days from ${settings.morning_opening} to ${settings.night_closing} (${THURSDAY_NOTE}). Join us in the sacred rhythm of daily aartis and community seva.`}
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start px-2 sm:px-6">
          {/* Left Column: Daily Aarti Schedule (Premium Grid) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gold-200/60">
              <span className="text-[13px] font-black tracking-[0.2em] text-saffron-700 uppercase flex items-center gap-2">
                <Flame className="h-4 w-4 text-gold-500 animate-pulse" />
                Daily Aarti Schedule
              </span>
              <span className="text-[11px] font-semibold text-stone-400 tracking-widest uppercase">Sanctum Sanctorum</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aartiRows.map((a) => (
                <SpotlightCard
                  key={a.id}
                  className="group relative rounded-2xl border border-maroon-100/60 bg-white/70 backdrop-blur-md p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gold-300/80 flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-gold-100/30 to-transparent rounded-full blur-2xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-lg font-bold text-maroon-900 group-hover:text-maroon-700 transition-colors">
                        {a.label}
                      </h4>
                      <span
                        className={`rounded-xl px-3 py-1.5 text-[12px] font-black shrink-0 tracking-wide transition-all group-hover:scale-105 group-hover:shadow-lg ${a.accent}`}
                      >
                        {a.time}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-stone-600 font-medium">{a.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-maroon-50/80 flex items-center justify-between text-[11px] relative z-10">
                    <span className="text-stone-400 font-medium">All devotees welcome</span>
                    <Link
                      href="/about#worship"
                      className="inline-flex items-center gap-1.5 rounded-full bg-saffron-50 border border-saffron-200 px-3 py-1 text-[11px] font-bold text-saffron-700 hover:bg-saffron-100 hover:border-saffron-300 transition-all group-hover:shadow-sm active:scale-95"
                    >
                      Aarti guide <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </SpotlightCard>
              ))}
            </div>

            {/* Quick Timing Summary Strip - Glowing Gold */}
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-linear-to-r from-saffron-700 via-amber-500 to-gold-400 p-4 sm:px-6 sm:py-4 text-sm text-white shadow-lg ring-1 ring-gold-400/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col gap-0.5 relative z-10">
                <span className="flex items-center gap-3 font-semibold">
                  <Clock className="h-5 w-5 text-white/90 shrink-0" />
                  <span className="tracking-wide">
                    <span className="text-amber-100 font-bold">Temple Hours:</span> {settings.morning_opening} – {settings.night_closing} <span className="opacity-80 text-xs ml-1">(Daily)</span>
                  </span>
                </span>
                <p className="text-xs text-amber-100/90 font-medium pl-8">
                  {THURSDAY_NOTE}.
                </p>
              </div>
              <Link
                href="/how-to-reach"
                className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-rose-500 to-pink-600 px-4 py-1.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg hover:from-rose-400 hover:to-pink-500 active:scale-95 shrink-0 relative z-10"
              >
                Directions &amp; Map <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Events & Announcements (Premium UI) */}
          <div id="announcements" className="lg:col-span-5 space-y-5 scroll-mt-32">
            <div className="flex items-center justify-between pb-3 border-b border-gold-200/60">
              <span className="text-[13px] font-black tracking-[0.2em] text-saffron-700 uppercase flex items-center gap-2">
                <Bell className="h-4 w-4 text-gold-500 animate-pulse" />
                Latest Announcements
              </span>
              <Link href="/events" className="inline-flex items-center gap-1 rounded-full bg-white border border-maroon-100 px-3 py-1.5 text-[10px] font-black text-maroon-800 uppercase tracking-widest shadow-2xs hover:bg-saffron-50 hover:text-saffron-700 hover:border-saffron-200 transition-all active:scale-95">
                All Events <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Premium Featured Event Card */}
            {featuredEvent && (
              <SpotlightCard className="group relative overflow-hidden rounded-[1.5rem] border border-maroon-900 bg-maroon-950 shadow-2xl p-0 transition-transform duration-500 hover:-translate-y-1">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pattern-jali mix-blend-overlay" />
                
                <div className="relative z-10 p-5 sm:p-6">
                  <div className="flex items-center justify-between border-b border-maroon-800 pb-4 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/20 border border-gold-400/30 px-3 py-1 text-[10px] font-black text-gold-200 uppercase tracking-widest shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                      Upcoming Sacred Event
                    </span>
                    <span className="text-[11px] font-bold text-gold-400 tracking-wider uppercase">{featuredDate}</span>
                  </div>
                  
                  <div className="flex gap-4 sm:gap-5 items-start">
                    <div className="relative h-28 w-24 sm:h-32 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-maroon-700 shadow-xl">
                      <Image
                        src={featuredImage}
                        alt={featuredEvent.title}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <h4 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                        {featuredEvent.title}
                      </h4>
                      <p className="text-[13px] text-maroon-100/80 leading-relaxed line-clamp-3">
                        {featuredEvent.description || "Join us in celebrating this sacred occasion at the temple."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-maroon-800/80 text-[12px] text-maroon-200/90 space-y-1.5">
                    <p className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-gold-400" /> <strong>Timing:</strong> {featuredTime}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-gold-400"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      </span>
                      <span className="truncate"><strong>Venue:</strong> {featuredVenue}</span>
                    </p>
                  </div>
                  
                  <div className="mt-5">
                    <Link
                      href={featuredLink}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-2.5 text-[13px] font-bold text-maroon-950 shadow-md transition-all hover:bg-gold-300 active:scale-95"
                    >
                      View Event Details <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            )}

            {/* Subsequent Upcoming Events List */}
            {events.length > 1 && (
              <div className="space-y-3">
                {events.slice(1, 3).map((e) => {
                  const dParts = e.event_date ? e.event_date.split("-") : [];
                  const monthName = e.event_date
                    ? new Date(e.event_date + "T00:00:00").toLocaleDateString("en-IN", { month: "short" })
                    : "Event";
                  const dayNum = dParts[2] || "--";

                  return (
                    <Link
                      key={e.id}
                      href={e.slug ? `/events/${e.slug}` : "/events"}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-maroon-100/80 bg-white/70 backdrop-blur-sm p-3 shadow-2xs transition-all hover:border-gold-300 hover:shadow-md hover:bg-white"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="flex flex-col items-center justify-center rounded-xl bg-linear-to-br from-saffron-50 to-orange-100 border border-saffron-200 px-3 py-1.5 text-center shrink-0 shadow-inner">
                          <span className="text-[10px] font-black text-saffron-600 uppercase tracking-wider leading-none">
                            {monthName}
                          </span>
                          <span className="text-[15px] font-extrabold text-maroon-900 leading-tight">
                            {dayNum}
                          </span>
                        </span>
                        <div className="min-w-0">
                          <h5 className="font-display text-[14px] font-bold text-maroon-950 truncate group-hover:text-maroon-700 transition-colors">
                            {e.title}
                          </h5>
                          <p className="text-[12px] text-stone-500 truncate font-medium mt-0.5">
                            {e.start_time ? `${formatTime(e.start_time)} · ` : ""}
                            {e.location || "Temple Sanctum"}
                          </p>
                        </div>
                      </div>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-100 text-saffron-600 shrink-0 group-hover:bg-saffron-100 group-hover:text-saffron-700 transition-all">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Announcements List */}
            <div className="space-y-3 pt-2">
              {announcements.length > 0 &&
                announcements.map((a) => (
                  <article
                    key={a.id}
                    className="group rounded-2xl border border-dashed border-maroon-200 bg-cream-50/50 p-4 transition-all hover:border-solid hover:border-saffron-300 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-[14px] font-bold text-maroon-900 group-hover:text-maroon-700">
                        {a.title}
                      </h4>
                      <span className="rounded-full border border-maroon-100 bg-white px-2.5 py-0.5 text-[10px] font-bold text-stone-500 uppercase tracking-wider shrink-0 shadow-2xs">
                        Notice
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-stone-600 font-medium">{a.content}</p>
                  </article>
                ))}

              {/* Temple Helpdesk Card (Refined) */}
              <div className="rounded-2xl bg-linear-to-br from-stone-50 to-cream-50 border border-stone-200 p-4 shadow-2xs mt-2 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 opacity-10">
                  <Phone className="h-24 w-24 -mb-6 -mr-6 text-stone-900" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-bold text-stone-800">Temple Helpdesk</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Open 7 Days</span>
                  </div>
                  <div className="text-[12px] space-y-1 text-stone-600 font-medium">
                    {settings.phone && <p>WhatsApp / Call: <span className="text-stone-800">{settings.phone}</span></p>}
                    {settings.email && <p>Email: <span className="text-stone-800">{settings.email}</span></p>}
                  </div>
                  <div className="mt-3 pt-3 border-t border-stone-200/80">
                    <Link href="/contact" className="inline-flex items-center gap-1 text-[12px] font-bold text-saffron-700 hover:text-saffron-600">
                      Contact Temple Office <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Unified Spiritual Sanctuary Banner (Maa's Message + Instagram Highlight) ── */}
      <section className="section-dawn relative overflow-hidden py-14 border-y border-maroon-100/70">
        <div aria-hidden className="pattern-jali absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-12">
            {/* Left: Maa's Wisdom */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/60 bg-saffron-100/70 px-3 py-1 text-xs font-bold tracking-wider text-saffron-800 uppercase">
                Maa&apos;s Divine Message
              </span>
              <blockquote className="mt-4 font-display text-2xl leading-relaxed font-bold text-red-700 sm:text-3xl">
                &ldquo;Love all, serve all. Every act of service offered with a pure heart reaches
                Baba&apos;s lotus feet.&rdquo;
              </blockquote>
              <p className="mt-2 text-stone-600 text-sm">
                Under the supreme guidance of beloved Maa, devotees walk the sacred path of
                spiritual awakening, universal love, and selfless service.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/gurumaa-life-sketch"
                  className="rounded-full border border-maroon-300 bg-white/90 px-5 py-2 text-xs font-bold text-maroon-900 transition-colors hover:border-saffron-500 hover:bg-saffron-50 hover:text-saffron-800"
                >
                  Maa Life Sketch
                </Link>
                <Link
                  href="/trust"
                  className="rounded-full border border-maroon-300 bg-white/90 px-5 py-2 text-xs font-bold text-maroon-900 transition-colors hover:border-saffron-500 hover:bg-saffron-50 hover:text-saffron-800"
                >
                  Charitable Trust (80G)
                </Link>
                <Link
                  href="/aims"
                  className="rounded-full border border-maroon-300 bg-white/90 px-5 py-2 text-xs font-bold text-maroon-900 transition-colors hover:border-saffron-500 hover:bg-saffron-50 hover:text-saffron-800"
                >
                  Aims &amp; Objectives
                </Link>
              </div>
            </div>

            {/* Right: Instagram Highlight Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-pink-300/70 bg-white/95 p-6 shadow-md backdrop-blur-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/10 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-pink-700 uppercase">
                  Featured On Instagram
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-maroon-900">
                  Daily Darshan &amp; Sacred Moments
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                  Follow official daily darshan photographs, festive reels, and inspirational quotes on Instagram.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    href={settings.instagram_url || "https://www.instagram.com/satyadeepsaioracle?stkn=MTVseDV6eGxmbW1odQ=="}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-pink-600 via-rose-600 to-purple-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 transition-opacity"
                  >
                    <span>Follow on Instagram</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    href="/gallery"
                    className="rounded-full border border-maroon-200 bg-cream-50 px-4 py-2 text-xs font-semibold text-maroon-800 hover:bg-maroon-100/60"
                  >
                    View Photo Gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sacred Temple Video Archive (Videos 214312, 0037, 0030) ── */}
      <section id="temple-videos" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <SectionHeading
          eyebrow="Temple Video Archive"
          title="Sacred Temple Moments &amp; Bhajans"
          intro="Authentic video recordings of daily aartis, devotional satsangs, and Narayan Seva."
        />
        <RevealGroup className={`mt-8 grid gap-6 ${videos.length <= 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"}`}>
          {videos.map((v) => (
            <RevealItem key={v.id}>
              <VideoCard video={v} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8 text-center flex items-center justify-center gap-4">
          <Link
            href="/gallery"
            className="btn-festive inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-xs"
          >
            <span>Explore Photos &amp; Video Gallery</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={settings.youtube_url || "https://www.youtube.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-maroon-200 bg-white px-5 py-2.5 text-xs font-semibold text-maroon-900 hover:bg-maroon-50"
          >
            Visit YouTube Channel
          </a>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
          <SectionHeading eyebrow="Moments" title="Temple Gallery" />
          <Reveal>
            <GalleryPreview images={gallery} />
          </Reveal>
          <div className="mt-8 text-center">
            <ArrowLink
              href="/gallery"
              variant="outline"
              className="border-peacock-400 px-6 py-2.5 text-peacock-700 hover:bg-peacock-500 hover:text-white"
            >
              Open Full Gallery
            </ArrowLink>
          </div>
        </section>
      )}

      {/* ── Devotee Experiences ── */}
      <section className="border-t border-maroon-100/70 bg-cream-50/80 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Devotees Speak"
            title="Experiences of Faith"
            intro="Stories of grace shared by devotees of Sai Oracle."
          />
          <Reveal className="mt-8">
            <Testimonials items={experiences} />
          </Reveal>
          <div className="mt-10 text-center">
            <Link
              href="/experiences"
              className="btn-festive inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-xl active:scale-[0.98]"
            >
              <span>Read All Devotee Experiences (8 Chapters · 16 Stories)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Plan Your Visit ── */}
      <section className="section-dawn text-stone-900 border-t border-maroon-100">
        <div aria-hidden className="divider-festive" />
        <RevealGroup className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:px-8 py-14 lg:grid-cols-2">
          <RevealItem>
            <p className="text-xs font-semibold tracking-[0.25em] text-saffron-700 uppercase">
              Plan Your Visit
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-balance text-red-700 sm:text-4xl">
              Come, Receive Baba&apos;s Blessings
            </h2>
            <address className="mt-4 text-[16px] leading-relaxed text-stone-600 not-italic">
              {settings.address}
            </address>
            <div className="mt-3 space-y-1 text-[15px] text-stone-600">
              <p className="flex items-center gap-1.5 font-medium text-maroon-900">
                <Clock aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
                Temple Hours: {settings.morning_opening} – {settings.night_closing} (All 7 Days)
              </p>
              <p className="pl-5.5 text-[13px] font-semibold text-saffron-700">{THURSDAY_NOTE}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/how-to-reach"
                className="btn-festive min-h-12 rounded-full px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
              >
                Visit Temple &amp; How to Reach
              </Link>
              {settings.maps_url && (
                <a
                  href={settings.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-saffron-600/40 bg-white/60 px-6 py-2.5 font-semibold text-saffron-700 hover:border-saffron-500 hover:bg-saffron-500 hover:text-white"
                >
                  Open in Google Maps
                </a>
              )}
            </div>
          </RevealItem>
          <RevealItem>
            <div className="rounded-2xl bg-white p-6 text-stone-700 shadow-md">
              <h3 className="font-display text-2xl font-bold text-maroon-900">
                Follow {settings.organization_name}
              </h3>
              <p className="mt-1 text-[15px]">
                Daily darshan photos, bhajan clips and programme announcements.
              </p>
              <div className="mt-4">
                <SocialLinks links={buildSocialLinks(settings)} />
              </div>
              <div className="mt-5 border-t border-maroon-100 pt-4 text-[15px]">
                {settings.email && (
                  <p className="flex items-center gap-1.5">
                    <Mail aria-hidden className="h-4 w-4 shrink-0 text-maroon-700" />
                    <a
                      href={`mailto:${settings.email}`}
                      className="font-medium text-maroon-800 hover:underline"
                    >
                      {settings.email}
                    </a>
                  </p>
                )}
                {settings.phone && (
                  <p className="mt-1 flex items-center gap-1.5">
                    <Phone aria-hidden className="h-4 w-4 shrink-0 text-maroon-700" />
                    {settings.phone}
                  </p>
                )}
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  );
}
