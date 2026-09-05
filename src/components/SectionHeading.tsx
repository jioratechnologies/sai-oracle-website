export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-saffron-600 uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold text-maroon-900 sm:text-4xl">{title}</h2>
      <div
        aria-hidden
        className={`mt-3 flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="h-px w-12 bg-gold-400" />
        <span className="text-gold-500">❖</span>
        <span className="h-px w-12 bg-gold-400" />
      </div>
      {intro && <p className="mt-3 text-[17px] leading-relaxed text-stone-600">{intro}</p>}
    </div>
  );
}
