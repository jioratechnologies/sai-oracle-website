import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AuroraBlobs from "./motion/AuroraBlobs";
import TextReveal from "./motion/TextReveal";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Compact sub-page banner used across all inner pages.
 * Slimmer than the homepage hero; supports an optional faded photo
 * backdrop and a breadcrumb trail. Ends in a gold band with a
 * centered diamond emblem.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Optional atmospheric photo shown faded behind the text. */
  image?: string;
  /** Breadcrumb trail after Home. Defaults to the page title. */
  crumbs?: Crumb[];
}) {
  const trail: Crumb[] = crumbs ?? [{ label: title }];
  return (
    <section className="relative overflow-hidden bg-maroon-950 text-cream-50">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-b from-maroon-950/75 via-maroon-950/60 to-maroon-950"
          />
          <AuroraBlobs className="opacity-70" />
        </>
      ) : (
        <>
          <AuroraBlobs />
          <div aria-hidden className="pattern-jali-dark absolute inset-0 opacity-70" />
        </>
      )}

      <div className="relative mx-auto max-w-6xl px-4 py-9 text-center sm:py-12">
        <nav aria-label="Breadcrumb">
          <ol className="mb-4 flex flex-wrap items-center justify-center gap-1.5 text-[13px] text-cream-200/70">
            <li>
              <Link href="/" className="transition-colors hover:text-gold-300">
                Home
              </Link>
            </li>
            {trail.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <span aria-hidden className="text-gold-400/70">
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-gold-300">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-gold-200">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && (
          <p className="mb-3 flex items-center justify-center gap-2.5 text-[11px] font-bold tracking-[0.3em] text-saffron-200 uppercase">
            <span aria-hidden className="h-px w-10 bg-linear-to-r from-transparent to-saffron-400/80" />
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gulal-300" />
            {eyebrow}
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gulal-300" />
            <span aria-hidden className="h-px w-10 bg-linear-to-l from-transparent to-saffron-400/80" />
          </p>
        )}
        <TextReveal
          as="h1"
          text={title}
          className="font-display text-[2.1rem] leading-tight font-extrabold text-balance sm:text-[2.75rem]"
        />
        {intro && (
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-cream-200/85 sm:text-base">
            {intro}
          </p>
        )}
      </div>

      <div aria-hidden className="relative divider-festive">
        <span className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-gold-300 bg-maroon-950" />
      </div>
    </section>
  );
}
