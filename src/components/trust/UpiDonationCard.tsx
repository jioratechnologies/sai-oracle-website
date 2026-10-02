"use client";

import { useState } from "react";
import { Check, Copy, QrCode, ShieldCheck, Clock, ArrowDown, Building2 } from "lucide-react";
import SpotlightCard from "@/components/motion/SpotlightCard";

interface UpiDonationCardProps {
  upiId?: string;
  payeeName?: string;
  upiEnabled?: boolean;
  statusNote?: string;
}

const DEFAULT_UPI_ID = "30350015946@sbi";
const DEFAULT_PAYEE = "Sri Sai Sansthan Charitable Trust";

export default function UpiDonationCard({
  upiId = DEFAULT_UPI_ID,
  payeeName = DEFAULT_PAYEE,
  upiEnabled = false,
  statusNote = "Under process — will be active soon",
}: UpiDonationCardProps) {
  const [copied, setCopied] = useState(false);

  const isPlaceholder = !upiId || upiId.includes("Your_upi_number_here") || upiId.trim() === "";
  const isAvailable = Boolean(upiEnabled && !isPlaceholder);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Auto-generate QR from UPI deeplink when available
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiDeepLink)}`;

  if (!isAvailable) {
    return (
      <SpotlightCard className="overflow-hidden rounded-3xl border-2 border-amber-300/80 bg-linear-to-br from-amber-50/70 via-cream-50 to-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* Status Badge Box */}
          <div className="relative shrink-0 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-amber-300 bg-white/90 p-6 text-center w-full md:w-56 h-48 shadow-2xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-inner">
              <Clock className="h-7 w-7 animate-pulse text-amber-700" />
            </div>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 uppercase tracking-wider">
              Under Process
            </span>
            <span className="mt-1 text-[11px] font-medium text-stone-500">
              UPI Portal Setup
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3.5 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/90 bg-amber-100/70 px-3 py-0.5 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                <QrCode className="h-3.5 w-3.5 text-amber-800" />
                Instant UPI Donation
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/80 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                80G Tax Exemption
              </span>
            </div>

            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-maroon-900">
                UPI QR Code &amp; Virtual Payment ID
              </h3>
              <div className="mt-2 inline-block rounded-xl border border-amber-300/80 bg-amber-100/90 px-3.5 py-1.5 text-sm font-bold text-maroon-950">
                {statusNote || "Under process — will be active soon"}
              </div>
              <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-stone-600 max-w-xl">
                The online UPI QR and payment gateway is currently under process and will be active soon. In the meantime, devotees are kindly requested to offer their sacred seva contributions directly through the official Bank Account (NEFT / RTGS / IMPS) details provided below.
              </p>
            </div>

            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="#bank"
                className="inline-flex items-center gap-2 rounded-xl bg-maroon-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-maroon-800 shadow-xs"
              >
                <Building2 className="h-3.5 w-3.5 text-gold-300" />
                <span>View Official Bank Account Details</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
              <span className="text-[12px] text-stone-500">
                Beneficiary: <strong className="text-stone-800">{payeeName}</strong>
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard className="overflow-hidden rounded-3xl border border-gold-300/80 bg-linear-to-br from-cream-50 via-white to-amber-50/50 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        {/* QR Code Frame */}
        <div className="relative shrink-0 rounded-2xl border-2 border-gold-400/80 bg-white p-3 shadow-md">
          <div className="relative h-44 w-44 overflow-hidden rounded-xl bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="Scan UPI QR Code to donate to Sri Sai Sansthan Charitable Trust"
              width={176}
              height={176}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="mt-2 text-center text-[11px] font-bold text-maroon-900 tracking-wide">
            Scan with any UPI App
          </div>
        </div>

        {/* UPI Details */}
        <div className="flex-1 space-y-3.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron-300/80 bg-saffron-100/70 px-3 py-0.5 text-[11px] font-bold text-saffron-900 uppercase tracking-wider">
              <QrCode className="h-3.5 w-3.5 text-saffron-700" />
              Instant UPI Donation
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/80 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              80G Tax Exemption
            </span>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-maroon-900">
              UPI QR Code &amp; Virtual Payment ID
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Supports Google Pay, PhonePe, Paytm, BHIM, Cred, and all Indian banking apps.
            </p>
          </div>

          {/* UPI ID Box with 1-Click Copy */}
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-gold-300 bg-white p-2.5 sm:p-3 shadow-xs">
            <div className="min-w-0 flex-1 pl-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Official UPI ID
              </span>
              <span className="block font-mono text-sm sm:text-base font-bold text-saffron-800 truncate">
                {upiId}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                copied
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-maroon-900 text-white hover:bg-maroon-800 shadow-xs active:scale-95 cursor-pointer"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[12px] text-stone-500 leading-relaxed">
            Beneficiary Name: <strong className="text-stone-800">{payeeName}</strong>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
