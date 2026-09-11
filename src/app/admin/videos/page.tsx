"use client";

import { useEffect, useState } from "react";
import { MonitorPlay } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase";
import { getYouTubeId, youtubeThumbnail } from "@/lib/youtube";
import type { YoutubeVideo } from "@/lib/types";
import {
  BackLink,
  Card,
  ConfirmDelete,
  Field,
  PrimaryButton,
  SetupNotice,
  StatusBadge,
  inputCls,
  isAdminConfigured,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function AdminVideosPage() {
  const [rows, setRows] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const previewId = getYouTubeId(url);

  async function load() {
    const sb = supabaseBrowser();
    if (!sb) {
      setLoading(false);
      return;
    }
    const { data } = await sb
      .from("youtube_videos")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data ?? []) as YoutubeVideo[]);
    setLoading(false);
  }

  useEffect(() => {
    // Mount fetch for the admin list — legitimate external sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const sb = supabaseBrowser();
      if (!sb) throw new Error("Supabase is not configured.");
      if (!title.trim()) throw new Error("A title is required.");
      if (!getYouTubeId(url)) throw new Error("That doesn't look like a valid YouTube link or video ID.");
      const { error } = await sb.from("youtube_videos").insert({
        title: title.trim(),
        youtube_url: url.trim(),
        published: true,
      });
      if (error) throw error;
      setTitle("");
      setUrl("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(v: YoutubeVideo) {
    const sb = supabaseBrowser();
    if (!sb) return;
    await sb.from("youtube_videos").update({ published: !v.published }).eq("id", v.id);
    load();
  }

  async function remove(id: string) {
    const sb = supabaseBrowser();
    if (!sb) return;
    await sb.from("youtube_videos").delete().eq("id", id);
    load();
  }

  if (!isAdminConfigured) {
    return (
      <div className="space-y-4">
        <BackLink />
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-maroon-900">
          <MonitorPlay aria-hidden className="h-7 w-7 text-saffron-600" />
          YouTube
        </h1>
        <SetupNotice />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink />
      <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-maroon-900">
        <MonitorPlay aria-hidden className="h-7 w-7 text-saffron-600" />
        YouTube
      </h1>
      <p className="text-[15px] text-stone-600">
        Just paste a YouTube link — no API, no login. The website embeds it automatically.
      </p>

      <Card>
        <h2 className="mb-4 font-display text-xl font-bold text-maroon-900">Add Video</h2>
        <form onSubmit={save} className="space-y-4">
          <Field label="Title" hint="E.g. “Sai Baba Kakad Aarti”.">
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Field>
          <Field label="YouTube link or video ID" hint="Accepts watch links, youtu.be links, Shorts, embeds, or the 11-character ID.">
            <input
              className={inputCls}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
              required
            />
          </Field>
          {url && (
            <div>
              {previewId ? (
                <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={youtubeThumbnail(url) ?? ""}
                    alt="Video thumbnail preview"
                    className="h-16 w-28 rounded-lg object-cover"
                  />
                  <p className="text-sm font-medium text-green-800">✓ Valid video — thumbnail found.</p>
                </div>
              ) : (
                <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  That doesn&apos;t look like a valid YouTube link yet.
                </p>
              )}
            </div>
          )}
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <PrimaryButton disabled={saving}>{saving ? "Adding…" : "Add Video"}</PrimaryButton>
        </form>
      </Card>

      <Card>
        {loading ? (
          <p className="text-sm text-stone-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-stone-600">No videos yet.</p>
        ) : (
          <ul className="divide-y divide-maroon-50">
            {rows.map((v) => (
              <li key={v.id} className="flex flex-wrap items-center gap-2 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-stone-800">{v.title}</p>
                  <a
                    href={v.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-xs text-saffron-600 hover:underline"
                  >
                    {v.youtube_url}
                  </a>
                </div>
                <StatusBadge status={String(v.published)} />
                <button
                  type="button"
                  onClick={() => togglePublish(v)}
                  className="rounded-full border border-maroon-200 px-3 py-1 text-xs font-semibold text-maroon-800 hover:bg-maroon-50"
                >
                  {v.published ? "Hide" : "Show"}
                </button>
                <ConfirmDelete onDelete={() => remove(v.id)} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
