import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSettingsData, saveSettingsData, verifyAuthUser } from "@/lib/dataStore";
import type { SiteSettings } from "@/lib/types";

export async function GET() {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await getSettingsData();
  return NextResponse.json({ settings });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { settings } = await req.json();
    if (!settings) {
      return NextResponse.json({ error: "Settings object is required" }, { status: 400 });
    }

    await saveSettingsData(settings as SiteSettings);
    
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/contact");
      revalidatePath("/how-to-reach");
      revalidatePath("/universe");
      revalidatePath("/admin/settings");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
