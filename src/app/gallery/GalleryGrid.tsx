"use client";

import { useState } from "react";
import Image from "next/image";
import TempleArt from "@/components/TempleArt";
import type { GalleryImage } from "@/lib/types";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActive(g)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-maroon-100 bg-white text-left shadow-sm"
          >
            {g.image_url ? (
              <Image
                src={g.image_url}
                alt={g.title || "Temple photo"}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            ) : (
              <TempleArt className="h-full w-full" label={g.title || "Temple photo"} />
            )}
            {g.title && (
              <span className="absolute bottom-2 left-2 rounded-full bg-maroon-950/70 px-3 py-1 text-xs font-medium text-cream-50">
                {g.title}
              </span>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title || "Photo"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-950/90 p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white">
            <div className="relative aspect-[4/3] w-full">
              {active.image_url ? (
                <Image
                  src={active.image_url}
                  alt={active.title || "Temple photo"}
                  fill
                  className="object-contain bg-maroon-950"
                />
              ) : (
                <TempleArt className="h-full w-full" />
              )}
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="font-display text-xl font-bold text-maroon-900">
                {active.title || "Sai Oracle"}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full border border-maroon-200 px-4 py-1.5 text-sm font-semibold text-maroon-800 hover:bg-maroon-50"
              >
                Close ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
