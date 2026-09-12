import { promises as fs } from "node:fs";
import path from "node:path";
import type { ShowcaseSlide } from "./types";

/**
 * Convention-based homepage showcase.
 *
 * Drop photos into `public/showcase/` and they automatically appear in
 * the hero gallery — no code changes. Naming:
 *
 *   [order-] [tag--] caption-words.ext
 *
 *   01-shirdi-sai--sabka-malik-ek.jpg  → tag "Shirdi Sai", caption "Sabka Malik Ek"
 *   havan-with-devotees.jpg            → tag "Darshan", caption "Havan With Devotees"
 *
 * Supported: .webp (preferred — converted from the old multi-MB
 * JPEGs/PNGs) plus .jpg .jpeg .png for compatibility. Files sort by the numeric prefix,
 * then alphabetically. Portrait photos focus the top of cropped
 * frames; landscape scenes stay centered (detected from real
 * dimensions, EXIF-aware).
 */

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function pretty(s: string): string {
  return s
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}

async function probeDims(file: string): Promise<{ w: number; h: number } | null> {
  let fh: fs.FileHandle | null = null;
  try {
    fh = await fs.open(file, "r");
    const head = Buffer.alloc(64);
    await fh.read(head, 0, 64, 0);
    const isJpeg = head[0] === 0xff && head[1] === 0xd8;
    const isPng =
      head.readUInt32BE(0) === 0x89504e47 &&
      head.readUInt32BE(4) === 0x0d0a1a0a;
    if (isPng) {
      return { w: head.readUInt32BE(16), h: head.readUInt32BE(20) };
    }
    const isRiff = head.toString("ascii", 0, 4) === "RIFF";
    const isWebp = head.toString("ascii", 8, 12) === "WEBP";
    if (isRiff && isWebp) {
      const chunk = head.toString("ascii", 12, 16);
      try {
        if (chunk === "VP8X" && head.length >= 30) {
          const w = head.readUIntLE(24, 3) + 1;
          const h = head.readUIntLE(27, 3) + 1;
          if (w > 0 && h > 0) return { w, h };
        } else if (chunk === "VP8 " && head.length >= 30) {
          const w = head.readUInt16LE(26) & 0x3fff;
          const h = head.readUInt16LE(28) & 0x3fff;
          if (w > 0 && h > 0) return { w, h };
        } else if (chunk === "VP8L" && head.length >= 25) {
          const bits = head.readUInt32LE(21);
          const w = (bits & 0x3fff) + 1;
          const h = ((bits >> 14) & 0x3fff) + 1;
          if (w > 0 && h > 0 && w < 1 << 15 && h < 1 << 15) return { w, h };
        }
      } catch {
        return null;
      }
      return null;
    }
    if (!isJpeg) return null;
    const { size } = await fh.stat();
    const len = Math.min(size, 1 << 20);
    const buf = Buffer.alloc(len);
    await fh.read(buf, 0, len, 0);
    let orientation = 1;
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) break;
      let m = buf[i + 1];
      while (m === 0xff) {
        i += 1;
        m = buf[i + 1];
      }
      if (m === 0xd8 || m === 0xd9 || (m >= 0xd0 && m <= 0xd7)) {
        i += 2;
        continue;
      }
      const segLen = buf.readUInt16BE(i + 2);
      if (segLen < 2) break;
      if (m === 0xe1 && segLen > 8 && buf.toString("ascii", i + 4, i + 10) === "Exif\0\0") {
        const o = readExifOrientation(buf, i + 10, segLen - 8);
        if (o) orientation = o;
      }
      if (
        [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xcb, 0xcd, 0xcf].includes(m)
      ) {
        let w = buf.readUInt16BE(i + 7);
        let h = buf.readUInt16BE(i + 5);
        if (orientation >= 5) [w, h] = [h, w];
        return { w, h };
      }
      i += 2 + segLen;
    }
    return null;
  } catch {
    return null;
  } finally {
    await fh?.close();
  }
}

/** Minimal EXIF reader — just the IFD0 orientation tag. */
function readExifOrientation(buf: Buffer, base: number, len: number): number | null {
  try {
    const end = base + len;
    if (base + 8 > end) return null;
    const little = buf.toString("ascii", base, base + 2) === "II";
    const u16 = (o: number) =>
      little ? buf.readUInt16LE(o) : buf.readUInt16BE(o);
    const u32 = (o: number) =>
      little ? buf.readUInt32LE(o) : buf.readUInt32BE(o);
    const ifd = base + u32(base + 4);
    const n = u16(ifd);
    for (let k = 0; k < n; k++) {
      const e = ifd + 2 + k * 12;
      if (e + 12 > end) return null;
      if (u16(e) === 0x0112) return u16(e + 8);
    }
    return null;
  } catch {
    return null;
  }
}

export async function getShowcaseSlides(): Promise<ShowcaseSlide[]> {
  try {
    const dir = path.join(process.cwd(), "public", "showcase");
    const names = (await fs.readdir(dir))
      .filter((f) => EXT.has(path.extname(f).toLowerCase()))
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
      );
    const slides: { order: number; slide: ShowcaseSlide }[] = [];
    for (const name of names) {
      const base = path.basename(name, path.extname(name));
      const m = base.match(/^(?:(\d+)[-_])?(?:(.+?)--)?(.+)$/);
      const tag = m?.[2] ? pretty(m[2]) : "Darshan";
      const caption = pretty(m?.[3] ?? base);
      if (!caption) continue;
      const dims = await probeDims(path.join(dir, name));
      slides.push({
        order: m?.[1] ? parseInt(m[1], 10) : 9999,
        slide: {
          src: `/showcase/${encodeURIComponent(name)}`,
          tag,
          caption,
          focus: dims && dims.h >= dims.w ? "top" : "center",
        },
      });
    }
    return slides
      .sort((a, b) => a.order - b.order)
      .map((s) => s.slide);
  } catch {
    return [];
  }
}
