import Image from "next/image";

export default function OmMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-flex shrink-0 overflow-hidden rounded-full bg-linear-to-br from-amber-400 via-saffron-500 to-maroon-700 p-[2px] shadow-md ring-1 ring-gold-400/40 ${className}`}
    >
      <span className="relative flex h-full w-full overflow-hidden rounded-full bg-cream-100">
        <Image
          src="/logo.png"
          alt="Sai Oracle — Bhagwan Sri Sathya Sai Baba"
          width={150}
          height={150}
          priority
          className="h-full w-full object-cover object-top"
        />
      </span>
    </span>
  );
}
