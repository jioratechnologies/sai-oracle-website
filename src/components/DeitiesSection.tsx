import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import TiltFloat from "@/components/motion/TiltFloat";
import { PixelImage } from "@/components/magicui/pixel-image";
import { optimizedImageUrl } from "@/lib/image";

interface Deity {
  name: string;
  tagline: string;
  src: string;
  /** The lead tile — rendered larger, spanning two grid columns. */
  featured?: boolean;
  /** Render as a floating 3D transparent cutout instead of a photo card. */
  float?: boolean;
  glow?: string;
}

const DEITIES: Deity[] = [
  {
    name: "Shirdi Sai Baba",
    tagline: "The Fakir of Shirdi — Sabka Malik Ek",
    src: "/assets/temple/god/4.jpg",
    featured: true,
  },
  {
    name: "Trinity of Sai Avatars",
    tagline: "Shirdi · Satya · Prema Sai, with Hanuman",
    src: "/assets/temple/god/6.jpg",
  },
  {
    name: "Radha-Krishna",
    tagline: "The Divine Couple",
    src: "/assets/deities-png/radha-krishna.png",
    float: true,
    glow: "var(--color-gulal-400)",
  },
  {
    name: "Maa Durga",
    tagline: "The Supreme Warrior Goddess",
    src: "/assets/deities-png/durga.png",
    float: true,
    glow: "var(--color-peacock-400)",
  },
  {
    name: "Mata Rani",
    tagline: "Mother of the Universe",
    src: "/assets/temple/god/mata rani .jpeg",
  },
  {
    name: "Maa Kali",
    tagline: "The Fierce Protector",
    src: "/assets/temple/god/kali-mata2.jpeg",
  },
  {
    name: "Shiv-Parvati",
    tagline: "Adi Dev & Adi Shakti",
    src: "/assets/temple/god/shiv-parwati.jpeg",
  },
  {
    name: "Shree Ram Darbar",
    tagline: "Ram · Sita · Lakshman",
    src: "/assets/temple/god/3.jpg",
  },
  {
    name: "Lord Ganesh",
    tagline: "Remover of Obstacles",
    src: "/assets/deities-png/ganesh.png",
    float: true,
    glow: "var(--color-saffron-400)",
  },
];

/**
 * "Deities of the Temple" — every murti enshrined at Sai Oracle in one
 * dedicated gallery, not just the Sai avatars. The lead tile (Sai Baba)
 * runs double-width, and a few deities render as floating 3D cutouts
 * rather than flat photos, so the grid reads as a designed bento layout
 * with real depth rather than a plain uniform photo grid.
 */
export default function DeitiesSection() {
  return (
    <section className="relative overflow-hidden bg-maroon-950 py-14 sm:py-16">
      <div aria-hidden className="pattern-jali-dark absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Our Divine Family"
          title="Deities Enshrined at Sai Oracle"
          intro="Beyond the Trinity of Sai Avatars, the temple is home to many forms of the Divine — come, seek darshan of them all."
          tone="dark"
        />
        <RevealGroup className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {DEITIES.map((deity) =>
            deity.float ? (
              <RevealItem key={deity.name}>
                <SpotlightCard className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-gold-400/20 bg-maroon-900 px-3 pt-6 pb-4 shadow-lg">
                  <TiltFloat src={deity.src} alt={deity.name} glow={deity.glow} className="h-32 w-full sm:h-36" />
                  <p className="mt-3 text-center font-display text-base leading-tight font-bold text-white">
                    {deity.name}
                  </p>
                  <p className="mt-0.5 text-center text-[12px] text-gold-200/90">{deity.tagline}</p>
                </SpotlightCard>
              </RevealItem>
            ) : (
              <RevealItem key={deity.name} className={deity.featured ? "col-span-2" : ""}>
                <SpotlightCard className="group relative h-full overflow-hidden rounded-3xl border border-gold-400/20 bg-maroon-900 shadow-lg">
                  <div className={deity.featured ? "aspect-16/10" : "aspect-3/4"}>
                    <PixelImage
                      src={optimizedImageUrl(deity.src, deity.featured ? 828 : 384)}
                      alt={deity.name}
                      customGrid={deity.featured ? { rows: 4, cols: 6 } : { rows: 4, cols: 3 }}
                      pixelFadeInDuration={650}
                      maxAnimationDelay={750}
                      colorRevealDelay={400}
                      className="h-full w-full"
                      imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-maroon-950 via-maroon-950/60 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p
                      className={`font-display leading-tight font-bold text-white ${deity.featured ? "text-2xl" : "text-base"}`}
                    >
                      {deity.name}
                    </p>
                    <p className="mt-0.5 text-[12px] text-gold-200/90">{deity.tagline}</p>
                  </div>
                </SpotlightCard>
              </RevealItem>
            ),
          )}
        </RevealGroup>
      </div>
    </section>
  );
}
