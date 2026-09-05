/** Derive a display album from a legacy archive filename. */
export function albumOf(imageUrl: string): string {
  const file = imageUrl.split("/").pop() ?? "";
  if (file.startsWith("baba-birth")) return "Baba's Birthday";
  if (file.startsWith("gal-2019")) return "2019";
  if (file.startsWith("gal-2020")) return "2020";
  if (file.startsWith("gal-2021")) return "2021";
  if (file.startsWith("gal-2022")) return "2022";
  if (file.startsWith("plan-t")) return "Temple Project";
  return "Temple";
}
