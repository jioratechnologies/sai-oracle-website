import Link from "next/link";
import Image from "next/image";
import ArrowLink, { ArrowIcon } from "@/components/ArrowLink";
import EventCard from "@/components/EventCard";
import HeroCarousel from "@/components/HeroCarousel";
import SectionHeading from "@/components/SectionHeading";
import TimingsTable from "@/components/TimingsTable";
import VideoCard from "@/components/VideoCard";
import SocialLinks, { buildSocialLinks } from "@/components/SocialLinks";
import Testimonials from "@/components/Testimonials";
import {
  getAnnouncements,
  getExperiences,
  getGallery,
  getSettings,
  getTimings,
  getUpcomingEvents,
  getVideos,
} from "@/lib/site";
import GalleryPreview from "./_home/GalleryPreview";

export const revalidate = 300;

export default async function Home() {
  const [settings, events, timings, announcements, videos, gallery] = await Promise.all([
    getSettings(),
    getUpcomingEvents(3),
    getTimings(),
    getAnnouncements(3),
    getVideos(3),
    getGallery(6),
  ]);
  const experiences = getExperiences();

  return (
    <>
      {/* ── Hero carousel: same welcome text over rotating temple artwork.
           Phones get portrait art, larger screens get wide art. ── */}
      <HeroCarousel
        organizationName={settings.organization_name}
        tagline={settings.tagline}
        openingTime={timings[0]?.time ?? settings.morning_opening}
      />

      {/* ── Welcome / intro ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Temple photo composition */}
          <div className="relative mx-auto w-full max-w-[520px] lg:order-1">
            <div className="overflow-hidden rounded-3xl border-4 border-gold-400/60 shadow-lg">
              <Image
                src="/legacy/banner/2.jpg"
                alt="Pujniye Maa serving devotees during Narayan Seva"
                width={500}
                height={333}
                sizes="(max-width: 1024px) 90vw, 520px"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 -bottom-8 w-36 overflow-hidden rounded-2xl shadow-xl ring-4 ring-cream-50 sm:-right-6 sm:w-44">
              <Image
                src="/legacy/home/prema-sai.jpg"
                alt="The Trinity of Sai Avatars"
                width={384}
                height={200}
                sizes="176px"
                className="aspect-[19/10] w-full object-cover"
              />
            </div>
            <span className="absolute -top-4 left-4 rounded-full bg-maroon-800 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-300 uppercase shadow">
              ❖ Love · Service · Devotion
            </span>
          </div>
          <div className="pb-6 lg:order-2 lg:pb-0">
            <SectionHeading
              align="left"
              eyebrow="Welcome"
              title="A Temple of Love, Service & the Trinity of Sai"
            />
            <p className="mt-4 text-[17px] leading-relaxed text-stone-600">
              Satyadeep Sai Organisation, founded by Pujniye Maa under the inspiration of Bhagwan
              Satya Sai Baba, is a non-political, non-profit family of devotees. Our temple carries
              life-sized statues of Shirdi Sai and Satya Sai, with a singhasan for the forthcoming
              Prema Sai Avatar — a Trinity found in very few temples of India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="rounded-full bg-maroon-800 px-6 py-2.5 font-semibold text-cream-50 hover:bg-maroon-700"
              >
                Read Our Story
              </Link>
              <Link
                href="/temple"
                className="rounded-full border border-maroon-300 px-6 py-2.5 font-semibold text-maroon-800 hover:bg-maroon-50"
              >
                Temple & Worship
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              [
                "4 Daily Aartis",
                "Kakad · Madhyan · Dhoop · Shej",
                <path key="f" d="M12 2c2 3.5 5 6 5 9.5A5 5 0 0 1 7 11.5C7 8 10 5.5 12 2Z" />,
              ],
              [
                "Narayan Seva",
                "Monthly Annadanam for the needy",
                <path key="b" d="M4 12h16a8 8 0 0 1-16 0Z M9 8c0-1.5 1-1.5 1-3 M14 8c0-1.5 1-1.5 1-3" />,
              ],
              [
                "Bhajans",
                "Thursday sandhyas & Naam Smaranam",
                <g key="m"><circle cx="8" cy="18" r="3" /><circle cx="17" cy="16" r="3" /><path d="M11 18V6l9-2v12" /></g>,
              ],
              [
                "Charitable School",
                "Free education for poor children",
                <path key="s" d="M4 5h7v15H4z M11 5h9v15h-9z M4 5l3.5-2L11 5 M11 5l4.5-2L20 5" />,
              ],
            ].map(([title, sub, icon]) => (
              <li
                key={title as string}
                className="flex items-center gap-3 rounded-2xl border border-maroon-100 bg-white p-4 shadow-sm"
              >
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-maroon-800 text-gold-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    {icon as React.ReactNode}
                  </svg>
                </span>
                <span>
                  <span className="block font-display text-lg leading-tight font-bold text-maroon-900">
                    {title as string}
                  </span>
                  <span className="block text-sm text-stone-600">{sub as string}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Photo stories from the temple archive */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              src: "/legacy/home/mission-karuna.jpg",
              alt: "Mission Karuna — empowering poor children",
              eyebrow: "Sacred Cause",
              title: "Mission Karuna",
              text: "Empowering poor children through education — helping them earn their livelihood and support themselves with dignity.",
              href: "/aims",
            },
            {
              src: "/legacy/home/Pujniye_maa.jpg",
              alt: "Pujniye Maa",
              eyebrow: "Our Guide",
              title: "Miraculous Life of Pujniye Maa",
              text: "Guru — Gu (darkness) and Ru (light): the preceptor who leads us from darkness to light, under Baba's blessings.",
              href: "/experiences",
            },
            {
              src: "/legacy/home/prema-sai.jpg",
              alt: "The Trinity of Sai Avatars",
              eyebrow: "Our Faith",
              title: "The Trinity of Sai Avatars",
              text: "Shirdi Sai · Satya Sai · Prema Sai — Sai Oracle is dedicated to spreading the mission of the Sai Baba Avatars.",
              href: "/about",
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative">
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={384}
                  height={200}
                  sizes="(max-width: 768px) 90vw, 360px"
                  className="aspect-[19/10] w-full object-cover"
                />
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-saffron-600 uppercase">
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
          ))}
        </div>
      </section>

      {/* ── Upcoming events ──────────────────────────────── */}
      <section className="border-y border-maroon-100 bg-cream-100/60">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeading
            eyebrow="Join Us"
            title="Upcoming Events"
            intro="Festivals, bhajan sandhyas and seva programmes at the temple."
          />
          {events.length > 0 ? (
            <>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {events.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <ArrowLink
                  href="/events"
                  variant="outline"
                  className="border-maroon-300 px-6 py-2.5 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50"
                >
                  View All Events
                </ArrowLink>
              </div>
            </>
          ) : (
            <p className="mt-8 text-center text-stone-600">
              New programmes will be announced soon. Please check back or follow us for updates. 🙏
            </p>
          )}
        </div>
      </section>

      {/* ── Timings + announcements ──────────────────────── */}
      <section id="announcements" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <TimingsTable timings={timings} />
            <p className="mt-3 text-center text-sm text-stone-500">
              Open {settings.morning_opening} – {settings.night_closing} · all 7 days
            </p>
          </div>
          <div className="lg:col-span-3">
            <SectionHeading align="left" eyebrow="Temple Updates" title="Announcements" />
            <div className="mt-5 space-y-4">
              {announcements.length === 0 && (
                <p className="text-stone-600">No announcements right now. Om Sai Ram! 🙏</p>
              )}
              {announcements.map((a) => (
                <article
                  key={a.id}
                  className="rounded-2xl border-l-4 border-saffron-500 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-display text-xl font-bold text-maroon-900">
                    🔔 {a.title}
                  </h3>
                  <p className="mt-1 text-[16px] leading-relaxed text-stone-600">{a.content}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About strip ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-maroon-800 text-cream-100">
        <div aria-hidden className="pattern-jali-dark absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">
            Pujniye Maa&apos;s Message
          </p>
          <blockquote className="mx-auto mt-4 max-w-3xl font-display text-2xl leading-relaxed font-medium sm:text-3xl">
            “Love all, serve all. Every act of service offered with a pure heart reaches
            Baba&apos;s lotus feet.”
          </blockquote>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-full bg-gold-400 px-6 py-2.5 font-semibold text-maroon-950 hover:bg-gold-300"
          >
            About Sai Oracle
          </Link>
        </div>
      </section>

      {/* ── Videos ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Bhajans & Darshan"
          title="Latest from YouTube"
          intro="Aartis, bhajans and discourses for your daily sadhana."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <ArrowLink
            href="/videos"
            variant="outline"
            className="border-maroon-300 px-6 py-2.5 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50"
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
            <GalleryPreview images={gallery} />
            <div className="mt-8 text-center">
              <ArrowLink
                href="/gallery"
                variant="outline"
                className="border-maroon-300 px-6 py-2.5 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50"
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
        <div className="mt-8">
          <Testimonials items={experiences} />
        </div>
      </section>

      {/* ── Visit / contact + social ─────────────────────── */}
      <section className="bg-maroon-950 text-cream-100">
        <div aria-hidden className="h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-300 uppercase">
              Plan Your Visit
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Come, Receive Baba&apos;s Blessings
            </h2>
            <address className="mt-4 text-[16px] leading-relaxed text-cream-200/85 not-italic">
              {settings.address}
            </address>
            <p className="mt-2 text-[16px] text-cream-200/85">
              🕐 Daily {settings.morning_opening} – {settings.night_closing}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-saffron-500 px-6 py-2.5 font-semibold text-white hover:bg-saffron-600"
              >
                Contact & Directions
              </Link>
              {settings.maps_url && (
                <a
                  href={settings.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gold-300/60 px-6 py-2.5 font-semibold text-gold-300 hover:bg-gold-300 hover:text-maroon-950"
                >
                  Open in Google Maps
                </a>
              )}
            </div>
          </div>
          <div className="rounded-2xl bg-cream-50 p-6 text-stone-700">
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
                <p>
                  ✉️{" "}
                  <a href={`mailto:${settings.email}`} className="font-medium text-maroon-800 hover:underline">
                    {settings.email}
                  </a>
                </p>
              )}
              {settings.phone && <p className="mt-1">📞 {settings.phone}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
