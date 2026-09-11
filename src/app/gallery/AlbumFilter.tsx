"use client";

import { useMemo, useState } from "react";
import GalleryGrid from "./GalleryGrid";
import { albumOf } from "@/lib/albums";
import type { GalleryImage } from "@/lib/types";

export default function GalleryWithFilter({ images }: { images: GalleryImage[] }) {
  const albums = useMemo(() => {
    const order = [
      "Baba's Birthday",
      "2022",
      "2021",
      "2020",
      "2019",
      "Temple Project",
      "Temple",
    ];
    const present = Array.from(new Set(images.map((g) => albumOf(g.image_url))));
    return ["All", ...order.filter((a) => present.includes(a)),
      ...present.filter((a) => !order.includes(a))];
  }, [images]);
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? images : images.filter((g) => albumOf(g.image_url) === active);

  return (
    <>
      {albums.length > 2 && (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by album">
          {albums.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setActive(a)}
              aria-pressed={active === a}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
                active === a
                  ? "btn-festive text-white shadow-md"
                  : "border-2 border-maroon-200 text-maroon-800 hover:bg-maroon-50"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      )}
      <GalleryGrid images={filtered} />
    </>
  );
}
