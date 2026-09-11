"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import type { GalleryImage } from "@/lib/types";
import {
  BackLink,
  Card,
  ConfirmDelete,
  Field,
  PrimaryButton,
  SetupNotice,
  inputCls,
  isAdminConfigured,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";
const BUCKET = "temple-media";

export default function AdminGalleryPage() {
  const [rows, setRows] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");

  async function load() {
    const sb = supabaseBrowser();
    if (!sb) {
      setLoading(false);
      return;
    }
    const { data } = await sb.from("gallery").select("*").order("created_at", { ascending: false });
    setRows((data ?? []) as GalleryImage[]);
    setLoading(false);
  }

  useEffect(() => {
    // Mount fetch for the admin list — legitimate external sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    setError("");
    setProgress("");
    try {
      const sb = supabaseBrowser();
      if (!sb) throw new Error("Supabase is not configured.");
      if (!files || files.length === 0) throw new Error("Please choose at least one photo.");
      let done = 0;
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) throw new Error(`“${file.name}” is not an image.`);
        if (file.size > 8 * 1024 * 1024) throw new Error(`“${file.name}” is larger than 8 MB.`);
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: upErr } = await sb.storage.from(BUCKET).upload(path, file);
        if (upErr) throw new Error(`Upload failed: ${upErr.message}`);
        const {
          data: { publicUrl },
        } = sb.storage.from(BUCKET).getPublicUrl(path);
        const { error: dbErr } = await sb
          .from("gallery")
          .insert({ title: title.trim() || file.name, image_url: publicUrl });
        if (dbErr) throw dbErr;
        done += 1;
        setProgress(`Uploaded ${done} of ${files.length}…`);
      }
      setFiles(null);
      setTitle("");
      (document.getElementById("gallery-files") as HTMLInputElement | null)?.setAttribute("value", "");
      await load();
      setProgress(`✓ ${done} photo${done > 1 ? "s" : ""} added to the gallery.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function remove(g: GalleryImage) {
    const sb = supabaseBrowser();
    if (!sb) return;
    await sb.from("gallery").delete().eq("id", g.id);
    // Best-effort storage cleanup (URL format: …/temple-media/<path>)
    const marker = `/${BUCKET}/`;
    const idx = g.image_url.indexOf(marker);
    if (idx >= 0) {
      await sb.storage.from(BUCKET).remove([g.image_url.slice(idx + marker.length)]);
    }
    load();
  }

  if (!isAdminConfigured) {
    return (
      <div className="space-y-4">
        <BackLink />
        <h1 className="font-display text-3xl font-bold text-maroon-900">🖼️ Gallery</h1>
        <SetupNotice />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink />
      <h1 className="font-display text-3xl font-bold text-maroon-900">🖼️ Gallery</h1>

      <Card>
        <h2 className="mb-4 font-display text-xl font-bold text-maroon-900">Upload Photos</h2>
        <form onSubmit={upload} className="space-y-4">
          <Field label="Photos" hint="JPG/PNG, up to 8 MB each. You can select multiple.">
            <input
              id="gallery-files"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full text-sm"
            />
          </Field>
          <Field label="Caption (optional)" hint="Applied to all photos in this upload.">
            <input
              className={inputCls}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Guru Purnima 2026"
            />
          </Field>
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          {progress && !error && <p className="text-sm font-medium text-green-700">{progress}</p>}
          <PrimaryButton disabled={uploading}>
            {uploading ? "Uploading…" : "Upload Photos"}
          </PrimaryButton>
        </form>
      </Card>

      <Card>
        {loading ? (
          <p className="text-sm text-stone-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-stone-600">No photos yet — upload the first ones above.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {rows.map((g) => (
              <li key={g.id} className="overflow-hidden rounded-xl border border-maroon-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image_url} alt={g.title || "Gallery photo"} className="aspect-square w-full object-cover" loading="lazy" />
                <div className="flex items-center justify-between gap-1 p-2">
                  <p className="truncate text-xs font-medium text-stone-600">{g.title || "Untitled"}</p>
                  <ConfirmDelete onDelete={() => remove(g)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
