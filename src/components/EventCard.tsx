import Link from "next/link";
import Image from "next/image";
import { eventDayParts, formatEventDate, formatTime } from "@/lib/format";
import type { TempleEvent } from "@/lib/types";
import { ArrowIcon } from "./ArrowLink";
import TempleArt from "./TempleArt";

export default function EventCard({ event }: { event: TempleEvent }) {
  const { day, mon } = eventDayParts(event.event_date);
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <TempleArt className="h-full w-full" />
        )}
        <div className="absolute top-3 left-3 rounded-xl bg-cream-50/95 px-3 py-1.5 text-center shadow">
          <span className="block font-display text-2xl leading-none font-bold text-maroon-800">
            {day}
          </span>
          <span className="block text-[11px] font-semibold tracking-wider text-saffron-600 uppercase">
            {mon}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[22px] leading-snug font-bold text-maroon-900 group-hover:text-maroon-600">
          {event.title}
        </h3>
        <div className="mt-2 space-y-1 text-sm text-stone-600">
          <p>
            📅 {formatEventDate(event.event_date)}
            {event.start_time ? ` · 🕐 ${formatTime(event.start_time)}` : ""}
          </p>
          {event.location && <p>📍 {event.location}</p>}
        </div>
        {event.description && (
          <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-stone-600">
            {event.description}
          </p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-saffron-600 group-hover:text-saffron-500">
          View Details <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
