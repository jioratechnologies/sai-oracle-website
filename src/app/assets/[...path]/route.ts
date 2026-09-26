import { NextRequest, NextResponse } from "next/server";
import { getMediaMap } from "@/lib/site";

let cachedMap: Record<string, string> | null = null;
let lastFetch = 0;

async function getMap(): Promise<Record<string, string>> {
  const now = Date.now();
  if (!cachedMap || now - lastFetch > 120_000) {
    cachedMap = await getMediaMap();
    lastFetch = now;
  }
  return cachedMap;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await context.params;
  const key = `/assets/${segments.join("/")}`;

  const map = await getMap();
  let targetUrl = map[key];

  if (!targetUrl) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      targetUrl = `${supabaseUrl}/storage/v1/object/public/temple-media/assets/${segments.join("/")}`;
    }
  }

  if (!targetUrl) {
    return new NextResponse("Asset not found", { status: 404 });
  }

  try {
    const upstreamRes = await fetch(targetUrl);
    if (!upstreamRes.ok) {
      return new NextResponse("Asset not found upstream", { status: upstreamRes.status });
    }

    const contentType = upstreamRes.headers.get("content-type") || "application/octet-stream";
    const buffer = await upstreamRes.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Failed to proxy asset:", key, err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
