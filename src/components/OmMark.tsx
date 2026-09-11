export default function OmMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-maroon-800 font-display text-cream-100 ring-2 ring-gold-400 ${className}`}
    >
      <span className="-mt-0.5 text-[1.35em] leading-none">ॐ</span>
    </span>
  );
}
