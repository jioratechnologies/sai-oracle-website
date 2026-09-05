# Sai Oracle — Temple Website + Admin CMS

Redesign of **saioracle.com** (Satyadeep Sai Organisation, Meerut) — a polished public temple
website plus a simple content-management admin panel that temple staff can operate without a
developer.

**Stack:** Next.js 16 (App Router) · Vercel · Supabase (Postgres + Auth + Storage) · YouTube embeds
(l links only, no APIs).

## V1 Scope (intentionally small)

**Public site** — Home (photo carousel hero) · About · Temple · Events (+ detail pages) ·
Devotee Experiences · Aims & Objectives · Gallery · Videos · Contact · Privacy/Terms. Dynamic:
upcoming events, timings, announcements, YouTube embeds, gallery, social links, contact info.

**Admin (`/admin`)** — Dashboard · Events · Announcements · YouTube · Gallery · Temple Timings ·
Pages (About/Temple/Experiences/Aims/Privacy/Terms) · Settings/Social links. Supabase Auth login only (no public
sign-ups).

**Explicitly OUT of scope for V1:** pooja booking, payments/donations, devotee accounts, e-commerce,
volunteer management, push/WhatsApp APIs, YouTube/Facebook/Instagram API integrations, advanced
analytics. See the project brief for the Phase-2 list.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 (works immediately with starter content)
```

Without Supabase credentials the site runs on built-in starter content and `/admin` shows a setup
guide. To go live:

1. Create a free project at [supabase.com](https://supabase.com).
2. SQL Editor → run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Storage → New **public** bucket named `temple-media` (policies are in `schema.sql` comments).
4. Authentication → Users → Add user (your admin login). **Do not enable public sign-ups.**
5. Copy `.env.example` to `.env.local` and fill in the two values. Restart `npm run dev`.
6. Log in at `/admin/login` and replace starter content (events, timings, social links…).

## Deploy (Vercel)

```bash
npm run build    # must pass before deploying
```

Import the repo in Vercel, add the two `NEXT_PUBLIC_SUPABASE_*` env vars, deploy. No server to
manage; media lives in Supabase Storage, video via YouTube embeds.

> Hosting-cost note: Supabase Free (500 MB DB, 1 GB storage) and Vercel Hobby cover a small
> informational temple site, but verify current plan limits and commercial-use terms before
> promising the client “₹0 hosting forever” — free Supabase projects pause after inactivity.

## Project layout

```
src/app/            public pages + /admin/* (auth-gated by middleware.ts)
src/components/     public UI (Header, Footer, EventCard…) + admin/ui atoms
src/lib/            types · seed (fallback content) · site (Supabase-first reads)
                    supabase clients · youtube helpers · format helpers
public/legacy/      real temple photos harvested from the old saioracle.com
                    (staged locally; move to the Supabase `temple-media`
                    bucket when ready — see public/legacy/README.md)
supabase/           schema.sql (tables + RLS) · seed.sql (starter content)
```

## Daily operation (for temple staff)

- **New festival?** Admin → Events → + Add Event → Publish.
- **Timing change?** Admin → Announcements → Publish (1–2 lines) and/or Timings → Save.
- **New bhajan video?** Admin → YouTube → paste the link → Add.
- **Photos?** Admin → Gallery → Upload.
