# Legacy assets (from saioracle.com — client's own site)

Staged locally until they are uploaded to the Supabase `temple-media` bucket.
When uploading, keep the same folder structure, then swap `/legacy/…` URLs
for Supabase public URLs (or manage via Admin → Gallery).

```
public/legacy/
  home/     homepage photos (sanctum, Pujniye Maa, Mission Karuna, Prema Sai…)
  banner/   homepage banner deity photos (VisualLightBox full-size)
  gallery/  year-wise temple photos: baba-birth-*, gal-2019…2022-*, plan-t-*
  aims/     small illustrations used on the old Aims page
  events/   Baba birthday poster (tall)
```

## Videos (link-only — no video files in the repo)

No MP4/WebM files are stored here (each would be ~500 MB — too big for git).
Upload temple videos to the temple's YouTube channel (unlisted is fine),
then add them via **Admin → YouTube → paste link**. The site only ever
links out to YouTube watch pages — it never embeds a player or hosts video.
