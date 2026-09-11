"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-40 bg-cream-50/95 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" onClick={() => setOpen(false)}>
          <OmMark className="h-10 w-10 sm:h-11 sm:w-11" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-xl font-extrabold text-maroon-800 sm:text-2xl">
              {organizationName}
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-gulal-600 uppercase sm:text-[11px]">
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
                className={`rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${
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
            className="btn-festive ml-2 rounded-full px-5 py-2.5 text-[15px] font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
          >
            Visit Temple
          </Link>
        </nav>

        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-maroon-200 text-maroon-800 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="flex items-center justify-center">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </span>
        </motion.button>
      </div>

      <div aria-hidden className="divider-festive" />

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-maroon-100 bg-cream-50 lg:hidden"
            aria-label="Mobile"
          >
            <ul className="grid max-h-[calc(100dvh-4rem)] gap-1 overflow-y-auto px-4 py-3">
              {LINKS.map((l, i) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block min-h-12 rounded-xl px-4 py-3 text-[16px] font-semibold transition-colors ${
                        active ? "bg-maroon-800 text-cream-50" : "text-maroon-900 hover:bg-maroon-50"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: LINKS.length * 0.04, duration: 0.25 }}
              >
                <Link
                  href="/temple#visit"
                  onClick={() => setOpen(false)}
                  className="btn-festive mt-2 block min-h-12 rounded-xl px-4 py-3 text-center text-[16px] font-bold text-white shadow-md"
                >
                  Visit Temple
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
