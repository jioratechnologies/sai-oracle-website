import Image from "next/image";
import Link from "next/link";
import { Building2, Heart, ShieldCheck, Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/motion/SpotlightCard";
import UpiDonationCard from "@/components/trust/UpiDonationCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getTrustSettings } from "@/lib/dataStore";
import { getMediaMap } from "@/lib/site";
import { resolveMediaUrl } from "@/lib/image";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sri Sai Sansthan Charitable Trust · Sai Oracle",
  description:
    "Sri Sai Sansthan Charitable Trust — Caretaker of all activities of Satyadeep Sai Universe. Registered under Section 80G for 50% tax exemption.",
};

export default async function TrustPage() {
  const [trust, mediaMap] = await Promise.all([getTrustSettings(), getMediaMap()]);
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:pt-10 sm:pb-20 space-y-10 sm:space-y-14">
      {/* Compact, Prominent Trust Header */}
      <div className="border-b border-maroon-100/80 pb-8 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-50 px-3 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
            Care Taker of Satyadeep Sai Universe
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/80 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Registered 80G Tax Exemption
          </span>
        </div>
        <h1 className="mt-3.5 font-display text-3xl font-extrabold text-maroon-900 sm:text-4xl lg:text-[2.6rem] leading-tight">
          Sri Sai Sansthan Charitable Trust
        </h1>
        <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-stone-600 sm:text-[16.5px]">
          Spreading the divine message of Bhagwan Sri Sathya Sai Baba and beloved Maa through
          selfless service, education, medical relief, and universal love.
        </p>
      </div>

      {/* Mission Overview */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/60 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
            Sacred Mission &amp; Purpose
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-maroon-900 leading-snug">
            Serving Humanity with Divine Love &amp; Compassion
          </h2>
          <p className="text-[16px] leading-relaxed text-stone-600">
            Motivated by Bhagwan Sri Sathya Sai Baba, our beloved <strong>Maa</strong> established the{" "}
            <strong>Sri Sai Sansthan Charitable Trust</strong> to propagate the divine message to the
            entire world.
          </p>
          <p className="text-[15px] leading-relaxed text-stone-600">
            The Trust is the designated <strong>Care Taker</strong> of all activities of the{" "}
            <strong>Satyadeep Sai Universe</strong>. It regularly organizes guided meditation camps,
            divine discourses, bhajans, cultural and heritage programmes, and Narayan Seva (Annadanam)
            for the underprivileged — spreading the universal gospel of <em>&ldquo;Love All, Serve All&rdquo;</em>.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/mission-karuna"
              className="btn-festive inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-xs"
            >
              <span>Explore Mission Karuna</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/aims"
              className="inline-flex items-center gap-2 rounded-full border-2 border-maroon-200 bg-white px-6 py-2.5 text-sm font-bold text-maroon-800 hover:bg-maroon-50 transition-colors"
            >
              Aims &amp; Objectives
            </Link>
          </div>
        </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border-4 border-gold-300/60 shadow-lg bg-white">
              <Image
                src={resolveMediaUrl(mediaMap, "/assets/content/archive/chart_trust_147updt.jpg")}
                alt="Sri Sai Sansthan Charitable Trust activities"
                width={800}
                height={600}
                className="aspect-4/3 w-full object-cover"
              />
              <div className="p-4 bg-linear-to-r from-saffron-50 via-cream-50 to-amber-50 border-t border-maroon-100 text-xs text-stone-700 flex items-center justify-between">
                <span className="font-bold text-maroon-900">Registered Trust · 80G Tax Exemption</span>
                <span className="text-saffron-700 font-semibold">Meerut, UP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Contribution & Phenomena Section (From Contribution.htm) */}
        <div id="contribution" className="scroll-mt-24 space-y-6 rounded-3xl border-2 border-gold-300/70 bg-linear-to-br from-amber-50/60 via-cream-50/80 to-white p-6 sm:p-9 shadow-sm">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300/80 bg-saffron-50 px-3.5 py-1 text-xs font-bold text-saffron-800 uppercase tracking-wider">
              <Heart className="h-3.5 w-3.5 text-saffron-600" />
              Contribution &amp; Sacred Nishkama Seva
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-maroon-900">
              Contribution: The Divine Opportunity to Serve
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              <strong>The Phenomena:</strong> Sri Satyadeep Sai Universe is a growing divine centre inspired
              by Bhagwan Sri Sathya Sai Baba. His life and message inspire millions of people throughout the world
              to lead purposeful and moral lives, developing in all spheres of <em>Love and Service</em>.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3.5 text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
              <p>
                Satyadeep Sai Universe, carried out under the direct spiritual guidance of beloved <strong>Maa</strong>,
                enhances the noble mission of Sai Baba to the masses. The Trust regularly organizes spiritual and humanitarian
                programs that produce positive transformation in seekers walking the divine path.
              </p>
              <p>
                The Trust provides immense opportunities for every person to develop skills in meditation and to become
                an active participant in <strong>Nishkama Seva (Selfless Service)</strong>. Join hands to inculcate secular
                and spiritual education in underprivileged children irrespective of caste, creed, or religion.
              </p>
              <div className="rounded-2xl border border-saffron-200 bg-saffron-50/70 p-4 font-display text-base font-bold text-maroon-950 italic">
                &ldquo;Let us not just worship the statue of Sai Baba; let us worship the living God in everyone.&rdquo;
              </div>
            </div>

            <div className="space-y-3.5 text-stone-600 text-sm sm:text-[14.5px] leading-relaxed">
              <p>
                Bhagwan Sai Baba repeatedly declared: <em>&ldquo;Hands that serve are much more holier than lips that pray.&rdquo;</em>
                {" "}This reminds us that true worship is expressed through selfless action for those in need.
              </p>
              <p>
                All voluntary contributions made to <strong>Sri Sai Sansthan Charitable Trust</strong> are dedicated
                entirely to Narayan Seva (Annadanam), child education support (Mission Karuna), medical assistance,
                and sacred mandir development.
              </p>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs sm:text-sm text-emerald-950">
                <p className="font-bold">Income Tax 80G Exemption Benefit:</p>
                <p className="mt-0.5">
                  The Trust is registered under the Income Tax Act 1961 under Section 80G. All contributions are
                  eligible for a tax deduction of up to 50%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Authentic Trust Seva Gallery (From Charitable.htm & Contribution.htm) */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Seva in Action
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-maroon-900">
                Glimpses of Trust Activities &amp; Seva Camps
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Narayan Seva · Balvikas · Healthcare
            </span>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {[
              {
                src: "/assets/content/archive/chart_trust_62.jpg",
                title: "Narayan Seva Distribution",
                desc: "Free food distribution for the underprivileged.",
              },
              {
                src: "/assets/content/archive/chart_trust_76.jpg",
                title: "Balvikas & Children Aid",
                desc: "Mission Karuna educational support for poor children.",
              },
              {
                src: "/assets/content/archive/chart_trust_281updat.jpg",
                title: "Trust Seva Gathering",
                desc: "Devotees participating in charitable activities.",
              },
              {
                src: "/assets/content/archive/contrbutiuon1596.jpg",
                title: "Maa with Children",
                desc: "Inculcating spiritual and secular values in youth.",
              },
            ].map((photo, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-2xs hover:shadow-md transition-all"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={resolveMediaUrl(mediaMap, photo.src)}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 bg-white">
                  <h5 className="font-display text-xs font-bold text-maroon-900">{photo.title}</h5>
                  <p className="mt-0.5 text-[11px] text-stone-500 line-clamp-1">{photo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 80G Exemption Banner */}
        <div className="rounded-3xl border border-emerald-300/80 bg-linear-to-br from-emerald-50/90 via-white to-teal-50/60 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xs">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-emerald-950">
                  Tax Exemption under Section 80G
                </h3>
                <p className="mt-1 text-sm text-stone-600 max-w-2xl leading-relaxed">
                  Sri Sai Sansthan Charitable Trust is registered under the Income Tax Act 1961 under
                  Section 80G. All contributions made to the Trust are eligible for an income tax deduction
                  of up to 50%.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="inline-block rounded-xl border border-emerald-200 bg-emerald-100/60 px-4 py-2 text-xs font-bold text-emerald-900 uppercase tracking-wider text-center">
                50% Tax Relief
              </span>
            </div>
          </div>
        </div>

        {/* Instant UPI & QR Code Donation */}
        <div id="donation" className="scroll-mt-24">
          <span id="upi" className="sr-only" />
          <UpiDonationCard upiId={trust.upi_id} payeeName={trust.payee_name} />
        </div>

        {/* Bank Account & Donation Details */}
        <div id="bank" className="scroll-mt-24 grid gap-8 lg:grid-cols-12">
          {/* Bank Details Card */}
          <div className="lg:col-span-7">
            <SpotlightCard className="h-full rounded-3xl border border-gold-300/60 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 border-b border-maroon-100 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-100 text-saffron-800">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-maroon-900">
                    Official Bank Account Details
                  </h3>
                  <p className="text-xs text-stone-500">For Direct NEFT, RTGS, IMPS &amp; Wire Transfers</p>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-maroon-50 text-sm">
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-stone-500 font-medium">Account Name</dt>
                  <dd className="font-bold text-maroon-950 text-right">{trust.account_name}</dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-stone-500 font-medium">Bank Name</dt>
                  <dd className="font-bold text-stone-900 text-right">{trust.bank_name}</dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-stone-500 font-medium">Account Number</dt>
                  <dd className="font-mono text-base font-bold text-saffron-700 tracking-wider text-right">
                    {trust.account_number}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-stone-500 font-medium">IFSC Code</dt>
                  <dd className="font-mono text-base font-bold text-stone-900 text-right">
                    {trust.ifsc_code}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-stone-500 font-medium">Branch Address</dt>
                  <dd className="font-semibold text-stone-800 text-right">{trust.branch_address}</dd>
                </div>
              </dl>

              <div className="mt-6 rounded-2xl bg-cream-50 p-4 border border-maroon-100 text-xs text-stone-600 space-y-1.5">
                <p className="font-bold text-maroon-900">After Transfer, Please Email Us With:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Donor full name, address, and mobile number</li>
                  <li>Permanent Account Number (PAN) for 80G receipt</li>
                  <li>Purpose of donation (Medical Relief / Education / Relief to Poor / General)</li>
                </ul>
                {trust.tax_exemption_note && (
                  <p className="mt-2 text-stone-500 italic">{trust.tax_exemption_note}</p>
                )}
              </div>
            </SpotlightCard>
          </div>

          {/* Cheque / Demand Draft & Address */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 shadow-xs">
              <h3 className="font-display text-lg font-bold text-maroon-900 flex items-center gap-2">
                <Heart className="h-5 w-5 text-saffron-600" />
                By Cheque / Demand Draft
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Donations can be sent in favour of <strong>&ldquo;SRI SAI SANSTHAN CHARITABLE TRUST&rdquo;</strong> by
                cheque or demand draft drawn on any bank in India, along with your contact details, PAN, and purpose.
              </p>
              <div className="mt-4 pt-3 border-t border-maroon-50 text-xs text-stone-700 space-y-2">
                <p className="font-bold text-maroon-950">Mail / Courier Address:</p>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-saffron-600 mt-0.5" />
                  <p className="leading-relaxed whitespace-pre-line">
                    {trust.mailing_address}
                  </p>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-maroon-100 bg-white p-6 shadow-xs">
              <h3 className="font-display text-lg font-bold text-maroon-900">
                Direct Trust Contact
              </h3>
              <div className="mt-3 space-y-2.5 text-xs">
                <a
                  href={`mailto:${trust.trust_email}`}
                  className="flex items-center gap-2 text-stone-700 hover:text-saffron-700 transition-colors"
                >
                  <Mail className="h-4 w-4 text-saffron-600 shrink-0" />
                  <span>{trust.trust_email}</span>
                </a>
                <a
                  href={`https://wa.me/${trust.trust_phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-700 hover:text-emerald-700 transition-colors"
                >
                  <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{trust.trust_phone} (Telephone &amp; WhatsApp)</span>
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>
  );
}
