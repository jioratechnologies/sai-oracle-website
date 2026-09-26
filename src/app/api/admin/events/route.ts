import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCollection, saveCollection, verifyAuthUser } from "@/lib/dataStore";
import { seedEvents } from "@/lib/seed";
import type { TempleEvent } from "@/lib/types";

const TABLE = "events";

export async function GET() {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await getCollection<TempleEvent>(TABLE, seedEvents);
  return NextResponse.json({ rows });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { title, event_date, start_time, end_time, location, description, image_url, status } =
      body;

    if (!title?.trim() || !event_date) {
      return NextResponse.json({ error: "Title and Event Date are required" }, { status: 400 });
    }

    const current = await getCollection<TempleEvent>(TABLE, seedEvents);
    const slugBase = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const slug = `${slugBase}-${Date.now().toString().slice(-4)}`;

    const newEvent: TempleEvent = {
      id: `evt-${Date.now()}`,
      title: title.trim(),
      slug,
      event_date,
      start_time: start_time || null,
      end_time: end_time || null,
      location: location?.trim() || "Sai Oracle Temple, Meerut",
      description: description?.trim() || "",
      image_url: image_url || null,
      registration_url: null,
      status: status === "draft" ? "draft" : "published",
      created_at: new Date().toISOString(),
    };

    const updated = [newEvent, ...current];
    await saveCollection(TABLE, updated);
    try {
      revalidatePath("/");
      revalidatePath("/events");
    } catch {}

    return NextResponse.json({ success: true, item: newEvent });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const current = await getCollection<TempleEvent>(TABLE, seedEvents);
    const updated = current.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          ...updates,
        };
      }
      return e;
    });

    await saveCollection(TABLE, updated);
    try {
      revalidatePath("/");
      revalidatePath("/events");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const current = await getCollection<TempleEvent>(TABLE, seedEvents);
    const updated = current.filter((e) => e.id !== id);
    await saveCollection(TABLE, updated);
    try {
      revalidatePath("/");
      revalidatePath("/events");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
