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
        <p className="min-w-0 flex-1 truncate">
          <span className="mr-2 font-semibold text-gold-300">{latest.title}</span>
          <span className="text-cream-200/90">{latest.content}</span>
        </p>
        <Link
          href="/#announcements"
          className="shrink-0 rounded-full border border-gold-400/50 px-2.5 py-0.5 text-[12px] whitespace-nowrap underline-offset-2 hover:text-gold-300 sm:border-0 sm:p-0 sm:text-[13px] sm:underline sm:decoration-gold-400"
        >
          All updates
        </Link>
      </div>
    </div>
  );
}
