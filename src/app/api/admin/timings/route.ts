import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCollection, saveCollection, verifyAuthUser } from "@/lib/dataStore";
import { seedTimings } from "@/lib/seed";
import type { AartiTiming } from "@/lib/types";

const TABLE = "temple_timings";

export async function GET() {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await getCollection<AartiTiming>(TABLE, seedTimings);
  return NextResponse.json({ rows });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { rows } = await req.json();
    if (!Array.isArray(rows)) {
      return NextResponse.json({ error: "Rows array is required" }, { status: 400 });
    }

    await saveCollection(TABLE, rows);
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/contact");
      revalidatePath("/how-to-reach");
      revalidatePath("/universe");
      revalidatePath("/events");
      revalidatePath("/admin/timings");
    } catch {}

    return NextResponse.json({ success: true, count: rows.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save timings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
