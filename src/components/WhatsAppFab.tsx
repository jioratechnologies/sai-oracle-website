"use client";

import { PulsatingButton } from "./magicui/pulsating-button";
import { socialIcons } from "./SocialLinks";

/** Sitewide floating WhatsApp button — Magic UI's PulsatingButton draws the eye to it. */
export default function WhatsAppFab({ whatsappUrl }: { whatsappUrl: string }) {
  if (!whatsappUrl) return null;
  return (
    <PulsatingButton
      type="button"
      onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}
      aria-label="Message us on WhatsApp"
      pulseColor="#16a34a"
      duration="1.8s"
      distance="10px"
      className="fixed right-4 bottom-4 z-30 h-14 w-14 rounded-full bg-green-600 p-0 shadow-xl sm:right-6 sm:bottom-6"
    >
      <span className="relative z-10 flex h-6 w-6 items-center justify-center text-white">
        {socialIcons().WhatsApp}
      </span>
    </PulsatingButton>
  );
}
