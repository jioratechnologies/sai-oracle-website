"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * A transparent deity cutout that floats in place, gently bobbing, and
 * tilts in 3D toward the cursor — the "idol hologram" effect used on
 * the hero and the deities showcase. Falls back to a static float with
 * no tilt/parallax when the visitor prefers reduced motion.
 */
export default function TiltFloat({
  src,
  alt,
  glow = "var(--color-saffron-400)",
  className = "",
  bobDelay = 0,
}: {
  src: string;
  alt: string;
  glow?: string;
  className?: string;
  bobDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 18 });

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
      onMouseMove={reduce ? undefined : onMouseMove}
      onMouseLeave={reduce ? undefined : onMouseLeave}
      className={`relative ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: bobDelay }}
      >
        <motion.div
          className="relative h-full w-full"
          style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div
            aria-hidden
            className="absolute inset-6 rounded-full opacity-70 blur-3xl"
            style={{ background: glow }}
          />
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="relative h-full w-full object-contain select-none"
            style={{ filter: "drop-shadow(0 25px 35px rgb(0 0 0 / 0.45))" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
