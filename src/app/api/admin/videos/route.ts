import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCollection, saveCollection, verifyAuthUser } from "@/lib/dataStore";
import { seedVideos } from "@/lib/seed";
import { getYouTubeId, youtubeThumbnail } from "@/lib/youtube";
import type { YoutubeVideo } from "@/lib/types";

const TABLE = "youtube_videos";

export async function GET() {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await getCollection<YoutubeVideo>(TABLE, seedVideos);
  return NextResponse.json({ rows });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, url } = await req.json();
    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const videoId = getYouTubeId(url);
    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL or ID" }, { status: 400 });
    }

    const current = await getCollection<YoutubeVideo>(TABLE, seedVideos);
    const newVideo: YoutubeVideo = {
      id: `vid-${Date.now()}`,
      title: title.trim(),
      youtube_url: url.trim(),
      thumbnail_url: youtubeThumbnail(videoId, "hqdefault"),
      published: true,
      created_at: new Date().toISOString(),
    };

    const updated = [newVideo, ...current];
    await saveCollection(TABLE, updated);
    try {
      revalidatePath("/");
      revalidatePath("/gallery");
    } catch {}

    return NextResponse.json({ success: true, item: newVideo });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to add video";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const caller = await verifyAuthUser();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, published, title, url } = await req.json();
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const current = await getCollection<YoutubeVideo>(TABLE, seedVideos);
    const updated = current.map((v) => {
      if (v.id === id) {
        return {
          ...v,
          ...(published !== undefined ? { published } : {}),
          ...(title?.trim() ? { title: title.trim() } : {}),
          ...(url?.trim()
            ? {
                youtube_url: url.trim(),
                thumbnail_url: getYouTubeId(url)
                  ? youtubeThumbnail(getYouTubeId(url)!, "hqdefault")
                  : v.thumbnail_url,
              }
            : {}),
        };
      }
      return v;
    });

    await saveCollection(TABLE, updated);
    try {
      revalidatePath("/");
      revalidatePath("/gallery");
    } catch {}
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update video";
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

    const current = await getCollection<YoutubeVideo>(TABLE, seedVideos);
    const updated = current.filter((v) => v.id !== id);
    await saveCollection(TABLE, updated);
    try {
      revalidatePath("/");
      revalidatePath("/gallery");
    } catch {}

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete video";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
