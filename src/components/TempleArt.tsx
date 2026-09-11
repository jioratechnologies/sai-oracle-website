/**
 * Decorative placeholder used when an event / gallery item has no photo yet.
 * Keeps the design warm and intentional instead of showing broken images.
 */
export default function TempleArt({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden={!label}
      role={label ? "img" : undefined}
      aria-label={label}
      className={`pattern-jali relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-maroon-800 via-maroon-700 to-saffron-600 ${className}`}
    >
      <div className="absolute h-[140%] aspect-square rounded-full border border-gold-300/30" />
      <div className="absolute h-[100%] aspect-square rounded-full border border-gold-300/40" />
      <div className="absolute h-[65%] aspect-square rounded-full border border-gold-300/30" />
      <span className="relative font-display text-6xl text-gold-300/90">ॐ</span>
    </div>
  );
}
