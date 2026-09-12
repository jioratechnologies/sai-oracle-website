"use client";

import { useState } from "react";
import { Images, PlayCircle } from "lucide-react";
import GalleryWithFilter from "./AlbumFilter";
import VideoCard from "@/components/VideoCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { GalleryImage } from "@/lib/types";
import type { YoutubeVideo } from "@/lib/types";

const TABS = [
  { id: "photos" as const, label: "Photos", icon: Images },
  { id: "videos" as const, label: "Videos", icon: PlayCircle },
];

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
                ? "btn-festive text-white shadow-md"
                : "border-2 border-maroon-200 text-maroon-800 hover:bg-maroon-50"
            }`}
          >
            <Icon aria-hidden className="h-4 w-4" />
            {label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums ${
                tab === id ? "bg-white/25" : "bg-maroon-50 text-maroon-600"
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
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <RevealItem key={v.id}>
              <VideoCard video={v} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </>
  );
}
