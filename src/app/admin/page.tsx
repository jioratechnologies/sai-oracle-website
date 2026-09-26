import Link from "next/link";
import { CalendarDays, Images, Megaphone, MonitorPlay, Heart } from "lucide-react";
import { Card, SetupNotice } from "@/components/admin/ui";
import { isSupabaseConfigured } from "@/lib/supabase";
import { formatEventDate } from "@/lib/format";
import { getDataStats } from "@/lib/dataStore";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin Dashboard" };

async function getStats() {
  const stats = await getDataStats();
  return {
    configured: true as const,
    events: stats.eventsCount,
    announcements: stats.announcementsCount,
    gallery: stats.galleryCount,
    videos: stats.videosCount,
    upcoming: stats.upcoming,
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
            ["Manage Users", "/admin/users"],
            ["+ Hero Slider", "/admin/slider"],
          ].map(([label, href]) => (
            <Link
              key={href + label}
              href={href}
              className="rounded-full bg-maroon-800 px-4 py-2 text-sm font-semibold text-cream-50 hover:bg-maroon-700"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/admin/trust"
            className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-saffron-600 to-amber-600 px-4 py-2 text-sm font-semibold text-white hover:from-saffron-700 hover:to-amber-700"
          >
            <Heart className="h-4 w-4" />
            Trust & Donation
          </Link>
        </div>
      </Card>
    </div>
  );
}
