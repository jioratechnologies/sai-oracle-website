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

## Videos (NOT downloaded — ~500 MB each, too big for git)

- http://saioracle.com/video/2023-01.mp4 (0:15)
- http://saioracle.com/video/2023-02.mp4 (1:24)

Recommended: upload both to the temple's YouTube channel (unlisted is fine),
then add them via **Admin → YouTube → paste link**. This keeps the repo small
and uses the V1 YouTube-embed architecture (no video API needed).
