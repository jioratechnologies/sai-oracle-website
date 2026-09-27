"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon, X, ChevronDown, Search, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OmMark from "./OmMark";
import { Menu, MenuItem, HoveredLink, ProductItem } from "./ui/navbar-menu";
import { socialIcons } from "./SocialLinks";
import GlobalSearchModal from "./GlobalSearchModal";
import { resolveMediaUrl } from "@/lib/image";

interface HeaderProps {
  organizationName: string;
  mediaMap?: Record<string, string>;
}

export default function Header({ organizationName, mediaMap = {} }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpandedSection(null);
  }, [pathname]);

  const toggleMobileSection = (name: string) => {
    setMobileExpandedSection((curr) => (curr === name ? null : name));
  };

  const isSectionActive = (item: string) => {
    if (item === "Home") return pathname === "/";
    if (item === "About") {
      return (
        pathname.startsWith("/about") ||
        pathname === "/aims" ||
        pathname === "/mission-karuna" ||
        pathname === "/rules-regulations"
      );
    }
    if (item === "Maa") {
      return pathname.startsWith("/gurumaa");
    }
    if (item === "Temple") {
      return (
        pathname.startsWith("/universe") ||
        pathname.startsWith("/how-to-reach") ||
        pathname.startsWith("/dharma")
      );
    }
    if (item === "Trust") {
      return (
        pathname.startsWith("/trust") ||
        pathname.startsWith("/contribution") ||
        pathname.startsWith("/charitable")
      );
    }
    if (item === "Media") {
      return pathname.startsWith("/gallery") || pathname.startsWith("/media");
    }
    if (item === "Social") {
      return pathname.startsWith("/social");
    }
    if (item === "Contact") {
      return pathname.startsWith("/contact");
    }
    return false;
  };

  const icons = socialIcons();

  return (
    <header
      className={`sticky top-0 z-40 bg-cream-50 transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_4px_24px_-8px_rgba(102,18,32,0.18)]"
          : "shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
      }`}
    >
      {/* Top Header Bar — relative z-50 ensures it stays crisp above mobile backdrop */}
      <div className="relative z-50 bg-cream-50/98 border-b border-maroon-100/70">
        <div className="w-full max-w-[1560px] mx-auto flex items-center justify-between gap-3 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          {/* Brand / Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 sm:gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <OmMark className="h-10 w-10 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 shrink-0" />
            <span className="leading-tight shrink-0">
              <span className="block whitespace-nowrap font-display text-xl font-extrabold text-maroon-800 sm:text-2xl">
                {organizationName}
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.2em] text-gulal-600 uppercase sm:text-[11px]">
                Om Sai Ram
              </span>
            </span>
          </Link>

          {/* Aceternity Desktop Navbar Menu */}
          <div className="hidden xl:flex items-center gap-1">
            <Menu setActive={setActive}>
              {/* Home Link */}
              <MenuItem
                setActive={setActive}
                active={active}
                item="Home"
                href="/"
                isSelected={isSectionActive("Home")}
              />

              {/* About Dropdown */}
              <MenuItem
                setActive={setActive}
                active={active}
                item="About"
                align="left"
                isSelected={isSectionActive("About")}
              >
                <div className="grid grid-cols-2 gap-4 w-[540px]">
                  <div className="space-y-1">
                    <span className="block px-2 text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Our Foundation
                    </span>
                    <HoveredLink
                      href="/about"
                      description="History, founding philosophy and sacred presence"
                    >
                      About Sai Oracle
                    </HoveredLink>
                    <HoveredLink
                      href="/about#overview"
                      description="Sacred mandir complex & Sarva Dharma Sthal overview"
                    >
                      Temple Overview
                    </HoveredLink>
                    <HoveredLink
                      href="/about#worship"
                      description="Daily aarti schedules, temple hours and how to visit"
                    >
                      Temple Worship &amp; Timings
                    </HoveredLink>
                    <HoveredLink
                      href="/aims"
                      description="Global Oneness, Narayan Seva & 5 human values"
                    >
                      Aims &amp; Objectives
                    </HoveredLink>
                    <HoveredLink
                      href="/mission-karuna"
                      description="Empowering underprivileged children through education"
                    >
                      Mission Karuna
                    </HoveredLink>
                    <HoveredLink
                      href="/rules-regulations"
                      description="Temple etiquette and visitor guidelines"
                    >
                      Rules &amp; Regulations
                    </HoveredLink>
                  </div>

                  <div className="space-y-2.5 border-l border-maroon-100/80 pl-4">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Featured Highlights
                    </span>
                    <ProductItem
                      title="Temple Overview"
                      description="Sarva Dharma Sthal and sanctum of divine bliss."
                      href="/about#overview"
                      src={resolveMediaUrl(mediaMap, "/assets/content/archive/public.jpg")}
                      badge="Overview"
                    />
                    <ProductItem
                      title="Mission Karuna"
                      description="Education and financial support for poor children."
                      href="/mission-karuna"
                      src={resolveMediaUrl(mediaMap, "/assets/content/mission-karuna/dsc_0205.webp")}
                      badge="Sacred Cause"
                    />
                  </div>
                </div>
              </MenuItem>

              {/* Maa Dropdown */}
              <MenuItem
                setActive={setActive}
                active={active}
                item="Maa"
                href="/gurumaa"
                align="left"
                isSelected={isSectionActive("Maa")}
              >
                <div className="grid grid-cols-2 gap-4 w-[540px]">
                  <div className="space-y-1">
                    <span className="block px-2 text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Divine Guidance &amp; Wisdom
                    </span>
                    <HoveredLink
                      href="/gurumaa?tab=teachings"
                      description="Divine wisdom on Love, Human Values and Selfless Seva"
                    >
                      Teachings of Maa
                    </HoveredLink>
                    <HoveredLink
                      href="/gurumaa?tab=meditation"
                      description="Jyoti Dhyana flame meditation technique and spiritual essence"
                    >
                      Maa on Meditation
                    </HoveredLink>
                    <HoveredLink
                      href="/gurumaa?tab=discourses"
                      description="Profound spiritual discourses on Truth, Dharma & Peace"
                    >
                      Divine Discourses
                    </HoveredLink>
                    <HoveredLink
                      href="/gurumaa?tab=life-sketch"
                      description="Glorious and blissful life journey of beloved Maa"
                    >
                      Maa Life Sketch
                    </HoveredLink>
                    <HoveredLink
                      href="/gurumaa?tab=miracles"
                      description="Documented divine miracles, cures and sacred leelas"
                    >
                      Miraculous Life of Maa
                    </HoveredLink>
                    <HoveredLink
                      href="/gurumaa"
                      description="Spiritual guidance, satsang and Nishkama Seva"
                    >
                      About Beloved Maa
                    </HoveredLink>
                  </div>

                  <div className="border-l border-maroon-100/80 pl-4 space-y-2">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Life &amp; Guidance
                    </span>
                    <ProductItem
                      title="Maa on Meditation"
                      description="Experience inner bliss through the Jyoti Flame technique."
                      href="/gurumaa?tab=meditation"
                      src={resolveMediaUrl(mediaMap, "/assets/content/archive/meditation.gif")}
                      badge="Dhyana"
                    />
                    <ProductItem
                      title="Teachings & Seva"
                      description="Love All, Serve All — Nishkama Seva wisdom."
                      href="/gurumaa?tab=teachings"
                      src={resolveMediaUrl(mediaMap, "/assets/content/maa/1.webp")}
                      badge="Wisdom"
                    />
                  </div>
                </div>
              </MenuItem>

              {/* Temple Dropdown */}
              <MenuItem
                setActive={setActive}
                active={active}
                item="Temple"
                href="/universe"
                align="center"
                isSelected={isSectionActive("Temple")}
              >
                <div className="grid grid-cols-2 gap-4 w-[540px]">
                  <div className="space-y-1">
                    <span className="block px-2 text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Sacred Sanctum
                    </span>
                    <HoveredLink
                      href="/universe"
                      description="Satyadeep Sai Universe — realm of divine healing & peace"
                    >
                      Universe of Divine Healing
                    </HoveredLink>
                    <HoveredLink
                      href="/about#overview"
                      description="Sarva Dharma Sthal & sacred mandir complex"
                    >
                      Temple Overview
                    </HoveredLink>
                    <HoveredLink
                      href="/about#worship"
                      description="Morning, Afternoon & Evening Aarti timings"
                    >
                      Aarti &amp; Worship Timings
                    </HoveredLink>
                    <HoveredLink
                      href="/how-to-reach"
                      description="Front view of Mandir, road, train & flight transit guide"
                    >
                      Visit Temple &amp; How to Reach
                    </HoveredLink>
                  </div>

                  <div className="border-l border-maroon-100/80 pl-4 space-y-2">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Temple Sanctum
                    </span>
                    <ProductItem
                      title="Divine Healing"
                      description="Satyadeep Sai Universe of Divine Healing in Meerut."
                      href="/universe"
                      src={resolveMediaUrl(mediaMap, "/assets/content/universe/img_7403-copy.webp")}
                      badge="Sanctum"
                    />
                    <ProductItem
                      title="Shiv Sai Temple"
                      description="Sacred abhishek, shivling sanctum and divine aartis."
                      href="/universe"
                      src={resolveMediaUrl(mediaMap, "/assets/content/archive/shivji_temple.jpg")}
                      badge="Shiv Mandir"
                    />
                  </div>
                </div>
              </MenuItem>

              {/* Trust Dropdown */}
              <MenuItem
                setActive={setActive}
                active={active}
                item="Trust"
                href="/trust"
                align="center"
                isSelected={isSectionActive("Trust")}
              >
                <div className="grid grid-cols-2 gap-4 w-[540px]">
                  <div className="space-y-1">
                    <span className="block px-2 text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Caretaker of Universe
                    </span>
                    <HoveredLink
                      href="/trust"
                      description="Official Trust history, seva vision and 80G registration"
                    >
                      Sri Sai Sansthan Trust
                    </HoveredLink>
                    <HoveredLink
                      href="/trust#contribution"
                      description="Join hands in Nishkama Seva with 50% 80G tax benefit"
                    >
                      Contribution &amp; 80G Tax Exemption
                    </HoveredLink>
                    <HoveredLink
                      href="/trust#donation"
                      description="Instant QR code UPI scan and official bank NEFT details"
                    >
                      Donate via UPI &amp; Bank Transfer
                    </HoveredLink>
                    <HoveredLink
                      href="/mission-karuna"
                      description="Sponsoring education and nutritional aid for poor children"
                    >
                      Mission Karuna Seva
                    </HoveredLink>
                  </div>

                  <div className="border-l border-maroon-100/80 pl-4 space-y-2">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Trust Activities
                    </span>
                    <ProductItem
                      title="Narayan Seva & Camps"
                      description="Food distribution and health relief for the needy."
                      href="/trust"
                      src={resolveMediaUrl(mediaMap, "/assets/content/archive/chart_trust_62.jpg")}
                      badge="80G Seva"
                    />
                    <ProductItem
                      title="Balvikas & Children Aid"
                      description="Secular and spiritual guidance under Mission Karuna."
                      href="/mission-karuna"
                      src={resolveMediaUrl(mediaMap, "/assets/content/archive/chart_trust_76.jpg")}
                      badge="Education"
                    />
                  </div>
                </div>
              </MenuItem>

              {/* Media (Renamed from Photos & Videos) */}
              <MenuItem
                setActive={setActive}
                active={active}
                item="Media"
                href="/gallery"
                align="center"
                isSelected={isSectionActive("Media")}
              >
                <div className="grid grid-cols-2 gap-4 w-[500px]">
                  <div className="space-y-1">
                    <span className="block px-2 text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Darshan Archives
                    </span>
                    <HoveredLink
                      href="/gallery"
                      description="Temple darshan, festive havan and seva photo album"
                    >
                      Temple Photos Section
                    </HoveredLink>
                    <HoveredLink
                      href="/#temple-videos"
                      description="Sacred video recordings of darshan and seva"
                    >
                      Videos Showcase
                    </HoveredLink>
                  </div>

                  <div className="border-l border-maroon-100/80 pl-4 space-y-2">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Darshan Gallery
                    </span>
                    <ProductItem
                      title="Temple Moments"
                      description="High-resolution sacred photographs."
                      href="/gallery"
                      src={resolveMediaUrl(mediaMap, "/assets/content/gallery/20241024_195531.webp")}
                      badge="Gallery"
                    />
                  </div>
                </div>
              </MenuItem>

              {/* Social (Renamed from Social Media) */}
              <MenuItem
                setActive={setActive}
                active={active}
                item="Social"
                href="/social"
                align="right"
                isSelected={isSectionActive("Social")}
              >
                <div className="grid grid-cols-2 gap-4 w-[520px]">
                  <div className="space-y-1">
                    <span className="block px-2 text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Official Platforms
                    </span>
                    <HoveredLink
                      href="/social"
                      description="Daily aartis, bhajans and video discourses"
                    >
                      <span className="inline-flex items-center gap-2 text-red-600 font-semibold">
                        <span className="h-4 w-4 shrink-0 flex items-center justify-center">{icons.YouTube}</span>
                        <span>YouTube Channel</span>
                      </span>
                    </HoveredLink>
                    <HoveredLink
                      href="/social"
                      description="Daily darshan photos, reels and spiritual thoughts"
                    >
                      <span className="inline-flex items-center gap-2 text-pink-600 font-semibold">
                        <span className="h-4 w-4 shrink-0 flex items-center justify-center">{icons.Instagram}</span>
                        <span>Instagram Feed</span>
                      </span>
                    </HoveredLink>
                    <HoveredLink
                      href="/social"
                      description="Live stream announcements and community updates"
                    >
                      <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                        <span className="h-4 w-4 shrink-0 flex items-center justify-center">{icons.Facebook}</span>
                        <span>Facebook Community</span>
                      </span>
                    </HoveredLink>
                    <HoveredLink
                      href="/social"
                      description="Direct seva notifications and temple helpline"
                    >
                      <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold">
                        <span className="h-4 w-4 shrink-0 flex items-center justify-center">{icons.WhatsApp}</span>
                        <span>WhatsApp Helpline</span>
                      </span>
                    </HoveredLink>
                  </div>

                  <div className="border-l border-maroon-100/80 pl-4 space-y-2">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-saffron-700 uppercase">
                      Connect Online
                    </span>
                    <ProductItem
                      title="Social Media Hub"
                      description="Explore YouTube, Instagram, Facebook & WhatsApp."
                      href="/social"
                      src={resolveMediaUrl(mediaMap, "/assets/content/home/love-service-devotion-main-page-photo-small-size-me.webp")}
                      badge="Live"
                    />
                    <div className="rounded-xl border border-saffron-300/60 bg-saffron-50/70 p-2.5 text-xs text-stone-700">
                      <p className="font-semibold text-maroon-900">Instagram Daily Darshan</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Receive morning darshan &amp; holy quotes directly on Instagram.
                      </p>
                    </div>
                  </div>
                </div>
              </MenuItem>

              {/* Contact Link */}
              <MenuItem
                setActive={setActive}
                active={active}
                item="Contact"
                href="/contact"
                isSelected={isSectionActive("Contact")}
              />
            </Menu>

            {/* Global Search Bar Trigger (Desktop) */}
            <button
              id="global-search-trigger"
              type="button"
              onClick={() => setSearchOpen(true)}
              className="group flex items-center justify-between gap-2 rounded-full border border-maroon-200/90 bg-white/95 hover:bg-white pl-3 pr-2 py-1.5 text-xs text-stone-500 hover:border-gold-400 hover:text-maroon-950 transition-all shadow-2xs hover:shadow-xs cursor-pointer w-28 xl:w-36 2xl:w-52 shrink-0"
              title="Search all pages, teachings, aartis (⌘K / Ctrl+K)"
              aria-label="Search site"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Search className="h-3.5 w-3.5 text-saffron-600 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate font-medium text-stone-400 group-hover:text-stone-600">
                  Search site...
                </span>
              </div>
              <kbd className="inline-flex items-center rounded-md bg-cream-100 group-hover:bg-amber-100/70 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-stone-500 border border-stone-200 shrink-0">
                ⌘K
              </kbd>
            </button>

            {/* Donation CTA Button */}
            <Link
              href="/trust#donation"
              className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-saffron-600 via-amber-600 to-maroon-800 px-3 xl:px-3.5 py-2 text-xs xl:text-[13px] font-bold text-white shadow-md ring-1 ring-gold-300/50 transition-all hover:scale-105 hover:shadow-lg active:scale-95 shrink-0 whitespace-nowrap"
            >
              <Heart className="h-3.5 w-3.5 fill-gold-300 text-gold-300 animate-pulse" />
              <span>Donate</span>
              <span className="rounded-full bg-amber-400/30 px-1.5 py-0.2 text-[9.5px] font-extrabold text-amber-100 ring-1 ring-amber-300/40">
                80G
              </span>
            </Link>

            {/* Action CTA Button pointing to /how-to-reach */}
            <Link
              href="/how-to-reach"
              className="btn-festive btn-glow rounded-full px-3 xl:px-3.5 py-2 text-xs xl:text-[13px] font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98] shrink-0 whitespace-nowrap"
            >
              Visit Temple
            </Link>
          </div>

          {/* Mobile Search & Hamburger Actions */}
          <div className="flex items-center gap-1.5 xl:hidden shrink-0">
            <Link
              href="/trust#donation"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-saffron-600 via-amber-600 to-maroon-800 text-white shadow-md ring-1 ring-gold-300/50 transition-transform active:scale-95 shrink-0"
              aria-label="Donate via UPI & Bank"
            >
              <Heart className="h-4 w-4 fill-gold-300 text-gold-300 animate-pulse" />
            </Link>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-maroon-200 bg-white text-maroon-800 transition-colors hover:bg-cream-100 shadow-2xs cursor-pointer"
              aria-label="Search site"
            >
              <Search className="h-4 w-4 text-saffron-600" />
            </button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-maroon-200 bg-white text-maroon-800 transition-colors hover:bg-cream-100 shrink-0 shadow-2xs"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      <div aria-hidden className="divider-festive" />

      {/* Mobile Drawer Menu — backdrop starts below header bar so top bar is NEVER blurred */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 top-[60px] sm:top-[68px] z-30 bg-black/60 backdrop-blur-xs xl:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-40 overflow-hidden border-t border-maroon-100 bg-cream-50 shadow-2xl xl:hidden"
              aria-label="Mobile"
            >
              <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto px-4 py-4 space-y-2">
                {/* Mobile Search Quick Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl border border-maroon-200 bg-white px-3.5 py-2.5 text-left text-sm text-stone-500 hover:border-gold-400 hover:bg-amber-50/50 shadow-2xs transition-colors"
                >
                  <Search className="h-4 w-4 text-saffron-600 shrink-0" />
                  <span className="flex-1">Search pages, teachings, aartis...</span>
                  <span className="rounded bg-cream-100 px-1.5 py-0.5 text-[10px] font-mono text-stone-500 border border-stone-200">
                    ⌘K
                  </span>
                </button>

                {/* Home */}
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3.5 py-2.5 font-semibold text-[15px] ${
                    pathname === "/" ? "bg-saffron-500 text-white" : "text-maroon-900 bg-white/80 border border-maroon-100"
                  }`}
                >
                  Home
                </Link>

                {/* About Accordion */}
                <div className="rounded-xl border border-maroon-100 bg-white/80 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("about")}
                    className="flex w-full items-center justify-between px-3.5 py-2.5 text-left font-semibold text-[15px] text-maroon-900"
                  >
                    <span>About Sai Oracle</span>
                    <ChevronDown
                      className={`h-4 w-4 text-stone-400 transition-transform ${
                        mobileExpandedSection === "about" ? "rotate-180 text-saffron-600" : ""
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === "about" && (
                    <div className="divide-y divide-maroon-50 border-t border-maroon-100/60 bg-cream-50/60 px-2 py-1 text-sm">
                      <Link
                        href="/about"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        About Overview
                      </Link>
                      <Link
                        href="/about#overview"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Temple Overview
                      </Link>
                      <Link
                        href="/about#worship"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Temple Worship &amp; Aarti Timings
                      </Link>
                      <Link
                        href="/aims"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Aims &amp; Objectives
                      </Link>
                      <Link
                        href="/mission-karuna"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Mission Karuna
                      </Link>
                      <Link
                        href="/rules-regulations"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Rules &amp; Regulations
                      </Link>
                    </div>
                  )}
                </div>

                {/* Maa Accordion */}
                <div className="rounded-xl border border-maroon-100 bg-white/80 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("maa")}
                    className="flex w-full items-center justify-between px-3.5 py-2.5 text-left font-semibold text-[15px] text-maroon-900"
                  >
                    <span>Beloved Maa</span>
                    <ChevronDown
                      className={`h-4 w-4 text-stone-400 transition-transform ${
                        mobileExpandedSection === "maa" ? "rotate-180 text-saffron-600" : ""
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === "maa" && (
                    <div className="divide-y divide-maroon-50 border-t border-maroon-100/60 bg-cream-50/60 px-2 py-1 text-sm">
                      <Link
                        href="/gurumaa?tab=teachings"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700 font-medium"
                      >
                        Teachings of Maa
                      </Link>
                      <Link
                        href="/gurumaa?tab=meditation"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700 font-medium"
                      >
                        Maa on Meditation (Dhyana)
                      </Link>
                      <Link
                        href="/gurumaa?tab=discourses"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700 font-medium"
                      >
                        Divine Discourses
                      </Link>
                      <Link
                        href="/gurumaa?tab=life-sketch"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Maa Life Sketch
                      </Link>
                      <Link
                        href="/gurumaa?tab=miracles"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Miraculous Life of Maa
                      </Link>
                      <Link
                        href="/gurumaa"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        About Beloved Maa
                      </Link>
                    </div>
                  )}
                </div>

                {/* Temple Accordion */}
                <div className="rounded-xl border border-maroon-100 bg-white/80 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("temple")}
                    className="flex w-full items-center justify-between px-3.5 py-2.5 text-left font-semibold text-[15px] text-maroon-900"
                  >
                    <span>Temple &amp; Universe</span>
                    <ChevronDown
                      className={`h-4 w-4 text-stone-400 transition-transform ${
                        mobileExpandedSection === "temple" ? "rotate-180 text-saffron-600" : ""
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === "temple" && (
                    <div className="divide-y divide-maroon-50 border-t border-maroon-100/60 bg-cream-50/60 px-2 py-1 text-sm">
                      <Link
                        href="/universe"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700 font-semibold"
                      >
                        Universe of Divine Healing
                      </Link>
                      <Link
                        href="/about#overview"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Temple Overview
                      </Link>
                      <Link
                        href="/about#worship"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Aarti &amp; Worship Timings
                      </Link>
                      <Link
                        href="/how-to-reach"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Visit Temple &amp; How to Reach
                      </Link>
                    </div>
                  )}
                </div>

                {/* Trust Accordion */}
                <div className="rounded-xl border border-maroon-100 bg-white/80 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("trust")}
                    className="flex w-full items-center justify-between px-3.5 py-2.5 text-left font-semibold text-[15px] text-maroon-900"
                  >
                    <span>Charitable Trust (80G)</span>
                    <ChevronDown
                      className={`h-4 w-4 text-stone-400 transition-transform ${
                        mobileExpandedSection === "trust" ? "rotate-180 text-saffron-600" : ""
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === "trust" && (
                    <div className="divide-y divide-maroon-50 border-t border-maroon-100/60 bg-cream-50/60 px-2 py-1 text-sm">
                      <Link
                        href="/trust"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700 font-semibold"
                      >
                        Sri Sai Sansthan Trust
                      </Link>
                      <Link
                        href="/trust#contribution"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700 font-medium"
                      >
                        Contribution &amp; 80G Tax Exemption
                      </Link>
                      <Link
                        href="/trust#donation"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        UPI QR &amp; Bank Transfer
                      </Link>
                      <Link
                        href="/mission-karuna"
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-stone-700 hover:text-saffron-700"
                      >
                        Mission Karuna Seva
                      </Link>
                    </div>
                  )}
                </div>

                {/* Media Link */}
                <Link
                  href="/gallery"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3.5 py-2.5 font-semibold text-[15px] ${
                    pathname === "/gallery" ? "bg-saffron-500 text-white" : "text-maroon-900 bg-white/80 border border-maroon-100"
                  }`}
                >
                  Media &amp; Gallery
                </Link>

                {/* Social Link */}
                <Link
                  href="/social"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3.5 py-2.5 font-semibold text-[15px] ${
                    pathname === "/social" ? "bg-saffron-500 text-white" : "text-maroon-900 bg-white/80 border border-maroon-100"
                  }`}
                >
                  Social Channels
                </Link>

                {/* Contact Link */}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-3.5 py-2.5 font-semibold text-[15px] ${
                    pathname === "/contact" ? "bg-saffron-500 text-white" : "text-maroon-900 bg-white/80 border border-maroon-100"
                  }`}
                >
                  Contact Us
                </Link>

                {/* Mobile CTA */}
                <div className="pt-2">
                  <Link
                    href="/how-to-reach"
                    onClick={() => setMobileOpen(false)}
                    className="btn-festive block w-full rounded-xl py-3 text-center font-bold text-white shadow-md"
                  >
                    Visit Temple &amp; Directions
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
