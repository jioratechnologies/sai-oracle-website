"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  ArrowRight,
  Info,
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
  // Photo Lightbox modal
  const [activePhotoModal, setActivePhotoModal] = useState<{
    sectionTitle: string;
    photos: SevaPhoto[];
    index: number;
  } | null>(null);

  // Details Dialogue Box modal (triggered by "View More" button)
  const [activeDetailSection, setActiveDetailSection] = useState<SevaSection | null>(null);

  const openPhoto = useCallback((sectionTitle: string, photos: SevaPhoto[], index = 0) => {
    setActivePhotoModal({ sectionTitle, photos, index });
  }, []);

  const closePhoto = useCallback(() => {
    setActivePhotoModal(null);
  }, []);

  const navigatePhoto = useCallback((direction: 1 | -1) => {
    setActivePhotoModal((curr) => {
      if (!curr) return null;
      const total = curr.photos.length;
      if (total <= 1) return curr;
      const nextIndex = (curr.index + direction + total) % total;
      return { ...curr, index: nextIndex };
    });
  }, []);

  // Keyboard navigation & body scroll-lock
  useEffect(() => {
    const isAnyModalOpen = activePhotoModal !== null || activeDetailSection !== null;
    if (!isAnyModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activePhotoModal) closePhoto();
        else if (activeDetailSection) setActiveDetailSection(null);
      }
      if (activePhotoModal) {
        if (e.key === "ArrowLeft") navigatePhoto(-1);
        if (e.key === "ArrowRight") navigatePhoto(1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activePhotoModal, activeDetailSection, closePhoto, navigatePhoto]);

  const activePhoto = activePhotoModal ? activePhotoModal.photos[activePhotoModal.index] : null;

  return (
    <>
      {/* 2-Column Responsive Landscape Grid for Pillars 1 to 4 */}
      <RevealGroup className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8">
        {sections.map((sec) => (
          <RevealItem key={sec.id}>
            <SpotlightCard
              id={sec.id}
              className="scroll-mt-28 flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-maroon-100/90 bg-white p-5 sm:p-7 shadow-xs"
            >
              <div aria-hidden className="absolute inset-x-0 top-0 divider-festive" />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3 py-1 text-xs font-bold tracking-wider text-saffron-800 uppercase">
                    {sec.num} · {sec.eyebrow}
                  </span>
                  <span className="text-xs font-semibold text-stone-400">Pillar {sec.num}</span>
                </div>

                <h3 className="mt-3.5 font-display text-2xl font-bold text-maroon-900 sm:text-[1.7rem] leading-snug">
                  {sec.title}
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm font-semibold text-saffron-700">{sec.subtitle}</p>

                {/* Section Specific Media / Photo Gallery */}
                {sec.photos.length > 0 && (
                  <div className="mt-4 space-y-2.5">
                    {/* Main Featured Photo */}
                    <button
                      type="button"
                      onClick={() => openPhoto(sec.title, sec.photos, 0)}
                      className="group relative aspect-[16/8.5] w-full overflow-hidden rounded-2xl border border-maroon-100/80 bg-stone-100 text-left shadow-xs transition-all hover:border-gold-400 hover:shadow-md cursor-pointer block"
                      aria-label={`Enlarge photo: ${sec.photos[0].title}`}
                    >
                      <Image
                        src={sec.photos[0].src}
                        alt={sec.photos[0].alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
                        unoptimized={sec.photos[0].src.endsWith(".gif")}
                        className="object-cover transition-transform duration-500 group-hover:scale-104"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-maroon-950/70 via-transparent to-transparent" />

                      <span
                        aria-hidden
                        className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-maroon-900 shadow-sm backdrop-blur-xs transition-transform duration-300 group-hover:scale-110"
                      >
                        <Expand className="h-4 w-4" />
                      </span>

                      {/* Photo details bar at bottom */}
                      <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 text-white flex items-center justify-between gap-2">
                        <span className="min-w-0 truncate text-xs font-semibold text-cream-100 drop-shadow-xs">
                          {sec.photos[0].title}
                        </span>
                        {sec.photos.length > 1 && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-bold text-white shrink-0 backdrop-blur-xs">
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
                            className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-maroon-100/80 bg-stone-100 transition-all hover:border-saffron-400 hover:shadow-xs cursor-pointer"
                            aria-label={`View photo ${pIdx + 1}: ${photo.title}`}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(max-width: 640px) 33vw, 200px"
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
                )}

                {/* Paragraphs (Summary view on card) */}
                <div className="mt-3.5 space-y-2 text-[14.5px] sm:text-[15px] leading-relaxed text-stone-600 line-clamp-3">
                  <p>{sec.paragraphs[0]}</p>
                </div>
              </div>

              {/* Card Footer: View More button + Tags */}
              <div className="mt-5 pt-3.5 border-t border-maroon-100/70 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveDetailSection(sec)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-saffron-300 bg-saffron-50 px-3.5 py-1.5 text-xs font-bold text-saffron-800 hover:bg-saffron-100 hover:border-saffron-400 transition-all cursor-pointer shadow-2xs"
                >
                  <Info className="h-3.5 w-3.5 text-saffron-600" />
                  <span>View Details</span>
                  <ArrowRight className="h-3 w-3" />
                </button>

                <div className="flex flex-wrap gap-1.5">
                  {sec.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-lg bg-cream-100 px-2 py-0.5 text-[11px] font-medium text-stone-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Full-Width Featured Showcase: Pillar 05 — Mission Karuna */}
      <RevealItem>
        <div
          id="mission-karuna"
          className="scroll-mt-28 relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gold-300/70 bg-linear-to-r from-amber-50/90 via-white to-cream-100/95 p-5 sm:p-8 lg:p-10 shadow-md"
        >
          <div aria-hidden className="absolute inset-x-0 top-0 divider-festive" />

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
            {/* Left landscape media frame */}
            <div className="lg:col-span-5 space-y-2.5">
              <button
                type="button"
                onClick={() => openPhoto("Mission Karuna", missionKarunaPhotos, 0)}
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-gold-300/60 shadow-md text-left cursor-pointer block"
                aria-label="Enlarge photo: Mission Karuna"
              >
                <Image
                  src={missionKarunaPhotos[0].src}
                  alt={missionKarunaPhotos[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-maroon-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-saffron-500/90 px-3 py-0.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-xs">
                  05 · Sacred Cause
                </div>
                <span
                  aria-hidden
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-maroon-900 shadow-xs backdrop-blur-xs transition-transform duration-300 group-hover:scale-110"
                >
                  <Expand className="h-4 w-4" />
                </span>
                <div className="absolute right-3 bottom-3 left-3 text-white">
                  <p className="font-display text-lg font-bold text-cream-100">Mission Karuna</p>
                  <p className="text-xs text-cream-200/90">
                    Balvikas Education &amp; Character Building
                  </p>
                </div>
              </button>

              {/* Secondary Thumbnails */}
              {missionKarunaPhotos.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {missionKarunaPhotos.map((photo, pIdx) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => openPhoto("Mission Karuna", missionKarunaPhotos, pIdx)}
                      className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-gold-200/80 bg-stone-100 transition-all hover:border-saffron-400 hover:shadow-xs cursor-pointer"
                      aria-label={`View photo ${pIdx + 1}: ${photo.title}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 33vw, 180px"
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

            {/* Right text & action points */}
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300 bg-saffron-100/80 px-3 py-1 text-xs font-bold tracking-wider text-saffron-800 uppercase">
                <GraduationCap className="h-4 w-4 text-saffron-600" />
                Flagship Education Initiative
              </span>

              <h3 className="font-display text-2xl font-bold text-maroon-900 sm:text-3xl lg:text-4xl">
                Mission Karuna — Empowering Balvikas Children
              </h3>

              <p className="text-[14.5px] sm:text-base leading-relaxed text-stone-700">
                Maa, motivated by Bhagwan Sri Sai Baba, has launched a mission called{" "}
                <strong>Karuna</strong> — &ldquo;Empowering Balvikas Children.&rdquo; This mission aims
                at providing educational, moral, and financial support to children in need to complete their
                education and strengthen their foundation — irrespective of caste, colour, creed or religion.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDetailSection({
                      id: "mission-karuna",
                      num: "05",
                      eyebrow: "Sacred Cause",
                      title: "Mission Karuna",
                      subtitle: "Empowering Balvikas Children through Education & Human Values",
                      iconName: "graduation",
                      photos: missionKarunaPhotos,
                      paragraphs: [
                        "Maa, motivated by Bhagwan Sri Sai Baba, has launched a mission called Karuna — 'Empowering Balvikas Children.' This mission aims at providing educational, moral, and financial support to underprivileged children to complete their education and strengthen their foundation — irrespective of caste, colour, creed or religion.",
                        "Our objective is to ensure that children build bright futures, grow into self-reliant individuals, and live with dignity and self-respect, breaking free of economic dependence.",
                        "At Satyadeep Sai Baba Charitable School, operating 5 days a week, children receive free quality schooling alongside moral guidance. Every child receives school fees, uniforms, textbooks, learning kits, and nourishing prasad.",
                      ],
                      quote:
                        "“Children are the most precious trust given to humanity. Train them in character, truth, and selfless service, and they will transform the world.” — Bhagwan Sri Sathya Sai Baba",
                      tags: ["Education for All", "Human Values", "Satyadeep Charitable School"],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl border border-saffron-400 bg-saffron-50 px-4 py-2 text-xs font-bold text-saffron-900 hover:bg-saffron-100 transition-all cursor-pointer shadow-2xs"
                >
                  <Info className="h-3.5 w-3.5 text-saffron-700" />
                  <span>View Full Details</span>
                </button>

                <ArrowLink
                  href="/mission-karuna"
                  variant="solid"
                  className="btn-festive text-white shadow-xs px-5 py-2 text-xs font-bold"
                >
                  Dedicated Mission Karuna Page
                </ArrowLink>

                <ArrowLink
                  href="/trust#bank"
                  variant="outline"
                  className="border-maroon-300 text-maroon-900 hover:border-saffron-500 hover:bg-saffron-50 px-4 py-2 text-xs font-semibold"
                >
                  Support via Bank
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </RevealItem>

      {/* ── Dialogue Box: Pillar Full Details Modal ── */}
      <AnimatePresence>
        {activeDetailSection && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeDetailSection.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveDetailSection(null)}
          >
            {/* Backdrop */}
            <div aria-hidden className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Card */}
            <motion.div
              className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-gold-300/80 bg-white text-stone-800 shadow-2xl"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-maroon-100 bg-cream-50/80 px-5 py-4 sm:px-7">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-100/70 px-2.5 py-0.5 text-[11px] font-bold text-saffron-800 uppercase tracking-wider">
                    Pillar {activeDetailSection.num} · {activeDetailSection.eyebrow}
                  </span>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-maroon-900">
                    {activeDetailSection.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDetailSection(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon-200 bg-white text-maroon-800 transition-colors hover:bg-saffron-50 hover:border-saffron-400 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Body Content */}
              <div className="overflow-y-auto p-5 sm:p-7 space-y-5">
                {/* Photo showcase in dialog */}
                {activeDetailSection.photos.length > 0 && (
                  <div className="space-y-2">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gold-300/60 bg-stone-100">
                      <Image
                        src={activeDetailSection.photos[0].src}
                        alt={activeDetailSection.photos[0].alt}
                        fill
                        className="object-cover"
                        unoptimized={activeDetailSection.photos[0].src.endsWith(".gif")}
                      />
                    </div>
                    {activeDetailSection.photos.length > 1 && (
                      <div className="grid grid-cols-3 gap-2">
                        {activeDetailSection.photos.map((p, idx) => (
                          <div
                            key={p.src}
                            className="relative aspect-[16/10] overflow-hidden rounded-xl border border-maroon-100"
                          >
                            <Image
                              src={p.src}
                              alt={p.alt}
                              fill
                              className="object-cover"
                              unoptimized={p.src.endsWith(".gif")}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Subtitle */}
                <p className="text-sm font-semibold text-saffron-800">
                  {activeDetailSection.subtitle}
                </p>

                {/* Quote */}
                {activeDetailSection.quote && (
                  <blockquote className="rounded-2xl border-l-4 border-saffron-500 bg-saffron-50/80 p-3.5 text-xs sm:text-sm italic leading-relaxed text-maroon-950">
                    {activeDetailSection.quote}
                  </blockquote>
                )}

                {/* Full Paragraphs */}
                <div className="space-y-3 text-[14.5px] sm:text-[15.5px] leading-relaxed text-stone-700">
                  {activeDetailSection.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Human Values if Pillar 4 */}
                {activeDetailSection.id === "love-and-service" && (
                  <div className="rounded-2xl border border-gold-200 bg-amber-50/60 p-4">
                    <p className="text-xs font-bold tracking-wider text-maroon-900 uppercase">
                      The Five Eternal Human Values:
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
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

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeDetailSection.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-lg bg-cream-100 px-2.5 py-1 text-xs font-medium text-maroon-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-maroon-100 bg-cream-50/80 px-5 py-3.5 sm:px-7 flex items-center justify-between gap-3">
                <Link
                  href="/trust#bank"
                  className="btn-festive inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xs"
                >
                  <span>Support this Seva</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveDetailSection(null)}
                  className="rounded-xl border border-maroon-200 bg-white px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox: High-Resolution Photo Viewer Modal ── */}
      <AnimatePresence>
        {activePhoto && activePhotoModal && (
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
            <div aria-hidden className="absolute inset-0 bg-black/90 backdrop-blur-md" />

            {/* Modal Dialog Card */}
            <motion.div
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-black/90 text-white shadow-2xl"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 sm:px-6">
                <div className="min-w-0 pr-4">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-saffron-400 uppercase">
                    {activePhotoModal.sectionTitle} · Photo {activePhotoModal.index + 1} of{" "}
                    {activePhotoModal.photos.length}
                  </span>
                  <h4 className="truncate font-display text-base sm:text-lg font-bold text-cream-100">
                    {activePhoto.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={closePhoto}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-saffron-600 hover:border-saffron-600 cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Large Image Frame with Navigation */}
              <div className="relative bg-black/95 p-2 sm:p-4">
                <div className="relative mx-auto flex h-[55vh] sm:h-[65vh] max-h-[600px] w-full items-center justify-center">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 896px"
                    unoptimized={activePhoto.src.endsWith(".gif")}
                  />
                </div>

                {/* Left/Right Navigation */}
                {activePhotoModal.photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigatePhoto(-1)}
                      className="absolute top-1/2 left-3 sm:left-5 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all hover:scale-110 hover:bg-saffron-600 cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigatePhoto(1)}
                      className="absolute top-1/2 right-3 sm:right-5 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all hover:scale-110 hover:bg-saffron-600 cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
