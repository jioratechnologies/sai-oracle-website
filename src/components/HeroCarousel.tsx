"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Photo hero: the unchanged welcome text beside a rotating
 * arch-framed temple photograph (real photos from the temple archive).
 * Phone / tablet / desktop share one responsive layout — the photo panel
 * simply reflows beneath the text on small screens.
 */
const SLIDES = [
  {
    src: "/legacy/home/sai_06.jpg",
    caption: "Sanctum — the Trinity of Sai Avatars",
  },
  {
    src: "/legacy/banner/3.jpg",
    caption: "Shirdi Sai adorned with garlands",
  },
  {
    src: "/legacy/banner/6.jpg",
    caption: "Divine Jhula at the temple",
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroCarousel({
  organizationName,
  tagline,
  openingTime,
}: {
  organizationName: string;
  tagline: string;
  openingTime: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion]);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${organizationName} — temple photos`}
      className="relative overflow-hidden bg-maroon-950 text-cream-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden className="pattern-jali-dark absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="absolute -top-24 right-[10%] h-72 w-72 rounded-full bg-saffron-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-[5%] h-56 w-56 rounded-full bg-gold-400/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        {/* Unchanged welcome text */}
        <div className="text-center lg:text-left">
          <p className="font-display text-2xl text-gold-300 sm:text-3xl">ॐ साई राम</p>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-[42px] leading-[1.1] font-bold sm:text-6xl lg:mx-0">
            Welcome to {organizationName}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream-200/90 sm:text-lg lg:mx-0">
            {tagline} — home to the Trinity of Sai Avatars, in the holy city of Meerut.
          </p>
          <p className="mx-auto mt-3 hidden max-w-2xl text-[15px] text-cream-200/70 italic sm:block lg:mx-0">
            “You are seeking joy and peace in front, but the spring of joy is in your heart, the
            heaven of peace is in yourself.” — Sai Baba
          </p>
          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/events"
              className="w-full rounded-full bg-saffron-500 px-8 py-3.5 text-center text-lg font-semibold text-white shadow-lg transition-colors hover:bg-saffron-600 sm:w-auto"
            >
              View Events
            </Link>
            <Link
              href="/temple#visit"
              className="w-full rounded-full border-2 border-gold-300/70 px-8 py-3 text-center text-lg font-semibold text-gold-300 transition-colors hover:bg-gold-300 hover:text-maroon-950 sm:w-auto"
            >
              Visit Temple
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[13px] sm:text-sm lg:justify-start">
            <span className="rounded-full bg-cream-50/10 px-4 py-1.5 backdrop-blur-sm">
              🪔 Opens {openingTime} daily
            </span>
            <span className="rounded-full bg-cream-50/10 px-4 py-1.5 backdrop-blur-sm">
              📍 Meerut, UP
            </span>
            <span className="rounded-full bg-cream-50/10 px-4 py-1.5 backdrop-blur-sm">
              🙏 Open all 7 days
            </span>
          </div>
        </div>

        {/* Rotating temple photo in a mandir-arch frame */}
        <div className="mx-auto w-full max-w-[520px]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-[10rem] rounded-b-3xl shadow-2xl ring-4 ring-gold-400/80">
            {SLIDES.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={i === index ? s.caption : ""}
                aria-hidden={i !== index}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 90vw, 520px"
                className={`object-cover transition-opacity duration-1000 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-maroon-950/70 to-transparent"
            />
          </div>
          <p key={index} className="mt-3 text-center text-sm text-cream-200/85 italic">
            ❖ {SLIDES[index].caption}
          </p>
          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/40 text-xl text-cream-100 backdrop-blur-sm transition-colors hover:bg-cream-100/20"
            >
              ‹
            </button>
            <div role="tablist" aria-label="Choose photo" className="flex gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Photo ${i + 1}: ${s.caption}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-gold-300" : "w-2.5 bg-cream-100/50 hover:bg-cream-100/80"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/40 text-xl text-cream-100 backdrop-blur-sm transition-colors hover:bg-cream-100/20"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        Photo {index + 1} of {SLIDES.length}: {SLIDES[index].caption}
      </p>
      <div aria-hidden className="relative h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600" />
    </section>
  );
}
