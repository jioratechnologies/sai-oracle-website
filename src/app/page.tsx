import Link from "next/link";
import Image from "next/image";
import { Bell, Clock, Mail, Phone } from "lucide-react";
import ArrowLink, { ArrowIcon } from "@/components/ArrowLink";
import EventCard from "@/components/EventCard";
import HeroCarousel from "@/components/HeroCarousel";
import SectionHeading from "@/components/SectionHeading";
import TimingsTable from "@/components/TimingsTable";
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
  getMediaMap,
  getSettings,
  getTimings,
  getUpcomingEvents,
  getVideos,
} from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";
import { getShowcaseSlides } from "@/lib/showcase";
import { DEFAULT_SLIDES } from "@/lib/heroSlides";
import GalleryPreview from "./_home/GalleryPreview";
import SevaServices from "./_home/SevaServices";
import AboutTemple from "./_home/AboutTemple";
import AartiPrograms from "./_home/AartiPrograms";
import LiveDarshanBanner from "./_home/LiveDarshanBanner";
import HelpdeskCard from "./_home/HelpdeskCard";

export const revalidate = 300;

/**
 * Homepage — Kashi Vishwanath portal flow, Sai Oracle theme:
 * hero → quick seva services → about temple → sacred stories →
 * deities → daily aartis → events → timings/updates/helpdesk →
 * live darshan → videos → gallery → experiences → visit.
 */
