import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";

const SERVICES = [
  {
    title: "4 Daily Aartis",
    sub: "Kakad · Madhyan · Dhoop · Shej",
    href: "/temple",
    cta: "View timings",
    iconBg: "bg-saffron-500",
    icon: <path d="M12 2c2 3.5 5 6 5 9.5A5 5 0 0 1 7 11.5C7 8 10 5.5 12 2Z" />,
  },
  {
    title: "Narayan Seva",
    sub: "Monthly Annadanam for the needy",
    href: "/aims",
    cta: "Serve with us",
    iconBg: "bg-gulal-500",
    icon: <path d="M4 12h16a8 8 0 0 1-16 0Z M9 8c0-1.5 1-1.5 1-3 M14 8c0-1.5 1-1.5 1-3" />,
  },
  {
    title: "Bhajans & Live Darshan",
    sub: "Thursday sandhyas & Naam Smaranam",
    href: "/videos",
    cta: "Watch now",
    iconBg: "bg-peacock-500",
    icon: (
      <g>
        <circle cx="8" cy="18" r="3" />
        <circle cx="17" cy="16" r="3" />
        <path d="M11 18V6l9-2v12" />
      </g>
    ),
  },
  {
    title: "Plan Your Visit",
    sub: "Open all 7 days · Meerut, UP",
    href: "/temple#visit",
    cta: "Directions",
    iconBg: "bg-maroon-700",
    icon: <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  },
];

/**
 * Kashi-portal style quick services: overlaps the hero so devotees can
 * jump straight to aartis, seva, bhajans or visit info.
 */
export default function SevaServices() {
  return (
    <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:-mt-14">
      <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <RevealItem key={s.title} className="h-full">
            <SpotlightCard className="group flex h-full items-center gap-3 rounded-2xl border border-maroon-100 bg-white p-4 shadow-lg shadow-maroon-950/5">
              <span
                aria-hidden
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${s.iconBg}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  {s.icon}
                </svg>
              </span>
              <div className="min-w-0">
                <p className="block font-display text-lg leading-tight font-bold text-maroon-900">
                  {s.title}
                </p>
                <p className="block truncate text-sm text-stone-600">{s.sub}</p>
                <Link
                  href={s.href}
                  className="mt-0.5 inline-flex items-center gap-1 text-[13px] font-bold text-saffron-600 group-hover:text-saffron-500"
                >
                  {s.cta} <span aria-hidden>→</span>
                </Link>
              </div>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
