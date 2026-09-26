// Upload ONLY files that are missing from Supabase media_assets table,
// then remove them from public/assets so they're served from Supabase CDN.
//
// Usage:
//   node --env-file=.env.local scripts/upload-missing-and-clean.mjs
//
// Safe to re-run (upserts). Does NOT delete local files until upload is confirmed.

import { createClient } from "@supabase/supabase-js";
import { readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SECRET_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY");
  process.exit(1);
}

const BUCKET = "temple-media";
const ASSETS_ROOT = path.resolve(process.cwd(), "public/assets");

const CONTENT_TYPES = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
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
      const ext = path.extname(entry.name).toLowerCase();
      if (CONTENT_TYPES[ext]) files.push({ abs, rel });
    }
  }
  return files;
}

async function getExistingKeys() {
  const { data, error } = await sb.from("media_assets").select("key").limit(500);
  if (error) throw error;
  return new Set(data.map((r) => r.key));
}

async function main() {
  console.log("Fetching existing Supabase media_assets keys...");
  const existing = await getExistingKeys();
  console.log(`${existing.size} files already in Supabase.`);

  const allFiles = await walk(ASSETS_ROOT);
  const missing = allFiles.filter(({ rel }) => !existing.has(`/assets/${rel}`));

  console.log(`${allFiles.length} total local files. ${missing.length} not yet in Supabase.\n`);

  if (missing.length === 0) {
    console.log("Nothing to upload. All local assets are already on Supabase.");
    return;
  }

  let uploaded = 0;
  let failed = 0;
  const uploadedAbs = [];

  for (const { abs, rel } of missing) {
    const key = `/assets/${rel}`;
    const storagePath = `assets/${rel
      .split("/")
      .map((seg) => seg.trim().replace(/\s+/g, "-"))
      .join("/")}`;
    const contentType =
      CONTENT_TYPES[path.extname(abs).toLowerCase()] ?? "application/octet-stream";

    const buffer = await readFile(abs);
    const { error: upErr } = await sb.storage
      .from(BUCKET)
      .upload(storagePath, buffer, { contentType, upsert: true });

    if (upErr) {
      console.error(`  ✗ upload failed: ${rel} — ${upErr.message}`);
      failed++;
      continue;
    }

    const {
      data: { publicUrl },
    } = sb.storage.from(BUCKET).getPublicUrl(storagePath);

    const { error: dbErr } = await sb
      .from("media_assets")
      .upsert({ key, url: publicUrl });

    if (dbErr) {
      console.error(`  ✗ db upsert failed: ${key} — ${dbErr.message}`);
      failed++;
      continue;
    }

    console.log(`  ✓ ${key}`);
    uploaded++;
    uploadedAbs.push(abs);
  }

  console.log(`\nUpload complete: ${uploaded} ok, ${failed} failed.\n`);

  if (failed > 0) {
    console.warn("Some files failed to upload — NOT removing local copies.");
    console.warn("Fix the errors above and re-run.\n");
  }

  // ── Now remove ALL successfully uploaded files from public/assets ──
  // Also remove files that were already in Supabase before this run.
  console.log("Removing local copies of ALL Supabase-confirmed files from public/assets...");
  const finalExisting = await getExistingKeys();
  let removed = 0;
  let kept = 0;

  for (const { abs, rel } of allFiles) {
    const key = `/assets/${rel}`;
    if (finalExisting.has(key)) {
      await rm(abs, { force: true });
      removed++;
    } else {
      console.log(`  KEPT (not in Supabase): ${rel}`);
      kept++;
    }
  }

  // Clean up empty directories
  async function rmEmptyDirs(dir) {
    try {
      const entries = await readdir(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.isDirectory()) await rmEmptyDirs(path.join(dir, e.name));
      }
      const remaining = await readdir(dir);
      if (remaining.length === 0 && dir !== ASSETS_ROOT) {
        await rm(dir, { recursive: true, force: true });
        console.log(`  Removed empty dir: ${path.relative(process.cwd(), dir)}`);
      }
    } catch {
      // ignore
    }
  }
  await rmEmptyDirs(ASSETS_ROOT);

  console.log(`\nDone. ${removed} local files removed, ${kept} kept (not on Supabase).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
