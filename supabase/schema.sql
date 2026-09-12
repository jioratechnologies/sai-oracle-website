-- ============================================================
-- Sai Oracle — Supabase schema (V1 CMS)
-- Run this in Supabase Dashboard → SQL Editor → New query.
-- Then run seed.sql for starter content, and create the
-- first admin user via Authentication → Users → Add user.
-- ============================================================

-- EVENTS -----------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  image_url text,
  registration_url text,
  status text not null default 'draft'
    check (status in ('published', 'draft')),
  created_at timestamptz not null default now()
);
create index if not exists events_date_idx on public.events (event_date);
create index if not exists events_status_idx on public.events (status);

-- ANNOUNCEMENTS ----------------------------------------------
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  status text not null default 'draft'
    check (status in ('published', 'draft')),
  created_at timestamptz not null default now()
);

-- YOUTUBE VIDEOS (URL links only — no embeds, no YouTube API) ----------
create table if not exists public.youtube_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  youtube_url text not null,
  thumbnail_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- GALLERY (files live in the temple-media storage bucket) ----
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  created_at timestamptz not null default now()
);

-- MEDIA ASSETS (built-in site photos, migrated out of the repo and
-- into the temple-media storage bucket — see
-- scripts/migrate-assets-to-supabase.mjs). `key` is the former
-- `/assets/...` path used in the source code; `url` is its public
-- Supabase Storage URL.
create table if not exists public.media_assets (
  key text primary key,
  url text not null,
  updated_at timestamptz not null default now()
);

-- TEMPLE TIMINGS ---------------------------------------------
create table if not exists public.temple_timings (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  time text not null,
  sort_order int not null default 0
);

-- SITE SETTINGS (single row) ---------------------------------
create table if not exists public.site_settings (
  id bigint primary key generated always as identity,
  organization_name text not null default 'Sai Oracle',
  tagline text not null default '',
  description text not null default '',
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  maps_url text not null default '',
  instagram_url text not null default '',
  facebook_url text not null default '',
  youtube_url text not null default '',
  whatsapp_url text not null default '',
  x_url text not null default '',
  morning_opening text not null default '5:30 AM',
  night_closing text not null default '10:00 PM'
);

-- EDITABLE PAGES (about / temple / privacy / terms) ---------
create table if not exists public.site_pages (
  slug text primary key,
  title text not null,
  content text not null default '',
  updated_at timestamptz not null default now()
);

-- ROW LEVEL SECURITY -----------------------------------------
-- Public can READ published content. Only logged-in admins
-- (Supabase Auth users) can write. Create admin users in
-- Dashboard → Authentication → Users (no public sign-up).

alter table public.events enable row level security;
alter table public.announcements enable row level security;
alter table public.youtube_videos enable row level security;
alter table public.gallery enable row level security;
alter table public.media_assets enable row level security;
alter table public.temple_timings enable row level security;
alter table public.site_settings enable row level security;
alter table public.site_pages enable row level security;

-- Public read: published events / announcements / videos,
-- everything else readable (timings, gallery, settings, pages).
create policy "Public can read published events"
  on public.events for select using (status = 'published');
create policy "Public can read published announcements"
  on public.announcements for select using (status = 'published');
create policy "Public can read published videos"
  on public.youtube_videos for select using (published = true);
create policy "Public can read gallery"
  on public.gallery for select using (true);
create policy "Public can read media assets"
  on public.media_assets for select using (true);
create policy "Public can read timings"
  on public.temple_timings for select using (true);
create policy "Public can read settings"
  on public.site_settings for select using (true);
create policy "Public can read pages"
  on public.site_pages for select using (true);

-- Admin write: any authenticated user (admin-only project —
-- do NOT enable public sign-ups; invite staff manually).
create policy "Admins can manage events"
  on public.events for all using (auth.role() = 'authenticated');
create policy "Admins can manage announcements"
  on public.announcements for all using (auth.role() = 'authenticated');
create policy "Admins can manage videos"
  on public.youtube_videos for all using (auth.role() = 'authenticated');
create policy "Admins can manage gallery"
  on public.gallery for all using (auth.role() = 'authenticated');
create policy "Admins can manage media assets"
  on public.media_assets for all using (auth.role() = 'authenticated');
create policy "Admins can manage timings"
  on public.temple_timings for all using (auth.role() = 'authenticated');
create policy "Admins can manage settings"
  on public.site_settings for all using (auth.role() = 'authenticated');
create policy "Admins can manage pages"
  on public.site_pages for all using (auth.role() = 'authenticated');

-- STORAGE ----------------------------------------------------
-- Create a PUBLIC bucket named `temple-media` (Dashboard →
-- Storage → New bucket → public ON), then run:
--
--   insert into storage.buckets (id, name, public)
--   values ('temple-media', 'temple-media', true)
--   on conflict (id) do nothing;
--
--   create policy "Public can view temple media"
--     on storage.objects for select using (bucket_id = 'temple-media');
--   create policy "Admins can upload temple media"
--     on storage.objects for insert
--     with check (bucket_id = 'temple-media' and auth.role() = 'authenticated');
--   create policy "Admins can delete temple media"
--     on storage.objects for delete
--     using (bucket_id = 'temple-media' and auth.role() = 'authenticated');
