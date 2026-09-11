import Image from "next/image";
import Link from "next/link";
import { Flame, Sparkles } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";

/**
 * Welcome / About Temple — mockup layout done properly: text left,
 * photo composition right (badge + overlapping inset), CTAs beneath.
 */
export default function AboutTemple() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-4 sm:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal y={28} className="order-2 lg:order-1">
          <SectionHeading
            align="left"
            eyebrow="Welcome"
            title="A Temple of Love, Service & the Trinity of Sai"
          />
          <p className="mt-4 text-[17px] leading-relaxed text-stone-600">
            Satyadeep Sai Organisation, founded by Pujniye Maa under the inspiration of Bhagwan
            Satya Sai Baba, is a non-political, non-profit family of devotees. Our temple carries
            life-sized statues of Shirdi Sai and Satya Sai, with a singhasan for the forthcoming
            Prema Sai Avatar — a Trinity found in very few temples of India.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="btn-festive min-h-12 rounded-full px-6 py-2.5 font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
            >
              Read Our Story
            </Link>
            <Link
              href="/temple"
              className="min-h-12 rounded-full border-2 border-maroon-300 px-6 py-2.5 font-bold text-maroon-800 transition-colors hover:bg-maroon-50"
            >
              Temple & Worship
            </Link>
          </div>
          <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-maroon-100 pt-5">
            {[
              ["Trinity", "of Sai Avatars"],
              ["4 Daily", "Aartis"],
              ["7 Days", "Open weekly"],
            ].map(([big, small]) => (
              <div key={big + small}>
                <dt className="sr-only">{big}</dt>
                <dd className="font-display text-xl leading-tight font-extrabold text-maroon-900 sm:text-2xl">
                  {big}
                </dd>
                <dd className="text-[13px] text-stone-500">{small}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal y={28} delay={0.08} className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2">
          <span className="btn-festive absolute -top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide text-white uppercase shadow-lg">
            <Sparkles aria-hidden className="h-3.5 w-3.5" />
            Love · Service · Devotion
          </span>
          <div className="overflow-hidden rounded-3xl border-4 border-gold-400/60 shadow-lg">
            <Image
              src="/assets/events/20241123_191422.jpg"
              alt="Havan and seva rituals with devotees at Sai Oracle"
              width={1040}
              height={780}
              sizes="(max-width: 1024px) 90vw, 520px"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-8 w-36 overflow-hidden rounded-2xl shadow-xl ring-4 ring-cream-50 sm:-right-6 sm:w-44">
            <Image
              src="/assets/20251119_201212.jpg"
              alt="Lord Ganesh adorned for celebrations at the temple"
              width={384}
              height={200}
              sizes="176px"
              className="aspect-19/10 w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 left-4 hidden rounded-2xl border border-maroon-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:block">
            <p className="flex items-center gap-1.5 font-display text-lg leading-none font-extrabold text-maroon-900">
              <Flame aria-hidden className="h-4 w-4 text-saffron-600" />
              5:30 AM
            </p>
            <p className="mt-1 text-xs text-stone-500">Temple opens daily</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
