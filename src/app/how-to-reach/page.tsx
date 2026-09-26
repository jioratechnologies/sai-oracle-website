import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, Car, Train, Plane, Clock, Phone, Mail, ExternalLink } from "lucide-react";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { getSettings, getTimings } from "@/lib/site";

export const metadata = {
  title: "Visit Temple & How to Reach · Sai Oracle",
  description:
    "Visiting instructions, directions, transit options, and front sanctum darshan for Satyadeep Sai Temple in Meerut, UP.",
};

export default async function HowToReachPage() {
  const [settings, timings] = await Promise.all([getSettings(), getTimings()]);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-10 sm:space-y-12">
      {/* Compact In-Page Header */}
      <div className="mx-auto max-w-3xl text-center border-b border-maroon-100/80 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          Temple Pilgrimage · Travel Guide
        </span>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          Visit Temple &amp; How to Reach
        </h1>
        <p className="mt-2.5 text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          Plan your sacred visit to Satyadeep Sai Baba Temple. Find location directions, visiting hours, and transit guides.
        </p>
      </div>

      {/* Mandir Front Photo & Location Hero */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border-4 border-gold-300/70 shadow-xl bg-white">
              <Image
                src="/assets/content/universe/img_7403-copy.webp"
                alt="Front view of Satyadeep Sai Temple sanctum"
                width={1200}
                height={800}
                className="aspect-4/3 w-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <span className="inline-block rounded-full bg-saffron-500 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  Mandir Front View
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">
                  Satyadeep Sai Baba Temple
                </h3>
                <p className="text-xs text-stone-200">
                  Godwin Estate, NH-58 Roorkee Road, Meerut, UP
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-bold tracking-widest text-saffron-700 uppercase">
                Location &amp; Sanctum
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-maroon-900">
                Welcome to Satyadeep Sai Universe
              </h2>
              <p className="mt-2 text-stone-600 text-[15px] leading-relaxed">
                Situated peacefully on NH-58 Roorkee Road in Meerut, the temple provides a serene
                spiritual haven for devotees seeking divine solace, healing, and the holy darshan of
                Bhagwan Sri Sathya Sai Baba and beloved Maa.
              </p>
            </div>

            {/* Timings card */}
            <div className="rounded-2xl border border-saffron-200 bg-saffron-50/70 p-4 space-y-2 text-xs text-stone-700">
              <div className="flex items-center justify-between gap-2 font-bold text-maroon-950 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-saffron-600" />
                  <span>Sanctum Hours (All 7 Days)</span>
                </span>
                <span className="text-xs text-saffron-700 bg-saffron-100/80 px-2.5 py-0.5 rounded-full font-bold">
                  {settings.morning_opening} – {settings.night_closing}
                </span>
              </div>
              {timings.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-saffron-200/60">
                  {timings.slice(0, 6).map((t) => (
                    <div key={t.id} className="bg-white/80 rounded-xl p-2 border border-saffron-100">
                      <div className="text-[11px] text-stone-500 font-medium truncate">{t.label}</div>
                      <div className="text-xs font-bold text-maroon-900 mt-0.5">{t.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Address & Direct Map CTA */}
            <div className="rounded-2xl border border-maroon-100 bg-white p-4 space-y-3">
              <div className="flex items-start gap-2.5 text-xs text-stone-700">
                <MapPin className="h-4 w-4 shrink-0 text-saffron-600 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Temple Address:</strong> {settings.address}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={settings.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-festive inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold text-white shadow-xs"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <Link
                  href="/about#worship"
                  className="inline-flex items-center gap-1.5 rounded-full border border-maroon-200 bg-cream-50 px-4 py-2 text-xs font-semibold text-maroon-900 hover:border-saffron-400"
                >
                  Aarti Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Transit Guides: Car, Train, Flight */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-[0.2em] text-saffron-700 uppercase">
              Travel Directions
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-maroon-900">
              How to Reach the Temple
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 shadow-xs">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-800">
                <Car className="h-6 w-6" />
              </span>
              <h4 className="mt-4 font-display text-lg font-bold text-maroon-900">By Road / Car</h4>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Conveniently located directly along the Delhi-Meerut Expressway and NH-58.
                Look for <strong>Godwin Estate</strong> near the 3rd Milestone Restaurant in Sofipur,
                Meerut Cantt.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 shadow-xs">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peacock-100 text-peacock-800">
                <Train className="h-6 w-6" />
              </span>
              <h4 className="mt-4 font-display text-lg font-bold text-maroon-900">By Railway</h4>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Nearest railhead is <strong>Meerut Cantt Railway Station</strong> (~5 km) and
                <strong> Meerut City Railway Station</strong> (~10 km). Auto-rickshaws and cabs
                are readily available to Godwin Estate.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 shadow-xs">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gulal-100 text-gulal-800">
                <Plane className="h-6 w-6" />
              </span>
              <h4 className="mt-4 font-display text-lg font-bold text-maroon-900">By Air</h4>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Nearest international airport is <strong>Indira Gandhi International (IGI), Delhi</strong> (~85 km)
                via the express highway, and <strong>Hindon Domestic Airport</strong> (~50 km).
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>
  );
}
