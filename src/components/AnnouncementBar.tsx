import Link from "next/link";
import { getAnnouncements } from "@/lib/site";

export default async function AnnouncementBar() {
  const items = await getAnnouncements(3);
  if (items.length === 0) return null;
  const latest = items[0];
  return (
    <div className="bg-maroon-900 text-cream-100">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-1.5 text-[13px]">
        <span aria-hidden className="text-gold-300">
          🔔
        </span>
        <p className="truncate">
          <span className="mr-2 font-semibold text-gold-300">{latest.title}</span>
          <span className="text-cream-200/90">{latest.content}</span>
        </p>
        <Link
          href="/#announcements"
          className="ml-auto hidden shrink-0 underline decoration-gold-400 underline-offset-2 hover:text-gold-300 sm:inline"
        >
          All updates
        </Link>
      </div>
    </div>
  );
}
