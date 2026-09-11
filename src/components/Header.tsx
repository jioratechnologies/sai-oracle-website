"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import OmMark from "./OmMark";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/temple", label: "Temple" },
  { href: "/events", label: "Events" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ organizationName }: { organizationName: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-gold-400/40 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <OmMark />
          <span className="leading-tight">
            <span className="block font-display text-2xl font-bold text-maroon-800">
              {organizationName}
            </span>
            <span className="block text-[11px] tracking-[0.2em] text-saffron-600 uppercase">
              Om Sai Ram
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                  active
                    ? "bg-maroon-800 text-cream-50"
                    : "text-maroon-900 hover:bg-maroon-50 hover:text-maroon-700"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/temple#visit"
            className="ml-2 rounded-full bg-saffron-500 px-4 py-2 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-saffron-600"
          >
            Visit Temple
          </Link>
        </nav>

        <button
          type="button"
          className="ml-auto rounded-lg border border-maroon-200 px-3 py-2 text-maroon-800 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-maroon-100 bg-cream-50 px-4 py-3 lg:hidden" aria-label="Mobile">
          <ul className="grid gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-medium text-maroon-900 hover:bg-maroon-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/temple#visit"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg bg-saffron-500 px-3 py-2.5 text-center font-semibold text-white"
              >
                Visit Temple
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
