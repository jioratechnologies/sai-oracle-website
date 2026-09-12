export default function OmMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 rounded-full bg-[linear-gradient(135deg,var(--color-gulal-400),var(--color-saffron-400),var(--color-gold-400))] p-[2.5px] shadow-sm ${className}`}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-cream-50 font-display text-saffron-600">
        <span className="-mt-0.5 text-[1.35em] leading-none">ॐ</span>
      </span>
    </span>
  );
}
