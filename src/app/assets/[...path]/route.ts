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

  return NextResponse.redirect(targetUrl, {
    status: 307,
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=31536000",
    },
  });
}
