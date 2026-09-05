import PageHero from "@/components/PageHero";
import Markdown from "@/components/Markdown";
import { getPageWithFallback } from "@/lib/site";

export const revalidate = 300;

export const metadata = { title: "Aims & Objectives" };

export default async function AimsPage() {
  const page = await getPageWithFallback("aims");
  return (
    <>
      <PageHero
        eyebrow="Sri Sai Sansthan Charitable Trust"
        title={page.title}
        intro="Uniting mankind in sacred action — spiritual awakening, service and love."
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Markdown content={page.content} />
      </section>
    </>
  );
}
