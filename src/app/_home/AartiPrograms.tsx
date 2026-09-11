import Link from "next/link";
import { Flame } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import type { AartiTiming } from "@/lib/types";

const DESCRIPTIONS: Record<string, string> = {
  Kakad: "Dawn awakening of the Lord — begin the day at Baba's feet.",
  Madhyan: "Midday worship and offerings in the sanctum.",
  Dhoop: "Evening lamp worship with bhajans and Naam Smaranam.",
  Shej: "Night rest ceremony and prasad distribution.",
};

/**
 * Kashi "Our Programs" equivalent: the four daily aartis as bookable
 * programme cards, with live times from temple settings.
 */
export default function AartiPrograms({ timings }: { timings: AartiTiming[] }) {
  const aartis = timings.filter((t) => /aarti/i.test(t.label)).slice(0, 4);
  const rows = (aartis.length > 0 ? aartis : timings.slice(0, 4)).map((t, i) => {
    const key = Object.keys(DESCRIPTIONS).find((k) =>
      t.label.toLowerCase().includes(k.toLowerCase()),
    );
    return {
      ...t,
      desc: (key && DESCRIPTIONS[key]) || "Daily worship at the temple — all devotees welcome.",
      accent: ["bg-saffron-500", "bg-gulal-500", "bg-peacock-500", "bg-maroon-700"][i % 4],
    };
  });
  if (rows.length === 0) return null;

  return (
    <section className="border-y border-maroon-100 bg-cream-100/60">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          eyebrow="Our Programs"
          title="Daily Aartis & Darshan"
          intro="The temple follows the sacred rhythm of the four aartis, as in Shirdi. All devotees are welcome."
        />
        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((a) => (
            <RevealItem key={a.id} className="h-full">
              <SpotlightCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div aria-hidden className="divider-festive" />
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-bold text-white ${a.accent}`}
                  >
                    <Flame aria-hidden className="h-3.5 w-3.5" />
                    {a.time}
                  </span>
                  <h3 className="mt-3 font-display text-xl leading-snug font-bold text-maroon-900">
                    {a.label}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-stone-600">{a.desc}</p>
                  <Link
                    href="/temple"
                    className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-bold text-saffron-600 group-hover:text-saffron-500"
                  >
                    Attend aarti <span aria-hidden>→</span>
                  </Link>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-8 text-center">
          <Link
            href="/temple"
            className="inline-block min-h-12 rounded-full border-2 border-maroon-300 px-6 py-2.5 font-bold text-maroon-800 transition-colors hover:bg-maroon-50"
          >
            Full Temple Schedule
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
