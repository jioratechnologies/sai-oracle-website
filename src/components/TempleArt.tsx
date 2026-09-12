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
      className={`pattern-jali relative flex items-center justify-center overflow-hidden bg-linear-to-br from-saffron-200 via-gulal-200 to-gold-200 ${className}`}
    >
      <div className="absolute h-[140%] aspect-square rounded-full border border-saffron-600/25" />
      <div className="absolute h-[100%] aspect-square rounded-full border border-saffron-600/30" />
      <div className="absolute h-[65%] aspect-square rounded-full border border-saffron-600/25" />
      <span className="relative font-display text-6xl text-saffron-600">ॐ</span>
    </div>
  );
}
