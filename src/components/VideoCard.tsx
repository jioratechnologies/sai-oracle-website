"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import { youtubeThumbnail, youtubeWatchUrl } from "@/lib/youtube";
import VideoModal from "./VideoModal";
import type { YoutubeVideo } from "@/lib/types";

export function getVideoBadge(title: string): { label: string; cls: string } {
  const t = title.toLowerCase();
  if (t.includes("abhishek") || t.includes("snan")) {
    return { label: "Abhishek", cls: "bg-peacock-50 text-peacock-700 ring-peacock-500/25" };
  }
  if (t.includes("darshan") || t.includes("murti") || t.includes("sanctum")) {
    return { label: "Darshan", cls: "bg-saffron-50 text-saffron-700 ring-saffron-500/25" };
  }
  if (
    t.includes("visarjan") ||
    t.includes("ganesh") ||
    t.includes("chaturthi") ||
    t.includes("celebration") ||
    t.includes("utsav") ||
    t.includes("festival") ||
    t.includes("birthday")
  ) {
    return { label: "Festival", cls: "bg-gulal-50 text-gulal-700 ring-gulal-500/25" };
  }
  if (t.includes("bhajan") || t.includes("aarti") || t.includes("kirtan")) {
    return { label: "Bhajan", cls: "bg-saffron-50 text-saffron-700 ring-saffron-500/25" };
  }
  if (t.includes("satsang") || t.includes("discourse") || t.includes("pravachan")) {
    return { label: "Satsang", cls: "bg-maroon-50 text-maroon-700 ring-maroon-500/25" };
  }
  if (
    t.includes("love") ||
    t.includes("devotion") ||
    t.includes("offering") ||
    t.includes("bal vikas") ||
    t.includes("prema")
  ) {
    return { label: "Devotion", cls: "bg-amber-50 text-amber-700 ring-amber-500/25" };
  }
  return { label: "Devotional", cls: "bg-saffron-50 text-saffron-700 ring-saffron-500/25" };
}

export default function VideoCard({
  video,
  onPlay,
}: {
  video: YoutubeVideo;
  onPlay?: (video: YoutubeVideo) => void;
}) {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const thumb = video.thumbnail_url || youtubeThumbnail(video.youtube_url);
  const watchUrl = youtubeWatchUrl(video.youtube_url);
  const badge = getVideoBadge(video.title);

  function handlePlay() {
    if (onPlay) {
      onPlay(video);
    } else {
      setInternalModalOpen(true);
    }
  }

  return (
    <>
      <article className="group/card relative flex flex-col overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-xs transition-all hover:-translate-y-1 hover:shadow-xl">
        <div aria-hidden className="absolute inset-x-0 top-0 z-10 divider-festive" />

        {/* Thumbnail button trigger */}
        <button
          type="button"
          onClick={handlePlay}
          className="group relative block aspect-video w-full overflow-hidden bg-stone-900 cursor-pointer text-left"
          aria-label={`Play video: ${video.title}`}
        >
          {thumb ? (
            <Image
              src={thumb}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 360px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-stone-900 flex items-center justify-center text-stone-500 text-xs">
              No preview available
            </div>
          )}

          {/* Dynamic Category Tag */}
          <span
            aria-hidden
            className={`absolute top-3 left-3 inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase ring-1 backdrop-blur-sm shadow-xs ${badge.cls}`}
          >
            <Play className="h-3 w-3" fill="currentColor" strokeWidth={0} />
            {badge.label}
          </span>

          {/* Centered Play Button */}
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="absolute inset-0 rounded-full bg-saffron-400/40 motion-safe:animate-ping" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl ring-2 ring-saffron-400 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-saffron-500 group-hover:ring-saffron-500">
              <Play
                className="h-6 w-6 translate-x-[1px] text-saffron-600 group-hover:text-white transition-colors"
                fill="currentColor"
                strokeWidth={0}
              />
            </span>
          </span>
        </button>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-5">
          <h3
            onClick={handlePlay}
            className="cursor-pointer font-display text-[19px] sm:text-[21px] leading-snug font-bold text-maroon-900 hover:text-saffron-600 transition-colors"
          >
            {video.title}
          </h3>

          <div className="mt-4 flex items-center justify-between border-t border-maroon-50 pt-3.5">
            <button
              type="button"
              onClick={handlePlay}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-saffron-700 hover:text-saffron-500 transition-colors cursor-pointer"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-saffron-100 text-saffron-700">
                <Play className="h-2.5 w-2.5 ml-0.5" fill="currentColor" strokeWidth={0} />
              </span>
              Play Video
            </button>

            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-red-600 transition-colors"
              title="Open video on YouTube"
            >
              <span>YouTube</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </article>

      {/* Internal modal fallback when used standalone without parent state */}
      {!onPlay && (
        <VideoModal
          video={internalModalOpen ? video : null}
          onClose={() => setInternalModalOpen(false)}
        />
      )}
    </>
  );
}
