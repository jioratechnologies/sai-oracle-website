import { redirect } from "next/navigation";
import { Sparkle } from "lucide-react";
import { markdownInline } from "@/components/Markdown";
import ExperienceGrid from "./ExperienceGrid";
import { getExperienceStories, getPageWithFallback } from "@/lib/site";
import { experiencesClosingNote } from "@/lib/seed";

export const revalidate = 300;

export const metadata = { title: "Devotee's Experience · Sai Oracle" };

export default async function ExperiencesPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const { tab } = (await searchParams) ?? {};
  if (tab === "maa" || tab === "life-sketch") {
    redirect("/gurumaa?tab=life-sketch");
  }
  if (tab === "miracles") {
    redirect("/gurumaa?tab=miracles");
  }

  const page = await getPageWithFallback("experiences");
  const stories = getExperienceStories();
  const chapterCount = new Set(stories.map((s) => s.chapterNum)).size;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-10">
      {/* Clean In-Page Header */}
      <div className="mx-auto max-w-3xl text-center border-b border-maroon-100/80 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          Miracles &amp; Divine Grace
        </span>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          Devotee&apos;s Experience
        </h1>
        <p className="mt-2.5 text-[15px] font-medium text-stone-600 sm:text-[16px]">
          Manifestations of Baba&apos;s omnipresence, omnipotence and omniscience — as lived by His devotees.
        </p>

        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-stone-600">
          {page.content.split(/\n{2,}/).map((p, i) => (
            <p key={i}>
              {markdownInline(p)}
            </p>
          ))}
        </div>

        <p className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-saffron-100/70 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-saffron-800 uppercase">
          <Sparkle className="h-3.5 w-3.5 text-saffron-600" fill="currentColor" />
          {chapterCount} Chapters · {stories.length} Stories
        </p>
      </div>

      {/* Stories Grid with Chapter Filters */}
      <div>
        <ExperienceGrid stories={stories} />
      </div>

      <div className="mx-auto max-w-2xl border-t border-maroon-100/80 pt-8 text-center space-y-4">
        <p className="text-[15px] text-stone-500 italic leading-relaxed">
          {markdownInline(experiencesClosingNote)}
        </p>
        <p className="font-display text-2xl text-gold-500">ॐ साई राम</p>
      </div>
    </section>
  );
}
