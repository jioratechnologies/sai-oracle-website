import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase";

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

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const sb = getAdminClient();
    const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
    const cleanName = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const storagePath = `${folder}/${Date.now()}-${cleanName}.${ext}`;

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

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: storagePath,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to upload file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
