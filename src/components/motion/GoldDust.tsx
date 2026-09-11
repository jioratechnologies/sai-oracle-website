"use client";

const DUST = [
  { left: "4%", size: 3, dur: 11, delay: 0 },
  { left: "9%", size: 2, dur: 13, delay: 1.4 },
  { left: "15%", size: 4, dur: 10, delay: 3.1 },
  { left: "22%", size: 2, dur: 14, delay: 0.8 },
  { left: "30%", size: 3, dur: 12, delay: 5.2 },
  { left: "37%", size: 2, dur: 9, delay: 2.2 },
  { left: "44%", size: 4, dur: 13, delay: 4.4 },
  { left: "51%", size: 2, dur: 11, delay: 1.1 },
  { left: "58%", size: 3, dur: 14, delay: 3.8 },
  { left: "65%", size: 2, dur: 10, delay: 0.4 },
  { left: "71%", size: 4, dur: 12, delay: 2.9 },
  { left: "78%", size: 2, dur: 13, delay: 5.6 },
  { left: "84%", size: 3, dur: 9, delay: 1.9 },
  { left: "90%", size: 2, dur: 12, delay: 4.1 },
  { left: "95%", size: 3, dur: 11, delay: 0.2 },
  { left: "55%", size: 2, dur: 15, delay: 6.4 },
];

/**
 * Rising gold-dust embers for dark sacred backdrops. Positions and
 * timings are fixed constants (never Math.random) so server and
 * client render identically. Hidden under reduced motion.
 */
export default function GoldDust({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {DUST.map((p, i) => (
        <span
          key={i}
          className="gold-dust-particle absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-8px",
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
