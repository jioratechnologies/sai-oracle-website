import { getAnnouncements, getSettings } from "@/lib/site";
import AnnouncementBarClient from "./AnnouncementBarClient";

export default async function AnnouncementBar() {
  const [items, settings] = await Promise.all([getAnnouncements(3), getSettings()]);
  if (items.length === 0) return null;

  return <AnnouncementBarClient latest={items[0]} settings={settings} />;
}
