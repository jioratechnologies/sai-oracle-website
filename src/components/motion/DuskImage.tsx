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
}) {
  const prefersReduce = useReducedMotion();
  // Gate on mount so server HTML and the first client render agree.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const reduce = mounted && prefersReduce;

  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={optimizedImageUrl(src, 828)} alt={alt} className={`h-full w-full ${imageClassName} ${className}`} draggable={false} />;
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <div className={`h-full w-full ${ambient ? "dusk-ambient" : ""}`}>
        <motion.img
          key={src}
          src={optimizedImageUrl(src, 828)}
          alt={alt}
          draggable={false}
          className={`h-full w-full ${imageClassName}`}
          initial={{
            opacity: 0.35,
            scale: 1.08,
            filter: "blur(22px) brightness(0.55) saturate(1.15)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1) saturate(1)",
          }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {veil && (
        <motion.div
          aria-hidden
          key={`veil-${src}`}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_90%_at_50%_20%,rgb(246_220_154/0.55),rgb(247_127_0/0.25)_55%,transparent_85%)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />
      )}
    </div>
  );
}
