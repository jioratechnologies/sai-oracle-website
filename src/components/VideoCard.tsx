"use client";

import { useState } from "react";
import Image from "next/image";
import ArrowLink from "./ArrowLink";
import { youtubeEmbedUrl, youtubeThumbnail, youtubeWatchUrl } from "@/lib/youtube";
import type { YoutubeVideo } from "@/lib/types";

/**
 * YouTube facade: renders the thumbnail with a play button instead of a
 * live iframe. Some owners disable external embedding ("Video
 * unavailable" boxes) — the facade never shows a dead player, loads far
 * faster, and click-to-play still works inline wherever embedding is
 * allowed. "Watch on YouTube" always works regardless.
 */
export default function VideoCard({ video }: { video: YoutubeVideo }) {
  const [playing, setPlaying] = useState(false);
  const embed = youtubeEmbedUrl(video.youtube_url);
  const thumb = video.thumbnail_url || youtubeThumbnail(video.youtube_url);
  const watchUrl = youtubeWatchUrl(video.youtube_url);

  return (
    <article className="group/card relative flex flex-col overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600"
      />
      <div className="relative aspect-video overflow-hidden bg-maroon-950">
        {playing && embed ? (
          <iframe
            src={`${embed}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : thumb ? (
          <button
            type="button"
            onClick={() => (embed ? setPlaying(true) : window.open(watchUrl, "_blank"))}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play ${video.title}`}
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
              className="absolute inset-0 bg-gradient-to-t from-maroon-950/70 via-maroon-950/10 to-transparent"
            />
            <span
              aria-hidden
              className="absolute top-3 left-3 rounded-md bg-maroon-950/70 px-2 py-1 text-[11px] font-bold tracking-wider text-cream-50 uppercase backdrop-blur-sm"
            >
              ▶ Bhajan
            </span>
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 shadow-xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="#fff" className="ml-1 h-6 w-6">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[22px] leading-snug font-bold text-maroon-900">
          {video.title}
        </h3>
        <div className="mt-3 flex items-center justify-between border-t border-maroon-50 pt-3">
          <span className="flex items-center gap-1.5" aria-hidden>
            <span className="flex h-5 w-7 items-center justify-center rounded bg-red-600">
              <svg viewBox="0 0 24 24" fill="#fff" className="ml-px h-3 w-3">
                <path d="M8 5v14l11-7z" />
              </svg>
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
  );
}
