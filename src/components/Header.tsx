"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import OmMark from "./OmMark";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/temple", label: "Temple" },
  { href: "/events", label: "Events" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery", label: "Media" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ organizationName }: { organizationName: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`bg-cream-50/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_-8px_rgba(102,18,32,0.18)]" : "shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:py-3">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
          onClick={() => setOpen(false)}
        >
          <OmMark className="h-10 w-10 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-xl font-extrabold text-maroon-800 sm:text-2xl">
              {organizationName}
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-gulal-600 uppercase sm:text-[11px]">
              Om Sai Ram
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors ${
                  active ? "text-white" : "text-maroon-900 hover:bg-maroon-50 hover:text-maroon-700"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="btn-festive absolute inset-0 -z-10 rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/temple#visit"
            className="btn-festive btn-glow ml-3 rounded-full px-5 py-2.5 text-[15px] font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
          >
            Visit Temple
          </Link>
        </nav>

        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl border border-maroon-200 bg-white/60 text-maroon-800 transition-colors hover:bg-maroon-50 lg:hidden"
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
          <>
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 bg-maroon-950/30 backdrop-blur-[1px] lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-40 overflow-hidden border-t border-maroon-100 bg-cream-50 shadow-lg lg:hidden"
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
                          active ? "btn-festive text-white" : "text-maroon-900 hover:bg-maroon-50"
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
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
