import Link from "next/link";
import type { ReactNode } from "react";

/** Sliding arrow glyph — inherits text color. Must sit inside a `.group`. */
export function ArrowIcon({
  className = "h-4 w-4",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`transition-transform duration-300 ${
        flip ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
      } ${className}`}
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

type Variant = "inline" | "outline" | "solid";

/**
 * Consistent link-with-arrow used across the public site.
 * - inline: text link, arrow slides on hover
 * - outline: pill button, arrow rides in a ring chip that slides
 * - solid: filled pill, arrow rides in a frosted chip that slides
 */
export default function ArrowLink({
  href,
  children,
  variant = "inline",
  className = "",
  external = false,
  back = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  /** Back-style link: arrow leads on the left and slides backwards. */
  back?: boolean;
}) {
  const base = "group inline-flex items-center font-semibold";
  const styles: Record<Variant, string> = {
    inline: "gap-1.5",
    outline: "gap-2 rounded-full border px-5 py-2 transition-all hover:shadow-md",
    solid:
      "gap-2 rounded-full py-1.5 pr-1.5 pl-5 shadow-md transition-all hover:shadow-lg hover:brightness-105",
  };
  const chip: Record<Variant, string> = {
    inline: "",
    outline:
      "flex h-7 w-7 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1",
    solid:
      "flex h-8 w-8 items-center justify-center rounded-full bg-white/25 transition-transform duration-300 group-hover:translate-x-1",
  };
  const arrow =
    variant === "inline" ? (
      <ArrowIcon flip={back} />
    ) : (
      <span className={chip[variant]}>
        <ArrowIcon flip={back} className="h-3.5 w-3.5" />
      </span>
    );
  const content = back ? (
    <>
      {arrow}
      <span>{children}</span>
    </>
  ) : (
    <>
      <span>{children}</span>
      {arrow}
    </>
  );
  const cls = `${base} ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
