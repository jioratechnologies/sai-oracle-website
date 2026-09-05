import PageHero from "@/components/PageHero";
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
    <>
      <PageHero
        eyebrow="We Welcome You"
        title="Contact Us"
        intro="For programme details, seva contributions or general enquiries, reach the temple office."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-maroon-100 bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-maroon-900">Temple Office</h2>
              <address className="mt-3 space-y-2 text-[16px] leading-relaxed text-stone-700 not-italic">
                <p>📍 {settings.address}</p>
                {settings.email && (
                  <p>
                    ✉️{" "}
                    <a
                      href={`mailto:${settings.email}?subject=Enquiry%20for%20Sai%20Oracle`}
                      className="font-medium text-maroon-800 hover:underline"
                    >
                      {settings.email}
                    </a>
                  </p>
                )}
                {settings.phone && <p>📞 {settings.phone}</p>}
              </address>
              <div className="mt-4 flex flex-wrap gap-3">
                {settings.whatsapp_url ? (
                  <ArrowLink
                    href={settings.whatsapp_url}
                    external
                    variant="solid"
                    className="bg-green-700 text-sm font-bold text-white hover:bg-green-800"
                  >
                    Message on WhatsApp
                  </ArrowLink>
                ) : settings.email ? (
                  <ArrowLink
                    href={`mailto:${settings.email}?subject=Enquiry%20for%20Sai%20Oracle`}
                    variant="solid"
                    className="bg-maroon-800 text-sm font-bold text-cream-50 hover:bg-maroon-700"
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
                Godwin Estate, Sofipur. Easily reachable by road from Delhi, Haridwar and
                Muzaffarnagar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
