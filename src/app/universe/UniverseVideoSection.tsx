"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";

const ABHISHEK_VIDEOS = [
  {
    id: "Nfr_LeJq6bM",
    title: "Satsang & Abhishek at Satyadeep Sai Universe",
    description: "Sacred Abhishek ceremony with devotees at our Meerut sanctum.",
    url: "https://www.youtube.com/watch?v=Nfr_LeJq6bM",
  },
  {
    id: "Y6L_3PZLBAg",
    title: "Divine Satsang — Sacred Vibrations",
    description: "Continuous prayer, bhajans and sacred vibrations from the sanctum.",
    url: "https://youtu.be/Y6L_3PZLBAg",
  },
];

function getThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function getEmbed(id: string) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}

export default function UniverseVideoSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scroll lock
  useEffect(() => {
    if (!activeId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeId]);

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Video Cards Row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {ABHISHEK_VIDEOS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setActiveId(v.id)}
            className="group relative overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-xs hover:border-saffron-400 hover:shadow-lg transition-all text-left"
            aria-label={`Watch video: ${v.title}`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-stone-100">
              <Image
                src={getThumb(v.id)}
                alt={v.title}
                fill
                sizes="(max-width: 640px) 90vw, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              {/* Play button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-xl ring-2 ring-saffron-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-saffron-500 group-hover:ring-saffron-500">
                  <span className="absolute inset-0 rounded-full bg-saffron-400/40 motion-safe:animate-ping" />
                  <Play className="h-5 w-5 translate-x-[2px] text-saffron-600 group-hover:text-white" fill="currentColor" strokeWidth={0} />
                </span>
              </span>

              {/* YouTube badge */}
              <span className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 ring-1 ring-red-200/60">
                <span className="flex h-3.5 w-4.5 items-center justify-center rounded-sm bg-red-600">
                  <Play className="h-2 w-2 text-white" fill="currentColor" strokeWidth={0} />
                </span>
                YouTube
              </span>
            </div>

            {/* Card Text */}
            <div className="p-3.5">
              <p className="font-display text-sm font-bold text-maroon-900 leading-snug line-clamp-2">
                {v.title}
              </p>
              <p className="mt-0.5 text-xs text-stone-500 line-clamp-1">{v.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Video Dialog Modal */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setActiveId(null)}
            />

            {/* Dialog */}
            <motion.div
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border-2 border-gold-300/80 bg-stone-950 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <div aria-hidden className="h-1.5 w-full bg-linear-to-r from-gulal-500 via-saffron-400 to-peacock-400" />

              {/* Header */}
              <div className="flex items-start justify-between gap-3 px-5 py-3.5 border-b border-white/10">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-saffron-400">
                    Satyadeep Sai Universe · Abhishek
                  </p>
                  <h3 className="mt-0.5 font-display text-base font-bold text-white truncate">
                    {ABHISHEK_VIDEOS.find((v) => v.id === activeId)?.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={ABHISHEK_VIDEOS.find((v) => v.id === activeId)?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="h-3 w-3" />
                    YouTube
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/25 transition-colors"
                    aria-label="Close video"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* YouTube iFrame Embed */}
              <div className="relative aspect-video bg-black">
                <iframe
                  key={activeId}
                  src={getEmbed(activeId)}
                  title={ABHISHEK_VIDEOS.find((v) => v.id === activeId)?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>

              {/* Video selector tabs */}
              <div className="flex items-center gap-2 border-t border-white/10 bg-stone-900 px-4 py-2.5 overflow-x-auto">
                {ABHISHEK_VIDEOS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveId(v.id)}
                    className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all shrink-0 ${
                      v.id === activeId
                        ? "bg-saffron-600 text-white"
                        : "bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <Play className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                    {v.title.split("—")[0].trim()}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
