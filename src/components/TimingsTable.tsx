import { Flame } from "lucide-react";
import type { AartiTiming } from "@/lib/types";
import { THURSDAY_NOTE } from "@/lib/thursdayHours";

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
      <div className="bg-linear-to-r from-saffron-500 via-gulal-500 to-gulal-600 px-5 py-3.5 text-center">
        <p className="flex items-center justify-center gap-2 font-display text-xl font-bold text-white">
          <Flame aria-hidden className="h-5 w-5" />
          Daily Darshan & Aarti
        </p>
      </div>
      <ul className="divide-y divide-maroon-50">
        {timings.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between gap-3 px-5 py-3 text-[15px]"
          >
            <span className="font-medium text-maroon-900">{t.label}</span>
            <span className="shrink-0 rounded-full bg-saffron-100 px-3 py-1 font-bold whitespace-nowrap text-saffron-700">
              {t.time}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-saffron-200/60 bg-saffron-50 px-5 py-2.5 text-center text-[13px] font-semibold text-saffron-800">
        {THURSDAY_NOTE}
      </p>
    </div>
  );
}
