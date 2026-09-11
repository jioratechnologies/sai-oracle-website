"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Flame,
  MapPin,
  Quote,
  Sparkles,
} from "lucide-react";
import GoldDust from "./motion/GoldDust";
import TextReveal from "./motion/TextReveal";
import FloatingShowcase from "./motion/FloatingShowcase";
import { optimizedImageUrl } from "@/lib/image";
import type { ShowcaseSlide } from "@/lib/types";

/**
 * Homepage hero — Kashi-portal structure with Sai Oracle's devotional
 * dark theme: floating arch murti showcase first on mobile (compact),
 * welcome text left with the showcase right on desktop, quick-info
 * pills + CTAs beneath.
 *
 * Slides come from `public/showcase/` when it holds photos (see
 * `lib/showcase.ts`); otherwise these built-ins are used.
 */
const DEFAULT_SLIDES: ShowcaseSlide[] = [
  {
    src: "/assets/deities-png/sai-baba-throne-gold.jpeg",
    tag: "Shirdi Sai",
    caption: "Shirdi Sai Baba — Sabka Malik Ek",
    focus: "top",
  },
  {
    src: "/assets/deities-png/sai-baba-throne-pink.jpeg",
    tag: "Shirdi Sai",
    caption: "Sai Baba, enthroned in gold and grace",
    focus: "top",
  },
  {
    src: "/assets/temple/god/4.jpg",
    tag: "Sanctum",
    caption: "Baba's murti in the temple sanctum",
    focus: "top",
  },
  {
    src: "/assets/temple/god/6.jpg",
    tag: "Trinity",
    caption: "Trinity of Sai Avatars, with Hanuman",
    focus: "top",
  },
  {
    src: "/assets/deities-png/sathya-sai-baba-collage.jpeg",
    tag: "Satya Sai",
    caption: "Bhagwan Satya Sai Baba",
    focus: "top",
  },
  {
    src: "/assets/events/20241123_191422.jpg",
    tag: "Temple Life",
    caption: "Havan and seva with devotees",
    focus: "center",
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroCarousel({
  organizationName,
  tagline,
  openingTime,
  slides = DEFAULT_SLIDES,
}: {
  organizationName: string;
  tagline: string;
  openingTime: string;
  slides?: ShowcaseSlide[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  // matchMedia is read after mount so server HTML and the first client
  // render always agree (no hydration mismatch).
  const [reduceMotion, setReduceMotion] = useState(false);
  // Touch taps fire mouseenter and would stick autoplay paused forever —
  // only hover-pause where a real hover exists.
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion, index, cycle, slides.length]);

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
    setCycle((c) => c + 1);
  };
  const jump = (i: number) => {
    setIndex(i);
    setCycle((c) => c + 1);
  };

  // Coverflow window: active photo center, neighbours left & right.
  // Wraps around, so any number of slides works.
  const safeIndex = slides.length > 0 ? index % slides.length : 0;
  const slide = slides[safeIndex] ?? DEFAULT_SLIDES[0];
  const visibleThumbs = useMemo(() => {
    const n = slides.length;
    if (n === 0) return [];
    const HALF = 2;
    if (n <= HALF * 2 + 1) {
      return slides.map((s, i) => ({ s, i, offset: i - safeIndex }));
    }
    return Array.from({ length: HALF * 2 + 1 }, (_, k) => {
      const offset = k - HALF;
      const i = (((safeIndex + offset) % n) + n) % n;
      return { s: slides[i], i, offset };
    });
  }, [slides, safeIndex]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${organizationName} — temple photos`}
      className="relative overflow-hidden bg-[#160409] text-cream-50"
      onMouseEnter={() => canHover && setPaused(true)}
      onMouseLeave={() => canHover && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* ── Reimagined sacred backdrop: night-sky gradient, sanctum halo,
            temple silhouette, jali texture, rising gold dust ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 70% at 85% 0%, rgb(214 41 129 / 0.20), transparent 55%), radial-gradient(90% 60% at 8% 0%, rgb(247 127 0 / 0.24), transparent 55%), linear-gradient(to bottom, #2b0a12 0%, #1d060c 52%, #120407 100%)",
        }}
      />
      {/* Golden sanctum halo + sacred-geometry rings behind the portrait */}
      <div
        aria-hidden
        className="absolute top-20 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(232_201_106/0.30),rgb(247_127_0/0.12)_45%,transparent_70%)] blur-2xl lg:top-1/2 lg:right-[3%] lg:left-auto lg:h-135 lg:w-135 lg:-translate-y-1/2 lg:translate-x-0"
      />
      <div
        aria-hidden
        className="absolute top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-gold-300/20 lg:top-1/2 lg:right-[6%] lg:left-auto lg:h-110 lg:w-110 lg:-translate-y-1/2 lg:translate-x-0"
      />
      <div
        aria-hidden
        className="absolute top-20 left-1/2 hidden h-96 w-96 -translate-x-1/2 rounded-full border border-gold-300/10 sm:block lg:top-1/2 lg:right-[2%] lg:left-auto lg:h-135 lg:w-135 lg:-translate-y-1/2 lg:translate-x-0"
      />
      {/* Temple silhouette resting along the base */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[46%]">
        <Image
          src="/images/hero/mandir-night-wide.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-30 sm:opacity-40"
          style={{
            maskImage: "linear-gradient(to top, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 55%, transparent 100%)",
          }}
        />
      </div>
      <div aria-hidden className="pattern-jali-dark absolute inset-0 opacity-40" />
      <GoldDust />
      {/* Shade the top for the header, ground the base for the divider */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/55 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 pt-6 pb-16 sm:gap-10 sm:pt-14 sm:pb-24 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:py-20 lg:pb-28">
        {/* Welcome text — below showcase on mobile, left on desktop */}
        <motion.div
          className="order-2 text-center sm:text-left lg:order-1"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center justify-center gap-3 sm:justify-start"
          >
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400/80" />
            <span className="font-display text-xl text-gold-300 sm:text-2xl">ॐ साई राम</span>
            <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400/80" />
          </motion.p>
          <TextReveal
            as="h1"
            text={`Welcome to ${organizationName}`}
            delay={0.15}
            className="mt-2 max-w-3xl font-display text-[2.35rem] leading-[1.08] font-extrabold text-balance sm:mt-3 sm:text-6xl"
          />
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mt-3 max-w-2xl text-[15px] leading-relaxed text-cream-200/90 sm:mt-4 sm:text-lg"
          >
            {tagline} — home to the Trinity of Sai Avatars, in the holy city of Meerut.
          </motion.p>
          <motion.blockquote
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mt-4 hidden max-w-2xl border-l-2 border-gold-400/60 pl-4 text-[15px] leading-relaxed text-cream-200/75 italic sm:block"
          >
            <Quote aria-hidden className="mb-1 h-4 w-4 text-gold-400/80" />
            “You are seeking joy and peace in front, but the spring of joy is in your heart,
            the heaven of peace is in yourself.” — Sai Baba
          </motion.blockquote>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mt-5 flex w-full flex-col gap-2.5 sm:mt-7 sm:w-auto sm:flex-row sm:items-center sm:gap-3"
          >
            <Link
              href="/events"
              className="btn-festive btn-glow inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-8 py-3 text-center text-[17px] font-bold text-white shadow-xl transition-all hover:shadow-2xl active:scale-[0.98] sm:w-auto sm:min-h-13 sm:py-3.5 sm:text-lg"
            >
              <CalendarDays aria-hidden className="h-5 w-5" />
              View Events
            </Link>
            <Link
              href="/temple#visit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-gold-300/70 px-8 py-2.5 text-center text-[17px] font-bold text-gold-300 transition-colors hover:bg-gold-300 hover:text-maroon-950 sm:w-auto sm:min-h-13 sm:py-3 sm:text-lg"
            >
              <MapPin aria-hidden className="h-5 w-5" />
              Visit Temple
            </Link>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-[12px] sm:mt-7 sm:justify-start sm:gap-2 sm:text-sm"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-400/15 px-3 py-1.5 font-medium text-saffron-200 backdrop-blur-sm sm:px-4">
              <Flame aria-hidden className="h-3.5 w-3.5" />
              Opens {openingTime} daily
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gulal-400/15 px-3 py-1.5 font-medium text-gulal-200 backdrop-blur-sm sm:px-4">
              <MapPin aria-hidden className="h-3.5 w-3.5" />
              Meerut, UP
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-peacock-400/15 px-3 py-1.5 font-medium text-peacock-200 backdrop-blur-sm sm:px-4">
              <CalendarCheck aria-hidden className="h-3.5 w-3.5" />
              Open all 7 days
            </span>
          </motion.div>
        </motion.div>

        {/* Floating murti showcase — first on mobile, right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 mx-auto w-full max-w-[270px] sm:max-w-85 lg:order-2 lg:max-w-90"
        >
          <div className="relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="cursor-grab touch-pan-y active:cursor-grabbing"
            >
              <FloatingShowcase
                src={slide.src}
                alt={slide.caption}
                className="w-full"
                imageClassName={
                  slide.focus === "center"
                    ? "object-cover object-center"
                    : "object-cover object-top sm:object-center"
                }
              />
            </motion.div>
            <span
              key={`tag-${safeIndex}`}
              className="absolute top-3 left-3 z-10 rounded-full bg-maroon-950/70 px-3 py-1 text-[11px] font-bold tracking-wider text-gold-300 uppercase backdrop-blur-sm"
            >
              {slide.tag}
            </span>
            <span className="absolute top-3 right-3 z-10 rounded-full bg-maroon-950/70 px-2.5 py-1 text-[11px] font-bold text-cream-100 tabular-nums backdrop-blur-sm">
              {safeIndex + 1} / {slides.length}
            </span>
            {/* Autoplay progress — shows the frame is auto-scrolling */}
            {!paused && !reduceMotion && (
              <div
                aria-hidden
                className="absolute inset-x-8 bottom-2.5 z-10 h-[3px] overflow-hidden rounded-full bg-white/15"
              >
                <motion.div
                  key={`progress-${safeIndex}-${cycle}`}
                  className="h-full w-full origin-left bg-gradient-to-r from-saffron-400 via-gold-300 to-gulal-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              </div>
            )}
          </div>

          <p key={safeIndex} className="mt-3 flex items-center justify-center gap-1.5 text-center text-[13px] text-cream-200/85 italic sm:mt-4 sm:text-sm">
            <Sparkles aria-hidden className="h-3.5 w-3.5 shrink-0 text-gold-300/90" />
            {slide.caption}
          </p>

          {/* Coverflow filmstrip: neighbours left & right, open photo center */}
          <div className="relative mt-2 sm:mt-3">
            <div
              role="tablist"
              aria-label="Choose photo"
              className="flex items-end justify-center gap-1.5 px-11 sm:gap-2 sm:px-13"
            >
              {visibleThumbs.map(({ s, i, offset }) => {
                const distance = Math.abs(offset);
                return (
                  <button
                    key={s.src}
                    type="button"
                    role="tab"
                    aria-selected={i === safeIndex}
                    aria-label={`Photo ${i + 1}: ${s.caption}`}
                    title={s.caption}
                    onClick={() => jump(i)}
                    className={`relative aspect-[3/4] shrink-0 overflow-hidden rounded-t-full rounded-b-lg transition-all duration-500 ${
                      distance === 0
                        ? "z-10 w-12 opacity-100 ring-2 ring-gold-300 sm:w-14"
                        : distance === 1
                          ? "w-9 opacity-70 ring-1 ring-cream-100/25 hover:opacity-90 sm:w-10"
                          : "w-7 opacity-40 ring-1 ring-cream-100/20 hover:opacity-70 sm:w-8"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={optimizedImageUrl(s.src, 128)}
                      alt=""
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover object-top"
                    />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-cream-100/40 text-cream-100 backdrop-blur-sm transition-colors hover:bg-cream-100/20 sm:h-10 sm:w-10"
            >
              <ChevronLeft aria-hidden className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-cream-100/40 text-cream-100 backdrop-blur-sm transition-colors hover:bg-cream-100/20 sm:h-10 sm:w-10"
            >
              <ChevronRight aria-hidden className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <p aria-live="polite" className="sr-only">
        Photo {safeIndex + 1} of {slides.length}: {slide.caption}
      </p>
      <div aria-hidden className="relative divider-festive" />
    </section>
  );
}
