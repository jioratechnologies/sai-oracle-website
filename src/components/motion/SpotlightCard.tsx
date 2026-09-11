"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Aceternity-style card: a soft radial spotlight tracks the cursor,
 * and the card lifts slightly with a spring on hover. Falls back to a
 * plain static card on touch devices (no pointer to track).
 */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ref.current!.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`spotlight-card group relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="spotlight-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      />
      {children}
    </motion.div>
  );
}
