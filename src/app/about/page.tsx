import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowLink";
import PageHero from "@/components/PageHero";
import Markdown from "@/components/Markdown";
import SectionHeading from "@/components/SectionHeading";
import Testimonials from "@/components/Testimonials";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { getExperiences, getPage } from "@/lib/site";

export const revalidate = 300;

export const metadata = { title: "About Sai Oracle" };

export default async function AboutPage() {
  const page = await getPage("about");
  const experiences = getExperiences();
  return (
    <>
      <PageHero
        eyebrow="ॐ साई राम"
        title={page?.title ?? "About Sai Oracle"}
        intro="A non-political, non-profit family of devotees walking the path of love and service."
        image="/assets/events/20241123_191422.jpg"
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Markdown content={page?.content ?? ""} />

        <div className="mt-12">
          <SectionHeading
            eyebrow="Our Compass"
            title="Mission & Vision"
          />
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Love",
                text: "To practise the Atmic principle — one Self in all beings.",
                color: "bg-gulal-500",
                icon: (
                  <path d="M12 20.5S4 15.4 4 9.6C4 7.1 6 5.2 8.4 5.2c1.6 0 3 .9 3.6 2.1.6-1.2 2-2.1 3.6-2.1 2.4 0 4.4 1.9 4.4 4.4 0 5.8-8 10.9-8 10.9Z" />
                ),
              },
              {
                title: "Service",
                text: "Narayan Seva, education and human values in daily life.",
                color: "bg-saffron-500",
                icon: (
                  <g>
                    <path d="M4 14.5h16a8 8 0 0 1-16 0Z" />
                    <path d="M12 3.5c1.2 1.9 2.5 3.2 2.5 5a2.5 2.5 0 0 1-5 0c0-1.8 1.3-3.1 2.5-5Z" />
                  </g>
                ),
              },
              {
                title: "Unity",
                text: "People of all faiths on one journey to the Divine.",
                color: "bg-peacock-500",
                icon: (
                  <g>
                    <circle cx="9.2" cy="12" r="5.2" />
                    <circle cx="14.8" cy="12" r="5.2" />
                  </g>
                ),
              },
            ].map((c) => (
              <RevealItem key={c.title}>
                <SpotlightCard className="group relative h-full overflow-hidden rounded-2xl border border-maroon-100 bg-white p-5 shadow-sm">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 origin-left scale-x-0 divider-festive transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <span
                    aria-hidden
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${c.color}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      {c.icon}
                    </svg>
                  </span>
                  <p className="mt-3 font-display text-xl font-bold text-maroon-900">{c.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-stone-600">{c.text}</p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-12">
          <SectionHeading eyebrow="Go Deeper" title="Explore More" />
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                href: "/aims",
                title: "Aims & Objectives",
                text: "Global oneness, Narayan Seva, Mission Karuna and the five human values.",
                color: "bg-maroon-700",
                icon: (
                  <g>
                    <circle cx="12" cy="12" r="7.5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
                  </g>
                ),
              },
              {
                href: "/experiences",
                title: "Devotee's Experiences",
                text: "Miracles, cures and divine leelas lived by devotees of Bhagwan and Pujniye Maa.",
                color: "bg-gulal-600",
                icon: (
                  <g>
                    <path d="M11 4l1.6 4.6L17.5 10l-4.9 1.4L11 16l-1.6-4.6L4.5 10l4.9-1.4L11 4Z" />
                    <path d="M18 15.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
                  </g>
                ),
              },
            ].map((c) => (
              <RevealItem key={c.href}>
                <SpotlightCard className="h-full overflow-hidden rounded-2xl border border-maroon-100 bg-white">
                  <Link href={c.href} className="group relative block p-6">
                    <div aria-hidden className="absolute inset-x-0 top-0 divider-festive" />
                    <span
                      aria-hidden
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${c.color}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        {c.icon}
                      </svg>
                    </span>
                    <p className="mt-3 inline-flex items-center gap-1.5 font-display text-2xl font-bold text-maroon-900 group-hover:text-maroon-600">
                      {c.title} <ArrowIcon />
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-stone-600">{c.text}</p>
                  </Link>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-12">
          <SectionHeading eyebrow="Devotees Speak" title="Devotee Experiences" />
          <Reveal className="mt-6">
            <Testimonials items={experiences} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
