"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Flame, Gem, HeartHandshake, HeartPulse, ShieldCheck, Sparkles, Users } from "lucide-react";
import { ArrowIcon } from "@/components/ArrowLink";
import type { ExperienceStory } from "@/lib/types";

const CHAPTER_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  "1": Flame,
  "2": HeartHandshake,
  "3": ShieldCheck,
  "4": HeartPulse,
  "5": Users,
  "6": Sparkles,
  "7": Eye,
  "8": Gem,
};

export default function ExperienceGrid({ stories }: { stories: ExperienceStory[] }) {
  const chapters = useMemo(() => {
    const seen = new Map<string, string>();
    for (const s of stories) seen.set(s.chapterNum, s.chapterTitle);
    return Array.from(seen, ([num, title]) => ({ num, title })).sort(
      (a, b) => Number(a.num) - Number(b.num),
    );
  }, [stories]);

  const [active, setActive] = useState<string>("all");
  const filtered = active === "all" ? stories : stories.filter((s) => s.chapterNum === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by chapter">
        <button
          type="button"
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
            active === "all"
              ? "btn-festive text-white shadow-md"
              : "border-2 border-maroon-200 text-maroon-800 hover:bg-maroon-50"
          }`}
        >
          All Stories
        </button>
        {chapters.map((c) => (
          <button
            key={c.num}
            type="button"
            onClick={() => setActive(c.num)}
            aria-pressed={active === c.num}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
              active === c.num
                ? "btn-festive text-white shadow-md"
                : "border-2 border-maroon-200 text-maroon-800 hover:bg-maroon-50"
            }`}
          >
            {c.num}. {c.title}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const Icon = CHAPTER_ICON[s.chapterNum] ?? Sparkles;
          return (
            <Link
              key={s.slug}
              href={`/experiences/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-maroon-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-xl"
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-saffron-500 to-gulal-500 text-white ring-2 ring-saffron-300"
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.18em] text-saffron-600 uppercase">
                  Chapter {s.chapterNum} · {s.chapterTitle}
                </span>
              </div>
              <p className="mt-3 font-display text-xl leading-snug font-bold text-maroon-900 group-hover:text-maroon-700">
                {s.title}
              </p>
              <p className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-stone-600">{s.teaser}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700">
                Read the story
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
