import Link from "next/link";
import { CalendarDays, Images, Megaphone, MonitorPlay } from "lucide-react";
import { Card, SetupNotice } from "@/components/admin/ui";
import { isSupabaseConfigured, supabaseServer } from "@/lib/supabase";
import { seedAnnouncements, seedEvents, seedGallery, seedVideos } from "@/lib/seed";
import { formatEventDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin Dashboard" };

async function getStats() {
  const sb = await supabaseServer();
  if (!sb) {
    const today = new Date().toISOString().slice(0, 10);
    return {
      configured: false as const,
      events: seedEvents.filter((e) => e.status === "published").length,
      announcements: seedAnnouncements.filter((a) => a.status === "published").length,
      gallery: seedGallery.length,
      videos: seedVideos.filter((v) => v.published).length,
      upcoming: seedEvents
        .filter((e) => e.status === "published" && e.event_date >= today)
        .sort((a, b) => a.event_date.localeCompare(b.event_date))
        .slice(0, 5),
    };
  }
  const today = new Date().toISOString().slice(0, 10);
  const [events, announcements, gallery, videos, upcoming] = await Promise.all([
    sb.from("events").select("id", { count: "exact", head: true }).eq("status", "published"),
    sb.from("announcements").select("id", { count: "exact", head: true }).eq("status", "published"),
    sb.from("gallery").select("id", { count: "exact", head: true }),
    sb.from("youtube_videos").select("id", { count: "exact", head: true }).eq("published", true),
    sb
      .from("events")
      .select("id,title,event_date")
      .eq("status", "published")
      .gte("event_date", today)
      .order("event_date", { ascending: true })
      .limit(5),
  ]);
  return {
    configured: true as const,
    events: events.count ?? 0,
    announcements: announcements.count ?? 0,
    gallery: gallery.count ?? 0,
    videos: videos.count ?? 0,
    upcoming: (upcoming.data ?? []) as { id: string; title: string; event_date: string }[],
  };
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const cards = [
    [CalendarDays, "Events", stats.events, "/admin/events"],
    [Megaphone, "Announcements", stats.announcements, "/admin/announcements"],
    [Images, "Gallery Photos", stats.gallery, "/admin/gallery"],
    [MonitorPlay, "YouTube Videos", stats.videos, "/admin/videos"],
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-maroon-900">
          {greeting()}
        </h1>
        <p className="mt-1 text-[15px] text-stone-600">
          Manage the Sai Oracle website — no developer needed.
        </p>
      </div>

      {!isSupabaseConfigured() && <SetupNotice />}

      <div className="grid grid-cols-2 gap-4">
        {cards.map(([Icon, label, count, href]) => (
          <Link key={href} href={href}>
            <Card className="transition-shadow hover:shadow-md">
              <p className="text-maroon-700">
                <Icon aria-hidden className="h-6 w-6" />
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-maroon-900">{count}</p>
              <p className="text-sm font-medium text-stone-600">{label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <h2 className="font-display text-xl font-bold text-maroon-900">Upcoming Events</h2>
        {stats.upcoming.length === 0 ? (
          <p className="mt-2 text-sm text-stone-600">
            No upcoming events.{" "}
            <Link href="/admin/events" className="font-semibold text-saffron-600 hover:underline">
              Add one →
            </Link>
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-maroon-50">
            {stats.upcoming.map((e) => (
              <li key={e.id} className="flex items-center justify-between py-2 text-[15px]">
                <span className="font-medium text-stone-800">{e.title}</span>
                <span className="text-sm text-stone-500">{formatEventDate(e.event_date)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h2 className="font-display text-xl font-bold text-maroon-900">Quick Actions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ["+ Add Event", "/admin/events"],
            ["+ Announcement", "/admin/announcements"],
            ["+ Add YouTube Video", "/admin/videos"],
            ["Upload Photos", "/admin/gallery"],
          ].map(([label, href]) => (
            <Link
              key={href + label}
              href={href}
              className="rounded-full bg-maroon-800 px-4 py-2 text-sm font-semibold text-cream-50 hover:bg-maroon-700"
            >
              {label}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
