import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Markdown from "@/components/Markdown";
import { getPage } from "@/lib/site";

export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  return { title: page?.title ?? "Page" };
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  return (
    <>
      <PageHero title={page.title} />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Markdown content={page.content} />
      </section>
    </>
  );
}
