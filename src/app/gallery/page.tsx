import PageHero from "@/components/PageHero";
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
    getGallery(60),
    getVideos(24),
    getMediaMap(),
  ]);
  const defaultTab = tab === "videos" ? "videos" : "photos";

  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Gallery & Videos"
        intro="Darshan, festivals, bhajans and seva — photos and videos of temple life."
        image={resolveMediaUrl(mediaMap, "/assets/20250112_191226.webp")}
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <MediaTabs images={images} videos={videos} defaultTab={defaultTab} />
      </section>
    </>
  );
}
