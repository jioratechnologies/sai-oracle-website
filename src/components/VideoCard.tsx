"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ArrowLink from "./ArrowLink";
import OmMark from "./OmMark";
import { youtubeEmbedUrl, youtubeThumbnail, youtubeWatchUrl } from "@/lib/youtube";
import type { YoutubeVideo } from "@/lib/types";

/**
 * YouTube facade + lightbox dialog. The thumbnail (never a dead player)
 * opens a proper modal with the video; Escape, backdrop click, or the
 * close button dismisses it, restores scroll, and returns focus.
 */
export default function VideoCard({ video }: { video: YoutubeVideo }) {
  const [open, setOpen] = useState(false);
  const playRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const embed = youtubeEmbedUrl(video.youtube_url);
  const thumb = video.thumbnail_url || youtubeThumbnail(video.youtube_url);
  const watchUrl = youtubeWatchUrl(video.youtube_url);

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to the play button that opened the dialog.
    requestAnimationFrame(() => playRef.current?.focus());
  }, []);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <article className="group/card relative flex flex-col overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-10 divider-festive"
        />
        <div className="relative aspect-video overflow-hidden bg-maroon-950">
          {thumb && (
            <button
              ref={playRef}
              type="button"
              onClick={() => (embed ? setOpen(true) : window.open(watchUrl, "_blank"))}
              className="group absolute inset-0 h-full w-full cursor-pointer"
              aria-label={`Play ${video.title}`}
              aria-haspopup="dialog"
            >
              <Image
                src={thumb}
                alt=""
                fill
                sizes="(max-width: 768px) 90vw, 360px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-maroon-950/70 via-maroon-950/10 to-transparent"
              />
              <span
                aria-hidden
                className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-maroon-950/70 px-2 py-1 text-[11px] font-bold tracking-wider text-cream-50 uppercase backdrop-blur-sm"
              >
                <Play className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                Bhajan
              </span>
              <span
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="absolute inset-0 rounded-full bg-gold-300/40 motion-safe:animate-ping" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-maroon-950/90 shadow-xl ring-2 ring-gold-300 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-maroon-800">
                  <Play
                    className="h-6 w-6 translate-x-[1px] text-gold-300"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </span>
              </span>
            </button>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[22px] leading-snug font-bold text-maroon-900">
            {video.title}
          </h3>
          <div className="mt-3 flex items-center justify-between border-t border-maroon-50 pt-3">
            <span className="flex items-center gap-1.5" aria-hidden>
              <span className="flex h-5 w-7 items-center justify-center rounded bg-red-600">
                <Play className="h-3 w-3 text-white" fill="currentColor" strokeWidth={0} />
              </span>
              <span className="text-[13px] font-bold tracking-wide text-stone-500">YouTube</span>
            </span>
            <ArrowLink
              href={watchUrl}
              external
              className="text-sm text-saffron-600 hover:text-saffron-500"
            >
              Watch
            </ArrowLink>
          </div>
        </div>
      </article>

      {/* Lightbox dialog */}
      <AnimatePresence>
        {open && embed && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
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
              className="relative w-full max-w-4xl overflow-visible rounded-3xl border-2 border-gold-400/70 bg-maroon-950 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Festive toran + Om medallion */}
              <div
                aria-hidden
                className="mx-4 mt-3 h-1.5 rounded-full bg-linear-to-r from-gulal-500 via-saffron-400 to-peacock-400"
              />
              <div aria-hidden className="flex justify-center">
                <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-maroon-800 font-display text-2xl text-gold-300 ring-[3px] ring-gold-300">
                  ॐ
                </span>
              </div>
              <div className="flex items-center gap-3 px-5 pt-1 pb-3">
                <OmMark className="hidden h-9 w-9 sm:flex" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-gold-300 uppercase">
                    Sai Oracle · Bhajan
                  </p>
                  <p className="truncate font-display text-lg leading-snug font-bold text-cream-50">
                    {video.title}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close video"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-300/50 text-gold-200 transition-colors hover:bg-gold-300 hover:text-maroon-950"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mx-3 overflow-hidden rounded-2xl bg-black ring-1 ring-gold-400/30 sm:mx-4">
                <div className="aspect-video w-full">
                  <iframe
                    src={`${embed}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-3">
                <p className="text-sm text-gold-200/90 italic">ॐ साई राम</p>
                <ArrowLink
                  href={watchUrl}
                  external
                  className="text-sm text-gold-300 hover:text-gold-200"
                >
                  Watch on YouTube
                </ArrowLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
