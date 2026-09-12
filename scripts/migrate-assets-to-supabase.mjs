// One-off migration: uploads public/assets/** to the Supabase Storage
// `temple-media` bucket (created public if missing) and upserts each
// file's public URL into the `media_assets` table, keyed by its former
// `/assets/...` path — see `resolveMediaUrl` in src/lib/image.ts.
//
// Usage:
//   node --env-file=.env.local scripts/migrate-assets-to-supabase.mjs
//
// Requires SUPABASE_SECRET_KEY (Dashboard → Settings → API → secret keys)
// in the environment — it bypasses RLS, so never expose it to the browser
// or commit it. Safe to re-run: uploads and DB rows are both upserted.

import { createClient } from "@supabase/supabase-js";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SECRET_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in the environment.");
  process.exit(1);
}

const BUCKET = "temple-media";
const ASSETS_ROOT = path.resolve(process.cwd(), "public/assets");

const CONTENT_TYPES = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const sb = createClient(SUPABASE_URL, SECRET_KEY);

async function walk(dir, base = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...(await walk(abs, rel)));
    } else {
      files.push({ abs, rel });
    }
  }
  return files;
}

async function ensurePublicBucket() {
  const { data: buckets, error } = await sb.storage.listBuckets();
  if (error) throw error;
  if (buckets.some((b) => b.name === BUCKET)) {
    console.log(`Bucket "${BUCKET}" already exists.`);
    return;
  }
  const { error: createErr } = await sb.storage.createBucket(BUCKET, { public: true });
  if (createErr) throw createErr;
  console.log(`Created public bucket "${BUCKET}".`);
}

async function main() {
  await ensurePublicBucket();

  const files = await walk(ASSETS_ROOT);
  console.log(`Found ${files.length} files under public/assets.`);

  let ok = 0;
  for (const { abs, rel } of files) {
    const key = `/assets/${rel}`; // matches the literal string used in the app source
    const storagePath = `assets/${rel.split("/").map((seg) => seg.trim().replace(/\s+/g, "-")).join("/")}`;
    const contentType = CONTENT_TYPES[path.extname(abs).toLowerCase()] ?? "application/octet-stream";

    const buffer = await readFile(abs);
    const { error: upErr } = await sb.storage
      .from(BUCKET)
      .upload(storagePath, buffer, { contentType, upsert: true });
    if (upErr) {
      console.error(`✗ upload failed for ${rel}: ${upErr.message}`);
      continue;
    }

    const { data: { publicUrl } } = sb.storage.from(BUCKET).getPublicUrl(storagePath);
    const { error: dbErr } = await sb.from("media_assets").upsert({ key, url: publicUrl });
    if (dbErr) {
      console.error(`✗ db upsert failed for ${key}: ${dbErr.message}`);
      continue;
    }

    ok += 1;
    console.log(`✓ ${key} -> ${publicUrl}`);
  }

  console.log(`Done. ${ok}/${files.length} files migrated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
