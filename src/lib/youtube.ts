/**
 * Extract a YouTube video ID from a watch URL, youtu.be link,
 * embed URL, Shorts URL, or a bare 11-character ID.
 * Returns null when nothing usable is found.
 */
export function getYouTubeId(input: string | null | undefined): string | null {
  if (!input) return null;
  const value = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    const host = url.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = url.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) =>
        ["embed", "shorts", "live", "v"].includes(p),
      );
      if (idx >= 0 && parts[idx + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[idx + 1])) {
        return parts[idx + 1];
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function youtubeThumbnail(
  input: string | null | undefined,
  quality: "hqdefault" | "mqdefault" | "maxresdefault" = "hqdefault",
): string | null {
  const id = getYouTubeId(input);
  return id ? `https://i.ytimg.com/vi/${id}/${quality}.jpg` : null;
}

export function youtubeEmbedUrl(input: string | null | undefined): string | null {
  const id = getYouTubeId(input);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

export function youtubeWatchUrl(input: string | null | undefined): string {
  const id = getYouTubeId(input);
  return id ? `https://www.youtube.com/watch?v=${id}` : "#";
}
