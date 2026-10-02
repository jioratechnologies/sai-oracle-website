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
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-10">
      {/* Compact In-Page Header */}
      <div className="mx-auto max-w-3xl text-center border-b border-maroon-100/80 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          Join Us · Sacred Celebrations
        </span>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          Events &amp; Programs
        </h1>
        <p className="mt-2.5 text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          Festivals, bhajan sandhyas, discourses and seva programmes at Satyadeep Sai Universe.
        </p>
      </div>

      <div>
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
      </div>
    </section>
  );
}
