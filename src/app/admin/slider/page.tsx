"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sliders, Plus, Edit2, Trash2, X, ExternalLink } from "lucide-react";
import { DEFAULT_SLIDES } from "@/lib/heroSlides";
import type { ShowcaseSlide } from "@/lib/types";
import ImageUploader from "@/components/admin/ImageUploader";

export const dynamic = "force-dynamic";

export default function AdminSliderPage() {
  const [slides, setSlides] = useState<ShowcaseSlide[]>([...DEFAULT_SLIDES]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<ShowcaseSlide>({
    src: "",
    tag: "",
    caption: "",
    focus: "center",
    href: "",
  });

  function startAdd() {
    setForm({
      src: "",
      tag: "Temple",
      caption: "",
      focus: "center",
      href: "",
    });
    setError("");
    setSaved("");
    setIsAddOpen(true);
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setForm({ ...slides[index] });
    setError("");
    setSaved("");
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/slider");
        if (res.ok) {
          const data = await res.json();
          if (data.slides && Array.isArray(data.slides)) {
            setSlides(data.slides);
          }
        }
      } catch (err) {
        console.warn("Could not load slides:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function persistSlides(updated: ShowcaseSlide[]): Promise<boolean> {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/slider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides: updated }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to save slides (status ${res.status})`);
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to persist slides");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveNew(e: React.FormEvent) {
    e.preventDefault();
    if (!form.src) {
      setError("Image source URL or path is required.");
      return;
    }
    const updated = [form, ...slides];
    const ok = await persistSlides(updated);
    if (ok) {
      setSlides(updated);
      setIsAddOpen(false);
      setSaved("New hero slide added successfully and live on homepage!");
    }
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (editingIndex === null) return;
    if (!form.src) {
      setError("Image source URL or path is required.");
      return;
    }
    const copy = [...slides];
    copy[editingIndex] = form;
    const ok = await persistSlides(copy);
    if (ok) {
      setSlides(copy);
      setEditingIndex(null);
      setSaved("Slide updated successfully and live on homepage!");
    }
  }

  async function handleDelete(index: number) {
    const updated = slides.filter((_, i) => i !== index);
    const ok = await persistSlides(updated);
    if (ok) {
      setSlides(updated);
      setSaved("Slide removed.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-maroon-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-saffron-100 text-saffron-800">
              <Sliders className="h-5 w-5" />
            </span>
            <h1 className="font-display text-2xl font-bold text-maroon-900">
              Hero Slider &amp; Showcase Manager
            </h1>
          </div>
          <p className="mt-1 text-sm text-stone-500">
            Customize the photos, captions, and links displayed in the homepage hero carousel.
          </p>
        </div>

        <button
          type="button"
          onClick={startAdd}
          className="btn-festive inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          Add Slide
        </button>
      </div>

      {saved && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
          {saved}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-800">
          {error}
        </div>
      )}

      {/* Slides Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className="flex flex-col overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-xs transition-all hover:shadow-md"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
              <Image
                src={s.src}
                alt={s.caption || s.tag}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className={`object-cover ${
                  s.focus === "top" ? "object-top" : "object-center"
                }`}
              />
              <span className="absolute top-2.5 left-2.5 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-gold-300 backdrop-blur-xs">
                Slide #{idx + 1} • {s.tag}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <h3 className="font-display text-base font-bold text-maroon-950">
                  {s.caption}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-stone-400 truncate">
                  {s.src}
                </p>
                {s.href && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-saffron-700">
                    <ExternalLink className="h-3 w-3" />
                    <span>Links to: {s.href}</span>
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Focus: {s.focus || "center"}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => startEdit(idx)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    title="Edit slide"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                    title="Delete slide"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Slide Modal */}
      {(isAddOpen || editingIndex !== null) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
              <h3 className="font-display text-lg font-bold text-maroon-900">
                {isAddOpen ? "Add New Hero Slide" : "Edit Hero Slide"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddOpen(false);
                  setEditingIndex(null);
                }}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={isAddOpen ? handleSaveNew : handleSaveEdit} className="space-y-4 p-6">
              <ImageUploader
                label="Slide Image"
                hint="Upload a high-resolution slide directly from your device."
                value={form.src}
                onChange={(url) => setForm({ ...form, src: url })}
                folder="slider"
                aspectClass="aspect-video"
              />

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Category Tag
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Temple Sanctum, Divine Darshan"
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Caption / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Satyadeep Sai Temple — Abode of Peace & Light"
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm outline-none focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Image Alignment
                  </label>
                  <select
                    value={form.focus || "center"}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        focus: e.target.value as "top" | "center",
                      })
                    }
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-saffron-500 focus:bg-white"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Target Link (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="/about, /universe..."
                    value={form.href || ""}
                    onChange={(e) => setForm({ ...form, href: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-saffron-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingIndex(null);
                  }}
                  className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-festive rounded-xl px-5 py-2 text-sm font-bold text-white shadow-md disabled:opacity-50"
                >
                  {saving ? "Saving..." : isAddOpen ? "Add Slide" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
