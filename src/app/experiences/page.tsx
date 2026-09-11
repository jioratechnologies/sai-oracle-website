import PageHero from "@/components/PageHero";
import MiracleChapters from "@/components/MiracleChapters";
import { getPageWithFallback } from "@/lib/site";

export const revalidate = 300;

export const metadata = { title: "Devotee's Experience" };

export default async function ExperiencesPage() {
  const page = await getPageWithFallback("experiences");
  return (
    <>
      <PageHero
        eyebrow="Miracles & Grace"
        title={page.title}
        intro="Manifestations of Baba's omnipresence, omnipotence and omniscience — as lived by His devotees."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <MiracleChapters content={page.content} />
      </section>
    </>
  );
}
