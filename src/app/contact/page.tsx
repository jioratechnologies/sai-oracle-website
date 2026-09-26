import type { CSSProperties } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import ArrowLink from "@/components/ArrowLink";
import TimingsTable from "@/components/TimingsTable";
import SocialLinks, { buildSocialLinks } from "@/components/SocialLinks";
import { getSettings, getTimings } from "@/lib/site";

export const revalidate = 300;

export const metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const [settings, timings] = await Promise.all([getSettings(), getTimings()]);
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`;
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-10">
      {/* Compact In-Page Header */}
      <div className="mx-auto max-w-3xl text-center border-b border-maroon-100/80 pb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
          We Welcome You · Temple Information
        </span>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          Contact Us
        </h1>
        <p className="mt-2.5 text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          For programme details, seva contributions or general enquiries, reach the temple office.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-maroon-100 bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-maroon-900">Temple Office</h2>
              <address className="mt-3 space-y-2 text-[16px] leading-relaxed text-stone-700 not-italic">
                <p className="flex items-start gap-2">
                  <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-saffron-600" />
                  {settings.address}
                </p>
                {settings.email && (
                  <p className="flex items-center gap-2">
                    <Mail aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
                    <a
                      href={`mailto:${settings.email}?subject=Enquiry%20for%20Sai%20Oracle`}
                      className="font-medium break-all text-maroon-800 hover:underline"
                    >
                      {settings.email}
                    </a>
                  </p>
                )}
                {settings.phone && (
                  <p className="flex items-center gap-2">
                    <Phone aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
                    {settings.phone}
                  </p>
                )}
              </address>
              <div className="mt-4 flex flex-wrap gap-3">
                {settings.whatsapp_url ? (
                  <a
                    href={settings.whatsapp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2 text-sm font-bold text-white shadow-md transition-transform active:scale-[0.98]"
                    style={{ "--pulse-color": "#16a34a", "--duration": "1.8s", "--distance": "9px" } as CSSProperties}
                  >
                    <span className="relative z-10">Message on WhatsApp</span>
                    <span
                      aria-hidden
                      className="pulsating-btn-pulse pointer-events-none absolute inset-0 rounded-[inherit] bg-inherit"
                    />
                  </a>
                ) : settings.email ? (
                  <ArrowLink
                    href={`mailto:${settings.email}?subject=Enquiry%20for%20Sai%20Oracle`}
                    variant="solid"
                    className="btn-festive text-sm font-bold text-white"
                  >
                    Email the Temple
                  </ArrowLink>
                ) : null}
                {settings.maps_url && (
                  <ArrowLink
                    href={settings.maps_url}
                    external
                    variant="outline"
                    className="border-maroon-300 px-5 py-2 text-sm text-maroon-800 hover:bg-maroon-50"
                  >
                    Open in Google Maps
                  </ArrowLink>
                )}
              </div>
              <div className="mt-4">
                <SocialLinks links={buildSocialLinks(settings)} />
              </div>
            </div>
            <TimingsTable timings={timings} />
          </div>

          <div className="overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-sm">
            <iframe
              title="Sai Oracle temple location map"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full lg:h-[420px]"
            />
            <div className="p-5 text-[15px] text-stone-600">
              <p className="font-semibold text-maroon-900">Directions to reach</p>
              <p className="mt-1">
                Located on NH-58 (Roorkee Road), Meerut Cantt — near the 3rd Milestone Restaurant,
                Godwin Estate, Sofipur. NH-58 connects Delhi with Haridwar and Rishikesh, about 65 km
                from Delhi by road and roughly 60 km from Delhi&apos;s ISBT. The nearest railway
                station and bus stand are in Meerut, about 5 km away; Delhi&apos;s IGI Airport is
                around 100 km, with taxis available for the onward drive.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}
