import { notFound } from "next/navigation";
import Link from "next/link";
import { Eye, Flame, Gem, HeartHandshake, HeartPulse, ShieldCheck, Sparkles, Users } from "lucide-react";
import { ArrowIcon } from "@/components/ArrowLink";
import { getExperienceStories, getExperienceStory } from "@/lib/site";

export const revalidate = 300;

const CHAPTER_ICON: Record<string, typeof Flame> = {
  "1": Flame,
  "2": HeartHandshake,
  "3": ShieldCheck,
  "4": HeartPulse,
  "5": Users,
  "6": Sparkles,
  "7": Eye,
  "8": Gem,
};

export async function generateStaticParams() {
  return getExperienceStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getExperienceStory(slug);
  return { title: story ? `${story.title} | Devotee's Experience` : "Devotee's Experience" };
}

export default async function ExperienceStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getExperienceStory(slug);
  if (!story) notFound();

  const all = getExperienceStories();
  const index = all.findIndex((s) => s.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;
  const siblings = all.filter((s) => s.chapterNum === story.chapterNum && s.slug !== story.slug);
  const Icon = CHAPTER_ICON[story.chapterNum] ?? Sparkles;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20">
      <div className="mb-8 border-b border-maroon-100/80 pb-6">
        <Link
          href="/experiences"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-700 hover:text-maroon-900 transition-colors uppercase tracking-wider mb-3"
        >
          <ArrowIcon flip className="h-3.5 w-3.5" />
          <span>Back to Devotee Experiences</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold text-saffron-700 uppercase tracking-wider">
          <span>Chapter {story.chapterNum}</span>
          <span>·</span>
          <span>{story.chapterTitle}</span>
        </div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-maroon-900 leading-tight">
          {story.title}
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <article>
            <div className="space-y-4 text-[17px] leading-relaxed text-stone-700">
              {story.body.map((p, i) => (
                <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:text-saffron-600" : ""}>
                  {p}
                </p>
              ))}
            </div>

            {story.quote && (
              <blockquote className="relative mt-8 rounded-2xl bg-linear-to-br from-maroon-900 to-maroon-800 p-7 text-cream-50 sm:p-9">
                <span aria-hidden className="absolute top-3 left-5 font-display text-6xl leading-none text-gold-400/50">
                  &ldquo;
                </span>
                <p className="relative font-display text-xl leading-relaxed italic sm:text-2xl">{story.quote}</p>
              </blockquote>
            )}

            <p className="mt-10 text-center font-display text-2xl text-gold-500">ॐ साई राम</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {prev && (
                <Link
                  href={`/experiences/${prev.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-maroon-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold-400/60 hover:shadow-md"
                >
                  <ArrowIcon flip className="h-4 w-4 shrink-0 text-saffron-500" />
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold tracking-[0.15em] text-stone-500 uppercase">Previous</span>
                    <span className="block truncate font-display font-bold text-maroon-900">{prev.title}</span>
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/experiences/${next.slug}`}
                  className={`group flex items-center justify-end gap-3 rounded-2xl border border-maroon-100 bg-white p-4 text-right shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold-400/60 hover:shadow-md ${!prev ? "sm:col-start-2" : ""}`}
                >
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold tracking-[0.15em] text-stone-500 uppercase">Next</span>
                    <span className="block truncate font-display font-bold text-maroon-900">{next.title}</span>
                  </span>
                  <ArrowIcon className="h-4 w-4 shrink-0 text-saffron-500" />
                </Link>
              )}
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-sm">
              <div aria-hidden className="divider-festive" />
              <div className="p-5">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-saffron-500 to-gulal-500 text-white ring-2 ring-saffron-300"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-[11px] font-semibold tracking-[0.18em] text-saffron-600 uppercase">
                  More in this chapter
                </p>

                {siblings.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {siblings.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/experiences/${s.slug}`}
                          className="block rounded-xl px-2.5 py-2 text-sm font-medium text-maroon-800 transition-colors hover:bg-saffron-50 hover:text-saffron-700"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-stone-500">This is the only story in this chapter, for now.</p>
                )}
              </div>
            </div>

            <Link
              href="/experiences"
              className="btn-festive flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-bold text-white shadow-md"
            >
              All Devotee Experiences
            </Link>
          </aside>
        </div>
      </section>
  );
}
