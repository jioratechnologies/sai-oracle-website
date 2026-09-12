"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import ArrowLink from "./ArrowLink";
import { youtubeThumbnail, youtubeWatchUrl } from "@/lib/youtube";
import type { YoutubeVideo } from "@/lib/types";

/**
 * YouTube link card — link-only by design. No video bytes are shipped:
 * the card shows the YouTube thumbnail facade and links out to the
 * watch page in a new tab (no iframe embed, no modal player).
 */
export default function VideoCard({ video }: { video: YoutubeVideo }) {
  const thumb = video.thumbnail_url || youtubeThumbnail(video.youtube_url);
  const watchUrl = youtubeWatchUrl(video.youtube_url);

  return (
    <article className="group/card relative flex flex-col overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 divider-festive"
      />
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-video overflow-hidden bg-saffron-100"
        aria-label={`Watch on YouTube: ${video.title}`}
      >
        {thumb && (
          <>
            <Image
              src={thumb}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 360px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              aria-hidden
              className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[11px] font-bold tracking-wider text-saffron-700 uppercase ring-1 ring-saffron-500/25 backdrop-blur-sm"
            >
              <Play className="h-3 w-3" fill="currentColor" strokeWidth={0} />
              Bhajan
            </span>
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="absolute inset-0 rounded-full bg-saffron-400/50 motion-safe:animate-ping" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl ring-2 ring-saffron-400 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-saffron-500 group-hover:ring-saffron-500">
                <Play
                  className="h-6 w-6 translate-x-[1px] text-saffron-600 group-hover:text-white"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
            </span>
          </>
        )}
      </a>
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
  );
}
