import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import { getPage } from "@/lib/site";
import { seedPages } from "@/lib/seed";

export const revalidate = 600;

/** Supabase first; falls back to the built-in seed page when the DB
 * has no row yet (or no `site_pages` table at all) — same fallback
 * dedicated routes like /about already get via getPageWithFallback. */
async function resolvePage(slug: string) {
  const page = await getPage(slug);
  if (page) return page;
  return seedPages.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await resolvePage(slug);
  return { title: page?.title ?? "Page" };
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await resolvePage(slug);
  if (!page) notFound();
  return (
    <section className="mx-auto max-w-3xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-8">
      <div className="border-b border-maroon-100/80 pb-6 text-center sm:text-left">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-maroon-900 leading-tight">
          {page.title}
        </h1>
      </div>
      <Markdown content={page.content} />
    </section>
  );
}
