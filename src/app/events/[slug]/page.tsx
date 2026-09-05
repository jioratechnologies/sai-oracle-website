import { notFound } from "next/navigation";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ArrowLink from "@/components/ArrowLink";
import TempleArt from "@/components/TempleArt";
import { formatEventDate, formatTime } from "@/lib/format";
import { getAllEvents, getEventBySlug } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return { title: event ? event.title : "Event" };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <>
      <PageHero
        eyebrow={formatEventDate(event.event_date)}
        title={event.title}
        crumbs={[{ label: "Events", href: "/events" }, { label: event.title }]}
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-maroon-100 shadow-sm">
          {event.image_url ? (
            <Image src={event.image_url} alt={event.title} fill className="object-cover" />
          ) : (
            <TempleArt className="h-full w-full" />
          )}
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Date",
              value: formatEventDate(event.event_date),
              icon: (
                <g>
                  <rect x="4" y="6" width="16" height="14" rx="2.5" />
                  <path d="M4 10.5h16 M8.5 3.5V8 M15.5 3.5V8" />
                </g>
              ),
            },
            {
              label: "Time",
              value: `${event.start_time ? formatTime(event.start_time) : "—"}${event.end_time ? ` – ${formatTime(event.end_time)}` : ""}`,
              icon: (
                <g>
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 7.5V12l3 2" />
                </g>
              ),
            },
            {
              label: "Venue",
              value: event.location || "Sai Oracle Temple",
              icon: (
                <g>
                  <path d="M12 21s-6.5-5.6-6.5-10.5A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.5C18.5 15.4 12 21 12 21Z" />
                  <circle cx="12" cy="10.5" r="2.3" />
                </g>
              ),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-maroon-100 bg-white p-4 shadow-sm"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-maroon-800 text-gold-300 ring-2 ring-gold-400/70"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  {item.icon}
                </svg>
              </span>
              <span className="min-w-0">
                <dt className="text-[11px] font-semibold tracking-[0.18em] text-stone-500 uppercase">
                  {item.label}
                </dt>
                <dd className="truncate font-display text-lg leading-snug font-bold text-maroon-900">
                  {item.value}
                </dd>
              </span>
            </div>
          ))}
        </dl>

        {event.description && (
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed whitespace-pre-line text-stone-700">
            {event.description}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {event.registration_url && (
            <ArrowLink
              href={event.registration_url}
              external
              variant="solid"
              className="bg-gradient-to-r from-saffron-500 to-saffron-600 text-white"
            >
              Register / Know More
            </ArrowLink>
          )}
          <ArrowLink
            href="/events"
            variant="outline"
            back
            className="border-maroon-300 px-5 py-2 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50"
          >
            All Events
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
