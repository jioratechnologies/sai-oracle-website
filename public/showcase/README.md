# Homepage Showcase Photos

Drop photos in this folder and they **automatically appear** in the
homepage hero gallery — no code changes needed. Rebuild/redeploy (or
refresh dev) after adding files.

## Naming

```
[order-] [tag--] caption-words.jpg
```

| File | Tag | Caption |
|---|---|---|
| `01-shirdi-sai--sabka-malik-ek.jpg` | Shirdi Sai | Sabka Malik Ek |
| `trinity--sai-avatars.jpg` | Trinity | Sai Avatars |
| `havan-with-devotees.jpg` | Darshan | Havan With Devotees |

- `order-` (optional number prefix) controls the sequence.
- `tag--` (optional) becomes the small badge on the photo.
- Everything else becomes the caption (dashes become spaces).
- Supported formats: `.jpg` `.jpeg` `.png` `.webp`.

## Tips

- Portrait photos focus the top of the frame; wide scenes stay
  centered — detected automatically.
- Keep files under ~1 MB for fast loading (phone photos are fine).
- If this folder is empty, the website falls back to built-in photos.
