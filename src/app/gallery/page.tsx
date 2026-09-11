import PageHero from "@/components/PageHero";
import GalleryWithFilter from "./AlbumFilter";
import { getGallery } from "@/lib/site";

export const revalidate = 300;

export const metadata = { title: "Photo Gallery" };

export default async function GalleryPage() {
  const images = await getGallery(60);
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Photo Gallery"
        intro="Darshan, festivals, bhajans and seva — glimpses of temple life."
        image="/legacy/banner/2.jpg"
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        {images.length === 0 ? (
          <p className="rounded-2xl border border-maroon-100 bg-white p-8 text-center text-stone-600">
            Photos will be added soon. 🙏
          </p>
        ) : (
          <GalleryWithFilter images={images} />
        )}
      </section>
    </>
  );
}
