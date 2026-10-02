import type { ShowcaseSlide } from "./types";

/**
 * Built-in homepage hero slides, used when `public/showcase/` holds no
 * photos (see `lib/showcase.ts`). Lives outside HeroCarousel.tsx (a
 * "use client" component) so server components — like `app/page.tsx`,
 * which resolves `src` through `getMediaMap()` — can import it too.
 */
export const DEFAULT_SLIDES: ShowcaseSlide[] = [
  {
    src: "/assets/content/slider/20240826_211758.webp",
    tag: "Temple Sanctum",
    caption: "Satyadeep Sai Temple — Abode of Peace & Light",
    focus: "top",
    href: "/universe",
  },
  {
    src: "/assets/content/slider/20251119_215106.webp",
    tag: "Divine Darshan",
    caption: "Worship & Aartis at Bhagwan's Lotus Feet",
    focus: "center",
    href: "/about#worship",
  },
  {
    src: "/assets/content/maa/1.webp",
    tag: "Our Guide",
    caption: "Maa — Our Guiding Light & Compassion",
    focus: "top",
    href: "/gurumaa?tab=life-sketch",
  },
  {
    src: "/assets/content/home/mg-9197.jpg",
    tag: "Divine Avatars",
    caption: "The Trinity of Sai Avatars — Shirdi, Satya & Prema Sai",
    focus: "center",
    href: "/#deities",
  },
  {
    src: "/assets/content/universe/sai_baba4_b.webp",
    tag: "Bhagwan Sri Sathya Sai",
    caption: "Bhagwan Sri Sathya Sai Baba — Love All, Serve All",
    focus: "top",
  },
  {
    src: "/assets/content/slider/mata-rani-krishna.webp",
    tag: "Sacred Shrines",
    caption: "Mata Rani and Sri Radha-Krishna Sanctum",
    focus: "center",
  },
  {
    src: "/assets/content/slider/hanuman-ji.webp",
    tag: "Sanctum",
    caption: "Sri Hanuman Ji and Divine Deities",
    focus: "center",
  },
];
