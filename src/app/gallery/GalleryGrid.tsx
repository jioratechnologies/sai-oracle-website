"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import OmMark from "@/components/OmMark";
import TempleArt from "@/components/TempleArt";
import { PixelImage } from "@/components/magicui/pixel-image";
import { albumOf, ALBUMS, type AlbumLabel } from "@/lib/albums";
import { optimizedImageUrl } from "@/lib/image";
import type { GalleryImage } from "@/lib/types";


export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<AlbumLabel>("All");

  // Count per album (excluding "All")
  const albumCounts = useMemo(() => {
    const counts: Partial<Record<AlbumLabel, number>> = {};
    for (const img of images) {
      const a = albumOf(img.image_url) as AlbumLabel;
      counts[a] = (counts[a] ?? 0) + 1;
    }
    return counts;
  }, [images]);

  // Filtered image list
  const filtered = useMemo(
    () =>
      activeAlbum === "All" ? images : images.filter((img) => albumOf(img.image_url) === activeAlbum),
    [images, activeAlbum],
  );

  const activeIndex = filtered.findIndex((g) => g.id === activeId);
  const active = activeIndex >= 0 ? filtered[activeIndex] : null;

  const close = useCallback(() => setActiveId(null), []);
  const go = useCallback(
    (dir: 1 | -1) => {
      if (filtered.length === 0) return;
      const next = ((activeIndex < 0 ? 0 : activeIndex) + dir + filtered.length) % filtered.length;
      setActiveId(filtered[next].id);
    },
    [activeIndex, filtered],
  );

  // Escape / arrows + scroll lock while the viewer is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close, go]);

  return (
    <>
      {/* ── Album Filter Chips ── */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="h-4 w-4 text-saffron-600 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-widest text-saffron-700">Filter by Album</span>
          {activeAlbum !== "All" && (
            <button
              type="button"
              onClick={() => setActiveAlbum("All")}
              className="ml-auto text-[11px] font-semibold text-stone-500 hover:text-maroon-800 flex items-center gap-1"
            >
              Clear <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {ALBUMS.filter((a) => a === "All" || (albumCounts[a as AlbumLabel] ?? 0) > 0).map((album) => {
            const count = album === "All" ? images.length : (albumCounts[album as AlbumLabel] ?? 0);
            const isActive = activeAlbum === album;
            return (
              <button
                key={album}
                type="button"
                onClick={() => { setActiveAlbum(album as AlbumLabel); setActiveId(null); }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold transition-all ${
                  isActive
                    ? "border-saffron-500 bg-saffron-500 text-white shadow-sm"
                    : "border-maroon-200 bg-white text-stone-600 hover:border-saffron-400 hover:text-saffron-700"
                }`}
              >
                {album}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Photo Grid: Mobile-First (1 col mobile, 2 col sm, 3 col md). Image only, no text ── */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-stone-500 text-sm">No photos in this album yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
        {filtered.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveId(g.id)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gold-300/70 bg-cream-100 text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-saffron-500 cursor-pointer block"
            aria-label="View full photo"
          >
            {g.image_url ? (
              <PixelImage
                src={optimizedImageUrl(g.image_url, 640)}
                alt=""
                customGrid={{ rows: 3, cols: 4 }}
                pixelFadeInDuration={600}
                maxAnimationDelay={700}
                colorRevealDelay={350}
                className="h-full w-full"
                imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <TempleArt className="h-full w-full" label="Temple photo" />
            )}
            
            {/* Subtle gentle vignette on hover with expand button */}
            <span
              aria-hidden
              className="absolute inset-0 bg-maroon-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span
              aria-hidden
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-maroon-900 shadow-md backdrop-blur-xs transition-transform duration-300 group-hover:scale-110"
            >
              <Expand className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>
      )}

      {/* Temple-framed photo viewer — Pure Image View, No Text Box */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Temple photo preview"
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <div aria-hidden className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-black/80 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Controls: Minimal counter and Close */}
              <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                <span className="text-xs font-semibold tracking-widest text-saffron-300 uppercase">
                  {activeIndex + 1} / {filtered.length}
                </span>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close photo viewer"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-saffron-600 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Large Image Frame */}
              <div className="relative mx-auto flex h-[65vh] sm:h-[76vh] w-full items-center justify-center px-2 sm:px-4">
                {active.image_url ? (
                  <PixelImage
                    key={active.id}
                    src={optimizedImageUrl(active.image_url, 1080)}
                    alt="Temple photo"
                    customGrid={{ rows: 5, cols: 7 }}
                    pixelFadeInDuration={800}
                    maxAnimationDelay={1000}
                    colorRevealDelay={500}
                    className="h-full w-full"
                    imageClassName="object-contain"
                  />
                ) : (
                  <TempleArt className="aspect-[4/3] w-full" />
                )}

                {/* Left/Right Navigation buttons with generous touch targets */}
                {filtered.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous photo"
                      className="absolute top-1/2 left-3 sm:left-6 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all hover:scale-110 hover:bg-saffron-600 cursor-pointer"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next photo"
                      className="absolute top-1/2 right-3 sm:right-6 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-all hover:scale-110 hover:bg-saffron-600 cursor-pointer"
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
