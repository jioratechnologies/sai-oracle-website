import { NextRequest, NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase";

const META_KEY = "__meta:gallery_captions";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY");
  }
  return createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function verifyAuthUser() {
  const sb = await supabaseServer();
  if (!sb) return null;
  const {
    data: { user },
    error,
  } = await sb.auth.getUser();
  if (error || !user) return null;
  return user;
}

function cleanTitle(key: string): string {
  const filename = key.split("/").pop() || "";
  const name = filename.replace(/\.[^/.]+$/, "");
  return name
    .replace(/^\d+[-_]/, "") // remove leading timestamp if present
    .replace(/^images_/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

async function getCaptionsMap(sb: SupabaseClient): Promise<Record<string, string>> {
  try {
    const { data } = await sb
      .from("media_assets")
      .select("url")
      .eq("key", META_KEY)
      .maybeSingle();
    if (data?.url) {
      return JSON.parse(data.url);
    }
  } catch (err) {
    console.warn("Could not read captions metadata:", err);
  }
  return {};
}

async function saveCaption(
  sb: SupabaseClient,
  key: string,
  url: string,
  title: string
) {
  try {
    const map = await getCaptionsMap(sb);
    if (key) map[key] = title;
    if (url) map[url] = title;
    await sb.from("media_assets").upsert({
      key: META_KEY,
      url: JSON.stringify(map),
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Could not save caption metadata:", err);
  }
}

export async function GET(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "18", 10));

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const sb = getAdminClient();

    // 1. Try querying gallery table
    const { data, count, error: dbErr } = await sb
      .from("gallery")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!dbErr && data && data.length > 0) {
      return NextResponse.json({
        rows: data,
        count: count ?? data.length,
        page,
        pageSize,
        totalPages: Math.ceil((count ?? data.length) / pageSize) || 1,
      });
    }

    // 2. Fetch custom captions metadata
    const captionsMap = await getCaptionsMap(sb);

    // 3. Fall back to media_assets (338+ photos stored in Supabase)
    const { data: mediaData, count: mediaCount, error: mErr } = await sb
      .from("media_assets")
      .select("key, url, updated_at", { count: "exact" })
      .not("key", "like", "\\_\\_%")
      .order("updated_at", { ascending: false })
      .range(from, to);

    if (!mErr && mediaData) {
      const validMedia = mediaData.filter(
        (m) =>
          !m.key.startsWith("__") &&
          (m.url.startsWith("http://") || m.url.startsWith("https://") || m.url.startsWith("/"))
      );
      const rows = validMedia.map((m) => {
        const customTitle = captionsMap[m.key] || captionsMap[m.url];
        return {
          id: m.key,
          title: customTitle || cleanTitle(m.key),
          image_url: m.url,
          created_at: m.updated_at || new Date().toISOString(),
        };
      });

      return NextResponse.json({
        rows,
        count: mediaCount ?? validMedia.length,
        page,
        pageSize,
        totalPages: Math.ceil((mediaCount ?? validMedia.length) / pageSize) || 1,
      });
    }

    return NextResponse.json({ rows: [], count: 0, page, pageSize, totalPages: 1 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch gallery";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sb = getAdminClient();
  const contentType = req.headers.get("content-type") || "";

  try {
    // 1. Handle multipart/form-data (direct file upload through server)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const title = (formData.get("title") as string) || "";
      const files: File[] = [];

      for (const [key, value] of formData.entries()) {
        if (value instanceof File && value.size > 0) {
          files.push(value);
        }
      }

      if (files.length === 0) {
        return NextResponse.json({ error: "No files provided in request" }, { status: 400 });
      }

      const results = [];
      for (const file of files) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .slice(0, 30);
        const storagePath = `gallery/${Date.now()}-${cleanName}.${ext}`;

        const buffer = Buffer.from(await file.arrayBuffer());

        const { error: upErr } = await sb.storage.from("temple-media").upload(storagePath, buffer, {
          contentType: file.type || (ext === "webp" ? "image/webp" : "image/jpeg"),
          upsert: true,
        });

        if (upErr) {
          throw new Error(`Storage upload error: ${upErr.message}`);
        }

        const {
          data: { publicUrl },
        } = sb.storage.from("temple-media").getPublicUrl(storagePath);

        const assetKey = `/assets/content/gallery/${storagePath.split("/").pop()}`;

        // Upsert into media_assets
        await sb.from("media_assets").upsert({
          key: assetKey,
          url: publicUrl,
          updated_at: new Date().toISOString(),
        });

        const effectiveTitle = title.trim() || cleanTitle(file.name);

        // Save caption to metadata map
        await saveCaption(sb, assetKey, publicUrl, effectiveTitle);

        // Insert into gallery table if table exists
        try {
          await sb.from("gallery").insert({
            title: effectiveTitle,
            image_url: publicUrl,
          });
        } catch {
          // ignore
        }

        results.push({ url: publicUrl, key: assetKey, title: effectiveTitle });
      }

      return NextResponse.json({ success: true, uploaded: results.length, items: results });
    }

    // 2. Handle JSON payload (manual URL or metadata sync)
    const body = await req.json();
    const { title, imageUrl, path } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    const key = path ? `/${path}` : `/assets/content/gallery/${imageUrl.split("/").pop()}`;

    // Upsert into media_assets
    await sb.from("media_assets").upsert({
      key,
      url: imageUrl,
      updated_at: new Date().toISOString(),
    });

    const effectiveTitle = title?.trim() || cleanTitle(key);

    // Save caption to metadata map
    await saveCaption(sb, key, imageUrl, effectiveTitle);

    // Also insert into gallery table if table exists
    try {
      await sb.from("gallery").insert({
        title: effectiveTitle,
        image_url: imageUrl,
      });
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, key, url: imageUrl, title: effectiveTitle });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process photo upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, imageUrl, title } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTitle = title.trim();
    const sb = getAdminClient();

    // 1. Save in metadata map
    await saveCaption(sb, id, imageUrl, newTitle);

    // 2. If gallery table exists, update it
    try {
      if (id) {
        await sb.from("gallery").update({ title: newTitle }).eq("id", id);
      }
      if (imageUrl) {
        await sb.from("gallery").update({ title: newTitle }).eq("image_url", imageUrl);
      }
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, id, imageUrl, title: newTitle });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update caption";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const imageUrl = searchParams.get("imageUrl");

    if (!id && !imageUrl) {
      return NextResponse.json({ error: "id or imageUrl is required" }, { status: 400 });
    }

    if (id && id.startsWith("__")) {
      return NextResponse.json({ error: "System keys cannot be deleted" }, { status: 400 });
    }

    const sb = getAdminClient();

    if (id) {
      await sb.from("media_assets").delete().eq("key", id);
      try {
        await sb.from("gallery").delete().eq("id", id);
      } catch {}
    }

    if (imageUrl) {
      await sb.from("media_assets").delete().eq("url", imageUrl);
      try {
        await sb.from("gallery").delete().eq("image_url", imageUrl);
      } catch {}

      // Best-effort storage cleanup
      const marker = "/temple-media/";
      const idx = imageUrl.indexOf(marker);
      if (idx >= 0) {
        const storagePath = imageUrl.slice(idx + marker.length);
        await sb.storage.from("temple-media").remove([storagePath]);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete photo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