export default async function Home() {
  const [settings, events, timings, announcements, videos, gallery, showcase, mediaMap] =
    await Promise.all([
      getSettings(),
      getUpcomingEvents(3),
      getTimings(),
      getAnnouncements(3),
      getVideos(3),
      getGallery(6),
      getShowcaseSlides(),
      getMediaMap(),
    ]);
  const experiences = getExperiences();
  const heroSlides =
    showcase.length > 0
      ? showcase
      : DEFAULT_SLIDES.map((s) => ({ ...s, src: resolveMediaUrl(mediaMap, s.src) }));

  return (
    <>
      <HeroCarousel
        organizationName={settings.organization_name}
        tagline={settings.tagline}
        openingTime={timings[0]?.time ?? settings.morning_opening}
        slides={heroSlides}
      />

      {/* ── Quick seva services (overlaps hero, like Kashi's service grid) ── */}
      <SevaServices />

      {/* ── Welcome / About Temple ─────────────────────── */}
      <AboutTemple />

      {/* ── Sacred stories from the temple ─────────────── */}
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
              href: "/aims",
            },
            {
              src: "/legacy/home/Pujniye_maa.webp",
              alt: "Pujniye Maa",
              eyebrow: "Our Guide",
              eyebrowColor: "text-gulal-600",
              title: "Miraculous Life of Pujniye Maa",
              text: "Guru — Gu (darkness) and Ru (light): the preceptor who leads us from darkness to light, under Baba's blessings.",
              href: "/experiences",
            },
            {
              src: resolveMediaUrl(mediaMap, "/assets/temple/other/20250112_182606.webp"),
              alt: "The Trinity of Sai Avatars enthroned at the temple",
              eyebrow: "Our Faith",
              eyebrowColor: "text-peacock-600",
              title: "The Trinity of Sai Avatars",
              text: "Shirdi Sai · Satya Sai · Prema Sai — Sai Oracle is dedicated to spreading the mission of the Sai Baba Avatars.",
              href: "/about",
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

      {/* ── Deities of the temple ────────────────────────── */}
      <DeitiesSection />

      {/* ── Daily aartis (Kashi "Our Programs") ──────────── */}
      <AartiPrograms timings={timings} />

      {/* ── Upcoming events ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Join Us"
          title="Upcoming Events"
          intro="Festivals, bhajan sandhyas and seva programmes at the temple."
        />
        {events.length > 0 ? (
          <>
            <RevealGroup className="mt-8 grid gap-6 md:grid-cols-3">
              {events.map((e) => (
                <RevealItem key={e.id}>
                  <EventCard event={e} />
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="mt-8 text-center">
              <ArrowLink
                href="/events"
                variant="outline"
                className="border-saffron-400 px-6 py-2.5 text-saffron-700 hover:bg-saffron-500 hover:text-white"
              >
                View All Events
              </ArrowLink>
            </div>
          </>
        ) : (
          <p className="mt-8 text-center text-stone-600">
            New programmes will be announced soon. Please check back or follow us for updates.
          </p>
        )}
      </section>

      {/* ── Timings + announcements + helpdesk (Kashi helpdesk row) ── */}
      <section
        id="announcements"
        className="scroll-mt-24 border-y border-maroon-100 bg-cream-100/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Temple Updates"
            title="Timings & Announcements"
            intro="Daily darshan hours, latest updates and the temple helpdesk."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div>
              <TimingsTable timings={timings} />
              <p className="mt-3 text-center text-sm text-stone-500">
                Open {settings.morning_opening} – {settings.night_closing} · all 7 days
              </p>
            </div>
            <RevealGroup className="space-y-4">
              {announcements.length === 0 && (
                <p className="text-stone-600">No announcements right now. Om Sai Ram!</p>
              )}
              {announcements.map((a, i) => (
                <RevealItem key={a.id}>
                  <article
                    className={`rounded-2xl border-l-4 bg-white p-5 shadow-sm ${
                      ["border-saffron-500", "border-gulal-500", "border-peacock-500"][i % 3]
                    }`}
                  >
                    <h3 className="flex items-center gap-2 font-display text-xl font-bold text-maroon-900">
                      <Bell aria-hidden className="h-5 w-5 shrink-0 text-saffron-600" />
                      {a.title}
                    </h3>
                    <p className="mt-1 text-[16px] leading-relaxed text-stone-600">{a.content}</p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal y={24}>
              <HelpdeskCard settings={settings} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Pujniye Maa's message ────────────────────────── */}
      <section className="section-dawn relative overflow-hidden">
        <div aria-hidden className="pattern-jali absolute inset-0 opacity-50" />
        <Reveal className="relative mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-saffron-700 uppercase">
            Pujniye Maa&apos;s Message
          </p>
          <blockquote className="mx-auto mt-4 max-w-3xl font-display text-2xl leading-relaxed font-medium text-balance text-red-700 sm:text-3xl">
            “Love all, serve all. Every act of service offered with a pure heart reaches
            Baba&apos;s lotus feet.”
          </blockquote>
          <Link
            href="/about"
            className="btn-festive mt-6 inline-block min-h-12 rounded-full px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
          >
            About Sai Oracle
          </Link>
        </Reveal>
      </section>

      {/* ── Live darshan banner (Kashi free-darshan strip) ── */}
      <LiveDarshanBanner youtubeUrl={settings.youtube_url} />

      {/* ── Videos ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Bhajans & Darshan"
          title="Latest from YouTube"
          intro="Aartis, bhajans and discourses for your daily sadhana."
        />
        <RevealGroup className="mt-8 grid gap-6 md:grid-cols-3">
          {videos.map((v) => (
            <RevealItem key={v.id}>
              <VideoCard video={v} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8 text-center">
          <ArrowLink
            href="/gallery?tab=videos"
            variant="outline"
            className="border-gulal-400 px-6 py-2.5 text-gulal-700 hover:bg-gulal-500 hover:text-white"
          >
            Watch More Videos
          </ArrowLink>
        </div>
      </section>

      {/* ── Gallery preview ──────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="border-y border-maroon-100 bg-cream-100/60">
          <div className="mx-auto max-w-6xl px-4 py-14">
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
          </div>
        </section>
      )}

      {/* ── Devotee experiences ──────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Devotees Speak"
          title="Experiences of Faith"
          intro="Stories of grace shared by devotees of Sai Oracle."
        />
        <Reveal className="mt-8">
          <Testimonials items={experiences} />
        </Reveal>
      </section>

      {/* ── Visit / contact + social ─────────────────────── */}
      <section className="section-dawn text-stone-900">
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
            <p className="mt-2 flex items-center gap-1.5 text-[16px] text-stone-600">
              <Clock aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
              Daily {settings.morning_opening} – {settings.night_closing}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-festive min-h-12 rounded-full px-6 py-2.5 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
              >
                Contact & Directions
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
