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

      {/* ── Photo Grid ── */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-stone-500 text-sm">No photos in this album yet.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveId(g.id)}
            className="group overflow-hidden rounded-3xl border border-maroon-100 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-xl"
            aria-label={`View photo: ${g.title || "Temple photo"}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
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
                <TempleArt className="h-full w-full" label={g.title || "Temple photo"} />
              )}
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-maroon-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-white/90 text-saffron-600 opacity-0 ring-2 ring-saffron-400 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
              >
                <Expand className="h-5 w-5" />
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <span className="min-w-0">
                <span className="block truncate font-display text-lg leading-snug font-bold text-maroon-900">
                  {g.title || "Temple Photo"}
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold tracking-[0.18em] text-saffron-600 uppercase">
                  {albumOf(g.image_url)}
                </span>
              </span>
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon-200 text-maroon-800 transition-colors group-hover:border-saffron-500 group-hover:bg-saffron-500 group-hover:text-white"
              >
                <Expand className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
      )}

      {/* Temple-framed photo viewer */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.title || "Temple photo"}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <div aria-hidden className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.22 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border-2 border-saffron-300/70 bg-cream-50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                aria-hidden
                className="mx-4 mt-3 h-1.5 rounded-full bg-linear-to-r from-gulal-500 via-saffron-400 to-peacock-400"
              />
              <div aria-hidden className="flex justify-center">
                <span className="-mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white font-display text-xl text-saffron-600 shadow ring-[3px] ring-saffron-400">
                  ॐ
                </span>
              </div>
              <div className="flex items-center gap-3 px-5 pt-1 pb-3">
                <OmMark className="hidden h-9 w-9 sm:flex" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-saffron-700 uppercase">
                    Sai Oracle · {albumOf(active.image_url)}
                  </p>
                  <p className="truncate font-display text-lg leading-snug font-bold text-stone-900">
                    {active.title || "Temple Photo"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close photo viewer"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-saffron-500/50 text-saffron-700 transition-colors hover:bg-saffron-500 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mx-3 flex justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-saffron-300/50 sm:mx-4">
                {active.image_url ? (
                  <PixelImage
                    key={active.id}
                    src={optimizedImageUrl(active.image_url, 1080)}
                    alt={active.title || "Temple photo"}
                    customGrid={{ rows: 5, cols: 7 }}
                    pixelFadeInDuration={800}
                    maxAnimationDelay={1000}
                    colorRevealDelay={500}
                    className="h-[62vh] w-full"
                    imageClassName="object-contain"
                  />
                ) : (
                  <TempleArt className="aspect-[4/3] w-full" />
                )}
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-3">
                <p className="text-sm text-saffron-700 italic">ॐ साई राम</p>
                {filtered.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous photo"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-saffron-500/40 text-saffron-700 transition-colors hover:bg-saffron-500 hover:text-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-semibold text-stone-600 tabular-nums">
                      {activeIndex + 1} / {filtered.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next photo"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-saffron-500/40 text-saffron-700 transition-colors hover:bg-saffron-500 hover:text-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
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
