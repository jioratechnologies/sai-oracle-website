"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface MenuContextValue {
  active: string | null;
  openItem: (item: string) => void;
  closeItemWithDelay: () => void;
  cancelClose: () => void;
  closeImmediately: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

/**
 * Top-level Menu provider for desktop navigation.
 * Manages active state, hover transitions, and click-outside dismissal.
 */
export const Menu = ({
  setActive: externalSetActive,
  children,
  className = "",
  delayMs = 160,
}: {
  setActive?: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) => {
  const [internalActive, setInternalActive] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const active = internalActive;

  const setActive = useCallback(
    (item: string | null) => {
      setInternalActive(item);
      externalSetActive?.(item);
    },
    [externalSetActive]
  );

  const cancelClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const openItem = useCallback(
    (item: string) => {
      cancelClose();
      setActive(item);
    },
    [cancelClose, setActive]
  );

  const closeItemWithDelay = useCallback(() => {
    cancelClose();
    timeoutRef.current = setTimeout(() => {
      setActive(null);
    }, delayMs);
  }, [cancelClose, delayMs, setActive]);

  const closeImmediately = useCallback(() => {
    cancelClose();
    setActive(null);
  }, [cancelClose, setActive]);

  // Dismiss on Escape key or clicking outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeImmediately();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeImmediately();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
      cancelClose();
    };
  }, [closeImmediately, cancelClose]);

  return (
    <MenuContext.Provider
      value={{
        active,
        openItem,
        closeItemWithDelay,
        cancelClose,
        closeImmediately,
      }}
    >
      <nav
        ref={navRef}
        onMouseLeave={closeItemWithDelay}
        onMouseEnter={cancelClose}
        className={`relative flex items-center gap-1 ${className}`}
        aria-label="Primary"
      >
        {children}
      </nav>
    </MenuContext.Provider>
  );
};

/**
 * Individual MenuItem: handles hover triggers, active states,
 * and renders an isolated dropdown popover with zero cross-bleeding.
 */
export const MenuItem = ({
  setActive: propSetActive,
  active: propActive,
  item,
  children,
  href,
  align = "center",
  isSelected = false,
}: {
  setActive?: (item: string | null) => void;
  active?: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
  align?: "left" | "center" | "right";
  isSelected?: boolean;
}) => {
  const ctx = useContext(MenuContext);
  const active = ctx ? ctx.active : propActive;
  const isOpen = active === item;

  const onMouseEnter = () => {
    if (children) {
      if (ctx) ctx.openItem(item);
      else propSetActive?.(item);
    } else {
      if (ctx) ctx.closeImmediately();
      else propSetActive?.(null);
    }
  };

  const onMouseLeave = () => {
    if (children && ctx) {
      ctx.closeItemWithDelay();
    }
  };

  const alignClass =
    align === "left"
      ? "left-0"
      : align === "right"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      {href && !children ? (
        <Link
          href={href}
          onClick={() => {
            ctx?.closeImmediately();
            propSetActive?.(null);
          }}
          className={`relative z-10 flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[13px] xl:text-[14px] font-semibold transition-colors ${
            isSelected
              ? "bg-saffron-100/95 text-saffron-800 font-bold shadow-2xs ring-1 ring-saffron-400/60"
              : "text-maroon-900 hover:bg-cream-100/90 hover:text-saffron-700"
          }`}
        >
          <span>{item}</span>
          {isSelected && (
            <span
              aria-hidden
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full bg-saffron-600"
            />
          )}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => {
            if (isOpen) {
              ctx ? ctx.closeImmediately() : propSetActive?.(null);
            } else {
              ctx ? ctx.openItem(item) : propSetActive?.(item);
            }
          }}
          aria-expanded={isOpen}
          className={`group relative z-10 flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[13px] xl:text-[14px] font-semibold transition-colors cursor-pointer ${
            isSelected
              ? "bg-saffron-100/95 text-saffron-800 font-bold shadow-2xs ring-1 ring-saffron-400/60"
              : isOpen
              ? "bg-saffron-50/95 text-saffron-700 shadow-2xs ring-1 ring-saffron-300/60"
              : "text-maroon-900 hover:bg-cream-100/90 hover:text-saffron-700"
          }`}
        >
          <span>{item}</span>
          {children && (
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                isOpen
                  ? "rotate-180 text-saffron-600"
                  : isSelected
                  ? "text-saffron-700"
                  : "text-stone-400 group-hover:text-saffron-600"
              }`}
            />
          )}
          {isSelected && (
            <span
              aria-hidden
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full bg-saffron-600"
            />
          )}
        </button>
      )}

      {/* Dropdown Popover (Independently rendered per item with NO shared layoutId) */}
      <AnimatePresence mode="wait">
        {isOpen && children && (
          <div
            key={`dropdown-${item}`}
            onMouseEnter={() => ctx?.cancelClose()}
            onMouseLeave={() => ctx?.closeItemWithDelay()}
            className={`absolute top-full pt-2 z-50 pointer-events-auto ${alignClass}`}
          >
            {/* Invisible hover bridge spanning between trigger button and menu card */}
            <div
              aria-hidden
              className="absolute -top-2 inset-x-0 h-4 bg-transparent pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-gold-300/80 bg-cream-50/98 p-4 text-stone-800 shadow-[0_20px_50px_rgba(40,10,15,0.18)] backdrop-blur-md ring-1 ring-black/5"
            >
              {/* Top festive decorative accent bar */}
              <div
                aria-hidden
                className="absolute inset-x-4 top-0 h-1 rounded-b-full divider-festive"
              />
              <div className="w-max max-w-[620px] pt-1">{children}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  badge?: string;
}) => {
  const ctx = useContext(MenuContext);

  return (
    <Link
      href={href}
      onClick={() => ctx?.closeImmediately()}
      className="group flex gap-3.5 rounded-2xl border border-maroon-100/80 bg-white p-2.5 transition-all hover:-translate-y-0.5 hover:border-saffron-400 hover:shadow-md"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-maroon-100 bg-maroon-950/10">
        <Image
          src={src}
          alt={title}
          fill
          sizes="112px"
          unoptimized={src.endsWith(".gif")}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute top-1 left-1 rounded-sm bg-saffron-600/90 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase backdrop-blur-2xs">
            {badge}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <h4 className="font-display text-sm font-bold text-maroon-900 group-hover:text-saffron-700 transition-colors">
          {title}
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-stone-500 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  href,
  className = "",
  description,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  description?: string;
  [key: string]: unknown;
}) => {
  const ctx = useContext(MenuContext);

  return (
    <Link
      href={href}
      onClick={() => ctx?.closeImmediately()}
      className={`group block rounded-xl p-2 transition-colors hover:bg-cream-100/80 ${className}`}
      {...rest}
    >
      <span className="block text-[14px] font-semibold text-maroon-900 group-hover:text-saffron-700 transition-colors">
        {children}
      </span>
      {description && (
        <span className="block text-[12px] text-stone-500 line-clamp-1 mt-0.5">
          {description}
        </span>
      )}
    </Link>
  );
};
