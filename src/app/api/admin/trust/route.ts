import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getTrustSettings, saveTrustSettings, verifyAuthUser } from "@/lib/dataStore";
import type { TrustSettings } from "@/lib/types";

export async function GET() {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const trust = await getTrustSettings();
  return NextResponse.json({ trust });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { trust } = await req.json();
    if (!trust) {
      return NextResponse.json({ error: "Trust object is required" }, { status: 400 });
    }
    await saveTrustSettings(trust as TrustSettings);

    try {
      revalidatePath("/trust", "page");
      revalidatePath("/", "page");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save trust settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
