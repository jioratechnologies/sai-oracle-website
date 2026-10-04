"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { optimizedImageUrl } from "@/lib/image";

/**
 * "Dusk" image reveal — the photo emerges as if dawn is breaking:
 * starts deep in blur + shadow with a warm golden veil, then softens
 * into full clarity. Purely time-based (no mouse needed), so mobile
 * users get the same delight as desktop.
 *
 * An optional slow Ken Burns drift keeps the framed photo alive
 * without any interaction.
 */
export default function DuskImage({
  src,
  alt,
  className = "",
  imageClassName = "object-cover",
  ambient = true,
  veil = true,
  autoFit = false,
}: {
  src: string;
  alt: string;
  /** Root container sizing/shape — parent frame supplies aspect. */
  className?: string;
  /** object-fit/position for the photo, e.g. focus the top on crops. */
  imageClassName?: string;
  /** Slow ambient drift (disabled automatically for reduced motion). */
  ambient?: boolean;
  /** Warm dawn veil that lifts as the photo sharpens. */
  veil?: boolean;
  /** Landscape photos in a taller frame: show whole photo over a blurred copy instead of cropping. */
  autoFit?: boolean;
}) {
  const prefersReduce = useReducedMotion();
  // Gate on mount so server HTML and the first client render agree.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const reduce = mounted && prefersReduce;
  const [landscape, setLandscape] = useState(false);
  const detectLandscape = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!autoFit) return;
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    setLandscape(w > 0 && w / h > 1.1);
  };
  const checkCached = (el: HTMLImageElement | null) => {
    if (autoFit && el && el.complete && el.naturalWidth > 0) {
      const next = el.naturalWidth / el.naturalHeight > 1.1;
      setLandscape((prev) => (prev === next ? prev : next));
    }
  };
  const fitClass = autoFit && landscape ? "object-contain object-center" : imageClassName;
  const backdrop = autoFit && landscape ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      aria-hidden
      src={optimizedImageUrl(src, 640, 75)}
      alt=""
      className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl"
      draggable={false}
    />
  ) : null;

  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {backdrop}
      <img
        src={optimizedImageUrl(src, 1200, 75)}
        ref={checkCached}
        onLoad={detectLandscape}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== src) target.src = src;
        }}
        alt={alt}
        className={`relative h-full w-full ${fitClass}`}
        draggable={false}
      />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {backdrop}
      <div className={`relative h-full w-full ${ambient ? "dusk-ambient" : ""}`}>
        <motion.img
          key={src}
          src={optimizedImageUrl(src, 1200, 75)}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== src) {
              target.src = src;
            }
          }}
          alt={alt}
          draggable={false}
          ref={checkCached}
        onLoad={detectLandscape}
          className={`h-full w-full ${fitClass}`}
          initial={{
            opacity: 0.85,
            scale: 1.02,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
