import Link from "next/link";
import { Flame, Play } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

/**
 * Kashi "Live Darshan — free for all devotees" banner: deep maroon,
 * pulsing LIVE badge, watch CTA.
 */
export default function LiveDarshanBanner({ youtubeUrl }: { youtubeUrl: string }) {
  return (
    <section className="relative overflow-hidden bg-maroon-950 text-cream-100">
      <div aria-hidden className="pattern-jali-dark absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-saffron-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-1/5 h-80 w-80 rounded-full bg-gulal-600/20 blur-3xl"
      />
      <Reveal className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:py-14 lg:flex-row lg:text-left">
        <span
          aria-hidden
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-maroon-900 text-gold-300 ring-2 ring-gold-400/60"
        >
          <Flame className="h-9 w-9" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold tracking-[0.2em] text-red-300 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="h-2 w-2 rounded-full bg-red-500" />
            </span>
            Live Darshan
          </p>
          <h2 className="mt-2 font-display text-2xl leading-tight font-extrabold text-balance sm:text-3xl">
            Seek Baba&apos;s Darshan, Wherever You Are
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[15px] leading-relaxed text-cream-200/85 lg:mx-0">
            Aartis, bhajans and discourses from Sai Oracle for your daily sadhana — free for all
            devotees, across every barrier.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <Link
            href="/videos"
            className="btn-festive inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-2.5 text-center font-bold whitespace-nowrap text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
          >
            <Play aria-hidden className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            Watch Bhajans
          </Link>
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold-300/60 px-7 py-2.5 text-center font-semibold whitespace-nowrap text-gold-300 hover:bg-gold-300 hover:text-maroon-950"
            >
              YouTube Channel
            </a>
          )}
        </div>
      </Reveal>
      <div aria-hidden className="relative divider-festive" />
    </section>
  );
}
