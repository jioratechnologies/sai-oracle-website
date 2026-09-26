/** Derive a display album label from an image URL. */
export function albumOf(imageUrl: string): string {
  const file = imageUrl.split("/").pop() ?? "";
  // Legacy images_ prefix
  if (file.startsWith("images_baba-birth")) return "Baba's Birthday";
  if (file.startsWith("images_gal-2019")) return "Satsang 2019";
  if (file.startsWith("images_gal-2020")) return "Satsang 2020";
  if (file.startsWith("images_gal-2021")) return "Satsang 2021";
  if (file.startsWith("images_gal-2022")) return "Satsang 2022";
  if (file.startsWith("images_plan-t")) return "Temple Project";
  if (file.startsWith("vlb_images1")) return "Darshan Archives";
  // Non-prefixed legacy
  if (file.startsWith("baba-birth")) return "Baba's Birthday";
  if (file.startsWith("gal-2019")) return "Satsang 2019";
  if (file.startsWith("gal-2020")) return "Satsang 2020";
  if (file.startsWith("gal-2021")) return "Satsang 2021";
  if (file.startsWith("gal-2022")) return "Satsang 2022";
  if (file.startsWith("plan-t")) return "Temple Project";
  // Narayan seva
  if (imageUrl.includes("narayan-seva")) return "Narayan Seva";
  return "Temple";
}

/** All known album labels — used for filter UI. */
export const ALBUMS = [
  "All",
  "Temple",
  "Baba's Birthday",
  "Satsang 2022",
  "Satsang 2021",
  "Satsang 2020",
  "Satsang 2019",
  "Narayan Seva",
  "Temple Project",
  "Darshan Archives",
] as const;

export type AlbumLabel = (typeof ALBUMS)[number];
