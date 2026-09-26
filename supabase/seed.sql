-- ============================================================
-- Sai Oracle — starter content (run AFTER schema.sql)
-- ============================================================

insert into public.site_settings
  (organization_name, tagline, description, phone, email, address, maps_url,
   youtube_url, morning_opening, night_closing)
values
  ('Sai Oracle',
   'A place of devotion, faith and service',
   'Satyadeep Sai Organisation is a non-political, non-profit organisation founded by Gurumaa under the inspiration of Bhagwan Satya Sai Baba — home to the Trinity of Sai Avatars (Shirdi Sai, Satya Sai, Prema Sai).',
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
   'Join us for Guru Purnima — Kakad Aarti, special bhajans, Guru Paduka Pooja, discourses by Gurumaa, and Narayan Seva (Annadanam) for all devotees. All devotees and families are cordially invited.',
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
  ('Sai Baba — Kakad Aarti (Morning Aarti)', 'https://www.youtube.com/watch?v=7ecGB9BIpY0', true),
  ('Shirdi Sai Baba Dhoop Aarti (Evening Aarti)', 'https://www.youtube.com/watch?v=W1llxubfP_U', true),
  ('Om Sai Namo Namah — Sai Mantra by Suresh Wadkar', 'https://www.youtube.com/watch?v=7oSd7ZugNeM', true)
on conflict do nothing;

insert into public.site_pages (slug, title, content) values
  ('about', 'About Sai Oracle',
   '## About Sai Oracle' || chr(10) || chr(10) ||
   'Satyadeep Sai Organisation is a non-political, non-profit organisation, founded by **Gurumaa** under the inspiration of **Bhagwan Satya Sai Baba**.' || chr(10) || chr(10) ||
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

In these pages, we present some of the experiences of devotees of Bhagwan, along with their Gurumaa.

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

How Sai Baba showed the importance of the Guru and gave darshan to His devotees.

## 8. Divine Manifestations

- **The Shivling Miracle** — how Baba created the Shivling, and the formation of Satyadeep Shiv Sai Universe.$$),
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

**Mission Karuna — "Empowering the Poor Children."** Financial support for poor children's education, irrespective of caste, colour, creed or religion — so they may one day support themselves. **Join hands to be a part of this noble mission.**$$)
on conflict (slug) do nothing;

-- Gurumaa, sadhana & organisation pages migrated from the legacy site
insert into public.site_pages (slug, title, content) values
  ('gurumaa', 'Gurumaa', $$## Glorious & Blissful Life

Some souls take birth in human form to light the path of spiritual evolution for others. Gurumaa, born in Agra in January 1962, is one such soul — through her satsang, sadhana and selfless seva she has guided thousands of Sai devotees toward the lotus feet of the Lord.

## A Childhood Touched by the Divine

Her grandmother Kaushalya Devi, a devotee of Lord Shiva, carried her before dawn each day to the Manakameshwar Mandir for abhishek. At the age of five, Maa describes her first darshan of Lord Shiva during one such abhishek — an experience that shaped the course of her spiritual life. Family visits to Vrindavan brought visions of Lord Krishna at play in the kunj-galiyan.

## Meeting Sai Baba

Sai Baba began appearing to her in dream darshan long before a single photograph of Him stood in her home. Her devotion deepened through sustained meditation, and at the age of seventeen she describes her first direct (sakshaat) darshan of Swami before dawn — received, she says, like a father embracing his daughter.

## Ongoing Sadhana

The daily abhishek of Lord Shiva and Sai Baba that began in her childhood continues today at Satyadeep Sai Universe and Shiv Sai Universe, where she guides devotees on the path of meditation, faith and selfless service.

![Gurumaa](/legacy/home/Pujniye_maa.webp)$$),
  ('gurumaa-life-sketch', 'Gurumaa — A Life Sketch', $$## Master Mother

Gurumaa — a "Master Mother" — is known among devotees for her unwavering faith in Sai Baba, her guided meditation practice and her gentle way of leading people toward the divine. Devotees describe her life as an ongoing lesson in Bhakti Yoga (devotion), Karma Yoga (right action), Jnana Yoga (knowledge) and Dhyana Yoga (meditation).

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

Established by Gurumaa under the inspiration of Bhagwan Sri Sai Baba, the Trust organises meditation camps, divine discourses, bhajans, and cultural and heritage programmes, and runs Narayan Seva for the poor — carrying forward the message of "love all, serve all."

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

