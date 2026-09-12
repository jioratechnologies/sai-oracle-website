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
import { DEFAULT_SLIDES } from "@/lib/heroSlides";
import type { ShowcaseSlide } from "@/lib/types";

/**
 * Homepage hero — Kashi-portal structure with Sai Oracle's devotional
 * dark theme: floating arch murti showcase first on mobile (compact),
 * welcome text left with the showcase right on desktop, quick-info
 * pills + CTAs beneath.
 *
 * Slides come from `public/showcase/` when it holds photos (see
 * `lib/showcase.ts`); otherwise `lib/heroSlides.ts`'s built-ins are used.
 */
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
  const slideCount = slides.length;
  const prevIndex = slideCount > 0 ? (safeIndex - 1 + slideCount) % slideCount : 0;
  const nextIndex = slideCount > 0 ? (safeIndex + 1) % slideCount : 0;
  const prevSlide = slides[prevIndex] ?? DEFAULT_SLIDES[0];
  const nextSlide = slides[nextIndex] ?? DEFAULT_SLIDES[0];
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
      className="section-dawn relative overflow-hidden text-stone-900"
      onMouseEnter={() => canHover && setPaused(true)}
      onMouseLeave={() => canHover && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* ── Festive dawn backdrop: marigold + gulal glow, day temple
            silhouette, jali texture, rising gold dust ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 82% 8%, rgb(214 41 129 / 0.14), transparent 60%), radial-gradient(60% 40% at 10% 12%, rgb(247 127 0 / 0.18), transparent 60%)",
        }}
      />
      {/* Temple silhouette resting along the base */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[46%]">
        <Image
          src="/images/hero/mandir-day-wide.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-40 sm:opacity-50"
          style={{
            maskImage: "linear-gradient(to top, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 55%, transparent 100%)",
          }}
        />
      </div>
      <div aria-hidden className="pattern-jali absolute inset-0 opacity-60" />
      <GoldDust />
      {/* Soften the base into the festive divider */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fbdcec]/80 to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 pt-1 pb-10 sm:gap-10 sm:pt-14 sm:pb-16 lg:flex-row lg:justify-center lg:gap-12 lg:pt-10 lg:pb-20">
        {/* Welcome text — below showcase on mobile, left on desktop */}
        <motion.div
          className="order-2 text-center sm:text-left lg:order-1 lg:w-115 lg:shrink-0"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center justify-center gap-3 sm:justify-start"
          >
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-saffron-500/70" />
            <span className="font-display text-xl text-saffron-600 sm:text-2xl">ॐ साई राम</span>
            <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-saffron-500/70" />
          </motion.p>
          <TextReveal
            as="h1"
            text={`Welcome to ${organizationName}`}
            delay={0.15}
            className="mt-2 max-w-3xl font-display text-[2.35rem] leading-[1.08] font-extrabold text-balance text-red-700 sm:mt-3 sm:text-6xl"
          />
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mt-3 max-w-2xl text-[15px] leading-relaxed text-stone-600 sm:mt-4 sm:text-lg"
          >
            {tagline} — home to the Trinity of Sai Avatars, in the holy city of Meerut.
          </motion.p>
          <motion.blockquote
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="relative mt-5 hidden max-w-2xl rounded-2xl border border-saffron-500/20 bg-white/50 py-3 pr-4 pl-5 text-[15px] leading-relaxed text-stone-500 italic backdrop-blur-sm sm:block"
          >
            <Quote aria-hidden className="absolute top-3 left-3 h-3.5 w-3.5 text-saffron-500/60" />
            <span className="ml-4">
              “You are seeking joy and peace in front, but the spring of joy is in your heart,
              the heaven of peace is in yourself.”
            </span>
            <cite className="mt-1 block pl-4 text-[13px] font-semibold text-saffron-600 not-italic">— Sai Baba</cite>
          </motion.blockquote>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mt-5 flex w-full flex-col gap-2.5 sm:mt-7 sm:w-auto sm:flex-row sm:items-center sm:gap-3"
          >
            <Link
              href="/events"
              className="btn-festive btn-glow inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-8 py-3 text-center text-[17px] font-bold whitespace-nowrap text-white shadow-xl transition-all hover:shadow-2xl active:scale-[0.98] sm:w-auto sm:min-h-13 sm:py-3.5 sm:text-lg lg:px-6"
            >
              <CalendarDays aria-hidden className="h-5 w-5" />
              View Events
            </Link>
            <Link
              href="/temple#visit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-saffron-600/40 bg-white/60 px-8 py-2.5 text-center text-[17px] font-bold whitespace-nowrap text-saffron-700 transition-colors hover:border-saffron-500 hover:bg-saffron-500 hover:text-white sm:w-auto sm:min-h-13 sm:py-3 sm:text-lg lg:px-6"
            >
              <MapPin aria-hidden className="h-5 w-5" />
              Visit Temple
            </Link>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-[12px] sm:mt-7 sm:justify-start sm:gap-2 sm:text-sm"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 font-medium text-saffron-700 ring-1 ring-saffron-500/30 backdrop-blur-sm sm:px-4">
              <Flame aria-hidden className="h-3.5 w-3.5" />
              Opens {openingTime} daily
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 font-medium text-gulal-700 ring-1 ring-gulal-500/30 backdrop-blur-sm sm:px-4">
              <MapPin aria-hidden className="h-3.5 w-3.5" />
              Meerut, UP
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 font-medium text-peacock-700 ring-1 ring-peacock-500/30 backdrop-blur-sm sm:px-4">
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
          className="order-1 mx-auto w-full max-w-60 pt-5 sm:max-w-85 lg:order-2 lg:w-auto lg:max-w-none lg:shrink-0"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-3">
            {/* Desktop-only: previous-photo arrow + dimmed neighbour peek —
                replaces the below-image filmstrip so the coverflow reads
                as one wide, image-forward row instead of a tall column. */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-saffron-600/20 bg-white/90 text-saffron-700 shadow-md backdrop-blur-sm transition-colors hover:bg-saffron-500 hover:text-white lg:flex"
            >
              <ChevronLeft aria-hidden className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => jump(prevIndex)}
              aria-label={`Photo ${prevIndex + 1}: ${prevSlide.caption}`}
              title={prevSlide.caption}
              className="hidden aspect-3/4 w-20 shrink-0 overflow-hidden rounded-t-full rounded-b-xl opacity-55 shadow-md ring-2 ring-white transition-opacity hover:opacity-85 xl:block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimizedImageUrl(prevSlide.src, 220)}
                alt=""
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover object-top"
              />
            </button>

            <div className="relative w-full lg:w-80">
              {/* Halo + ring scoped to the image box itself, so they stay
                  centered on the portrait no matter how the row lays out. */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 h-[130%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(232_201_106/0.4),rgb(247_127_0/0.16)_45%,transparent_70%)] blur-2xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[116%] w-[132%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-saffron-500/20 sm:block"
              />
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
                className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold tracking-wider text-saffron-700 uppercase shadow-md ring-1 ring-saffron-500/25 backdrop-blur-sm"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-saffron-500" />
                {slide.tag}
              </span>
              <span className="absolute top-3 right-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-stone-600 tabular-nums shadow-md ring-1 ring-stone-900/10 backdrop-blur-sm">
                {safeIndex + 1} / {slides.length}
              </span>
              {/* Autoplay progress — shows the frame is auto-scrolling */}
              {!paused && !reduceMotion && (
                <div
                  aria-hidden
                  className="absolute inset-x-8 bottom-2.5 z-10 h-[3px] overflow-hidden rounded-full bg-saffron-600/15"
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

            <button
              type="button"
              onClick={() => jump(nextIndex)}
              aria-label={`Photo ${nextIndex + 1}: ${nextSlide.caption}`}
              title={nextSlide.caption}
              className="hidden aspect-3/4 w-20 shrink-0 overflow-hidden rounded-t-full rounded-b-xl opacity-55 shadow-md ring-2 ring-white transition-opacity hover:opacity-85 xl:block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimizedImageUrl(nextSlide.src, 220)}
                alt=""
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover object-top"
              />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-saffron-600/20 bg-white/90 text-saffron-700 shadow-md backdrop-blur-sm transition-colors hover:bg-saffron-500 hover:text-white lg:flex"
            >
              <ChevronRight aria-hidden className="h-5 w-5" />
            </button>
          </div>

          <p key={safeIndex} className="mt-2 flex justify-center sm:mt-4">
            {slide.href ? (
              <Link
                href={slide.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-1.5 text-center text-[13px] font-semibold text-saffron-700 italic shadow-sm ring-1 ring-saffron-500/30 backdrop-blur-sm transition-colors hover:bg-saffron-500 hover:text-white hover:ring-saffron-500 sm:text-sm"
              >
                <Sparkles aria-hidden className="h-3.5 w-3.5 shrink-0" />
                {slide.caption}
                <span aria-hidden>→</span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-1.5 text-center text-[13px] text-stone-600 italic shadow-sm ring-1 ring-saffron-500/20 backdrop-blur-sm sm:text-sm">
                <Sparkles aria-hidden className="h-3.5 w-3.5 shrink-0 text-saffron-500" />
                {slide.caption}
              </span>
            )}
          </p>

          {/* Coverflow filmstrip: neighbours left & right, open photo center.
              Desktop uses the wider neighbour-peek row above instead. */}
          <div className="relative mt-1.5 sm:mt-3 lg:hidden">
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
                    className={`relative aspect-[3/4] shrink-0 overflow-hidden rounded-t-full rounded-b-lg bg-white shadow-md transition-all duration-500 ${
                      distance === 0
                        ? "z-10 w-10 -translate-y-0.5 opacity-100 ring-2 ring-saffron-500 sm:w-14"
                        : distance === 1
                          ? "w-8 opacity-70 ring-2 ring-white hover:opacity-90 sm:w-10"
                          : "w-6 opacity-50 ring-2 ring-white/70 hover:opacity-70 sm:w-8"
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
              className="absolute top-1/2 left-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-saffron-600/20 bg-white/90 text-saffron-700 shadow-md backdrop-blur-sm transition-colors hover:bg-saffron-500 hover:text-white sm:h-10 sm:w-10"
            >
              <ChevronLeft aria-hidden className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-0 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-saffron-600/20 bg-white/90 text-saffron-700 shadow-md backdrop-blur-sm transition-colors hover:bg-saffron-500 hover:text-white sm:h-10 sm:w-10"
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
