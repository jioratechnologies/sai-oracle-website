"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Expand, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export default function MissionKarunaGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openPhoto = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  const closePhoto = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const navigatePhoto = useCallback(
    (direction: 1 | -1) => {
      if (activeIndex === null) return;
      const total = photos.length;
      setActiveIndex((prev) => (prev! + direction + total) % total);
    },
    [activeIndex, photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
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
  }, [activeIndex, closePhoto, navigatePhoto]);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile-first Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300 bg-saffron-100/80 px-3 py-0.5 text-xs font-bold text-saffron-900 uppercase tracking-wider">
            <Images className="h-3.5 w-3.5 text-saffron-700" />
            Sacred Moments
          </span>
          <h3 className="mt-1.5 font-display text-2xl font-bold text-maroon-900 sm:text-3xl">
            Balvikas &amp; Seva Gallery
          </h3>
        </div>
        <p className="text-xs font-medium text-stone-500">
          Tap any photo to view full size
        </p>
      </div>

      {/* Grid of Photos — Mobile First: 1 col on mobile, 2 on tablet, 3 on desktop. Image only, no text. */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {photos.map((photo, idx) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => openPhoto(idx)}
            className="group relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gold-300/70 bg-stone-100 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-saffron-500 cursor-pointer block"
            aria-label={photo.alt || `View photo ${idx + 1}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Subtle gentle vignette on hover with expand button */}
            <div className="absolute inset-0 bg-maroon-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <span
              aria-hidden
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-maroon-900 shadow-md backdrop-blur-xs transition-transform duration-300 group-hover:scale-110"
            >
              <Expand className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox Modal — Pure Image View, No Text Box */}
      <AnimatePresence>
        {activePhoto && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.alt || "Photo preview"}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePhoto}
          >
            {/* Backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Dialog Card — Pure Image Only */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center max-w-5xl w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top controls: Counter and Close */}
              <div className="flex w-full items-center justify-between pb-3 px-2 text-white">
                <span className="text-xs font-semibold tracking-wider text-saffron-300">
                  {activeIndex + 1} / {photos.length}
                </span>

                <button
                  type="button"
                  onClick={closePhoto}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-saffron-600 cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* High-res Image Frame */}
              <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-black/80 shadow-2xl">
                <div className="relative flex h-[65vh] sm:h-[78vh] w-full items-center justify-center">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>

                {/* Left/Right Navigation Controls */}
                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigatePhoto(-1)}
                      className="absolute top-1/2 left-2 sm:left-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all hover:scale-110 hover:bg-saffron-600 cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigatePhoto(1)}
                      className="absolute top-1/2 right-2 sm:right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all hover:scale-110 hover:bg-saffron-600 cursor-pointer"
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
    </div>
  );
}
