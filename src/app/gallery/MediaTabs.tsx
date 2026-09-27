"use client";

import { useMemo, useState } from "react";
import { Images, PlayCircle, Video, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryWithFilter from "./AlbumFilter";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import type { GalleryImage, YoutubeVideo } from "@/lib/types";

const TABS = [
  { id: "photos" as const, label: "Photos", icon: Images },
  { id: "videos" as const, label: "Videos", icon: PlayCircle },
];

export interface VideoCategoryDef {
  id: string;
  label: string;
  match: string[];
}

export const VIDEO_CATEGORIES: VideoCategoryDef[] = [
  { id: "all", label: "All Videos", match: [] },
  {
    id: "bhajan",
    label: "Bhajans & Devotion",
    match: [
      "bhajan",
      "aarti",
      "satsang",
      "kirtan",
      "devotion",
      "offering",
      "bal vikas",
      "prema",
      "love",
      "geet",
      "chant",
      "song",
    ],
  },
  {
    id: "darshan",
    label: "Darshan & Abhishek",
    match: ["abhishek", "darshan", "puja", "snan", "sanctum", "murti", "mandir"],
  },
  {
    id: "festivals",
    label: "Festivals & Utsav",
    match: [
      "visarjan",
      "ganesh",
      "chaturthi",
      "celebration",
      "utsav",
      "festival",
      "birthday",
      "gurupurnima",
      "diwali",
      "navratri",
      "shivratri",
      "ram navami",
      "holi",
    ],
  },
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
  const [videoFilter, setVideoFilter] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<YoutubeVideo | null>(null);

  // Filter video list based on selected category
  const filteredVideos = useMemo(() => {
    if (videoFilter === "all") return videos;
    const cat = VIDEO_CATEGORIES.find((c) => c.id === videoFilter);
    if (!cat || cat.match.length === 0) return videos;
    return videos.filter((v) => {
      const titleLower = v.title.toLowerCase();
      return cat.match.some((keyword) => titleLower.includes(keyword));
    });
  }, [videos, videoFilter]);

  // Only display categories that have matching videos (or All)
  const availableCategories = useMemo(() => {
    return VIDEO_CATEGORIES.map((cat) => {
      const count =
        cat.id === "all"
          ? videos.length
          : videos.filter((v) => {
              const titleLower = v.title.toLowerCase();
              return cat.match.some((keyword) => titleLower.includes(keyword));
            }).length;
      return { ...cat, count };
    }).filter((cat) => cat.id === "all" || cat.count > 0);
  }, [videos]);

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
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all cursor-pointer ${
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
          {availableCategories.length > 1 && (
            <div
              className="flex flex-wrap justify-center gap-2"
              role="group"
              aria-label="Filter videos"
            >
              {availableCategories.map((cat) => {
                const isActive = videoFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setVideoFilter(cat.id)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? "btn-festive text-white shadow-md scale-105"
                        : "border border-maroon-200/90 bg-white text-maroon-800 hover:bg-maroon-50"
                    }`}
                  >
                    <Video className="h-3.5 w-3.5 opacity-80" />
                    <span>{cat.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] sm:text-[11px] font-bold ${
                        isActive ? "bg-white/30 text-white" : "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Videos Grid with Smooth Fade Animation */}
          {filteredVideos.length === 0 ? (
            <div className="rounded-3xl border border-maroon-100 bg-white p-10 text-center shadow-xs">
              <p className="text-stone-600 font-medium">No videos found in this category.</p>
              <button
                type="button"
                onClick={() => setVideoFilter("all")}
                className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold btn-festive text-white shadow-sm cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Show All Videos ({videos.length})
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((v) => (
                  <motion.div
                    key={v.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <VideoCard video={v} onPlay={(selected) => setActiveVideo(selected)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* In-Website Video Modal Player */}
          <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
        </div>
      )}
    </>
  );
}
