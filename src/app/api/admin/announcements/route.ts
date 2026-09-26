import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCollection, saveCollection, verifyAuthUser } from "@/lib/dataStore";
import { seedAnnouncements } from "@/lib/seed";
import type { Announcement } from "@/lib/types";

const TABLE = "announcements";

export async function GET() {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await getCollection<Announcement>(TABLE, seedAnnouncements);
  return NextResponse.json({ rows });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, content } = await req.json();
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Title and message are required" }, { status: 400 });
    }

    const current = await getCollection<Announcement>(TABLE, seedAnnouncements);
    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      status: "published",
      created_at: new Date().toISOString(),
    };

    const updated = [newAnnouncement, ...current];
    await saveCollection(TABLE, updated);
    try {
      revalidatePath("/");
      revalidatePath("/announcements");
    } catch {}

    return NextResponse.json({ success: true, item: newAnnouncement });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save announcement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, title, content, status } = await req.json();
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const current = await getCollection<Announcement>(TABLE, seedAnnouncements);
    const updated = current.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          ...(title?.trim() ? { title: title.trim() } : {}),
          ...(content?.trim() ? { content: content.trim() } : {}),
          ...(status ? { status } : {}),
        };
      }
      return a;
    });

    await saveCollection(TABLE, updated);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update announcement";
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

    const current = await getCollection<Announcement>(TABLE, seedAnnouncements);
    const updated = current.filter((a) => a.id !== id);
    await saveCollection(TABLE, updated);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete announcement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
