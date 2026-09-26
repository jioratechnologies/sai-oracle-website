"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
  Globe2,
  Sparkles,
  Utensils,
  HeartHandshake,
  GraduationCap,
  Images,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ArrowLink from "@/components/ArrowLink";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export interface SevaPhoto {
  src: string;
  alt: string;
  title: string;
  desc: string;
}

export interface SevaSection {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  iconName: "globe" | "sparkles" | "utensils" | "heartHandshake" | "graduation";
  photos: SevaPhoto[];
  paragraphs: string[];
  quote?: string;
  tags: string[];
}

const HUMAN_VALUES = [
  { name: "Sathya", meaning: "Truth", color: "bg-peacock-50 text-peacock-800 border-peacock-200" },
  { name: "Dharma", meaning: "Righteousness", color: "bg-saffron-50 text-saffron-800 border-saffron-200" },
  { name: "Shanti", meaning: "Peace", color: "bg-gold-50 text-maroon-800 border-gold-200" },
  { name: "Prema", meaning: "Love", color: "bg-gulal-50 text-gulal-800 border-gulal-200" },
  { name: "Ahimsa", meaning: "Non-violence", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
];

export default function AimsInteractiveGrid({
  sections,
  missionKarunaPhotos,
}: {
  sections: SevaSection[];
  missionKarunaPhotos: SevaPhoto[];
}) {
  const [activeModal, setActiveModal] = useState<{
    sectionTitle: string;
    photos: SevaPhoto[];
    index: number;
  } | null>(null);

  const openPhoto = useCallback((sectionTitle: string, photos: SevaPhoto[], index = 0) => {
    setActiveModal({ sectionTitle, photos, index });
  }, []);

  const closePhoto = useCallback(() => {
    setActiveModal(null);
  }, []);

  const navigatePhoto = useCallback((direction: 1 | -1) => {
    setActiveModal((curr) => {
      if (!curr) return null;
      const total = curr.photos.length;
      if (total <= 1) return curr;
      const nextIndex = (curr.index + direction + total) % total;
      return { ...curr, index: nextIndex };
    });
  }, []);

  // Keyboard navigation & scroll-lock
  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePhoto();
      if (e.key === "ArrowLeft") navigatePhoto(-1);
      if (e.key === "ArrowRight") navigatePhoto(1);
    };
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeModal, closePhoto, navigatePhoto]);

  const activePhoto = activeModal ? activeModal.photos[activeModal.index] : null;

  return (
    <>
      {/* 2-Column Responsive Landscape Grid for Pillars 1 to 4 */}
      <RevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {sections.map((sec) => (
          <RevealItem key={sec.id}>
            <SpotlightCard
              id={sec.id}
              className="scroll-mt-28 flex h-full flex-col justify-between rounded-3xl border border-maroon-100/90 bg-white p-6 sm:p-7 shadow-xs"
            >
              <div aria-hidden className="absolute inset-x-0 top-0 divider-festive" />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3 py-1 text-xs font-bold tracking-wider text-saffron-800 uppercase">
                    {sec.num} · {sec.eyebrow}
                  </span>
                  <span className="text-xs font-medium text-stone-400">Pillar {sec.num}</span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-maroon-900 sm:text-[1.75rem]">
                  {sec.title}
                </h3>
                <p className="text-sm font-medium text-saffron-700">{sec.subtitle}</p>

                {/* Section Specific Media / Graphic */}
                {sec.id === "global-oneness" ? (
                  <div className="pattern-jali relative mt-5 aspect-[16/7] w-full overflow-hidden rounded-2xl border border-peacock-700/20 bg-linear-to-r from-peacock-700 via-peacock-800 to-maroon-950 p-5 text-white shadow-inner flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className="rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-white uppercase backdrop-blur-xs">
                        Universal Brotherhood
                      </span>
                      <Globe2 className="h-7 w-7 text-peacock-200/50" />
                    </div>
                    <div>
                      <p className="font-display text-base font-semibold leading-snug text-cream-100 sm:text-lg">
                        &ldquo;All faiths on one sacred journey to the Divine.&rdquo;
                      </p>
                      <p className="mt-1 text-xs text-cream-200/80">
                        Satyadeep Sai Universe · Sarva Dharma Sthal
                      </p>
                    </div>
                  </div>
                ) : sec.photos.length > 0 ? (
                  <div className="mt-5 space-y-2.5">
                    {/* Main Clickable Featured Photo */}
                    <button
                      type="button"
                      onClick={() => openPhoto(sec.title, sec.photos, 0)}
                      className="group relative aspect-[16/7.5] w-full overflow-hidden rounded-2xl border border-maroon-100 bg-maroon-950/5 text-left shadow-xs transition-all hover:border-gold-400/80 hover:shadow-md cursor-pointer block"
                      aria-label={`Enlarge photo: ${sec.photos[0].title}`}
                    >
                      <Image
                        src={sec.photos[0].src}
                        alt={sec.photos[0].alt}
                        fill
                        unoptimized={sec.photos[0].src.endsWith(".gif")}
                        className="object-cover transition-transform duration-500 group-hover:scale-104"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-maroon-950/80 via-maroon-950/20 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />

                      {/* Expand hover indicator */}
                      <span
                        aria-hidden
                        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-maroon-900 shadow-xs backdrop-blur-xs transition-transform duration-300 group-hover:scale-110"
                      >
                        <Expand className="h-4 w-4" />
                      </span>

                      {/* Photo details bar at bottom */}
                      <div className="absolute inset-x-0 bottom-0 p-3 text-white flex items-center justify-between gap-2">
                        <span className="min-w-0 truncate text-xs font-medium tracking-wide text-cream-100 drop-shadow-xs">
                          {sec.photos[0].title}
                        </span>
                        {sec.photos.length > 1 && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-white/25 px-2 py-0.5 text-[10px] font-bold text-white shrink-0 backdrop-blur-xs">
                            <Images className="h-3 w-3" />
                            {sec.photos.length} Photos
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Secondary Thumbnails Row (if multiple images in this section) */}
                    {sec.photos.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {sec.photos.map((photo, pIdx) => (
                          <button
                            key={photo.src}
                            type="button"
                            onClick={() => openPhoto(sec.title, sec.photos, pIdx)}
                            className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-maroon-100/80 bg-maroon-950/5 transition-all hover:-translate-y-0.5 hover:border-saffron-400 hover:shadow-xs cursor-pointer"
                            aria-label={`View photo ${pIdx + 1}: ${photo.title}`}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              unoptimized={photo.src.endsWith(".gif")}
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-maroon-950/20 group-hover:bg-transparent transition-colors" />
                            <span className="absolute bottom-1 right-1.5 rounded-sm bg-black/60 px-1 text-[9px] font-bold text-white backdrop-blur-xs">
                              {pIdx + 1}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Optional Golden Quote */}
                {sec.quote && (
                  <blockquote className="mt-4 rounded-xl border-l-3 border-saffron-500 bg-saffron-50/70 p-3 text-xs italic leading-relaxed text-maroon-950 sm:text-sm">
                    {sec.quote}
                  </blockquote>
                )}

                {/* Paragraphs */}
                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-stone-600 sm:text-base">
                  {sec.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* 5 Human Values ribbon if Pillar 4 */}
                {sec.id === "love-and-service" && (
                  <div className="mt-4">
                    <p className="text-xs font-bold tracking-wider text-maroon-900 uppercase">
                      The Five Eternal Human Values:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {HUMAN_VALUES.map((v) => (
                        <span
                          key={v.name}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${v.color}`}
                        >
                          <span>{v.name}</span>
                          <span className="text-[10px] font-normal opacity-75">({v.meaning})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Tags */}
              <div className="mt-6 flex flex-wrap gap-2 border-t border-maroon-100/70 pt-4">
                {sec.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-lg bg-cream-100/90 px-2.5 py-1 text-xs font-medium text-maroon-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Full-Width Landscape Featured Showcase: Mission Karuna */}
      <RevealItem>
        <div
          id="mission-karuna"
          className="scroll-mt-28 relative overflow-hidden rounded-3xl border-2 border-gold-300/70 bg-linear-to-r from-amber-50/90 via-white to-cream-100/95 p-6 sm:p-8 lg:p-10 shadow-md"
        >
          <div aria-hidden className="absolute inset-x-0 top-0 divider-festive" />

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left landscape media frame (5 cols on desktop) */}
            <div className="lg:col-span-5 space-y-3">
              <button
                type="button"
                onClick={() => openPhoto("Mission Karuna", missionKarunaPhotos, 0)}
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-gold-300/50 shadow-md text-left cursor-pointer block"
                aria-label="Enlarge photo: Mission Karuna"
              >
                <Image
                  src={missionKarunaPhotos[0].src}
                  alt={missionKarunaPhotos[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-maroon-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-saffron-500/90 px-3 py-0.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xs">
                  05 · Sacred Cause
                </div>
                <span
                  aria-hidden
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-maroon-900 shadow-xs backdrop-blur-xs transition-transform duration-300 group-hover:scale-110"
                >
                  <Expand className="h-4 w-4" />
                </span>
                <div className="absolute right-3 bottom-3 left-3 text-white">
                  <p className="font-display text-lg font-bold text-cream-100">Mission Karuna</p>
                  <p className="text-xs text-cream-200/90">
                    Click to view full photo &amp; details
                  </p>
                </div>
              </button>

              {/* Mission Karuna Secondary Thumbnails if multiple */}
              {missionKarunaPhotos.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {missionKarunaPhotos.map((photo, pIdx) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => openPhoto("Mission Karuna", missionKarunaPhotos, pIdx)}
                      className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-gold-200/80 bg-maroon-950/5 transition-all hover:-translate-y-0.5 hover:border-saffron-400 hover:shadow-xs cursor-pointer"
                      aria-label={`View photo ${pIdx + 1}: ${photo.title}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-maroon-950/20 group-hover:bg-transparent transition-colors" />
                      <span className="absolute bottom-1 right-1.5 rounded-sm bg-black/60 px-1 text-[9px] font-bold text-white backdrop-blur-xs">
                        {pIdx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right text & action points (7 cols on desktop) */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300 bg-saffron-100/80 px-3 py-1 text-xs font-bold tracking-wider text-saffron-800 uppercase">
                <GraduationCap className="h-4 w-4 text-saffron-600" />
                Flagship Education Initiative
              </span>

              <h3 className="mt-3 font-display text-2xl font-bold text-maroon-900 sm:text-3xl lg:text-4xl">
                Mission Karuna — Empowering the Poor Children
              </h3>

              <p className="mt-3 text-[15px] leading-relaxed text-stone-700 sm:text-base">
                Maa, motivated by Bhagwan Sri Sai Baba, has launched a mission called{" "}
                <strong>Karuna</strong> — &ldquo;Empowering the Poor Children.&rdquo; This mission aims
                at providing financial support to underprivileged children to complete their
                education and strengthen their foundation — irrespective of caste, colour, creed or
                religion.
              </p>

              <p className="mt-2 text-[15px] leading-relaxed text-stone-700 sm:text-base">
                Our objective is to ensure that children can support themselves in the future and live
                with self-respect, breaking free of dependence and poverty.
              </p>

              {/* 3-column micro landscape badges */}
              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <div className="rounded-xl border border-gold-200/80 bg-white/90 p-3 shadow-2xs">
                  <span className="text-xs font-bold text-maroon-900">Education Aid</span>
                  <p className="mt-1 text-[12px] text-stone-600">
                    School fees, books &amp; essential learning support.
                  </p>
                </div>

                <div className="rounded-xl border border-gold-200/80 bg-white/90 p-3 shadow-2xs">
                  <span className="text-xs font-bold text-maroon-900">Universal Reach</span>
                  <p className="mt-1 text-[12px] text-stone-600">
                    Equal care regardless of caste, creed or origin.
                  </p>
                </div>

                <div className="rounded-xl border border-gold-200/80 bg-white/90 p-3 shadow-2xs">
                  <span className="text-xs font-bold text-maroon-900">Self-Reliance</span>
                  <p className="mt-1 text-[12px] text-stone-600">
                    Empowering children to stand strong and independent.
                  </p>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ArrowLink
                  href="/mission-karuna"
                  variant="solid"
                  className="btn-festive text-white shadow-xs"
                >
                  Read Full Mission Details
                </ArrowLink>

                <ArrowLink
                  href="/contribution"
                  variant="outline"
                  className="border-maroon-300 text-maroon-900 hover:border-saffron-500 hover:bg-saffron-50 hover:text-saffron-800"
                >
                  Support this Sacred Cause
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </RevealItem>

      {/* Lightbox Modal for Photo Details */}
      <AnimatePresence>
        {activeModal && activePhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePhoto}
          >
            {/* Backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.22 }}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border-2 border-gold-400/80 bg-cream-50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Festive top banner accent */}
              <div
                aria-hidden
                className="mx-6 mt-3 h-1.5 rounded-full bg-linear-to-r from-gulal-500 via-saffron-400 to-peacock-400"
              />

              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-maroon-100/80 px-5 py-3 sm:px-6">
                <div className="min-w-0 pr-4">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                    {activeModal.sectionTitle} · Photo {activeModal.index + 1} of{" "}
                    {activeModal.photos.length}
                  </span>
                  <h4 className="truncate font-display text-lg font-bold text-maroon-900 sm:text-xl">
                    {activePhoto.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={closePhoto}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon-200 bg-white text-stone-700 transition-colors hover:border-saffron-500 hover:bg-saffron-50 hover:text-saffron-800"
                  aria-label="Close photo preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Large Image Frame with Navigation */}
              <div className="relative bg-black/90 p-2 sm:p-4">
                <div className="relative mx-auto flex h-[50vh] sm:h-[58vh] max-h-[580px] w-full items-center justify-center">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    fill
                    unoptimized={activePhoto.src.endsWith(".gif")}
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 896px"
                  />
                </div>

                {/* Left/Right Arrows if multiple photos */}
                {activeModal.photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigatePhoto(-1)}
                      className="absolute top-1/2 left-3 sm:left-5 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all hover:scale-110 hover:bg-saffron-600"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigatePhoto(1)}
                      className="absolute top-1/2 right-3 sm:right-5 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all hover:scale-110 hover:bg-saffron-600"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Photo Description & Details */}
              <div className="p-5 sm:p-6 bg-white">
                <p className="text-[15px] leading-relaxed text-stone-700 sm:text-base">
                  {activePhoto.desc}
                </p>

                {/* Thumbnails strip inside modal */}
                {activeModal.photos.length > 1 && (
                  <div className="mt-5 border-t border-maroon-100 pt-4">
                    <p className="mb-2 text-xs font-bold tracking-wider text-stone-500 uppercase">
                      All Photos in this Seva:
                    </p>
                    <div className="flex gap-2.5 overflow-x-auto pb-1">
                      {activeModal.photos.map((p, idx) => (
                        <button
                          key={p.src}
                          type="button"
                          onClick={() =>
                            setActiveModal((curr) => (curr ? { ...curr, index: idx } : null))
                          }
                          className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                            idx === activeModal.index
                              ? "border-saffron-500 ring-2 ring-saffron-400"
                              : "border-maroon-100 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={p.src}
                            alt=""
                            fill
                            unoptimized={p.src.endsWith(".gif")}
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
