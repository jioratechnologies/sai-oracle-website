-- ============================================================
-- Sai Oracle — starter content (run AFTER schema.sql)
-- ============================================================

insert into public.site_settings
  (organization_name, tagline, description, phone, email, address, maps_url,
   youtube_url, morning_opening, night_closing)
values
  ('Sai Oracle',
   'A place of devotion, faith and service',
   'Satyadeep Sai Organisation is a non-political, non-profit organisation founded by beloved Maa under the inspiration of Bhagwan Satya Sai Baba — home to the Trinity of Sai Avatars (Shirdi Sai, Satya Sai, Prema Sai).',
   '',
   'saioracle@hotmail.com',
   'NH-58, Roorkee Road, Godwin Estate, Sofipur, Near 3rd Milestone Restaurant, Meerut Cantt, Uttar Pradesh – 250001, India',
   'https://maps.google.com/?q=Sai+Oracle+Meerut',
   'https://www.youtube.com',
   '5:30 AM',
   '10:00 PM')
on conflict do nothing;

insert into public.temple_timings (label, time, sort_order) values
  ('Temple Opening (Kakad / Morning)', '5:30 AM', 1),
  ('Kakad Aarti', '5:45 AM', 2),
  ('Madhyan Aarti', '12:00 PM', 3),
  ('Dhoop Aarti', '6:30 PM', 4),
  ('Shej Aarti', '9:30 PM', 5),
  ('Temple Closing', '10:00 PM', 6)
on conflict do nothing;

insert into public.events
  (title, slug, description, event_date, start_time, end_time, location, status)
values
  ('Guru Purnima Celebration', 'guru-purnima-celebration',
   'Join us for Guru Purnima — Kakad Aarti, special bhajans, Guru Paduka Pooja, discourses by beloved Maa, and Narayan Seva (Annadanam) for all devotees. All devotees and families are cordially invited.',
   '2026-10-26', '06:00', '13:00', 'Sai Oracle Temple, Meerut', 'published'),
  ('Weekly Sai Bhajan Sandhya', 'weekly-sai-bhajan-sandhya',
   'Every Thursday evening the temple resounds with Sai bhajans, Naam Smaranam and Dhoop Aarti. Come, sing, and soak in the divine vibration.',
   '2026-09-10', '18:00', '20:00', 'Sai Oracle Temple, Meerut', 'published'),
  ('Narayan Seva — Annadanam', 'narayan-seva-annadanam',
   'Monthly food service for the poor and needy. Devotees may volunteer or contribute provisions. Serving food is serving Sai.',
   '2026-09-20', '11:00', '14:00', 'Sai Oracle Temple, Meerut', 'published')
on conflict (slug) do nothing;

insert into public.announcements (title, content, status) values
  ('Temple Timing Update',
   'During the festive week the temple will remain open until 10:00 PM. Shej Aarti will be held at 9:30 PM followed by prasad distribution.',
   'published'),
  ('Narayan Seva Volunteers Needed',
   'Sevadals and devotees are requested to register at the temple office for the upcoming Annadanam. Your small service is Baba''s biggest blessing.',
   'published')
on conflict do nothing;

insert into public.youtube_videos (title, youtube_url, published) values
  ('Sacred Abhishek & Divine Darshan — Satyadeep Sai Universe', 'https://www.youtube.com/watch?v=Nfr_LeJq6bM', true),
  ('Divine Bhajans & Aarti Celebration — Holy Satsang', 'https://www.youtube.com/watch?v=Y6L_3PZLBAg', true)
on conflict do nothing;

insert into public.site_pages (slug, title, content) values
  ('about', 'About Sai Oracle',
   '## About Sai Oracle' || chr(10) || chr(10) ||
   'Satyadeep Sai Organisation is a non-political, non-profit organisation, founded by **beloved Maa** under the inspiration of **Bhagwan Satya Sai Baba**.' || chr(10) || chr(10) ||
   '## The Trinity of Sai Avatars' || chr(10) || chr(10) ||
   'With the supreme blessings of Sai Baba, this temple became one of the first in India dedicated to the **Trinity of Sai Avatars — Shirdi Sai, Satya Sai and Prema Sai**.' || chr(10) || chr(10) ||
   '## Temple Life' || chr(10) || chr(10) ||
   '- Daily aartis — Kakad, Madhyan, Dhoop and Shej' || chr(10) ||
   '- Bhajans, regular pujas and Naam Smaranam' || chr(10) ||
   '- Narayan Seva (food service)' || chr(10) || chr(10) ||
   '**Om Sai Ram** — Satyadeep Sai Organisation'),
  ('temple', 'Temple & Worship',
   '## Daily Programme' || chr(10) || chr(10) ||
   'The temple follows the sacred rhythm of the four aartis, as in Shirdi: Kakad, Madhyan, Dhoop and Shej Aarti.' || chr(10) || chr(10) ||
   '## Sevas & Activities' || chr(10) || chr(10) ||
   '- Daily aartis, bhajans, pujas and Naam Smaranam' || chr(10) ||
   '- Narayan Seva (Annadanam) — monthly food service' || chr(10) ||
   '- Charitable school for underprivileged children' || chr(10) || chr(10) ||
   '## Temple Etiquette' || chr(10) || chr(10) ||
   '- Please dress modestly and maintain silence in the sanctum' || chr(10) ||
   '- Switch off mobile phones inside the prayer hall'),
  ('privacy', 'Privacy Policy',
   '## Privacy Policy' || chr(10) || chr(10) ||
   'Sai Oracle respects your privacy. We do not create public user accounts and do not sell personal data. Linked YouTube videos are governed by Google''s privacy policy.'),
  ('terms', 'Terms of Use',
   '## Terms of Use' || chr(10) || chr(10) ||
   'Content on this website is for devotional and informational purposes. Event dates, timings and programmes may change; please confirm with the temple office before travelling.')
