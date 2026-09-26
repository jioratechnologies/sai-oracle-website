// Upload all files in public/legacy to Supabase Storage bucket temple-media,
// index them in media_assets table, and clean local copies from public/legacy.
//
// Usage:
//   node --env-file=.env.local scripts/upload-legacy-and-clean.mjs

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
const LEGACY_ROOT = path.resolve(process.cwd(), "public/legacy");

const CONTENT_TYPES = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const sb = createClient(SUPABASE_URL, SECRET_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function walk(dir, base = "") {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    if (entry.name === "README.md" || entry.name.startsWith(".")) continue;
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

async function main() {
  console.log("Scanning public/legacy for files...");
  const files = await walk(LEGACY_ROOT);
  console.log(`Found ${files.length} legacy files to upload.`);

  if (files.length === 0) {
    console.log("No legacy files to upload.");
    return;
  }

  let uploaded = 0;
  let failed = 0;
  const uploadedFiles = [];

  for (const { abs, rel } of files) {
    const key = `/legacy/${rel}`;
    const storagePath = `legacy/${rel
      .split("/")
      .map((seg) => seg.trim().replace(/\s+/g, "-"))
      .join("/")}`;
    const ext = path.extname(abs).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";

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

    // Upsert into media_assets
    const { error: dbErr } = await sb
      .from("media_assets")
      .upsert({ key, url: publicUrl });

    if (dbErr) {
      console.error(`  ✗ db upsert failed: ${key} — ${dbErr.message}`);
      failed++;
      continue;
    }

    console.log(`  ✓ ${key} -> ${publicUrl}`);
    uploaded++;
    uploadedFiles.push({ abs, rel });
  }

  console.log(`\nUpload complete: ${uploaded} ok, ${failed} failed.\n`);

  if (failed === 0) {
    console.log("Removing local legacy files from public/legacy/...");
    for (const { abs } of uploadedFiles) {
      await rm(abs, { force: true });
    }

    // Clean up empty directories
    async function rmEmptyDirs(dir) {
      try {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const e of entries) {
          if (e.isDirectory()) await rmEmptyDirs(path.join(dir, e.name));
        }
        const remaining = await readdir(dir);
        if (remaining.length === 0 && dir !== LEGACY_ROOT) {
          await rm(dir, { recursive: true, force: true });
        }
      } catch {
        // ignore
      }
    }
    await rmEmptyDirs(LEGACY_ROOT);
    console.log("✓ Local public/legacy files cleaned successfully.");
  } else {
    console.warn("Some files failed to upload, keeping local files for safety.");
  }
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
