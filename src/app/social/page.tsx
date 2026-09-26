import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Play,
  Share2,
  Users,
  Video,
} from "lucide-react";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getSettings, getVideos, getGallery } from "@/lib/site";
import { socialIcons } from "@/components/SocialLinks";

export const revalidate = 300;

export const metadata = {
  title: "Social Media & Community · Sai Oracle",
  description:
    "Connect with Sai Oracle on YouTube, Instagram, Facebook, and WhatsApp for daily darshan, live aartis, bhajans, and spiritual discourses.",
};

export default async function SocialPage() {
  const icons = socialIcons();
  const [settings, videos, gallery] = await Promise.all([
    getSettings(),
    getVideos(4),
    getGallery(6),
  ]);

  const youtubeUrl = settings.youtube_url || "https://www.youtube.com";
  const instagramUrl = settings.instagram_url || "https://www.instagram.com";
  const facebookUrl = settings.facebook_url || "https://www.facebook.com";
  const whatsappUrl = settings.whatsapp_url || "https://whatsapp.com";

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-12 sm:space-y-16">
      {/* Compact In-Page Header */}
      <div className="mx-auto max-w-3xl text-center border-b border-maroon-100/80 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          Digital Darshan · Divine Community
        </span>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          Social Media &amp; Community
        </h1>
        <p className="mt-2.5 text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          Stay connected with Sai Oracle across YouTube, Instagram, Facebook, and WhatsApp for daily spiritual nourishment.
        </p>
      </div>

      {/* ── 4 Major Platforms Overview Grid ── */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold tracking-[0.2em] text-saffron-700 uppercase">
            Official Channels
          </span>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-maroon-900">
            Join Our Divine Family Online
          </h2>
          <p className="mt-2 text-stone-600 text-sm">
            Receive live aarti broadcasts, daily quotes from Maa, and festival updates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* YouTube */}
          <SpotlightCard className="rounded-3xl border border-red-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-red-400">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600 p-2">
                  {icons.YouTube}
                </span>
                <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  YouTube
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-maroon-900">
                YouTube Channel
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">
                Watch live darshan, daily aartis, devotional bhajans, and discourses.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-maroon-50">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-red-700"
              >
                <span>Subscribe Channel</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* Instagram */}
          <SpotlightCard className="rounded-3xl border border-pink-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-pink-400">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white p-2">
                  {icons.Instagram}
                </span>
                <span className="text-[11px] font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full">
                  Instagram
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-maroon-900">
                Instagram
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">
                Daily darshan photos, festival reels, and inspirational thoughts of the day.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-maroon-50">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
              >
                <span>Follow on Instagram</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* Facebook */}
          <SpotlightCard className="rounded-3xl border border-blue-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-blue-400">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 p-2">
                  {icons.Facebook}
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Facebook
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-maroon-900">
                Facebook Page
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">
                Community updates, live broadcast feeds, and Trust notifications.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-maroon-50">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
              >
                <span>Join Community</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>

          {/* WhatsApp */}
          <SpotlightCard className="rounded-3xl border border-emerald-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-emerald-400">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 p-2">
                  {icons.WhatsApp}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  WhatsApp
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-maroon-900">
                WhatsApp Updates
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">
                Direct seva notifications, aarti reminders, and temple office helpline.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-maroon-50">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
              >
                <span>Join WhatsApp</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* ── YouTube Video Highlights ── */}
      <div className="rounded-3xl border border-maroon-100 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-maroon-100 pb-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-red-600 uppercase flex items-center gap-1.5">
              <Video className="h-4 w-4" />
              YouTube Broadcasts
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-maroon-900">
              Aartis, Bhajans &amp; Discourses
            </h3>
          </div>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-festive inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold text-white shadow-xs"
          >
            <span>Visit Official Channel</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-maroon-100 bg-cream-50/50 transition-all hover:-translate-y-1 hover:border-red-400 hover:shadow-md"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black/10">
                {video.thumbnail_url ? (
                  <Image
                    src={video.thumbnail_url}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-maroon-950 text-white">
                    <Play className="h-8 w-8 text-saffron-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Play className="h-4 w-4" fill="currentColor" />
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="line-clamp-2 text-xs font-bold text-maroon-900 group-hover:text-red-700">
                  {video.title}
                </h4>
                <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-red-600">
                  Watch on YouTube <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── Instagram & Darshan Photography Preview ── */}
      <div className="rounded-3xl border border-maroon-100 bg-linear-to-br from-cream-100/70 via-white to-pink-50/40 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-maroon-100 pb-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-pink-700 uppercase flex items-center gap-1.5">
              <span className="h-4 w-4 shrink-0 flex items-center justify-center">{icons.Instagram}</span>
              Instagram &amp; Photo Stream
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-maroon-900">
              Daily Darshan Moments
            </h3>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-pink-300 bg-white px-5 py-2 text-xs font-bold text-pink-700 shadow-2xs hover:bg-pink-50 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Follow @saioracle</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-maroon-100 bg-black/5 shadow-2xs"
            >
              <Image
                src={img.image_url}
                alt={img.title || "Darshan photo"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-maroon-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                <span className="text-[11px] font-bold text-white drop-shadow-xs">
                  {img.title || "View on Instagram"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Facebook & Community Noticeboard ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 rounded-3xl border border-blue-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold tracking-wider text-blue-700 uppercase flex items-center gap-1.5">
            <span className="h-4 w-4 shrink-0 flex items-center justify-center">{icons.Facebook}</span>
            Facebook Community
          </span>
          <h3 className="mt-2 font-display text-xl font-bold text-maroon-900">
            Satsang Feeds &amp; Trust Activities
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-sm">
            Connect with fellow devotees worldwide. Share experiences, participate in festive
            discussions, and get notified about special bhajan sandhyas and Annadanam drives.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
            >
              <span>Visit Facebook Page</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/events"
              className="rounded-full border border-maroon-200 bg-cream-50 px-5 py-2 text-xs font-semibold text-maroon-900 hover:border-saffron-400"
            >
              Temple Events &amp; Calendar
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase flex items-center gap-1.5">
              <span className="h-4 w-4 shrink-0 flex items-center justify-center">{icons.WhatsApp}</span>
              WhatsApp Helpline
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-maroon-900">
              Direct Temple Helpline
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              Reach the temple office for seva contribution receipts, special puja booking, and
              volunteer registration.
            </p>
          </div>
          <div className="mt-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
