"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Tag = "h1" | "h2" | "p" | "span";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/** Aceternity-style "text generate" reveal — each word fades/lifts in with a stagger. */
export default function TextReveal({
  text,
  as = "span",
  className = "",
  delay = 0,
  wordClassName = "",
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  wordClassName?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    if (as === "h1") return <h1 className={className}>{text}</h1>;
    if (as === "h2") return <h2 className={className}>{text}</h2>;
    if (as === "p") return <p className={className}>{text}</p>;
    return <span className={className}>{text}</span>;
  }

  // The joining space must be a plain text sibling, not part of an
  // inline-block span — inline-block trims trailing whitespace inside
  // itself, which would otherwise glue every word together.
  const content = words.map((w, i) => (
    <span key={i}>
      <motion.span
        className={`inline-block ${wordClassName}`}
        variants={word}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {w}
      </motion.span>
      {i < words.length - 1 ? " " : ""}
    </span>
  ));

  const props = {
    className,
    initial: "hidden" as const,
    animate: "show" as const,
    variants: container,
    transition: { delayChildren: delay },
  };

  if (as === "h1") return <motion.h1 {...props}>{content}</motion.h1>;
  if (as === "h2") return <motion.h2 {...props}>{content}</motion.h2>;
  if (as === "p") return <motion.p {...props}>{content}</motion.p>;
  return <motion.span {...props}>{content}</motion.span>;
}
