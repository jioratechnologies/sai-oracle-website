"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  src: string;
  alt?: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // in ms
  maxAnimationDelay?: number; // in ms
  colorRevealDelay?: number; // in ms
  /** Root container sizing/shape — overrides the default fixed square. */
  className?: string;
  /** object-fit + any extra classes for each piece's <img>; include object-cover/object-contain here. */
  imageClassName?: string;
}

/**
 * Magic UI's "Pixel Image": reveals a photo as a mosaic of pieces that
 * fade in with staggered delays, optionally desaturating first and
 * blooming into color. Used in place of a bare spinner/placeholder
 * wherever a real photo is the thing worth waiting for.
 */
export const PixelImage = ({
  src,
  alt = "",
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
  imageClassName = "object-cover",
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);
  // Random per-piece delays must be generated client-side only, after
  // mount — computing them during render would make the SSR-rendered
  // delays differ from the client's first render and trip a hydration
  // mismatch (React would flag every one of these style attributes).
  const [delays, setDelays] = useState<number[] | null>(null);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false;
      const { rows, cols } = grid;
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      );
    };

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);

  useEffect(() => {
    const total = rows * cols;
    // Deferred to a frame callback (rather than set directly in the
    // effect body) so the browser commits the "hidden" paint first and
    // genuinely transitions to "visible", instead of both states
    // landing in the same frame.
    const frame = requestAnimationFrame(() => {
      setDelays(Array.from({ length: total }, () => Math.random() * maxAnimationDelay));
      setIsVisible(true);
    });
    const colorTimeout = setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(colorTimeout);
    };
  }, [rows, cols, maxAnimationDelay, colorRevealDelay]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`;

      return { clipPath };
    });
  }, [rows, cols]);

  return (
    <div className={cn("relative select-none", className || "h-72 w-72 md:h-96 md:w-96")}>
      {pieces.map((piece, index) => (
        <div
          key={index}
          aria-hidden={index > 0}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0",
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${delays?.[index] ?? 0}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={index === 0 ? alt : ""}
            className={cn(
              "h-full w-full",
              imageClassName,
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale"),
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};
