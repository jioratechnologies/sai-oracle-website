import { Sparkle } from "lucide-react";
import { markdownInline } from "./Markdown";

interface Chapter {
  num: string;
  title: string;
  bullets: string[];
  paras: string[];
  notes: string[];
}

interface Parsed {
  lead: string[];
  chapters: Chapter[];
}

/** Split CMS markdown into a lead block + numbered chapters. */
function parse(content: string): Parsed {
  const sections: { title: string; lines: string[] }[] = [];
  for (const raw of content.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      sections.push({ title: line.slice(3).trim(), lines: [] });
    } else if (sections.length > 0) {
      sections[sections.length - 1].lines.push(line);
    }
  }

  const lead: string[] = [];
  const chapters: Chapter[] = [];
  sections.forEach((s, idx) => {
    const match = s.title.match(/^(\d+)\.\s*(.*)$/);
    const body = s.lines.filter((l) => l !== "");
    if (!match && idx === 0) {
      lead.push(...body);
      return;
    }
    chapters.push({
      num: match ? match[1] : String(idx),
      title: match ? match[2] : s.title,
      bullets: body.filter((l) => l.startsWith("- ")).map((l) => l.slice(2)),
      paras: body.filter((l) => !l.startsWith("- ") && !(l.startsWith("*") && l.endsWith("*"))),
      notes: body
        .filter((l) => l.startsWith("*") && l.endsWith("*") && l.length > 2)
        .map((l) => l.slice(1, -1)),
    });
  });
  return { lead, chapters };
}

/**
 * Devotee Experiences renderer — the miracle index as numbered
 * chapter cards with a quick-jump index. Content stays CMS-editable:
 * `## 1. Title` headings become chapters, `- ` lines become stories.
 */
export default function MiracleChapters({ content }: { content: string }) {
  const { lead, chapters } = parse(content);

  return (
    <div>
      {/* Lead */}
      {lead.length > 0 && (
        <div className="mx-auto max-w-2xl text-center">
          {lead.map((p, i) => (
            <p
              key={i}
              className={`mt-4 text-[17px] leading-relaxed text-stone-600 ${
                i === 0
                  ? "font-display text-xl leading-relaxed text-maroon-900 first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:text-saffron-600"
                  : ""
              }`}
            >
              {markdownInline(p)}
            </p>
          ))}
          <div aria-hidden className="mt-6 flex items-center justify-center gap-2">
            <span className="h-px w-16 bg-gold-400" />
            <Sparkle className="h-4 w-4 text-gold-500" fill="currentColor" />
            <span className="h-px w-16 bg-gold-400" />
          </div>
        </div>
      )}

      {/* Quick-jump index */}
      {chapters.length > 1 && (
        <nav aria-label="Miracle chapters" className="mx-auto mt-8 max-w-3xl">
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-saffron-600 uppercase">
            {chapters.length} Chapters
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {chapters.map((c) => (
              <a
                key={c.num}
                href={`#chapter-${c.num}`}
                className="rounded-full border border-maroon-200 bg-white px-3.5 py-1.5 text-sm font-medium text-maroon-800 shadow-sm transition-colors hover:border-saffron-500 hover:bg-saffron-500 hover:text-white"
              >
                <span className="mr-1.5 font-display font-bold text-saffron-600">{c.num}</span>
                {c.title}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Chapter cards */}
      <div className="mx-auto mt-10 max-w-3xl space-y-6">
        {chapters.map((c) => (
          <article
            key={c.num}
            id={`chapter-${c.num}`}
            className="relative scroll-mt-28 overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-sm"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 divider-festive"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 right-3 font-display text-[110px] leading-none font-bold text-maroon-50 select-none"
            >
              {c.num}
            </span>
            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-gulal-500 p-3.5 font-display text-2xl font-bold text-white ring-2 ring-saffron-300"
                >
                  {c.num}
                </span>
                <h2 className="font-display text-2xl font-bold text-maroon-900 sm:text-[1.7rem]">
                  {c.title}
                </h2>
              </div>

              {c.paras.length > 0 && (
                <div className="mt-4 space-y-3">
                  {c.paras.map((p, i) => (
                    <p key={i} className="text-[16px] leading-relaxed text-stone-600">
                      {markdownInline(p)}
                    </p>
                  ))}
                </div>
              )}

              {c.bullets.length > 0 && (
                <ul className="mt-4 space-y-3">
                  {c.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 rounded-2xl bg-cream-100/70 p-3.5 text-[15.5px] leading-relaxed text-stone-700"
                    >
                      <span aria-hidden className="mt-1 shrink-0">
                        <Sparkle className="h-3.5 w-3.5 text-saffron-500" fill="currentColor" />
                      </span>
                      <span>{markdownInline(b)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {c.notes.length > 0 && (
                <div className="mt-5 border-t border-dashed border-gold-400/60 pt-4">
                  {c.notes.map((n, i) => (
                    <p key={i} className="text-center text-[15px] text-stone-500 italic">
                      {markdownInline(n)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center font-display text-2xl text-gold-500">ॐ साई राम</p>
    </div>
  );
}
