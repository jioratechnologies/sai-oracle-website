import type { AartiTiming } from "@/lib/types";

export default function TimingsTable({
  timings,
  compact = false,
}: {
  timings: AartiTiming[];
  compact?: boolean;
}) {
  if (timings.length === 0) return null;
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gold-400/40 bg-white shadow-sm ${
        compact ? "" : ""
      }`}
    >
      <div className="bg-maroon-800 px-5 py-3 text-center">
        <p className="font-display text-xl font-bold text-gold-300">🪔 Daily Darshan & Aarti</p>
      </div>
      <ul className="divide-y divide-maroon-50">
        {timings.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between gap-3 px-5 py-2.5 text-[15px]"
          >
            <span className="font-medium text-maroon-900">{t.label}</span>
            <span className="shrink-0 rounded-full bg-cream-100 px-3 py-0.5 font-semibold whitespace-nowrap text-saffron-700">
              {t.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
