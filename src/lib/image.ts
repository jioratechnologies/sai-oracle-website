// Next's built-in optimizer 400s any `w=` that isn't exactly one of these
// (see next.config.ts — we don't override deviceSizes/imageSizes, so these
// are the framework defaults). Snapping to the nearest one keeps every
// caller safe without having to memorize this list.
const ALLOWED_WIDTHS = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function nearestAllowedWidth(width: number): number {
  return ALLOWED_WIDTHS.reduce((best, candidate) =>
    Math.abs(candidate - width) < Math.abs(best - width) ? candidate : best,
  );
}

/**
 * Routes a local/public image through Next's built-in image optimizer
 * so effects that render a plain `<img>` (like PixelImage, which slices
 * the photo into animated pieces) still get a resized, compressed file
 * instead of the raw multi-megabyte original.
 */
export function optimizedImageUrl(src: string, width: number, quality = 75): string {
  if (!src.startsWith("/")) return src; // remote/external URLs: use as-is
  const w = nearestAllowedWidth(width);
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${quality}`;
}

/**
 * Resolves a local `/assets/...` path to its Supabase Storage public URL,
 * via the `media_assets` map from `getMediaMap()`. Falls back to the local
 * path unchanged when the key isn't in the map (not yet migrated, or
 * Supabase isn't configured).
 */
export function resolveMediaUrl(map: Record<string, string>, localPath: string): string {
  return map[localPath] ?? localPath;
}
