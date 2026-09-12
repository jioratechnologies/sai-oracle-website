import Link from "next/link";
import PageHero from "@/components/PageHero";
import ArrowLink, { ArrowIcon } from "@/components/ArrowLink";
import Markdown from "@/components/Markdown";
import TimingsTable from "@/components/TimingsTable";
import { getMediaMap, getPage, getSettings, getTimings } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";

export const revalidate = 300;

export const metadata = { title: "Temple & Worship" };

export default async function TemplePage() {
  const [page, timings, settings, mediaMap] = await Promise.all([
    getPage("temple"),
    getTimings(),
    getSettings(),
    getMediaMap(),
  ]);
  return (
    <>
      <PageHero
        eyebrow="Daily Darshan"
        title={page?.title ?? "Temple & Worship"}
        intro={`Open all 7 days · ${settings.morning_opening} – ${settings.night_closing}`}
        image={resolveMediaUrl(mediaMap, "/assets/temple/other/20250112_182606.webp")}
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Markdown content={page?.content ?? ""} />
          </div>
          <aside className="space-y-6">
            <TimingsTable timings={timings} />
            <div
              id="visit"
              className="scroll-mt-24 rounded-2xl border border-gold-400/50 bg-cream-100 p-5"
            >
              <h2 className="font-display text-2xl font-bold text-maroon-900">Visit the Temple</h2>
              <address className="mt-2 text-[15px] leading-relaxed text-stone-700 not-italic">
                {settings.address}
              </address>
              {settings.maps_url && (
                <ArrowLink
                  href={settings.maps_url}
                  external
                  variant="solid"
                  className="mt-3 btn-festive text-sm font-bold text-white"
                >
                  Get Directions
                </ArrowLink>
              )}
              <Link
                href="/contact"
                className="group mt-2 ml-2 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-600 hover:text-saffron-500 hover:underline"
              >
                Contact office <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
