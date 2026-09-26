// One-off migration: upserts the legacy-site pages (Gurumaa, sadhana
// pages, devotee experience stories) into Supabase `site_pages`, mirroring
// the inserts in supabase/seed.sql so a fresh DB and an existing one both
// end up with the same rows.
//
// Usage:
//   node --env-file=.env.local scripts/push-legacy-pages.mjs
//
// Requires SUPABASE_SECRET_KEY (Dashboard → Settings → API → secret keys)
// in the environment — it bypasses RLS, so never expose it to the browser
// or commit it. Safe to re-run: rows are upserted by slug.

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SECRET_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in the environment.");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SECRET_KEY);

const pages = [
  {
    slug: "gurumaa",
    title: "Gurumaa",
    content: `## Glorious & Blissful Life

Some souls take birth in human form to light the path of spiritual evolution for others. Gurumaa, born in Agra in January 1962, is one such soul — through her satsang, sadhana and selfless seva she has guided thousands of Sai devotees toward the lotus feet of the Lord.

## A Childhood Touched by the Divine

Her grandmother Kaushalya Devi, a devotee of Lord Shiva, carried her before dawn each day to the Manakameshwar Mandir for abhishek. At the age of five, Maa describes her first darshan of Lord Shiva during one such abhishek — an experience that shaped the course of her spiritual life. Family visits to Vrindavan brought visions of Lord Krishna at play in the kunj-galiyan.

## Meeting Sai Baba

Sai Baba began appearing to her in dream darshan long before a single photograph of Him stood in her home. Her devotion deepened through sustained meditation, and at the age of seventeen she describes her first direct (sakshaat) darshan of Swami before dawn — received, she says, like a father embracing his daughter.

## Ongoing Sadhana

The daily abhishek of Lord Shiva and Sai Baba that began in her childhood continues today at Satyadeep Sai Universe and Shiv Sai Universe, where she guides devotees on the path of meditation, faith and selfless service.

![Gurumaa](/legacy/home/Pujniye_maa.webp)`,
  },
  {
    slug: "gurumaa-life-sketch",
    title: "Gurumaa — A Life Sketch",
    content: `## Master Mother

Gurumaa — a "Master Mother" — is known among devotees for her unwavering faith in Sai Baba, her guided meditation practice and her gentle way of leading people toward the divine. Devotees describe her life as an ongoing lesson in Bhakti Yoga (devotion), Karma Yoga (right action), Jnana Yoga (knowledge) and Dhyana Yoga (meditation).

## Early Signs

Born in Agra, Maa is remembered by her family as showing deep inner stillness from early childhood — long stretches of meditation by age seven, and her first darshan of Sai Baba at age nine. By twelve, devotees say, she had experienced darshan of Hanuman, Satya Sai Baba and Shirdi Sai Baba.

## The Five-Fold Path

She teaches a five-fold path given to her by Sai Baba — **Sathya** (Truth), **Dharma** (Righteousness), **Shanti** (Peace), **Prema** (Love) and **Ahimsa** (Non-violence) — as the foundation for a meaningful life.

![Gurumaa](/legacy/gurumaa/gurumaa-t.jpg)`,
  },
  {
    slug: "teachings",
    title: "Her Teachings",
    content: `## Love & Service

Maa's teaching holds that love binds together all four human values — truth in thought, peace in feeling, righteousness in action, non-violence in understanding. Love, she teaches, should not be measured out by caste, creed or status, but should flow freely.

## Prema — The Highest Sadhana

Devotees are guided to nurture Prema (love) the way a farmer tends a crop — watering it, clearing the weeds of envy and anger, and waiting patiently for the harvest. Transforming love into service, and service into worship, is taught as the highest sadhana.

## Seva

"Hands that help are holier than lips that pray." Selfless service is taught as a discipline that widens the heart, dissolves ego, and is itself a form of worship offered at the Lord's feet.`,
  },
  {
    slug: "discourses",
    title: "Discourses",
    content: `## Sathya (Truth)

Speak truthfully, and speak it gently — this is emphasised as the chief duty of man. Devotees are encouraged to hold to truth regardless of consequence, since truth is described as a form of God Himself.

## Dharma (Right Conduct)

Life is likened to a play in which each person acts the part assigned to them, without becoming attached to the role. See good, hear good, speak good, think good, do good — this fivefold discipline is taught as the way to God.

## Shanti (Peace)

Peace comes from faith in God and in oneself, and from releasing excessive desire and expectation. Like a sky undisturbed by passing storms, the mind is encouraged to stay steady through life's changes.`,
  },
  {
    slug: "universe",
    title: "Satyadeep Sai Universe",
    content: `## A Place Apart

Satyadeep Sai Universe, Shiv Sai Universe and the Sarva Dharma Sthal form a spiritual centre set apart from the pace of daily life, where devotees of every caste, creed and religion are welcome to worship side by side — Sabka Malik Ek, "one Lord for all."

## Darshan & Aarti Timings

- Darshan — 6:00 AM to 8:30 PM
- Aarti — 9:00 AM, 12:00 PM and 6:00 PM
- Bhajan — Thursdays, 6:00 PM to 7:00 PM
- Discourse by Maa — Thursdays, 7:00 PM to 7:45 PM
- Maa's darshan — around 6:00–7:30 PM, subject to her availability

## Visiting Hours

The Universe is open daily from 7:00 AM to 12:00 PM and 4:00 PM to 8:30 PM. Visitors are welcome to take part in Nishkama Seva (selfless service without attachment to results) and in the meditation camps held from time to time under Maa's guidance.

![Satyadeep Sai Universe](/legacy/universe/saibaba-uni.jpg)`,
  },
  {
    slug: "meditation",
    title: "Essence of Meditation",
    content: `## Essence of Meditation

Meditation, as taught here, is not concentration but absorption — setting aside every other thought until only God remains. Devotees are guided to fix on a jyoti (flame) as an object of meditation, seated at the same place and time each day, ideally in the early hours before dawn.

## The Rose Analogy

Concentration is noticing where the thorns and the flower are on a rose plant. Contemplation is cutting the flower free of the thorns of worldly desire. Meditation is offering that flower to the Lord.`,
  },
  {
    slug: "meditation-technique",
    title: "Meditation Technique",
    content: `## Satyadeep Meditation — Step by Step

1. Set aside a few quiet minutes each day, preferably before dawn.
2. Sit comfortably on a thin mattress, in a pose that is easy to hold.
3. Chant "Om" at least 21 times to still the mind.
4. Breathe in rhythm with eyes closed — "So" on the inhale, "Hum" on the exhale ("So-Hum" — I am That).
5. Gaze at a flame, then close the eyes and feel its light spread through the body, purifying sight, speech, hearing and action in turn.
6. Open the eyes briefly to look at the flame again, then picture your chosen form of the Divine within it.
7. Repeat "Om Sai Ram," or a personal mantra, gently and without strain.
8. Sit in silent meditation for 10–15 minutes, then let the mantra fall away.
9. Open the eyes slowly to close the practice.`,
  },
  {
    slug: "charitable-trust",
    title: "Sri Sai Sansthan Charitable Trust",
    content: `## Sri Sai Sansthan Charitable Trust

Established by Gurumaa under the inspiration of Bhagwan Sri Sai Baba, the Trust organises meditation camps, divine discourses, bhajans, and cultural and heritage programmes, and runs Narayan Seva for the poor — carrying forward the message of "love all, serve all."

## Registration

Sri Sai Sansthan Charitable Trust is registered under Section 80G of the Income Tax Act, 1961; contributions are eligible for income-tax deduction as per applicable limits.

*"Kindness towards the poor is devotion to God."*

![Trust activities](/legacy/charitable/chart-trust-147.jpg)`,
  },
  {
    slug: "contribution",
    title: "Contribution",
    content: `## Join the Mission

Satyadeep Sai Universe continues to grow through the generosity of its devotees. Contributions support meditation camps, discourses, Narayan Seva, the charitable school for underprivileged children, and the ongoing development of the Universe.

"Let us not just worship the statue of Sai Baba — let us worship the living God in everyone." As Sai Baba taught, hands that serve are holier than lips that pray — though prayer offered alongside selfless service is dearest of all.

To contribute, please write to the temple office — see the [Contact page](/contact).

![Contribution](/legacy/contribution/contribution.jpg)`,
  },
  {
    slug: "rules-regulations",
    title: "Rules & Regulations",
    content: `## Rules & Regulations

- Please dress modestly and maintain silence in the sanctum and prayer hall.
- Switch off mobile phones before entering the prayer hall.
- Photography inside the sanctum is restricted — please follow volunteer guidance.
- Footwear should be removed before entering the prayer hall.
- Prasad is distributed after aarti — please receive and partake respectfully.
- Please arrive a few minutes ahead of aarti and bhajan timings so as not to disturb worship already in progress.

For visiting hours and darshan timings, see the [Satyadeep Sai Universe](/universe) page.`,
  },
];

const { error } = await sb.from("site_pages").upsert(pages, { onConflict: "slug" });
if (error) {
  console.error("Upsert failed:", error.message);
  process.exit(1);
}
console.log(`Upserted ${pages.length} site_pages rows.`);
