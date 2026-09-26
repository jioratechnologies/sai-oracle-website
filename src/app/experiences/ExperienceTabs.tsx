"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowIcon } from "@/components/ArrowLink";
import ExperienceGrid from "./ExperienceGrid";
import type { ExperienceStory } from "@/lib/types";

const TABS = [
  { id: "devotee", label: "Devotee Experiences" },
  { id: "maa", label: "Maa" },
  { id: "miracles", label: "Miraculous Life" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const MAA_CARDS = [
  {
    href: "/gurumaa",
    title: "Glorious & Blissful Life",
    text: "Her childhood in Agra, the darshan of Lord Shiva at age five, and the sakshaat darshan of Sai Baba at seventeen.",
    image: "/assets/content/maa/1.webp",
  },
  {
    href: "/gurumaa-life-sketch",
    title: "Maa Life Sketch",
    text: "Who Maa is — the Master Mother, her early spiritual signs, and the five-fold path of Sathya, Dharma, Shanti, Prema and Ahimsa.",
    image: "/assets/content/maa-life-sketch/abhishek.webp",
  },
  {
    href: "/experiences?tab=miracles",
    title: "Miraculous Life of Maa",
    text: "Divine experiences, miracles, healing of devotees, and deep communion with Lord Shiva and Bhagawan Sri Sathya Sai Baba.",
    image: "/assets/content/miracles/astonishing-miracle-photo.webp",
  },
];

export default function ExperienceTabs({ stories }: { stories: ExperienceStory[] }) {
  const searchParams = useSearchParams();
  const paramTab = searchParams.get("tab");
  const initialTab: TabId =
    paramTab === "maa" ? "maa" : paramTab === "miracles" ? "miracles" : "devotee";
  const [tab, setTab] = useState<TabId>(initialTab);

  return (
    <div>
      <div className="flex justify-center gap-2" role="tablist" aria-label="Experiences">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
              tab === t.id
                ? "btn-festive text-white shadow-md"
                : "border-2 border-maroon-200 text-maroon-800 hover:bg-maroon-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "devotee" ? (
          <ExperienceGrid stories={stories} />
        ) : (
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MAA_CARDS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group overflow-hidden rounded-3xl border border-maroon-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-cream-100">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-xl font-bold text-maroon-900 group-hover:text-maroon-700">
                    {c.title}
                  </p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-stone-600">{c.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-700">
                    Read more
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
