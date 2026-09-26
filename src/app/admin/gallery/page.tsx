"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Images,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  RefreshCw,
  Pencil,
  X,
} from "lucide-react";
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
const PAGE_SIZE = 18;

async function compressImageClient(
  file: File,
  maxWidth = 1920,
  quality = 0.82
): Promise<{ blob: Blob; ext: string }> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve({ blob: file, ext: file.name.split(".").pop() || "jpg" });
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve({ blob: file, ext: file.name.split(".").pop() || "jpg" });
          resolve({ blob, ext: "webp" });
        },
        "image/webp",
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ blob: file, ext: file.name.split(".").pop() || "jpg" });
    };
    img.src = url;
  });
}

function cleanTitle(key: string): string {
  const filename = key.split("/").pop() || "";
  const name = filename.replace(/\.[^/.]+$/, "");
  return name
    .replace(/^images_/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminGalleryPage() {
  const [rows, setRows] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const load = useCallback(async (targetPage = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/gallery?page=${targetPage}&pageSize=${PAGE_SIZE}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to load gallery photos (status ${res.status})`);
      }
      const data = await res.json();
      setRows(data.rows || []);
      setTotalCount(data.count || 0);
      setPage(targetPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery photos");
      setRows([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(1);
  }, [load]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    setError("");
    setProgress("");
    try {
      if (!files || files.length === 0) throw new Error("Please choose at least one photo.");

      let done = 0;
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) throw new Error(`“${file.name}” is not an image.`);
        setProgress(`Optimizing & uploading “${file.name}”…`);

        const { blob, ext } = await compressImageClient(file);
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")
          .slice(0, 30);
        const fileName = `${cleanName}.${ext}`;

        const formData = new FormData();
        formData.append("file", blob, fileName);
        if (title.trim()) {
          formData.append("title", title.trim());
        }

        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Upload failed with status ${res.status}`);
        }

        done += 1;
        setProgress(`Uploaded & synced ${done} of ${files.length}…`);
      }

      setFiles(null);
      setTitle("");
      const fileInput = document.getElementById("gallery-files") as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";

      await load(1);
      setProgress(`✓ ${done} photo${done > 1 ? "s" : ""} added to the gallery.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function remove(g: GalleryImage) {
    try {
      const res = await fetch(
        `/api/admin/gallery?id=${encodeURIComponent(g.id)}&imageUrl=${encodeURIComponent(g.image_url)}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete photo");
      }

      // If deleting last item on current page, go back a page
      const newCount = totalCount - 1;
      const newTotalPages = Math.ceil(newCount / PAGE_SIZE) || 1;
      const targetPage = page > newTotalPages ? newTotalPages : page;
      load(targetPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete photo");
    }
  }

  // Caption editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  function startEdit(g: GalleryImage) {
    setEditingId(g.id);
    setEditTitle(g.title || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
  }

  async function saveEdit(g: GalleryImage) {
    if (!editTitle.trim()) return;
    setSavingEdit(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: g.id,
          imageUrl: g.image_url,
          title: editTitle.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to update caption");
      }

      setRows((prev) =>
        prev.map((r) => (r.id === g.id ? { ...r, title: editTitle.trim() } : r))
      );
      setEditingId(null);
      setSavedId(g.id);
      setTimeout(() => setSavedId(null), 2500);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update caption");
    } finally {
      setSavingEdit(false);
    }
  }

  function copyUrl(id: string, url: string) {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (!isAdminConfigured) {
    return (
      <div className="space-y-4">
        <BackLink />
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-maroon-900">
          <Images aria-hidden className="h-7 w-7 text-saffron-600" />
          Gallery
        </h1>
        <SetupNotice />
      </div>
    );
  }

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-maroon-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-saffron-100 text-saffron-800">
              <Images className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-maroon-900">
              Photo Gallery
            </h1>
          </div>
          <p className="mt-1 text-sm text-stone-500">
            Upload, optimize, and manage temple photography stored in Supabase.
          </p>
        </div>

        <button
          type="button"
          onClick={() => load(page)}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-colors"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Upload Card */}
      <Card>
        <h2 className="mb-4 font-display text-xl font-bold text-maroon-900 flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-saffron-600" />
          Upload New Photos
        </h2>
        <form onSubmit={upload} className="space-y-4">
          <Field label="Choose Photos from Device" hint="JPG, PNG, or WebP. Auto-compressed before uploading. Multiple files supported.">
            <input
              id="gallery-files"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-maroon-900 file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-maroon-800 cursor-pointer"
            />
          </Field>
          <Field label="Caption / Album Tag (optional)" hint="Applied to all photos uploaded in this batch.">
            <input
              className={inputCls}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Guru Purnima Celebration, Temple Darshan"
            />
          </Field>
          {error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          {progress && !error && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
              {progress}
            </div>
          )}
          <PrimaryButton disabled={uploading}>
            {uploading ? "Uploading & Compressing…" : "Upload to Supabase"}
          </PrimaryButton>
        </form>
      </Card>

      {/* Photo Grid with Pagination */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 border-b border-stone-100 pb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-maroon-900">
              Photo Library
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {totalCount > 0 ? (
                <>
                  Showing <strong className="text-stone-800">{rangeStart}–{rangeEnd}</strong> of{" "}
                  <strong className="text-stone-800">{totalCount}</strong> photos in Supabase
                </>
              ) : (
                "0 photos in database"
              )}
            </p>
          </div>

          {/* Pagination Controls (Top) */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => load(page - 1)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 disabled:opacity-40 hover:bg-stone-50 transition-colors"
                title="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 text-xs font-semibold text-stone-700">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => load(page + 1)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 disabled:opacity-40 hover:bg-stone-50 transition-colors"
                title="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-saffron-600" />
            <p className="mt-3 text-sm text-stone-500 font-medium">Loading photos from Supabase…</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-maroon-100 bg-cream-50/50 p-12 text-center">
            <Images className="mx-auto h-12 w-12 text-stone-300" />
            <p className="mt-3 font-display text-base font-bold text-maroon-900">
              No photos found in Supabase gallery
            </p>
            <p className="mt-1 text-xs text-stone-500 max-w-sm mx-auto">
              Photos uploaded using the form above will be stored directly in Supabase Storage and appear here with pagination.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
              {rows.map((g) => (
                <li
                  key={g.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-2xs transition-all hover:shadow-md"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.image_url}
                      alt={g.title || "Gallery photo"}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-3 gap-2">
                    {editingId === g.id ? (
                      <div className="space-y-1.5">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(g);
                            if (e.key === "Escape") cancelEdit();
                          }}
                          autoFocus
                          placeholder="Photo caption"
                          className="w-full rounded-lg border border-saffron-400 bg-amber-50/50 px-2 py-1 text-xs font-semibold text-stone-800 outline-none focus:ring-1 focus:ring-saffron-500"
                        />
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            type="button"
                            onClick={() => saveEdit(g)}
                            disabled={savingEdit}
                            className="inline-flex items-center gap-0.5 rounded-md bg-maroon-900 px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-maroon-800 disabled:opacity-50"
                          >
                            <Check className="h-3 w-3" />
                            {savingEdit ? "..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            disabled={savingEdit}
                            className="inline-flex items-center gap-0.5 rounded-md border border-stone-200 bg-white px-2 py-0.5 text-[11px] font-medium text-stone-600 hover:bg-stone-50"
                          >
                            <X className="h-3 w-3" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-1.5 min-w-0">
                        <p
                          className="truncate text-xs font-bold text-maroon-900 flex-1"
                          title={g.title || "Untitled"}
                        >
                          {g.title || "Untitled"}
                        </p>
                        {savedId === g.id && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                            Saved!
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => startEdit(g)}
                          title="Edit caption"
                          className="p-1 rounded-md text-stone-400 hover:bg-stone-100 hover:text-maroon-900 transition-colors shrink-0"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => copyUrl(g.id, g.image_url)}
                        title="Copy public URL"
                        className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] font-medium text-stone-600 hover:bg-stone-100 transition-colors"
                      >
                        {copiedId === g.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-stone-400" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>

                      <ConfirmDelete onDelete={() => remove(g)} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination Controls (Bottom) */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-100">
                <p className="text-xs text-stone-500">
                  Showing page <strong className="text-stone-800">{page}</strong> of{" "}
                  <strong className="text-stone-800">{totalPages}</strong> ({totalCount} total)
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={page <= 1 || loading}
                    onClick={() => load(page - 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 disabled:opacity-40 hover:bg-stone-50 transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let p = i + 1;
                      if (totalPages > 5 && page > 3) {
                        p = page - 2 + i;
                        if (p > totalPages) p = totalPages - (4 - i);
                      }
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => load(p)}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-colors ${
                            page === p
                              ? "bg-maroon-900 text-white shadow-2xs"
                              : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    disabled={page >= totalPages || loading}
                    onClick={() => load(page + 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 disabled:opacity-40 hover:bg-stone-50 transition-colors"
                  >
                    Next
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
