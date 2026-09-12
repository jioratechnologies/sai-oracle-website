import PageHero from "@/components/PageHero";
import MiracleChapters from "@/components/MiracleChapters";
import { getMediaMap, getPageWithFallback } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";

export const revalidate = 300;

export const metadata = { title: "Devotee's Experience" };

export default async function ExperiencesPage() {
  const [page, mediaMap] = await Promise.all([getPageWithFallback("experiences"), getMediaMap()]);
  return (
    <>
      <PageHero
        eyebrow="Miracles & Grace"
        title={page.title}
        intro="Manifestations of Baba's omnipresence, omnipotence and omniscience — as lived by His devotees."
        image={resolveMediaUrl(mediaMap, "/assets/20251119_202119.webp")}
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <MiracleChapters content={page.content} />
      </section>
    </>
  );
}
