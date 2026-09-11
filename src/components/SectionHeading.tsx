export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p
          className={`mb-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] uppercase ${
            dark ? "text-gold-300" : "text-gulal-600"
          }`}
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-saffron-500" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-[2rem] leading-tight font-extrabold text-balance sm:text-4xl ${
          dark ? "text-cream-50" : "text-maroon-900"
        }`}
      >
        {title}
      </h2>
      <div
        aria-hidden
        className={`mt-3 flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="h-1 w-14 rounded-full divider-festive" />
      </div>
      {intro && (
        <p className={`mt-3 text-[17px] leading-relaxed ${dark ? "text-cream-200/85" : "text-stone-600"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
