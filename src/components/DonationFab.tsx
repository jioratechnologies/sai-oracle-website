"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { PulsatingButton } from "./magicui/pulsating-button";

/**
 * Redesigned Floating Donation Action:
 * - On Mobile: Single prominent hero floating button on the bottom-right (WhatsApp removed on mobile)
 * - On Desktop: Positioned on bottom-left, complementing WhatsApp on bottom-right
 * - Direct navigation to /trust#donation (instant UPI QR & Bank Account transfer section)
 */
export default function DonationFab() {
  return (
    <Link
      href="/trust#donation"
      aria-label="Donate to Satyadeep Sai Trust via UPI & Bank Account (80G Tax Exemption)"
      className="fixed right-4 bottom-4 z-30 sm:left-6 sm:right-auto sm:bottom-6 group"
    >
      <PulsatingButton
        type="button"
        pulseColor="#f59e0b"
        duration="2.2s"
        distance="8px"
        className="flex items-center gap-2.5 rounded-full bg-linear-to-r from-saffron-600 via-amber-600 to-maroon-800 px-3.5 py-2.5 sm:px-4.5 sm:py-3 text-white shadow-xl ring-2 ring-gold-300/90 transition-all group-hover:scale-105 active:scale-95 group-hover:shadow-2xl"
      >
        <span className="relative z-10 flex items-center gap-2">
          {/* Sacred Heart with Gold Accent */}
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-gold-200 shadow-2xs">
            <Heart className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-gold-300 text-gold-300 animate-pulse" />
          </span>

          {/* Text and Badge */}
          <span className="flex flex-col text-left">
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide text-white drop-shadow-xs leading-tight">
              <span>Donate</span>
              <span className="rounded-full bg-amber-400/30 px-1.5 py-0.2 text-[9.5px] sm:text-[10px] font-extrabold text-amber-100 ring-1 ring-amber-300/40">
                80G
              </span>
            </span>
            <span className="text-[9.5px] sm:text-[10.5px] font-medium text-amber-100/90 leading-tight flex items-center gap-1">
              <span>UPI &amp; Bank</span>
              <ArrowRight className="h-2.5 w-2.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </span>
          </span>
        </span>
      </PulsatingButton>
    </Link>
  );
}
