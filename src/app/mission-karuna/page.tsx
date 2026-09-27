import Image from "next/image";
import ArrowLink from "@/components/ArrowLink";
import { markdownInline } from "@/components/Markdown";
import { missionKarunaContent } from "@/lib/seed";
import { getMediaMap } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";

export const revalidate = 300;

export const metadata = { title: "Mission Karuna" };

export default async function MissionKarunaPage() {
  const mediaMap = await getMediaMap();
  return (
    <section className="mx-auto max-w-3xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-8">
      {/* Compact In-Page Header */}
      <div className="border-b border-maroon-100/80 pb-6 text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          Sacred Cause · Educational Seva
        </span>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl leading-tight">
          Mission Karuna
        </h1>
        <p className="mt-2.5 text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          &ldquo;Empowering the Poor Children&rdquo; — educational and financial support for underprivileged
          children launched by beloved Maa under the divine inspiration of Bhagwan Sri Sathya Sai Baba.
        </p>
      </div>
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-maroon-100 shadow-lg">
          <Image
            src={resolveMediaUrl(mediaMap, "/legacy/home/mission-karuna.webp")}
            alt="Mission Karuna — empowering poor children through education"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative aspect-video overflow-hidden rounded-3xl border border-maroon-100 shadow-lg">
          <Image
            src={resolveMediaUrl(mediaMap, "/assets/content/mission-karuna/karuna-children-darshan.jpg")}
            alt="Mission Karuna children at temple darshan"
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/30 to-transparent p-3.5 text-xs font-semibold text-white">
            Mission Karuna children at temple darshan
          </div>
        </div>

        <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-stone-700">
          {missionKarunaContent.split(/\n{2,}/).map((p, i) => (
            <p key={i}>{markdownInline(p)}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <ArrowLink href="/contribution" variant="solid" className="btn-festive text-white">
            Support Mission Karuna
          </ArrowLink>
          <ArrowLink
            href="/aims"
            back
            variant="outline"
            className="border-maroon-300 text-maroon-800 hover:border-saffron-500 hover:bg-saffron-500 hover:text-white"
          >
            All Aims & Objectives
          </ArrowLink>
        </div>
      </section>
  );
}
