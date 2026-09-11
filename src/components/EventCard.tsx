import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { eventDayParts, formatEventDate, formatTime } from "@/lib/format";
import { optimizedImageUrl } from "@/lib/image";
import type { TempleEvent } from "@/lib/types";
import { ArrowIcon } from "./ArrowLink";
import TempleArt from "./TempleArt";
import { PixelImage } from "./magicui/pixel-image";

export default function EventCard({ event }: { event: TempleEvent }) {
  const { day, mon } = eventDayParts(event.event_date);
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 z-10 divider-festive" />
      <div className="relative h-44">
        {event.image_url ? (
          <PixelImage
            src={optimizedImageUrl(event.image_url, 640)}
            alt={event.title}
            customGrid={{ rows: 3, cols: 5 }}
            pixelFadeInDuration={600}
            maxAnimationDelay={700}
            colorRevealDelay={350}
            className="h-full w-full"
            imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <TempleArt className="h-full w-full" />
        )}
        <div className="btn-festive absolute top-3 left-3 rounded-xl px-3 py-1.5 text-center text-white shadow-lg">
          <span className="block font-display text-2xl leading-none font-bold">{day}</span>
          <span className="block text-[11px] font-bold tracking-wider uppercase">{mon}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[22px] leading-snug font-bold text-maroon-900 group-hover:text-maroon-600">
          {event.title}
        </h3>
        <div className="mt-2 space-y-1 text-sm text-stone-600">
          <p className="flex items-center gap-1.5">
            <CalendarDays aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
            {formatEventDate(event.event_date)}
            {event.start_time ? (
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden>·</span>
                <Clock aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
                {formatTime(event.start_time)}
              </span>
            ) : ""}
          </p>
          {event.location && (
            <p className="flex items-center gap-1.5">
              <MapPin aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
              {event.location}
            </p>
          )}
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
