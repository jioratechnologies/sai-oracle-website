"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DevoteeExperience } from "@/lib/types";

const AUTOPLAY_MS = 7000;

function initials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words[0] === "A" && words.length > 1) return `A${words[1][0] ?? ""}`;
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/**
 * Aceternity-style animated testimonials: word-by-word quote reveal,
 * avatar-jump navigation, arrows + autoplay. Falls back to a calm
 * manual carousel when reduced motion is requested.
 */
export default function Testimonials({ items }: { items: DevoteeExperience[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (paused || reduceMotion || items.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion, items.length]);

  if (items.length === 0) return null;
  const item = items[index];
  const words = item.quote.split(/\s+/);
  const dur = reduceMotion ? 0 : 0.35;

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <>
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Devotee experiences"
      className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-sm md:hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 divider-festive"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 left-6 font-display text-[120px] leading-none text-maroon-50 select-none"
      >
        &ldquo;
      </span>

      <div className="relative px-6 pt-12 pb-6 text-center sm:px-12">
        <div className="flex min-h-[132px] items-center justify-center sm:min-h-[108px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
              transition={{ duration: dur }}
              className="font-display text-[22px] leading-relaxed font-medium text-balance text-maroon-900 sm:text-2xl"
            >
              &ldquo;
              {words.map((w, i) => (
                <motion.span
                  key={`${index}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                    delay: reduceMotion ? 0 : 0.15 + i * 0.02,
                  }}
                >
                  {w}{" "}
                </motion.span>
              ))}
              &rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`author-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
            className="mt-5 flex items-center justify-center gap-3"
          >
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon-800 font-display text-base font-bold text-gold-300 ring-2 ring-gold-400/70"
            >
              {initials(item.name)}
            </span>
            <span className="text-left">
              <span className="block text-[15px] font-bold text-maroon-900">
                — {item.name}
              </span>
              <span className="block text-sm text-stone-500">{item.place}</span>
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Controls: arrows + avatar jump dots */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous experience"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-maroon-200 text-maroon-800 transition-colors hover:bg-maroon-800 hover:text-cream-50"
          >
            <ChevronLeft aria-hidden className="h-4 w-4" />
          </button>
          <div className="flex gap-2.5" role="tablist" aria-label="Choose experience">
            {items.map((t, i) => (
              <button
                key={t.name + i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${t.name}, ${t.place}`}
                title={`${t.name} · ${t.place}`}
                onClick={() => setIndex(i)}
                className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-xs font-bold transition-all ${
                  i === index
                    ? "bg-maroon-800 text-gold-300 ring-2 ring-gold-400 ring-offset-2 ring-offset-white"
                    : "border border-maroon-200 bg-cream-100 text-maroon-800 hover:border-maroon-400"
                }`}
              >
                {initials(t.name)}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next experience"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-maroon-200 text-maroon-800 transition-colors hover:bg-maroon-800 hover:text-cream-50"
          >
            <ChevronRight aria-hidden className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        Experience {index + 1} of {items.length}: {item.quote} — {item.name}, {item.place}
      </p>
    </div>

      {/* All testimonials side-by-side on tablet and desktop */}
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.name + t.place}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-maroon-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 divider-festive"
            />
            <span
              aria-hidden
              className="font-display text-5xl leading-none text-gold-400"
            >
              &ldquo;
            </span>
            <blockquote className="mt-1 flex-1 text-[16px] leading-relaxed text-stone-700">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-maroon-50 pt-4">
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon-800 font-display text-sm font-bold text-gold-300 ring-2 ring-gold-400/70"
              >
                {initials(t.name)}
              </span>
              <span>
                <span className="block text-sm font-bold text-maroon-900">
                  — {t.name}
                </span>
                <span className="block text-[13px] text-stone-500">{t.place}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
