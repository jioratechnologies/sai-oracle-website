"use client";

import { motion, useReducedMotion } from "framer-motion";

const BLOBS = [
  { color: "var(--color-saffron-400)", size: 340, top: "-10%", left: "8%", dur: 16 },
  { color: "var(--color-gulal-500)", size: 300, top: "5%", left: "70%", dur: 20 },
  { color: "var(--color-peacock-400)", size: 280, top: "60%", left: "20%", dur: 18 },
  { color: "var(--color-gold-400)", size: 260, top: "65%", left: "78%", dur: 22 },
];

/** Slow-drifting blurred color blobs — an animated "aurora" wash for dark hero sections. */
export default function AuroraBlobs({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-30 blur-3xl mix-blend-screen"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.color,
          }}
          animate={
            reduce
              ? undefined
              : {
                  x: [0, 40, -20, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.15, 0.95, 1],
                }
          }
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
