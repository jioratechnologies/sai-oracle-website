"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import OmMark from "@/components/OmMark";
import TempleArt from "@/components/TempleArt";
import { PixelImage } from "@/components/magicui/pixel-image";
import { albumOf } from "@/lib/albums";
import { optimizedImageUrl } from "@/lib/image";
import type { GalleryImage } from "@/lib/types";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = images.findIndex((g) => g.id === activeId);
  const active = activeIndex >= 0 ? images[activeIndex] : null;

  const close = useCallback(() => setActiveId(null), []);
  const go = useCallback(
    (dir: 1 | -1) => {
      if (images.length === 0) return;
      const next = ((activeIndex < 0 ? 0 : activeIndex) + dir + images.length) % images.length;
      setActiveId(images[next].id);
    },
    [activeIndex, images],
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {images.map((g) => (
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
                className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-maroon-950/80 text-gold-300 opacity-0 ring-2 ring-gold-300 backdrop-blur-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
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
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-maroon-200 text-maroon-800 transition-colors group-hover:border-maroon-800 group-hover:bg-maroon-800 group-hover:text-gold-300"
              >
                <Expand className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>

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
            <div aria-hidden className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.22 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border-2 border-gold-400/70 bg-maroon-950 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                aria-hidden
                className="mx-4 mt-3 h-1.5 rounded-full bg-linear-to-r from-gulal-500 via-saffron-400 to-peacock-400"
              />
              <div aria-hidden className="flex justify-center">
                <span className="-mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-maroon-800 font-display text-xl text-gold-300 ring-[3px] ring-gold-300">
                  ॐ
                </span>
              </div>
              <div className="flex items-center gap-3 px-5 pt-1 pb-3">
                <OmMark className="hidden h-9 w-9 sm:flex" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-gold-300 uppercase">
                    Sai Oracle · {albumOf(active.image_url)}
                  </p>
                  <p className="truncate font-display text-lg leading-snug font-bold text-cream-50">
                    {active.title || "Temple Photo"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close photo viewer"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-300/50 text-gold-200 transition-colors hover:bg-gold-300 hover:text-maroon-950"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mx-3 flex justify-center overflow-hidden rounded-2xl bg-black ring-1 ring-gold-400/30 sm:mx-4">
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
                <p className="text-sm text-gold-200/90 italic">ॐ साई राम</p>
                {images.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous photo"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-300/50 text-gold-200 transition-colors hover:bg-gold-300 hover:text-maroon-950"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-semibold text-cream-100 tabular-nums">
                      {activeIndex + 1} / {images.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next photo"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-300/50 text-gold-200 transition-colors hover:bg-gold-300 hover:text-maroon-950"
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
