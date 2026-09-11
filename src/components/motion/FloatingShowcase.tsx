"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DuskImage from "./DuskImage";

/**
 * Frameless floating murti — no ring, no rectangle. The photo is cut
 * to a temple-arch silhouette with a faint golden rim echo, a soft
 * floor reflection and a gentle hover bob, plus 3D cursor tilt on
 * hover-capable devices. Touch users get swipe + autoplay + ambient
 * drift instead — nothing here needs a mouse to feel alive.
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
      {/* Soft aura pooling under the murti */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-1/4 bottom-0 rounded-t-full bg-[radial-gradient(closest-side,rgb(232_201_106/0.35),rgb(247_127_0/0.12)_60%,transparent_75%)] blur-2xl"
      />
      <motion.div
        className="relative"
        style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      >
        <div className={reduce ? "relative" : "float-bob relative"}>
          {/* Faint golden rim echo — aura, not a container */}
          <div
            aria-hidden
            className="absolute -inset-2 rounded-t-full rounded-b-[2rem] border-2 border-gold-200/25"
          />
          <div
            className="relative overflow-hidden rounded-t-full rounded-b-[1.75rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.65)]"
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
