import Image from "next/image";
import TempleArt from "@/components/TempleArt";
import type { GalleryImage } from "@/lib/types";

export default function GalleryPreview({ images }: { images: GalleryImage[] }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
      {images.map((g) => (
        <div
          key={g.id}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-maroon-100 shadow-sm"
        >
          {g.image_url ? (
            <Image
              src={g.image_url}
              alt={g.title || "Temple photo"}
              fill
              className="object-cover"
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
        </div>
      ))}
    </div>
  );
}
