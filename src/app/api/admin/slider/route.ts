import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCollection, saveCollection, verifyAuthUser } from "@/lib/dataStore";
import { DEFAULT_SLIDES } from "@/lib/heroSlides";
import type { ShowcaseSlide } from "@/lib/types";

const TABLE = "hero_slides";

export async function GET() {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const slides = await getCollection<ShowcaseSlide>(TABLE, DEFAULT_SLIDES);
  return NextResponse.json({ slides });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { slides } = await req.json();
    if (!Array.isArray(slides)) {
      return NextResponse.json({ error: "Slides array is required" }, { status: 400 });
    }

    await saveCollection(TABLE, slides);
    try {
      revalidatePath("/");
      revalidatePath("/admin/slider");
    } catch {}

    return NextResponse.json({ success: true, count: slides.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save slides";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
