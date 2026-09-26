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
        "text-saffron-700 bg-saffron-50 border-saffron-200",
        "text-gulal-700 bg-gulal-50 border-gulal-200",
        "text-peacock-700 bg-peacock-50 border-peacock-200",
        "text-maroon-700 bg-gold-50 border-gold-200",
        "text-amber-800 bg-amber-50 border-amber-200",
        "text-emerald-800 bg-emerald-50 border-emerald-200",
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
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-14">
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {[
            {
              src: resolveMediaUrl(mediaMap, "/assets/temple/other/20250112_182623.webp"),
              alt: "Children at the temple during Mission Karuna outreach",
              eyebrow: "Sacred Cause",
              eyebrowColor: "text-saffron-600",
              title: "Mission Karuna",
              text: "Empowering poor children through education — helping them earn their livelihood and support themselves with dignity.",
              href: "/mission-karuna",
            },
            {
              src: "/legacy/home/Pujniye_maa.webp",
              alt: "Maa",
              eyebrow: "Our Guide",
              eyebrowColor: "text-gulal-600",
              title: "Miraculous Life of Maa",
              text: "Guru — Gu (darkness) and Ru (light): the preceptor who leads us from darkness to light, under Baba's blessings.",
              href: "/experiences?tab=miracles",
            },
            {
              src: "/assets/content/home/trinity_of_sai_avatars.webp",
              alt: "The Trinity of Sai Avatars — Shirdi Sai, Satya Sai, Prema Sai",
              eyebrow: "Our Faith",
              eyebrowColor: "text-peacock-600",
              title: "The Trinity of Sai Avatars",
              text: "Shirdi Sai · Satya Sai · Prema Sai — Sai Oracle is dedicated to spreading the mission of the Sai Baba Avatars.",
              href: "/#deities",
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

      {/* ── Consolidated Temple Worship & Updates Hub (Clean & Calm) ── */}
      <section id="worship" className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <SectionHeading
          eyebrow="Temple Life"
          title="Daily Worship & Updates"
          intro={`Open all 7 days from ${settings.morning_opening} to ${settings.night_closing}. Join us in the sacred rhythm of daily aartis and community seva.`}
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 4 Daily Aartis in a Clean 2x2 Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-maroon-100 pb-2">
              <span className="text-xs font-bold tracking-[0.18em] text-saffron-700 uppercase flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-saffron-600" />
                Daily Aarti Schedule
              </span>
              <span className="text-xs text-stone-500">Sanctum Sanctorum</span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {aartiRows.map((a) => (
                <SpotlightCard
                  key={a.id}
                  className="rounded-2xl border border-maroon-100 bg-white p-4 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-base font-bold text-maroon-900">
                        {a.label}
                      </h4>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-bold shrink-0 ${a.accent}`}
                      >
                        {a.time}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600">{a.desc}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-maroon-50 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400">All devotees welcome</span>
                    <Link
                      href="/about#worship"
                      className="font-semibold text-saffron-700 hover:text-saffron-800"
                    >
                      Aarti guide →
                    </Link>
                  </div>
                </SpotlightCard>
              ))}
            </div>

            {/* Quick Timing Summary Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-gold-300/60 bg-cream-100/70 p-3.5 text-xs text-stone-700">
              <span className="flex items-center gap-2 font-medium text-maroon-950">
                <Clock className="h-4 w-4 text-saffron-600 shrink-0" />
                <span>
                  <strong>Temple Hours:</strong> {settings.morning_opening} – {settings.night_closing}{" "}
                  (Daily)
                </span>
              </span>
              <Link
                href="/about#worship"
                className="font-bold text-saffron-700 hover:underline shrink-0"
              >
                Directions &amp; Visit Guide →
              </Link>
            </div>
          </div>

          {/* Right Column: Events & Announcements */}
          <div id="announcements" className="lg:col-span-5 space-y-4 scroll-mt-32 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-maroon-100 pb-2">
              <span className="text-xs font-bold tracking-[0.18em] text-saffron-700 uppercase flex items-center gap-1.5">
                <Bell className="h-3.5 w-3.5 text-saffron-600" />
                Latest Announcements
              </span>
              <Link href="/events" className="text-xs font-semibold text-saffron-700 hover:underline">
                All Events
              </Link>
            </div>

            {/* Upcoming Event Invitation Card */}
            {featuredEvent && (
              <div className="rounded-3xl border-2 border-gold-400/80 bg-linear-to-br from-amber-50/90 via-white to-orange-50/80 p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-gold-200/80 pb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500 px-3 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
                    Upcoming Sacred Event
                  </span>
                  <span className="text-xs font-bold text-maroon-900">{featuredDate}</span>
                </div>
                <div className="mt-4 flex gap-4 items-start">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-gold-300 shadow-xs bg-white">
                    <Image
                      src={featuredImage}
                      alt={featuredEvent.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-base font-bold text-maroon-950 leading-snug">
                      {featuredEvent.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {featuredEvent.description || "Join us in celebrating this sacred occasion at the temple."}
                    </p>
                  </div>
                </div>
                <div className="mt-3.5 pt-3 border-t border-gold-200/70 text-xs text-stone-700 space-y-1">
                  <p>
                    <strong>Timing:</strong> {featuredTime}
                  </p>
                  <p>
                    <strong>Venue:</strong> {featuredVenue}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={featuredLink}
                    className="btn-festive inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-xs"
                  >
                    View Event Details →
                  </Link>
                </div>
              </div>
            )}

            {/* Subsequent Upcoming Events List */}
            {events.length > 1 && (
              <div className="space-y-2">
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
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-gold-200/80 bg-linear-to-r from-amber-50/70 to-white p-3 shadow-2xs transition-all hover:border-gold-400 hover:shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex flex-col items-center justify-center rounded-xl bg-saffron-500/10 border border-saffron-500/25 px-2.5 py-1 text-center shrink-0">
                          <span className="text-[10px] font-bold text-saffron-800 uppercase leading-none">
                            {monthName}
                          </span>
                          <span className="text-sm font-extrabold text-maroon-900 leading-tight">
                            {dayNum}
                          </span>
                        </span>
                        <div className="min-w-0">
                          <h5 className="font-display text-xs sm:text-[13px] font-bold text-maroon-950 truncate group-hover:text-maroon-700">
                            {e.title}
                          </h5>
                          <p className="text-[11px] text-stone-500 truncate">
                            {e.start_time ? `${formatTime(e.start_time)} · ` : ""}
                            {e.location || "Temple Sanctum"}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-saffron-700 shrink-0 group-hover:translate-x-0.5 transition-transform">
                        Details →
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Announcements List */}
            <div className="space-y-3">
              {announcements.length > 0 &&
                announcements.map((a) => (
                  <article
                    key={a.id}
                    className="rounded-2xl border border-maroon-100 bg-white p-4 shadow-2xs transition-all hover:border-saffron-300"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-maroon-900">
                        {a.title}
                      </h4>
                      <span className="rounded-md bg-cream-100 px-2 py-0.5 text-[10px] font-bold text-maroon-800 shrink-0">
                        Notice
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-stone-600">{a.content}</p>
                  </article>
                ))}

              {/* Temple Helpdesk Card */}
              <div className="rounded-2xl border border-maroon-100 bg-white p-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-maroon-900">Temple Office &amp; Helpdesk</span>
                  <span className="text-[11px] text-stone-400">Open 7 Days</span>
                </div>
                <div className="mt-2 text-xs space-y-1 text-stone-600">
                  {settings.phone && <p>Tel / WhatsApp: {settings.phone}</p>}
                  {settings.email && <p>Email: {settings.email}</p>}
                </div>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-maroon-50 text-xs">
                  <Link href="/contact" className="font-bold text-saffron-700 hover:underline">
                    Contact Temple Office
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Unified Spiritual Sanctuary Banner (Maa's Message + Instagram Highlight) ── */}
      <section className="section-dawn relative overflow-hidden py-14 border-y border-maroon-100/70">
        <div aria-hidden className="pattern-jali absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4">
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
      <section id="temple-videos" className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Temple Video Archive"
          title="Sacred Temple Moments &amp; Bhajans"
          intro="Authentic video recordings of daily aartis, devotional satsangs, and Narayan Seva."
        />
        <RevealGroup className={`mt-8 grid gap-6 ${videos.length <= 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"}`}>
          {videos.map((v) => {
            const thumb = v.thumbnail_url || (v.youtube_url.includes("v=") ? `https://img.youtube.com/vi/${v.youtube_url.split("v=")[1].split("&")[0]}/hqdefault.jpg` : "/assets/content/gallery/20241024_195531.webp");
            return (
              <RevealItem key={v.id}>
                <SpotlightCard className="overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-xs flex flex-col justify-between h-full">
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
                      <Image
                        src={thumb}
                        alt={v.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110">
                          <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-maroon-900 leading-snug">
                        {v.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-stone-600">
                        Darshan, sacred rituals, and divine satsang at Satyadeep Sai Universe.
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <a
                      href={v.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50/80 px-4 py-2 text-xs font-bold text-red-700 transition-colors hover:bg-red-600 hover:text-white"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </SpotlightCard>
              </RevealItem>
            );
          })}
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
        <section className="mx-auto max-w-6xl px-4 pb-14">
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
        <div className="mx-auto max-w-6xl px-4">
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
        <RevealGroup className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
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