on conflict (slug) do nothing;

-- Legacy Devotee.htm / Aims.htm texts (also editable via Admin → Pages)
insert into public.site_pages (slug, title, content) values
  ('experiences', 'Devotee''s Experience', $$## Devotee's Experiences — Miracles and Experiences

The Miracles of Bhagwan are a manifestation of His divine powers of omnipresence, omnipotence and omniscience. Bhagwan calls miracles His visiting cards, and leelas (divine sport) are in the very nature of the Avatar. Thousands of people around the world have experienced the divinity of Bhagwan — some miraculously saved from dire situations, others spiritually illumined.

In these pages, we present some of the experiences of devotees of Bhagwan, along with their beloved Maa.

## 1. The Power of Prayer

- **The Unbelievable Cure** — how Baba brought Sai Neha back to life.
- **The Fruit of Unflinching Faith** — how Baba responded to Sai Roma and changed her way of life.
- **Sai Sadhika Miracle** — how, through Maa's prayer, a child Sadhika was gifted to her parents.

## 2. Transformation of the Heart

- **The Story of Sai Suman** — how Baba and Maa's love changed Sai Suman's heart.
- **The Gift of Grace** — how Sai Roma's faith gave her a new, transformed life.
- **The Story of Sai Suchita** — how Baba transformed her, and her darshan of the Trinity of Sai Avatars.

## 3. Miracle Saves

- **Special Saving Grace** — how Baba saved Sai Neha from fire.
- How Baba saved the life of Sai Sanjana.

## 4. Miracle Cures

- **Special Curing Grace** — how Baba saved the life of Sai Suresh.
- **I Just Had a Typhoid** — how Swami's blessings and Maa's prayer saved Sai Pragyan.

## 5. The One Appears as Many

- **Divine Teachings to Balvikas** — how Baba taught Balvikas students the way to live.
- **The Lord — Ever Alert for His Devotee** — how Baba appeared as a stranger to save Sai Neha's documents.
- **Sai Leela Miracle** — how Swami's blessing and Maa's prayer led a devotee to Satyadeep Sai Universe.

## 6. Divine Sport

- **The Master (Sai Baba) Plays with Matter** — the importance of the Guru, revealed to Sai Neha.

## 7. Divine Leelas — Divine Darshans

How Sai Baba showed the importance of the Guru and gave darshan to His devotees.$$),
  ('aims', 'Aims & Objectives', $$## Aims & Objectives

Following are the aims and objectives of Sri Sai Sansthan Charitable Trust.

## 1. Global Oneness

Uniting people around the globe in sacred action — transforming the planet through spiritual awareness. At Satyadeep Sai Universe, people of all castes, creeds and religions join hands for humanity's upliftment and worship at the Sarva Dharma Sthal.

## 2. Spiritual Inspiration

A place where seekers from all over the world come to attain full spiritual awakening — exploring the hidden inner source of strong energies lying unused within us.

## 3. Narayan Seva

Providing food to poor children whose parents cannot provide for them.

## 4. Fostering Seeds of Love and Service

Propagating equal-mindedness under Maa's guidance — meditation and discourses that awaken inner joy. Love is the seed, courage the blossom, peace the fruit. The Trust builds character through the five human values — **Sathya, Dharma, Shanti, Prema and Ahimsa**.

## 5. Sacred Cause — Mission Karuna

**Mission Karuna — "Empowering Balvikas Children."** Financial support for poor children's education, irrespective of caste, colour, creed or religion — so they may one day support themselves. **Join hands to be a part of this noble mission.**$$)
on conflict (slug) do nothing;

-- Gurumaa, sadhana & organisation pages migrated from the legacy site
insert into public.site_pages (slug, title, content) values
  ('gurumaa', 'Gurumaa', $$## Glorious & Blissful Life

Some souls take birth in human form to light the path of spiritual evolution for others. Beloved Maa, born in Agra in January 1962, is one such soul — through her satsang, sadhana and selfless seva she has guided thousands of Sai devotees toward the lotus feet of the Lord.

## A Childhood Touched by the Divine

Her grandmother Kaushalya Devi, a devotee of Lord Shiva, carried her before dawn each day to the Manakameshwar Mandir for abhishek. At the age of five, Maa describes her first darshan of Lord Shiva during one such abhishek — an experience that shaped the course of her spiritual life. Family visits to Vrindavan brought visions of Lord Krishna at play in the kunj-galiyan.

## Meeting Sai Baba

Sai Baba began appearing to her in dream darshan long before a single photograph of Him stood in her home. Her devotion deepened through sustained meditation, and at the age of seventeen she describes her first direct (sakshaat) darshan of Swami before dawn — received, she says, like a father embracing his daughter.

## Ongoing Sadhana

The daily abhishek of Lord Shiva and Sai Baba that began in her childhood continues today at Satyadeep Sai Universe and Shiv Sai Universe, where she guides devotees on the path of meditation, faith and selfless service.

![Gurumaa](/legacy/home/Pujniye_maa.webp)$$),
  ('gurumaa-life-sketch', 'Gurumaa — A Life Sketch', $$## Master Mother

Maa — a "Master Mother" — is known among devotees for her unwavering faith in Sai Baba, her guided meditation practice and her gentle way of leading people toward the divine. Devotees describe her life as an ongoing lesson in Bhakti Yoga (devotion), Karma Yoga (right action), Jnana Yoga (knowledge) and Dhyana Yoga (meditation).

## Early Signs

Born in Agra, Maa is remembered by her family as showing deep inner stillness from early childhood — long stretches of meditation by age seven, and her first darshan of Sai Baba at age nine. By twelve, devotees say, she had experienced darshan of Hanuman, Satya Sai Baba and Shirdi Sai Baba.

## The Five-Fold Path

She teaches a five-fold path given to her by Sai Baba — **Sathya** (Truth), **Dharma** (Righteousness), **Shanti** (Peace), **Prema** (Love) and **Ahimsa** (Non-violence) — as the foundation for a meaningful life.

![Gurumaa](/legacy/gurumaa/gurumaa-t.jpg)$$),
  ('teachings', 'Her Teachings', $$## Love & Service

Maa's teaching holds that love binds together all four human values — truth in thought, peace in feeling, righteousness in action, non-violence in understanding. Love, she teaches, should not be measured out by caste, creed or status, but should flow freely.

## Prema — The Highest Sadhana

Devotees are guided to nurture Prema (love) the way a farmer tends a crop — watering it, clearing the weeds of envy and anger, and waiting patiently for the harvest. Transforming love into service, and service into worship, is taught as the highest sadhana.

## Seva

"Hands that help are holier than lips that pray." Selfless service is taught as a discipline that widens the heart, dissolves ego, and is itself a form of worship offered at the Lord's feet.$$),
  ('discourses', 'Discourses', $$## Sathya (Truth)

Speak truthfully, and speak it gently — this is emphasised as the chief duty of man. Devotees are encouraged to hold to truth regardless of consequence, since truth is described as a form of God Himself.

## Dharma (Right Conduct)

Life is likened to a play in which each person acts the part assigned to them, without becoming attached to the role. See good, hear good, speak good, think good, do good — this fivefold discipline is taught as the way to God.

## Shanti (Peace)

Peace comes from faith in God and in oneself, and from releasing excessive desire and expectation. Like a sky undisturbed by passing storms, the mind is encouraged to stay steady through life's changes.$$),
  ('universe', 'Satyadeep Sai Universe', $$## A Place Apart

Satyadeep Sai Universe, Shiv Sai Universe and the Sarva Dharma Sthal form a spiritual centre set apart from the pace of daily life, where devotees of every caste, creed and religion are welcome to worship side by side — Sabka Malik Ek, "one Lord for all."

## Darshan & Aarti Timings

- Darshan — 6:00 AM to 8:30 PM
- Aarti — 9:00 AM, 12:00 PM and 6:00 PM
- Bhajan — Thursdays, 6:00 PM to 7:00 PM
- Discourse by Maa — Thursdays, 7:00 PM to 7:45 PM
- Maa's darshan — around 6:00–7:30 PM, subject to her availability

## Visiting Hours

The Universe is open daily from 7:00 AM to 12:00 PM and 4:00 PM to 8:30 PM. Visitors are welcome to take part in Nishkama Seva (selfless service without attachment to results) and in the meditation camps held from time to time under Maa's guidance.

![Satyadeep Sai Universe](/legacy/universe/saibaba-uni.jpg)$$),
  ('meditation', 'Essence of Meditation', $$## Essence of Meditation

Meditation, as taught here, is not concentration but absorption — setting aside every other thought until only God remains. Devotees are guided to fix on a jyoti (flame) as an object of meditation, seated at the same place and time each day, ideally in the early hours before dawn.

## The Rose Analogy

Concentration is noticing where the thorns and the flower are on a rose plant. Contemplation is cutting the flower free of the thorns of worldly desire. Meditation is offering that flower to the Lord.$$),
  ('meditation-technique', 'Meditation Technique', $$## Satyadeep Meditation — Step by Step

1. Set aside a few quiet minutes each day, preferably before dawn.
2. Sit comfortably on a thin mattress, in a pose that is easy to hold.
3. Chant "Om" at least 21 times to still the mind.
4. Breathe in rhythm with eyes closed — "So" on the inhale, "Hum" on the exhale ("So-Hum" — I am That).
5. Gaze at a flame, then close the eyes and feel its light spread through the body, purifying sight, speech, hearing and action in turn.
6. Open the eyes briefly to look at the flame again, then picture your chosen form of the Divine within it.
7. Repeat "Om Sai Ram," or a personal mantra, gently and without strain.
8. Sit in silent meditation for 10–15 minutes, then let the mantra fall away.
9. Open the eyes slowly to close the practice.$$),
  ('charitable-trust', 'Sri Sai Sansthan Charitable Trust', $$## Sri Sai Sansthan Charitable Trust

Established by beloved Maa under the inspiration of Bhagwan Sri Sai Baba, the Trust organises meditation camps, divine discourses, bhajans, and cultural and heritage programmes, and runs Narayan Seva for the poor — carrying forward the message of "love all, serve all."

## Registration

Sri Sai Sansthan Charitable Trust is registered under Section 80G of the Income Tax Act, 1961; contributions are eligible for income-tax deduction as per applicable limits.

*"Kindness towards the poor is devotion to God."*

![Trust activities](/legacy/charitable/chart-trust-147.jpg)$$),
  ('contribution', 'Contribution', $$## Join the Mission

Satyadeep Sai Universe continues to grow through the generosity of its devotees. Contributions support meditation camps, discourses, Narayan Seva, the charitable school for underprivileged children, and the ongoing development of the Universe.

"Let us not just worship the statue of Sai Baba — let us worship the living God in everyone." As Sai Baba taught, hands that serve are holier than lips that pray — though prayer offered alongside selfless service is dearest of all.

To contribute, please write to the temple office — see the [Contact page](/contact).

![Contribution](/legacy/contribution/contribution.jpg)$$),
  ('rules-regulations', 'Rules & Regulations', $$## Rules & Regulations

- Please dress modestly and maintain silence in the sanctum and prayer hall.
- Switch off mobile phones before entering the prayer hall.
- Photography inside the sanctum is restricted — please follow volunteer guidance.
- Footwear should be removed before entering the prayer hall.
- Prasad is distributed after aarti — please receive and partake respectfully.
- Please arrive a few minutes ahead of aarti and bhajan timings so as not to disturb worship already in progress.

For visiting hours and darshan timings, see the [Satyadeep Sai Universe](/universe) page.$$)
on conflict (slug) do nothing;


-- GALLERY PHOTOS (hosted directly on Supabase Storage: temple-media)
insert into public.gallery (title, image_url) values
  ('20250112 191226', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20250112_191226.webp'),
  ('20250112 191238', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20250112_191238.webp'),
  ('20251015 192749', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251015_192749.webp'),
  ('20251015 192752', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251015_192752.webp'),
  ('20251015 193608', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251015_193608.webp'),
  ('20251015 193815', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251015_193815.webp'),
  ('20251119 201212', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251119_201212.webp'),
  ('20251119 201237', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251119_201237.webp'),
  ('20251119 201240', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251119_201240.webp'),
  ('20251119 201341', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251119_201341.webp'),
  ('20251119 202037', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251119_202037.webp'),
  ('20251119 202119', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251119_202119.webp'),
  ('20251119 202150', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251119_202150.webp'),
  ('20251119 202321', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251119_202321.webp'),
  ('20251119 215111', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20251119_215111.webp'),
  ('20260215 202024', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20260215_202024.webp'),
  ('20260521 192740', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/20260521_192740.webp'),
  ('Durga', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/deities-png/durga.webp'),
  ('Gal 2021 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/deities-png/gal-2021-02.webp'),
  ('Ganesh', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/deities-png/ganesh.webp'),
  ('Radha Krishna', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/deities-png/radha-krishna.webp'),
  ('Sai Baba Throne Gold', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/deities-png/sai-baba-throne-gold.webp'),
  ('Sai Baba Throne Pink', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/deities-png/sai-baba-throne-pink.webp'),
  ('Sathya Sai Baba Collage', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/deities-png/sathya-sai-baba-collage.webp'),
  ('20241119 184230', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/events/20241119_184230.webp'),
  ('20241119 184424', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/events/20241119_184424.webp'),
  ('20241123 191422', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/events/20241123_191422.webp'),
  ('20241123 191948', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/events/20241123_191948.webp'),
  ('20241123 192235', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/events/20241123_192235.webp'),
  ('1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/1.webp'),
  ('2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/2.webp'),
  ('3', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/3.webp'),
  ('4', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/4.webp'),
  ('5', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/5.webp'),
  ('6', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/6.webp'),
  ('7 Must Have ', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/7-must-have-.webp'),
  ('Kali Mata', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/kali-mata.webp'),
  ('Kali Mata2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/kali-mata2.webp'),
  ('Mata Rani ', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/mata-rani-.webp'),
  ('Radha Krishna', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/radha-krishna.webp'),
  ('Shiv Parwati', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/shiv-parwati.webp'),
  ('20241024 195531', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/other/20241024_195531.webp'),
  ('20250112 182606', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/other/20250112_182606.webp'),
  ('20250112 182623', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/other/20250112_182623.webp'),
  ('20250112 182637', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/other/20250112_182637.webp'),
  ('20250112 182639', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/other/20250112_182639.webp'),
  ('Global One Ness 1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/global-one-ness-1.webp'),
  ('Global One Ness 3', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/global-one-ness-3.webp'),
  ('Global Oneness 2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/global-oneness-2.webp'),
  ('Love And Service', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/love-and-service.webp'),
  ('Mission Karuna 1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/mission-karuna-1.webp'),
  ('Mission Karuna 2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/mission-karuna-2.webp'),
  ('Mission Karuna 3', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/mission-karuna-3.webp'),
  ('Narayan Seva 1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/narayan-seva-1.webp'),
  ('Narayan Seva 2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/narayan-seva-2.webp'),
  ('Narayan Seva 3peg', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/aims/narayan-seva-3peg.webp'),
  ('Love And Service Main Page Photo', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/home/love-and-service-main-page-photo.webp'),
  ('Love Service Devotion Main Page Photo Small Size Me', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/home/love-service-devotion-main-page-photo-small-size-me.webp'),
  ('20260521 192740', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/maa-life-sketch/20260521_192740.webp'),
  ('Dscn05600001amit Shirdi', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/maa-life-sketch/dscn05600001amit-shirdi.webp'),
  ('Img 7619', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/maa-life-sketch/img_7619.webp'),
  ('Abhishek', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/maa-life-sketch/abhishek.webp'),
  ('Maa Photo For Header', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/maa-life-sketch/maa-photo-for-header.webp'),
  ('Scan4', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/maa-life-sketch/scan4.webp'),
  ('1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/maa/1.webp'),
  ('2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/maa/2.webp'),
  ('3', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/maa/3.webp'),
  ('Astonishing Miracle 2 Photo', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/miracles/astonishing-miracle-2-photo.webp'),
  ('Astonishing Miracle 3 Photo', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/miracles/astonishing-miracle-3-photo.webp'),
  ('Astonishing Miracle Photo', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/miracles/astonishing-miracle-photo.webp'),
  ('Laxmi Ganesh Miracle Photo', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/miracles/laxmi-ganesh-miracle-photo.webp'),
  ('Paduka Miracle Photo', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/miracles/paduka-miracle-photo.webp'),
  ('Swami Singhasan Miracle Photo', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/miracles/swami-singhasan-miracle-photo.webp'),
  ('G1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/miracles/g1.webp'),
  ('G2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/miracles/g2.webp'),
  ('Gurumaa T', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/miracles/gurumaa_t.webp'),
  ('20260521 192740', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/mission-karuna/20260521_192740.webp'),
  ('Dsc 0205', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/mission-karuna/dsc_0205.webp'),
  ('Photo140 1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/mission-karuna/photo140-1.webp'),
  ('Photo', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/mission-karuna/photo.webp'),
  ('20241123 192235', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/narayan-seva/20241123_192235.webp'),
  ('Copy Of Img 1602', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/narayan-seva/copy-of-img_1602.webp'),
  ('Img 1561', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/narayan-seva/img_1561.webp'),
  ('Img 2927', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/narayan-seva/img_2927.webp'),
  ('Seva 1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/narayan-seva/seva-1.webp'),
  ('Seva 2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/narayan-seva/seva-2.webp'),
  ('20151223 124437', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20151223_124437.webp'),
  ('20151224 200630', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20151224_200630.webp'),
  ('20241024 195531', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20241024_195531.webp'),
  ('20241123 191950', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20241123_191950.webp'),
  ('20250112 182606', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20250112_182606.webp'),
  ('20250112 182620', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20250112_182620.webp'),
  ('20250112 182623', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20250112_182623.webp'),
  ('20250112 182637', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20250112_182637.webp'),
  ('20250112 182642', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20250112_182642.webp'),
  ('20250112 184206', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20250112_184206.webp'),
  ('20250112 184251', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20250112_184251.webp'),
  ('20251015 192749', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20251015_192749.webp'),
  ('20251015 192752', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20251015_192752.webp'),
  ('20251015 193815', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20251015_193815.webp'),
  ('20251119 202119', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20251119_202119.webp'),
  ('20251119 202150', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20251119_202150.webp'),
  ('20251119 215111', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20251119_215111.webp'),
  ('20260215 202024', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20260215_202024.webp'),
  ('20260521 192740', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/20260521_192740.webp'),
  ('Dsc 0048', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/dsc_0048.webp'),
  ('Dsc 0058', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/dsc_0058.webp'),
  ('Dsc 0060', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/dsc_0060.webp'),
  ('Dsc 0205', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/dsc_0205.webp'),
  ('Dsc 0216', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/dsc_0216.webp'),
  ('Img 2927', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/gallery/img_2927.webp'),
  ('20240826 211758', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/20240826_211758.webp'),
  ('20240826 211811', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/20240826_211811.webp'),
  ('20250327 193252', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/20250327_193252.webp'),
  ('20250327 193307', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/20250327_193307.webp'),
  ('20251119 215106', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/20251119_215106.webp'),
  ('20260521 192740', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/20260521_192740.webp'),
  ('Dsc 0167', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/dsc_0167.webp'),
  ('Dsc 0180', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/dsc_0180.webp'),
  ('Dsc 0216', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/dsc_0216.webp'),
  ('Hanuman Ji', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/hanuman-ji.webp'),
  ('Mata Rani Krishna', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/slider/mata-rani-krishna.webp'),
  ('Img 7403 Copy', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/universe/img_7403-copy.webp'),
  ('Mata Rani Krishna', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/universe/mata-rani-krishna.webp'),
  ('Sai Baba4 B', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/universe/sai_baba4_b.webp'),
  ('Sssumix', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/universe/sssumix.webp'),
  ('Saibaba Uni', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/universe/saibaba_uni.webp'),
  ('Sssumix2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/content/universe/sssumix2.webp'),
  ('CONT 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/CONT-01.gif'),
  ('CONT 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/CONT-02.gif'),
  ('Chart Trust 147updt', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/chart_trust_147updt.jpg'),
  ('Chart Trust 281updat', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/chart_trust_281updat.jpg'),
  ('Chart Trust 62', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/chart_trust_62.jpg'),
  ('Chart Trust 76', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/chart_trust_76.jpg'),
  ('Contrbutiuon1596', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/contrbutiuon1596.jpg'),
  ('Meditation', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/meditation.gif'),
  ('Public', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/public.jpg'),
  ('Shivji Temple', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/archive/shivji_temple.jpg'),
  ('Baba Birth 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-01.jpg'),
  ('Baba Birth 010', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-010.jpg'),
  ('Baba Birth 011', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-011.jpg'),
  ('Baba Birth 012', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-012.jpg'),
  ('Baba Birth 013', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-013.jpg'),
  ('Baba Birth 014', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-014.jpg'),
  ('Baba Birth 015', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-015.jpg'),
  ('Baba Birth 016', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-016.jpg'),
  ('Baba Birth 017', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-017.jpg'),
  ('Baba Birth 018', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-018.jpg'),
  ('Baba Birth 019', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-019.jpg'),
  ('Baba Birth 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-02.jpg'),
  ('Baba Birth 020', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-020.jpg'),
  ('Baba Birth 021', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-021.jpg'),
  ('Baba Birth 022', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-022.jpg'),
  ('Baba Birth 023', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-023.jpg'),
  ('Baba Birth 024', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-024.jpg'),
  ('Baba Birth 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-03.jpg'),
  ('Baba Birth 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-04.jpg'),
  ('Baba Birth 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-05.jpg'),
  ('Baba Birth 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-06.jpg'),
  ('Baba Birth 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-07.jpg'),
  ('Baba Birth 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-08.jpg'),
  ('Baba Birth 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_baba-birth-09.jpg'),
  ('Gal 2019 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-01.jpg'),
  ('Gal 2019 011', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-011.jpg'),
  ('Gal 2019 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-03.jpg'),
  ('Gal 2019 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-05.jpg'),
  ('Gal 2019 010', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-010.jpg'),
  ('Gal 2019 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-02.jpg'),
  ('Gal 2019 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-04.jpg'),
  ('Gal 2019 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-06.jpg'),
  ('Gal 2019 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-07.jpg'),
  ('Gal 2019 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-08.jpg'),
  ('Gal 2019 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2019-09.jpg'),
  ('Gal 2020 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-01.jpg'),
  ('Gal 2020 010', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-010.jpg'),
  ('Gal 2020 011', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-011.jpg'),
  ('Gal 2020 012', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-012.jpg'),
  ('Gal 2020 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-02.jpg'),
  ('Gal 2020 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-03.jpg'),
  ('Gal 2020 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-04.jpg'),
  ('Gal 2020 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-05.jpg'),
  ('Gal 2020 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-06.jpg'),
  ('Gal 2020 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-07.jpg'),
  ('Gal 2020 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-08.jpg'),
  ('Gal 2020 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2020-09.jpg'),
  ('Gal 2021 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2021-01.jpg'),
  ('Gal 2021 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2021-02.jpg'),
  ('Gal 2021 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2021-03.jpg'),
  ('Gal 2021 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2021-04.jpg'),
  ('Gal 2021 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2021-05.jpg'),
  ('Gal 2021 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2021-06.jpg'),
  ('Gal 2021 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2021-07.jpg'),
  ('Gal 2021 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2021-08.jpg'),
  ('Gal 2021 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2021-09.jpg'),
  ('Gal 2022 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-01.jpg'),
  ('Gal 2022 010', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-010.jpg'),
  ('Gal 2022 011', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-011.jpg'),
  ('Gal 2022 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-02.jpg'),
  ('Gal 2022 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-03.jpg'),
  ('Gal 2022 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-04.jpg'),
  ('Gal 2022 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-05.jpg'),
  ('Gal 2022 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-06.jpg'),
  ('Gal 2022 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-08.jpg'),
  ('Plan T 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_plan-t-01.jpg'),
  ('Plan T 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_plan-t-03.jpg'),
  ('Plan T 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_plan-t-05.jpg'),
  ('Vlb Images1 2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/vlb_images1_2.jpg'),
  ('Vlb Images1 4', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/vlb_images1_4.jpg'),
  ('Vlb Images1 6', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/vlb_images1_6.jpg'),
  ('Vlb Images1 8', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/vlb_images1_8.jpg'),
  ('Vlb Images1 About Us 2u', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/vlb_images1_about_us_2u.jpg'),
  ('Crop Left', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/slider/crop_left.webp'),
  ('Ganesh Temple', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/ganesh-temple.webp'),
  ('Hanuman', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/hanuman.webp'),
  ('Gal 2022 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-07.jpg'),
  ('Gal 2022 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_gal-2022-09.jpg'),
  ('Plan T 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_plan-t-02.jpg'),
  ('Plan T 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_plan-t-04.jpg'),
  ('Plan T 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/images_plan-t-06.jpg'),
  ('Vlb Images1 3', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/vlb_images1_3.jpg'),
  ('Vlb Images1 5', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/vlb_images1_5.jpg'),
  ('Vlb Images1 7', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/vlb_images1_7.jpg'),
  ('Vlb Images1 9', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/gallery/legacy/vlb_images1_9.jpg'),
  ('Trinity Of Sai Avatars', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/home/trinity_of_sai_avatars.webp'),
  ('Crop Right', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/content/slider/crop_right.webp'),
  ('Ganesh', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/ganesh.webp'),
  ('Mata Rani Temple', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/assets/temple/god/mata-rani-temple.webp'),
  ('Aims', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/aims/aims.webp'),
  ('Inspiration', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/aims/inspiration.gif'),
  ('Love', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/aims/love.gif'),
  ('Love2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/aims/love2.gif'),
  ('2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/banner/2.webp'),
  ('3', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/banner/3.webp'),
  ('4', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/banner/4.webp'),
  ('5', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/banner/5.webp'),
  ('6', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/banner/6.webp'),
  ('7', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/banner/7.webp'),
  ('8', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/banner/8.webp'),
  ('9', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/banner/9.webp'),
  ('About Us 2u', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/banner/about_us_2u.webp'),
  ('Chart Trust 147', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/charitable/chart-trust-147.jpg'),
  ('Chart Trust 281', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/charitable/chart-trust-281.jpg'),
  ('Chart Trust 62', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/charitable/chart-trust-62.jpg'),
  ('Chart Trust 76', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/charitable/chart-trust-76.jpg'),
  ('Chnge1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/contribution/chnge1.gif'),
  ('Cont 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/contribution/cont-01.gif'),
  ('Cont 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/contribution/cont-02.gif'),
  ('Contribution', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/contribution/contribution.jpg'),
  ('Baba Birth', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/events/baba-birth.webp'),
  ('Baba Birth 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-01.webp'),
  ('Baba Birth 010', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-010.webp'),
  ('Baba Birth 011', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-011.webp'),
  ('Baba Birth 012', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-012.webp'),
  ('Baba Birth 013', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-013.webp'),
  ('Baba Birth 014', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-014.webp'),
  ('Baba Birth 015', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-015.webp'),
  ('Baba Birth 016', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-016.webp'),
  ('Baba Birth 017', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-017.webp'),
  ('Baba Birth 019', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-019.webp'),
  ('Baba Birth 020', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-020.webp'),
  ('Baba Birth 022', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-022.webp'),
  ('Baba Birth 024', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-024.webp'),
  ('Baba Birth 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-04.webp'),
  ('Baba Birth 018', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-018.webp'),
  ('Baba Birth 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-02.webp'),
  ('Baba Birth 021', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-021.webp'),
  ('Baba Birth 023', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-023.webp'),
  ('Baba Birth 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-03.webp'),
  ('Baba Birth 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-05.webp'),
  ('Baba Birth 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-06.webp'),
  ('Baba Birth 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-07.webp'),
  ('Baba Birth 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-08.webp'),
  ('Baba Birth 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/baba-birth-09.webp'),
  ('Gal 2019 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-01.webp'),
  ('Gal 2019 010', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-010.webp'),
  ('Gal 2019 011', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-011.webp'),
  ('Gal 2019 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-02.webp'),
  ('Gal 2019 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-03.webp'),
  ('Gal 2019 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-04.webp'),
  ('Gal 2019 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-05.webp'),
  ('Gal 2019 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-06.webp'),
  ('Gal 2019 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-07.webp'),
  ('Gal 2019 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-08.webp'),
  ('Gal 2019 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2019-09.webp'),
  ('Gal 2020 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-01.webp'),
  ('Gal 2020 010', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-010.webp'),
  ('Gal 2020 011', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-011.webp'),
  ('Gal 2020 012', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-012.webp'),
  ('Gal 2020 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-02.webp'),
  ('Gal 2020 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-03.webp'),
  ('Gal 2020 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-04.webp'),
  ('Gal 2020 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-05.webp'),
  ('Gal 2020 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-06.webp'),
  ('Gal 2020 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-07.webp'),
  ('Gal 2020 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-08.webp'),
  ('Gal 2020 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2020-09.webp'),
  ('Gal 2021 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2021-01.webp'),
  ('Gal 2021 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2021-02.webp'),
  ('Gal 2021 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2021-03.webp'),
  ('Gal 2021 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2021-04.webp'),
  ('Gal 2021 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2021-05.webp'),
  ('Gal 2021 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2021-06.webp'),
  ('Gal 2021 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2021-07.webp'),
  ('Gal 2021 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2021-08.webp'),
  ('Gal 2021 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2021-09.webp'),
  ('Gal 2022 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-01.webp'),
  ('Gal 2022 010', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-010.webp'),
  ('Gal 2022 011', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-011.webp'),
  ('Gal 2022 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-03.webp'),
  ('Gal 2022 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-05.webp'),
  ('Gal 2022 07', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-07.webp'),
  ('Gal 2022 09', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-09.webp'),
  ('Plan T 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/plan-t-02.webp'),
  ('Plan T 05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/plan-t-05.webp'),
  ('Abhishek 2', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gurumaa/abhishek-2.jpg'),
  ('G1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gurumaa/g1.gif'),
  ('Gurumaa T', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gurumaa/gurumaa-t.jpg'),
  ('Mission Karuna', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/home/mission-karuna.webp'),
  ('Prema Sai', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/home/prema-sai.webp'),
  ('Meditation', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/meditation/meditation.gif'),
  ('Img 7416', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/universe/img-7416.jpg'),
  ('Saibaba Uni', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/universe/saibaba-uni.jpg'),
  ('Gal 2022 02', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-02.webp'),
  ('Gal 2022 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-04.webp'),
  ('Gal 2022 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-06.webp'),
  ('Gal 2022 08', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/gal-2022-08.webp'),
  ('Plan T 01', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/plan-t-01.webp'),
  ('Plan T 03', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/plan-t-03.webp'),
  ('Plan T 04', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/plan-t-04.webp'),
  ('Plan T 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gallery/plan-t-06.webp'),
  ('Abhishek', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gurumaa/abhishek.jpg'),
  ('Guruma1', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/gurumaa/guruma1.gif'),
  ('Pujniye Maa', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/home/Pujniye_maa.webp'),
  ('Pics05', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/home/pics05.webp'),
  ('Sai 06', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/home/sai_06.webp'),
  ('Img 7403', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/universe/img-7403.jpg'),
  ('Sai Baba', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/universe/sai-baba.jpg'),
  ('Shivji Temple', 'https://vankwrztzziiaqtlrvcm.supabase.co/storage/v1/object/public/temple-media/legacy/universe/shivji-temple.jpg');
