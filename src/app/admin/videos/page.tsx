"use client";

import { useEffect, useState } from "react";
import { MonitorPlay } from "lucide-react";
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
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/videos");
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to load videos (status ${res.status})`);
      }
      const data = await res.json();
      setRows(data.rows ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load videos.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (!title.trim()) throw new Error("A title is required.");
      if (!getYouTubeId(url)) throw new Error("That doesn't look like a valid YouTube link or video ID.");

      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), url: url.trim() }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save video.");
      }

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
    try {
      const res = await fetch("/api/admin/videos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: v.id, published: !v.published }),
      });
      if (res.ok) {
        setRows((prev) =>
          prev.map((item) => (item.id === v.id ? { ...item, published: !item.published } : item))
        );
      }
    } catch {}
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`/api/admin/videos?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRows((prev) => prev.filter((item) => item.id !== id));
      }
    } catch {}
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
        Just paste a YouTube link — no API, no login. The website links it automatically (no video upload, no embed).
      </p>

      <Card>
        <h2 className="mb-4 font-display text-xl font-bold text-maroon-900">Add Video</h2>
        <form onSubmit={save} className="space-y-4">
          <Field label="Title" hint="E.g. “Sai Baba Kakad Aarti”.">
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Field>
          <Field label="YouTube link or video ID" hint="Accepts watch links, youtu.be links, Shorts, embed links, or the 11-character ID.">
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
              <li key={v.id} className="py-4 space-y-2">
                {/* Row 1: Title + Status */}
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-stone-800 leading-snug">{v.title}</p>
                  <StatusBadge status={String(v.published)} />
                </div>
                {/* Row 2: URL */}
                <a
                  href={v.youtube_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-xs text-saffron-600 hover:underline truncate"
                >
                  {v.youtube_url}
                </a>
                {/* Row 3: Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublish(v)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors active:scale-95 ${
                      v.published
                        ? "border-stone-300 text-stone-700 hover:bg-stone-50"
                        : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {v.published ? "Hide" : "Show"}
                  </button>
                  <ConfirmDelete onDelete={() => remove(v.id)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
