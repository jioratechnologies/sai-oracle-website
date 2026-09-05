import Link from "next/link";
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

        <dl className="mt-6 grid gap-3 rounded-2xl border border-maroon-100 bg-white p-5 text-[16px] sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold tracking-wider text-stone-500 uppercase">Date</dt>
            <dd className="font-semibold text-maroon-900">📅 {formatEventDate(event.event_date)}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wider text-stone-500 uppercase">Time</dt>
            <dd className="font-semibold text-maroon-900">
              🕐 {event.start_time ? formatTime(event.start_time) : "—"}
              {event.end_time ? ` – ${formatTime(event.end_time)}` : ""}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wider text-stone-500 uppercase">Venue</dt>
            <dd className="font-semibold text-maroon-900">📍 {event.location || "Sai Oracle Temple"}</dd>
          </div>
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
          <Link
            href="/events"
            className="rounded-full border border-maroon-300 px-6 py-2.5 font-semibold text-maroon-800 hover:bg-maroon-800 hover:text-cream-50"
          >
            ← All Events
          </Link>
        </div>
      </section>
    </>
  );
}
