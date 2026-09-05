import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import { getAllEvents } from "@/lib/site";

export const revalidate = 300;

export const metadata = { title: "Events & Programs" };

export default async function EventsPage() {
  const events = await getAllEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.event_date >= today);
  const past = events.filter((e) => e.event_date < today).reverse();
  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Events & Programs"
        intro="Festivals, bhajan sandhyas, discourses and seva programmes at Sai Oracle."
        image="/legacy/banner/6.jpg"
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-2xl font-bold text-maroon-900">Upcoming</h2>
        {upcoming.length > 0 ? (
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-2xl border border-maroon-100 bg-white p-6 text-stone-600">
            New programmes will be announced soon. Please check back or follow us for updates. 🙏
          </p>
        )}

        {past.length > 0 && (
          <>
            <h2 className="mt-12 font-display text-2xl font-bold text-maroon-900">Past Events</h2>
            <div className="mt-5 grid gap-6 opacity-90 md:grid-cols-3">
              {past.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
