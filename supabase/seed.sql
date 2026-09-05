-- ============================================================
-- Sai Oracle — starter content (run AFTER schema.sql)
-- ============================================================

insert into public.site_settings
  (organization_name, tagline, description, phone, email, address, maps_url,
   youtube_url, morning_opening, night_closing)
values
  ('Sai Oracle',
   'A place of devotion, faith and service',
   'Satyadeep Sai Organisation is a non-political, non-profit organisation founded by Pujniye Maa under the inspiration of Bhagwan Satya Sai Baba — home to the Trinity of Sai Avatars (Shirdi Sai, Satya Sai, Prema Sai).',
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
   'Join us for Guru Purnima — Kakad Aarti, special bhajans, Guru Paduka Pooja, discourses by Pujniye Maa, and Narayan Seva (Annadanam) for all devotees. All devotees and families are cordially invited.',
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
  ('Om Sai Shree Sai Jai Jai Sai — Sai Dhun', 'https://www.youtube.com/watch?v=oqtpyY-yhEw', true),
  ('Sai Baba — Full Kakad Aarti', 'https://www.youtube.com/watch?v=RmOjeTBEKtk', true)
on conflict do nothing;

insert into public.site_pages (slug, title, content) values
  ('about', 'About Sai Oracle',
   '## About Sai Oracle' || chr(10) || chr(10) ||
   'Satyadeep Sai Organisation is a non-political, non-profit organisation, founded by **Pujniye Maa** under the inspiration of **Bhagwan Satya Sai Baba**.' || chr(10) || chr(10) ||
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
   'Sai Oracle respects your privacy. We do not create public user accounts and do not sell personal data. Embedded YouTube videos are governed by Google''s privacy policy.'),
  ('terms', 'Terms of Use',
   '## Terms of Use' || chr(10) || chr(10) ||
   'Content on this website is for devotional and informational purposes. Event dates, timings and programmes may change; please confirm with the temple office before travelling.')
on conflict (slug) do nothing;

-- Legacy Devotee.htm / Aims.htm texts (also editable via Admin → Pages)
insert into public.site_pages (slug, title, content) values
  ('experiences', 'Devotee''s Experience', $$## Devotee's Experiences — Miracles and Experiences

The Miracles of Bhagwan are a manifestation of His divine powers of omnipresence, omnipotence and omniscience. Bhagwan calls miracles His visiting cards, and leelas (divine sport) are in the very nature of the Avatar. Thousands of people around the world have experienced the divinity of Bhagwan — some miraculously saved from dire situations, others spiritually illumined.

In these pages, we present some of the experiences of devotees of Bhagwan, along with their Pujniye Maa.

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
