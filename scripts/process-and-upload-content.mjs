import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { readdir, readFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SOURCE_DIR = "/media/gaurav/SSD-Vault/jioratech/saioracle-content";
const DEST_BASE = path.resolve(process.cwd(), "public/assets/content");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
const BUCKET = "temple-media";

const FOLDER_MAP = {
  "aims and objective": "aims",
  "maa life sketch": "maa-life-sketch",
  "maa page": "maa",
  "miracolous life of maa": "miracles",
  "mission karuna": "mission-karuna",
  "narayan seva photo": "narayan-seva",
  "photos section": "gallery",
  "slider home page photo": "slider",
  "temple 9( universe of divine healing)": "universe",
  "videos section": "videos",
};

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function cleanFileName(name) {
  const ext = path.extname(name);
  const base = path.basename(name, ext);
  const clean = base
    .toLowerCase()
    .replace(/[^\w\d-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${clean || "image"}.webp`;
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function main() {
  console.log("=== Starting Image Compression & Supabase Sync ===");

  let sb = null;
  if (SUPABASE_URL && SECRET_KEY) {
    sb = createClient(SUPABASE_URL, SECRET_KEY);
    const { data: buckets, error } = await sb.storage.listBuckets();
    if (!error && !buckets.some((b) => b.name === BUCKET)) {
      await sb.storage.createBucket(BUCKET, { public: true });
      console.log(`Created public bucket "${BUCKET}".`);
    } else {
      console.log(`Supabase bucket "${BUCKET}" ready.`);
    }
  } else {
    console.log("Supabase credentials not found or incomplete. Will store locally.");
  }

  // Handle root files
  await ensureDir(path.join(DEST_BASE, "home"));
  const rootFiles = await readdir(SOURCE_DIR, { withFileTypes: true });
  for (const file of rootFiles) {
    if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase();
      if (IMAGE_EXTS.has(ext)) {
        const srcPath = path.join(SOURCE_DIR, file.name);
        const outName = cleanFileName(file.name);
        const outPath = path.join(DEST_BASE, "home", outName);
        await processAndSave(srcPath, outPath, "home", outName, sb);
      }
    } else if (file.isDirectory() && FOLDER_MAP[file.name]) {
      const subSlug = FOLDER_MAP[file.name];
      const subSrc = path.join(SOURCE_DIR, file.name);
      const subDest = path.join(DEST_BASE, subSlug);
      await ensureDir(subDest);

      const subEntries = await readdir(subSrc, { withFileTypes: true, recursive: true });
      for (const entry of subEntries) {
        if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (IMAGE_EXTS.has(ext)) {
            // resolve path
            const entryPath = entry.parentPath ? path.join(entry.parentPath, entry.name) : path.join(subSrc, entry.name);
            const outName = cleanFileName(entry.name);
            const outPath = path.join(subDest, outName);
            await processAndSave(entryPath, outPath, subSlug, outName, sb);
          }
        }
      }
    }
  }

  console.log("=== Image Processing & Supabase Sync Complete ===");
}

async function processAndSave(srcPath, outPath, slug, fileName, sb) {
  try {
    const srcStat = await stat(srcPath);
    const origSize = srcStat.size;

    // Use Sharp to compress to WebP
    const image = sharp(srcPath);
    const meta = await image.metadata();

    let transform = image.rotate(); // auto-orient based on EXIF
    if (meta.width && meta.width > 1920) {
      transform = transform.resize(1920, null, { withoutEnlargement: true });
    }

    const compressedBuffer = await transform
      .webp({ quality: 82, effort: 4 })
      .toBuffer();

    await sharp(compressedBuffer).toFile(outPath);
    const newSize = compressedBuffer.length;
    const ratio = Math.round((1 - newSize / origSize) * 100);

    console.log(
      `✓ [${slug}] ${path.basename(srcPath)} -> ${fileName} (${Math.round(origSize / 1024)}KB → ${Math.round(newSize / 1024)}KB, -${ratio}%)`
    );

    // If Supabase client available, upload to storage and upsert media_assets
    if (sb) {
      const appKey = `/assets/content/${slug}/${fileName}`;
      const storagePath = `content/${slug}/${fileName}`;
      const { error: upErr } = await sb.storage
        .from(BUCKET)
        .upload(storagePath, compressedBuffer, { contentType: "image/webp", upsert: true });

      if (upErr) {
        console.warn(`  ↳ Supabase upload error: ${upErr.message}`);
      } else {
        const { data: { publicUrl } } = sb.storage.from(BUCKET).getPublicUrl(storagePath);
        await sb.from("media_assets").upsert({ key: appKey, url: publicUrl });
      }
    }
  } catch (err) {
    console.error(`✗ Error processing ${srcPath}:`, err.message);
  }
}

main().catch(console.error);
