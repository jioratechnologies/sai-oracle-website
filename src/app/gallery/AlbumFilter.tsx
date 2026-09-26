"use client";

import { useMemo, useState } from "react";
import GalleryGrid from "./GalleryGrid";
import { albumOf, ALBUMS } from "@/lib/albums";
import type { GalleryImage } from "@/lib/types";

export default function GalleryWithFilter({ images }: { images: GalleryImage[] }) {
  const albums = useMemo(() => {
    const present = new Set(images.map((g) => albumOf(g.image_url)));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matched = ALBUMS.filter((a) => a === "All" || present.has(a as any));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const leftovers = Array.from(present).filter((a) => !ALBUMS.includes(a as any));
    return [...matched, ...leftovers];
  }, [images]);

  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? images : images.filter((g) => albumOf(g.image_url) === active);

  return (
    <>
      {albums.length > 2 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by album">
          {albums.map((a) => {
            const count =
              a === "All"
                ? images.length
                : images.filter((g) => albumOf(g.image_url) === a).length;
            return (
              <button
                key={a}
                type="button"
                onClick={() => setActive(a)}
                aria-pressed={active === a}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-bold transition-all ${
                  active === a
                    ? "btn-festive text-white shadow-md scale-105"
                    : "border border-maroon-200/90 bg-white text-maroon-800 hover:bg-maroon-50"
                }`}
              >
                <span>{a}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] sm:text-[11px] font-bold ${
                    active === a ? "bg-white/30 text-white" : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <GalleryGrid images={filtered} />
    </>
  );
}
