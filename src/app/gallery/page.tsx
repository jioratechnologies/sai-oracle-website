import MediaTabs from "./MediaTabs";
import { getGallery, getMediaMap, getVideos } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";

export const revalidate = 300;

export const metadata = { title: "Gallery & Videos" };

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ tab }, images, videos, mediaMap] = await Promise.all([
    searchParams,
    getGallery(120),
    getVideos(24),
    getMediaMap(),
  ]);
  const defaultTab = tab === "videos" ? "videos" : "photos";

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-10">
      {/* Compact In-Page Header */}
      <div className="mx-auto max-w-3xl text-center border-b border-maroon-100/80 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          Sacred Moments &amp; Celebrations
        </span>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          Photo Gallery &amp; Videos
        </h1>
        <p className="mt-2.5 text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          Darshan, festivals, bhajans and seva — photos and videos of temple life at Satyadeep Sai Universe.
        </p>
      </div>

      <div>
        <MediaTabs images={images} videos={videos} defaultTab={defaultTab} />
      </div>
    </section>
  );
}
