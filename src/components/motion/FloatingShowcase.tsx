"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DuskImage from "./DuskImage";

/**
 * Frameless floating murti — no ring, no rectangle. The photo is cut
 * to a temple-arch silhouette dressed for the light festive theme: a
 * marigold aura, double gold-saffron arch outline, and a kalash-style
 * Om finial crowning the top — plus a soft floor reflection and gentle
 * hover bob, with 3D cursor tilt on hover-capable devices. Touch users
 * get swipe + autoplay + ambient drift instead.
 */
export default function FloatingShowcase({
  src,
  alt,
  className = "",
  imageClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  /** object-fit/position for the photo, e.g. focus the top on mobile crops. */
  imageClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Read after mount so server HTML and the first client render agree.
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  const tilt = canHover && !reduce;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={tilt ? onMouseMove : undefined}
      onMouseLeave={tilt ? onMouseLeave : undefined}
      className={`relative ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Marigold aura pooling behind + under the murti */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-t-full bg-[radial-gradient(closest-side,rgb(255_200_90/0.55),rgb(247_127_0/0.22)_60%,transparent_78%)] blur-2xl"
      />
      {/* Kalash-style Om finial crowning the arch */}
      <div
        aria-hidden
        className="absolute -top-5 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-gulal-500 font-display text-xl text-white shadow-lg ring-2 ring-white"
      >
        ॐ
      </div>
      <motion.div
        className="relative"
        style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      >
        <div className={reduce ? "relative" : "float-bob relative"}>
          {/* Double festive arch outline — gold rim + offset saffron echo */}
          <div
            aria-hidden
            className="absolute -inset-2 rounded-t-full rounded-b-[2rem] border-2 border-gold-400/70"
          />
          <div
            aria-hidden
            className="absolute -inset-4 rounded-t-full rounded-b-[2.5rem] border border-saffron-400/40"
          />
          <div
            className="relative overflow-hidden rounded-t-full rounded-b-[1.75rem] shadow-[0_35px_60px_-15px_rgba(194,42,62,0.30)]"
            style={
              {
                WebkitBoxReflect:
                  "below 4px linear-gradient(transparent 68%, rgba(255,235,190,0.20))",
              } as React.CSSProperties
            }
          >
            <DuskImage
              key={src}
              src={src}
              alt={alt}
              imageClassName={imageClassName || "object-cover"}
              className="aspect-[3/4] w-full sm:aspect-736/1298"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
