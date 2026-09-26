"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, RefreshCw, Link as LinkIcon, Check } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase";

const BUCKET = "temple-media";

async function compressImage(
  file: File,
  maxWidth = 1920,
  quality = 0.82
): Promise<{ blob: Blob; ext: string }> {
  return new Promise((resolve) => {
    const img = new window.Image();
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

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  hint?: string;
  aspectClass?: string;
}

export default function ImageUploader({
  value,
  onChange,
  folder = "uploads",
  label = "Banner / Photo",
  hint = "Upload directly from your phone or computer.",
  aspectClass = "aspect-video",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Selected file is not an image.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const { blob, ext } = await compressImage(file);
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .slice(0, 30);
      const fileName = `${cleanName}.${ext}`;

      const formData = new FormData();
      formData.append("file", blob, fileName);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload failed with status ${res.status}`);
      }

      const data = await res.json();
      if (!data.url) throw new Error("No URL returned from upload");

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleRemove() {
    onChange("");
    setError(null);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="text-xs font-medium text-maroon-700 hover:text-maroon-900 flex items-center gap-1"
        >
          <LinkIcon className="h-3 w-3" />
          {showManualUrl ? "Hide manual URL" : "Paste URL instead"}
        </button>
      </div>

      {hint && <p className="text-xs text-stone-500">{hint}</p>}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative overflow-hidden rounded-2xl border-2 border-maroon-100 bg-stone-50 shadow-xs">
          <div className={`relative ${aspectClass} w-full overflow-hidden bg-stone-100`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded preview"
              className="h-full w-full object-cover"
              onError={() => setError("Could not load image preview from this URL.")}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-maroon-100 bg-white p-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="truncate text-xs text-stone-600 font-mono" title={value}>
                {value.split("/").pop()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition-colors"
              >
                <RefreshCw className={`h-3 w-3 ${uploading ? "animate-spin" : ""}`} />
                {uploading ? "Uploading..." : "Replace"}
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow-2xs hover:bg-red-50 transition-colors"
              >
                <X className="h-3 w-3" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-maroon-200 bg-cream-50/60 p-6 text-center transition-all hover:border-saffron-500 hover:bg-white hover:shadow-xs group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-700 group-hover:scale-110 transition-transform">
            {uploading ? (
              <RefreshCw className="h-6 w-6 animate-spin text-saffron-600" />
            ) : (
              <UploadCloud className="h-6 w-6 text-saffron-600" />
            )}
          </div>
          <p className="mt-3 text-sm font-bold text-maroon-900">
            {uploading ? "Uploading & optimizing image..." : "Upload Photo from Device"}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Click here to choose an image from your computer or phone (JPG, PNG, WebP)
          </p>
        </div>
      )}

      {/* Optional manual URL input */}
      {showManualUrl && (
        <div className="pt-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... (direct public image URL)"
            className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-xs font-mono outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-200"
          />
        </div>
      )}

      {error && (
        <p className="text-xs font-medium text-red-600 rounded-lg bg-red-50 p-2.5 border border-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
