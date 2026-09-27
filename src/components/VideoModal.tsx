"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play } from "lucide-react";
import { youtubeEmbedUrl, youtubeWatchUrl } from "@/lib/youtube";
import type { YoutubeVideo } from "@/lib/types";

export default function VideoModal({
  video,
  onClose,
}: {
  video: YoutubeVideo | null;
  onClose: () => void;
}) {
  const embedUrl = video ? youtubeEmbedUrl(video.youtube_url, true) : null;
  const watchUrl = video ? youtubeWatchUrl(video.youtube_url) : null;

  // Lock background scroll when open
  useEffect(() => {
    if (!video) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [video]);

  // Handle Escape key
  useEffect(() => {
    if (!video) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && embedUrl && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-saffron-300/60 bg-stone-950 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Festive Accent Bar */}
            <div
              aria-hidden
              className="h-1.5 w-full bg-linear-to-r from-maroon-600 via-saffron-500 to-amber-400"
            />

            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5 border-b border-white/10 bg-stone-900/80">
              <div className="min-w-0 pr-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-saffron-400">
                  <Play className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                  Satyadeep Sai Universe Video
                </span>
                <h3 className="mt-0.5 font-display text-sm sm:text-base font-bold text-white truncate">
                  {video.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {watchUrl && (
                  <a
                    href={watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-600/20 px-3 py-1 text-xs font-semibold text-red-200 hover:bg-red-600 hover:text-white transition-colors"
                    title="Watch directly on YouTube"
                  >
                    <ExternalLink className="h-3 w-3" />
                    YouTube
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/25 active:scale-95 transition-all"
                  aria-label="Close video player"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Responsive 16:9 Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 sm:px-6 bg-stone-900/90 text-xs text-stone-400 border-t border-white/5">
              <p className="truncate">
                {video.title}
              </p>
              {watchUrl && (
                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden inline-flex items-center gap-1 text-saffron-400 hover:underline shrink-0 ml-3"
                >
                  YouTube <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
