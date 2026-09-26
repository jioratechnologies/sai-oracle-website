"use client";

import { useState } from "react";
import { Check, Copy, QrCode, ShieldCheck } from "lucide-react";
import SpotlightCard from "@/components/motion/SpotlightCard";

interface UpiDonationCardProps {
  upiId?: string;
  payeeName?: string;
}

const DEFAULT_UPI_ID = "30350015946@sbi";
const DEFAULT_PAYEE = "Sri Sai Sansthan Charitable Trust";

export default function UpiDonationCard({ upiId = DEFAULT_UPI_ID, payeeName = DEFAULT_PAYEE }: UpiDonationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Auto-generate QR from UPI deeplink
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiDeepLink)}`;

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
                  : "bg-maroon-900 text-white hover:bg-maroon-800 shadow-xs active:scale-95"
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

