"use client";

import { useMemo, useState } from "react";
import { Images, PlayCircle, Video } from "lucide-react";
import GalleryWithFilter from "./AlbumFilter";
import VideoCard from "@/components/VideoCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { GalleryImage, YoutubeVideo } from "@/lib/types";

const TABS = [
  { id: "photos" as const, label: "Photos", icon: Images },
  { id: "videos" as const, label: "Videos", icon: PlayCircle },
];

const VIDEO_CATEGORIES = [
  { id: "all", label: "All Videos" },
  { id: "abhishek", label: "Abhishek & Darshan", match: ["abhishek", "darshan"] },
  { id: "bhajan", label: "Bhajans & Aarti", match: ["bhajan", "aarti", "satsang"] },
] as const;

export default function MediaTabs({
  images,
  videos,
  defaultTab,
}: {
  images: GalleryImage[];
  videos: YoutubeVideo[];
  defaultTab: "photos" | "videos";
}) {
  const [tab, setTab] = useState<"photos" | "videos">(defaultTab);
  const [videoFilter, setVideoFilter] = useState<string>("all");

  const filteredVideos = useMemo(() => {
    if (videoFilter === "all") return videos;
    const cat = VIDEO_CATEGORIES.find((c) => c.id === videoFilter);
    if (!cat || !("match" in cat)) return videos;
    return videos.filter((v) =>
      cat.match.some((m) => v.title.toLowerCase().includes(m))
    );
  }, [videos, videoFilter]);

  return (
    <>
      <div className="mb-8 flex justify-center gap-2" role="tablist" aria-label="Media type">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              tab === id
                ? "btn-festive text-white shadow-md scale-105"
                : "border-2 border-maroon-200 text-maroon-800 hover:bg-maroon-50"
            }`}
          >
            <Icon aria-hidden className="h-4 w-4" />
            {label}
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                tab === id ? "bg-white/25 text-white" : "bg-maroon-50 text-maroon-600"
              }`}
            >
              {id === "photos" ? images.length : videos.length}
            </span>
          </button>
        ))}
      </div>

      {tab === "photos" ? (
        images.length === 0 ? (
          <p className="rounded-2xl border border-maroon-100 bg-white p-8 text-center text-stone-600">
            Photos will be added soon.
          </p>
        ) : (
          <GalleryWithFilter images={images} />
        )
      ) : videos.length === 0 ? (
        <p className="rounded-2xl border border-maroon-100 bg-white p-8 text-center text-stone-600">
          Videos will be added soon.
        </p>
      ) : (
        <div className="space-y-6">
          {/* Video Category Filter */}
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter videos">
            {VIDEO_CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? videos.length
                  : videos.filter((v) =>
                      "match" in cat && cat.match.some((m) => v.title.toLowerCase().includes(m))
                    ).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setVideoFilter(cat.id)}
                  aria-pressed={videoFilter === cat.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-bold transition-all ${
                    videoFilter === cat.id
                      ? "btn-festive text-white shadow-md scale-105"
                      : "border border-maroon-200/90 bg-white text-maroon-800 hover:bg-maroon-50"
                  }`}
                >
                  <Video className="h-3.5 w-3.5 opacity-80" />
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] sm:text-[11px] font-bold ${
                      videoFilter === cat.id ? "bg-white/30 text-white" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((v) => (
              <RevealItem key={v.id}>
                <VideoCard video={v} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      )}
    </>
  );
}
