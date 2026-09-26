"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  CornerDownLeft,
  Sparkles,
  BookOpen,
  Clock,
  Heart,
  Flame,
  Layers,
  Compass,
  Video,
  ShieldCheck,
} from "lucide-react";
import { SEARCH_INDEX, type SearchItem } from "@/lib/searchIndex";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "All",
  "Beloved Maa",
  "Worship & Timings",
  "Trust & 80G",
  "Temple & Sanctum",
  "About & Foundation",
  "Media & Social",
] as const;

type FilterCategory = (typeof CATEGORIES)[number];

const POPULAR_SEARCHES = [
  { label: "Aarti Timings", query: "aarti", category: "Worship & Timings" },
  { label: "Teachings of Maa", query: "teachings", category: "Beloved Maa" },
  { label: "Maa on Meditation", query: "meditation", category: "Beloved Maa" },
  { label: "Discourses Archives", query: "discourses", category: "Beloved Maa" },
  { label: "Donate / 80G Tax", query: "donate", category: "Trust & 80G" },
  { label: "Sarva Dharma Sthal", query: "sarva dharma", category: "About & Foundation" },
  { label: "Temple Darshan & Aartis", query: "darshan", category: "Temple & Sanctum" },
  { label: "How to Reach Meerut", query: "reach", category: "About & Foundation" },
];

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Prevent background scrolling while modal is open (Scroll Lock)
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Auto-focus input and reset state on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedCategory("All");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          const trigger = document.getElementById("global-search-trigger");
          trigger?.click();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, onClose]);

  // Filter & rank results with fuzzy keyword weighting
  const filteredResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    const terms = cleanQuery.split(/\s+/).filter(Boolean);

    let items = SEARCH_INDEX;
    if (selectedCategory !== "All") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (!cleanQuery) {
      return items.slice(0, selectedCategory === "All" ? 7 : 14);
    }

    return items
      .map((item) => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const descLower = item.description.toLowerCase();
        const categoryLower = item.category.toLowerCase();
        const keywords = item.keywords;

        // Exact match boosts
        if (titleLower === cleanQuery) score += 120;
        else if (titleLower.startsWith(cleanQuery)) score += 70;
        else if (titleLower.includes(cleanQuery)) score += 45;

        for (const term of terms) {
          if (titleLower.includes(term)) score += 25;
          if (keywords.some((k) => k.includes(term))) score += 20;
          if (descLower.includes(term)) score += 10;
          if (categoryLower.includes(term)) score += 8;
        }

        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }, [query, selectedCategory]);

  // Reset selected index when query or category changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Scroll active item into view
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const handleSelect = useCallback(
    (url: string) => {
      onClose();
      router.push(url);
    },
    [onClose, router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length ? (prev + 1) % filteredResults.length : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length
          ? (prev - 1 + filteredResults.length) % filteredResults.length
          : 0,
      );
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex].url);
    }
  };

  const getCategoryTheme = (category: SearchItem["category"]) => {
    switch (category) {
      case "Beloved Maa":
        return {
          icon: <Sparkles className="h-4 w-4" />,
          bg: "bg-saffron-50 border-saffron-200 text-saffron-700",
          pill: "bg-saffron-100 text-saffron-800",
        };
      case "Worship & Timings":
        return {
          icon: <Clock className="h-4 w-4" />,
          bg: "bg-amber-50 border-amber-200 text-amber-700",
          pill: "bg-amber-100 text-amber-800",
        };
      case "Trust & 80G":
        return {
          icon: <Heart className="h-4 w-4" />,
          bg: "bg-rose-50 border-rose-200 text-rose-700",
          pill: "bg-rose-100 text-rose-800",
        };
      case "Temple & Sanctum":
        return {
          icon: <Flame className="h-4 w-4" />,
          bg: "bg-orange-50 border-orange-200 text-orange-700",
          pill: "bg-orange-100 text-orange-800",
        };
      case "Media & Social":
        return {
          icon: <Video className="h-4 w-4" />,
          bg: "bg-peacock-50 border-peacock-200 text-peacock-700",
          pill: "bg-peacock-100 text-peacock-800",
        };
      default:
        return {
          icon: <Compass className="h-4 w-4" />,
          bg: "bg-stone-50 border-stone-200 text-stone-700",
          pill: "bg-stone-100 text-stone-700",
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-12 sm:p-6 sm:pt-16 overscroll-contain">
          {/* Neutral Dark Backdrop (Clean Black, NO red tint) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Redesigned Search Dialog Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl lg:max-w-4xl overflow-hidden rounded-3xl border-2 border-gold-300/80 bg-linear-to-b from-[#fdfbf7] via-cream-50 to-[#fdfaf5] shadow-[0_25px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Festive Gradient Bar */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 divider-festive" />

            {/* Search Input Bar */}
            <div className="relative flex items-center gap-3.5 border-b border-maroon-100/80 px-4.5 py-4 sm:px-6 sm:py-5 bg-white/70">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-saffron-600 ring-1 ring-amber-500/20 shadow-2xs">
                <Search className="h-5 w-5" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search teachings, aartis, meditation, trust, seva, timings..."
                className="w-full bg-transparent text-base sm:text-xl font-medium text-maroon-950 placeholder-stone-400 outline-none"
              />

              <div className="flex items-center gap-2 shrink-0">
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
                    title="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 rounded-xl border border-stone-200/90 bg-stone-100/80 px-2.5 py-1 text-xs font-semibold text-stone-600 hover:bg-stone-200 hover:text-maroon-950 transition-colors cursor-pointer"
                  title="Close modal (Esc)"
                >
                  <kbd className="font-mono text-[11px]">ESC</kbd>
                </button>
              </div>
            </div>

            {/* Category Filter Chips Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-maroon-100/70 bg-stone-50/70 px-4 py-2.5 sm:px-6 scrollbar-none">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 mr-1 shrink-0">
                Filter:
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-maroon-900 text-white shadow-xs"
                        : "bg-white/90 text-stone-600 hover:bg-white hover:text-maroon-900 border border-maroon-100"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Results / Suggestions Container */}
            <div className="max-h-[58vh] overflow-y-auto overscroll-contain p-3 sm:p-5">
              {query.trim() === "" && selectedCategory === "All" && (
                /* Popular Search Shortcuts when input is untouched */
                <div className="mb-4 rounded-2xl border border-gold-200/70 bg-amber-50/40 p-3.5 sm:p-4">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Sparkles className="h-3.5 w-3.5 text-saffron-600" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-saffron-800">
                      Frequently Searched by Devotees
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          setQuery(item.query);
                          inputRef.current?.focus();
                        }}
                        className="group flex items-center gap-1.5 rounded-full border border-gold-300/80 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs hover:border-saffron-400 hover:bg-amber-50 hover:text-maroon-950 transition-all cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="h-3 w-3 text-saffron-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Items List */}
              {filteredResults.length > 0 ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-2 pb-1 text-[11px] font-semibold text-stone-600">
                    <span>
                      {query.trim()
                        ? `Found ${filteredResults.length} matching result${
                            filteredResults.length > 1 ? "s" : ""
                          }`
                        : `Showing ${filteredResults.length} quick access entries`}
                    </span>
                    {selectedCategory !== "All" && (
                      <span className="text-saffron-700 font-bold">
                        Category: {selectedCategory}
                      </span>
                    )}
                  </div>

                  {filteredResults.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    const theme = getCategoryTheme(item.category);

                    return (
                      <div
                        key={item.id}
                        ref={(el) => {
                          itemRefs.current[index] = el;
                        }}
                        onClick={() => handleSelect(item.url)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`group flex cursor-pointer items-center justify-between rounded-2xl p-3 sm:p-3.5 transition-all ${
                          isSelected
                            ? "bg-linear-to-r from-saffron-100/90 via-amber-50 to-white ring-2 ring-saffron-400/90 shadow-md translate-x-0.5"
                            : "bg-white/60 hover:bg-white/95 border border-maroon-100/60 hover:border-gold-300/80 hover:shadow-xs"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0 pr-3">
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-2xs transition-transform group-hover:scale-105 ${theme.bg}`}
                          >
                            {theme.icon}
                          </span>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-display text-sm sm:text-[15px] font-bold text-maroon-950 truncate">
                                {item.title}
                              </h4>
                              {item.badge && (
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0 ${theme.pill}`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <span className="hidden sm:inline-block rounded-md bg-stone-100 px-1.5 py-0.2 text-[10px] font-mono text-stone-600">
                                {item.url}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-stone-600 line-clamp-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <span
                            className={`hidden md:inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium border ${theme.bg}`}
                          >
                            {item.category}
                          </span>

                          <span
                            className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                              isSelected
                                ? "bg-saffron-600 text-white shadow-xs"
                                : "bg-stone-100 text-stone-500 opacity-60 group-hover:opacity-100"
                            }`}
                          >
                            <span className="hidden sm:inline">Go</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* No Results Found View */
                <div className="py-12 text-center space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-inner">
                    <Search className="h-7 w-7" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-maroon-950">
                    No results found for &ldquo;{query}&rdquo;
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                    We couldn&apos;t find any pages or teachings matching your query in{" "}
                    {selectedCategory !== "All" ? `"${selectedCategory}"` : "the temple index"}.
                  </p>
                  <div className="pt-2 flex justify-center gap-2">
                    {selectedCategory !== "All" && (
                      <button
                        type="button"
                        onClick={() => setSelectedCategory("All")}
                        className="rounded-full bg-saffron-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-saffron-700 transition-colors"
                      >
                        Search All Categories
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="rounded-full border border-maroon-200 bg-white px-4 py-1.5 text-xs font-bold text-maroon-900 hover:bg-cream-100 transition-colors"
                    >
                      Reset Query
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Command Bar Footer */}
            <div className="border-t border-maroon-100/80 bg-stone-100/80 px-4 py-3 sm:px-6 text-[11px] text-stone-500 flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-stone-300 bg-white px-1.5 py-0.5 font-mono shadow-2xs">
                    ↑
                  </kbd>
                  <kbd className="rounded border border-stone-300 bg-white px-1.5 py-0.5 font-mono shadow-2xs">
                    ↓
                  </kbd>{" "}
                  to navigate
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-stone-300 bg-white px-1.5 py-0.5 font-mono shadow-2xs">
                    <CornerDownLeft className="h-2.5 w-2.5 inline" /> Enter
                  </kbd>{" "}
                  to open
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-stone-300 bg-white px-1.5 py-0.5 font-mono shadow-2xs">
                    Esc
                  </kbd>{" "}
                  to exit
                </span>
              </div>
              <span className="font-semibold text-saffron-800 hidden sm:inline">
                Sai Oracle Command Center
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
