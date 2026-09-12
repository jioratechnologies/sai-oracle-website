import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getAllEvents, getMediaMap } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";

export const revalidate = 300;

export const metadata = { title: "Events & Programs" };

export default async function EventsPage() {
  const [events, mediaMap] = await Promise.all([getAllEvents(), getMediaMap()]);
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.event_date >= today);
  const past = events.filter((e) => e.event_date < today).reverse();
  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Events & Programs"
        intro="Festivals, bhajan sandhyas, discourses and seva programmes at Sai Oracle."
        image={resolveMediaUrl(mediaMap, "/assets/events/20241119_184230.webp")}
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-2xl font-bold text-maroon-900">Upcoming</h2>
        {upcoming.length > 0 ? (
          <RevealGroup className="mt-5 grid gap-6 md:grid-cols-3">
            {upcoming.map((e) => (
              <RevealItem key={e.id}>
                <EventCard event={e} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="mt-4 rounded-2xl border border-maroon-100 bg-white p-6 text-stone-600">
            New programmes will be announced soon. Please check back or follow us for updates.
          </p>
        )}

        {past.length > 0 && (
          <>
            <h2 className="mt-12 font-display text-2xl font-bold text-maroon-900">Past Events</h2>
            <RevealGroup className="mt-5 grid gap-6 opacity-90 md:grid-cols-3">
              {past.map((e) => (
                <RevealItem key={e.id}>
                  <EventCard event={e} />
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        )}
      </section>
    </>
  );
}
