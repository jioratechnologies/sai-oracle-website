import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { resolveMediaUrl } from "@/lib/image";
import { getMediaMap } from "@/lib/site";

interface Deity {
  name: string;
  tagline: string;
  src: string;
  featured?: boolean;
}

const DEITIES: Deity[] = [
  {
    name: "Shirdi Sai Baba — “Dwarikamai”",
    tagline: "The Fakir of Shirdi — Sabka Malik Ek",
    src: "/assets/temple/god/4.webp",
    featured: true,
  },
  {
    name: "The Trinity of Sai Avatars",
    tagline: "Shirdi Sai · Satya Sai · Prema Sai",
    src: "/assets/content/home/mg-9197.jpg",
    featured: true,
  },
  {
    name: "Radha-Krishna",
    tagline: "The Divine Couple — Eternal Love & Joy",
    src: "/assets/temple/god/radha-krishna.webp",
  },
  {
    name: "Lord Ganesh & Maa Laxmi",
    tagline: "Remover of Obstacles & Sacred Prosperity",
    src: "/assets/temple/god/ganesh.webp",
  },
  {
    name: "Mata Rani (Maa Durga)",
    tagline: "Sherawali Maa — Mother of the Universe",
    src: "/assets/content/home/mg-9228.jpg",
  },
  {
    name: "Sri Hanuman Ji",
    tagline: "Sankat Mochan & Supreme Devotee",
    src: "/assets/temple/god/hanuman.webp",
  },
  {
    name: "Shiv-Parvati",
    tagline: "Adi Dev & Adi Shakti — Divine Presence",
    src: "/assets/temple/god/shiv-parwati.webp",
  },
  {
    name: "Shree Ram Darbar",
    tagline: "Ram · Sita · Lakshman",
    src: "/assets/temple/god/3.webp",
  },
  {
    name: "Maa Kali",
    tagline: "The Fierce Protector & Divine Mother",
    src: "/assets/temple/god/kali-mata2.webp",
  },
];

export default async function DeitiesSection() {
  const mediaMap = await getMediaMap();
  const deities = DEITIES.map((d) => ({ ...d, src: resolveMediaUrl(mediaMap, d.src) }));

  return (
    <section id="deities" className="section-dawn relative scroll-mt-24 overflow-hidden py-14 sm:py-16">
      <div aria-hidden className="pattern-jali absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Our Divine Family"
          title="Deities Enshrined at Sai Oracle"
          intro="Actual temple sanctum darshan of our revered deities — come, seek their divine grace and blessings."
        />

        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {deities.map((deity) => (
            <RevealItem
              key={deity.name}
              className={deity.featured ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <SpotlightCard className="group relative h-full overflow-hidden rounded-3xl border border-saffron-300/60 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-4/3 w-full overflow-hidden bg-cream-100">
                  <Image
                    src={deity.src}
                    alt={deity.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/85 via-black/40 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                    <p className="font-display text-lg font-bold leading-tight drop-shadow-xs">
                      {deity.name}
                    </p>
                    <p className="mt-1 text-xs font-medium text-amber-200 drop-shadow-xs">
                      {deity.tagline}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
