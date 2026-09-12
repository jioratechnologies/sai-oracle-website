import type { ShowcaseSlide } from "./types";

/**
 * Built-in homepage hero slides, used when `public/showcase/` holds no
 * photos (see `lib/showcase.ts`). Lives outside HeroCarousel.tsx (a
 * "use client" component) so server components — like `app/page.tsx`,
 * which resolves `src` through `getMediaMap()` — can import it too.
 */
export const DEFAULT_SLIDES: ShowcaseSlide[] = [
  {
    src: "/legacy/home/Pujniye_maa.webp",
    tag: "Our Guide",
    caption: "Pujniye Maa — Our Guiding Light",
    focus: "top",
    href: "/experiences",
  },
  {
    src: "/assets/deities-png/sai-baba-throne-gold.webp",
    tag: "Shirdi Sai",
    caption: "Shirdi Sai Baba — Sabka Malik Ek",
    focus: "top",
  },
  {
    src: "/assets/deities-png/sai-baba-throne-pink.webp",
    tag: "Shirdi Sai",
    caption: "Sai Baba, enthroned in gold and grace",
    focus: "top",
  },
  {
    src: "/assets/temple/god/4.webp",
    tag: "Sanctum",
    caption: "Baba's murti in the temple sanctum",
    focus: "top",
  },
  {
    src: "/assets/temple/god/1.webp",
    tag: "Sanctum",
    caption: "Darshan of Baba in the marble sanctum",
    focus: "top",
  },
  {
    src: "/assets/temple/god/2.webp",
    tag: "Sanctum",
    caption: "Garlanded murti of Sai Baba",
    focus: "top",
  },
  {
    src: "/assets/temple/god/3.webp",
    tag: "Sanctum",
    caption: "The sanctum, bathed in morning light",
    focus: "top",
  },
  {
    src: "/assets/temple/god/6.webp",
    tag: "Trinity",
    caption: "Trinity of Sai Avatars, with Hanuman",
    focus: "top",
  },
  {
    src: "/assets/deities-png/sathya-sai-baba-collage.webp",
    tag: "Satya Sai",
    caption: "Bhagwan Satya Sai Baba",
    focus: "top",
  },
  {
    src: "/assets/events/20241123_191422.webp",
    tag: "Temple Life",
    caption: "Havan and seva with devotees",
    focus: "center",
  },
];
