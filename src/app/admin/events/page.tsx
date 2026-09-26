"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { slugify, formatEventDate } from "@/lib/format";
import type { TempleEvent } from "@/lib/types";
import ImageUploader from "@/components/admin/ImageUploader";
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

const EMPTY = {
  title: "",
  slug: "",
  description: "",
  event_date: "",
  start_time: "",
  end_time: "",
  location: "Sai Oracle Temple, Meerut",
  image_url: "",
  registration_url: "",
  status: "published" as "published" | "draft",
};

export default function AdminEventsPage() {
  const [rows, setRows] = useState<TempleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null); // id, "new", or null
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/events");
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to load events (status ${res.status})`);
      }
      const data = await res.json();
      setRows(data.rows ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setForm(EMPTY);
    setEditing("new");
    setError("");
  }

  function startEdit(e: TempleEvent) {
    setForm({
      title: e.title,
      slug: e.slug,
      description: e.description ?? "",
      event_date: e.event_date,
      start_time: e.start_time ?? "",
      end_time: e.end_time ?? "",
      location: e.location ?? "",
      image_url: e.image_url ?? "",
      registration_url: e.registration_url ?? "",
      status: e.status,
    });
    setEditing(e.id);
    setError("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        title: form.title.trim(),
        slug: (form.slug.trim() || slugify(form.title)) ?? "",
        description: form.description.trim() || null,
        event_date: form.event_date,
        start_time: form.start_time || null,
        end_time: form.end_time || null,
        location: form.location.trim() || null,
        image_url: form.image_url.trim() || null,
        registration_url: form.registration_url.trim() || null,
        status: form.status,
      };
      if (!payload.title || !payload.event_date) throw new Error("Title and date are required.");

      if (editing === "new") {
        const res = await fetch("/api/admin/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to create event.");
        }
      } else {
        const res = await fetch("/api/admin/events", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing, ...payload }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to update event.");
        }
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(e: TempleEvent) {
    const nextStatus = e.status === "published" ? "draft" : "published";
    try {
      const res = await fetch("/api/admin/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: e.id, status: nextStatus }),
      });
      if (res.ok) {
        setRows((prev) =>
          prev.map((item) => (item.id === e.id ? { ...item, status: nextStatus } : item))
        );
      }
    } catch {}
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`/api/admin/events?id=${encodeURIComponent(id)}`, {
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
          <CalendarDays aria-hidden className="h-7 w-7 text-saffron-600" />
          Events
        </h1>
        <SetupNotice />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 font-display text-2xl sm:text-3xl font-bold text-maroon-900">
          <CalendarDays aria-hidden className="h-6 w-6 sm:h-7 sm:w-7 text-saffron-600 shrink-0" />
          Events
        </h1>
        {editing === null && <PrimaryButton onClick={startNew}>+ Add Event</PrimaryButton>}
      </div>

      {editing !== null && (
        <Card>
          <h2 className="mb-4 font-display text-xl font-bold text-maroon-900">
            {editing === "new" ? "Add Event" : "Edit Event"}
          </h2>
          <form onSubmit={save} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title">
                <input
                  className={inputCls}
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      title: e.target.value,
                      slug: editing === "new" ? slugify(e.target.value) : f.slug,
                    }))
                  }
                  required
                />
              </Field>
              <Field label="URL Slug" hint="Auto-generated from title.">
                <input
                  className={inputCls}
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                />
              </Field>
            </div>
            <Field label="Description">
              <textarea
                className={inputCls}
                rows={4}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Date">
                <input
                  type="date"
                  required
                  className={inputCls}
                  value={form.event_date}
                  onChange={(e) => setForm((f) => ({ ...f, event_date: e.target.value }))}
                />
              </Field>
              <Field label="Start Time">
                <input
                  type="time"
                  className={inputCls}
                  value={form.start_time}
                  onChange={(e) => setForm((f) => ({ ...f, start_time: e.target.value }))}
                />
              </Field>
              <Field label="End Time">
                <input
                  type="time"
                  className={inputCls}
                  value={form.end_time}
                  onChange={(e) => setForm((f) => ({ ...f, end_time: e.target.value }))}
                />
              </Field>
            </div>
            <Field label="Location">
              <input
                className={inputCls}
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
            </Field>
            <ImageUploader
              label="Event Banner / Photo"
              hint="Upload an image directly from your device (phone or laptop). It will be optimized and saved to Supabase storage."
              value={form.image_url}
              onChange={(url) => setForm((f) => ({ ...f, image_url: url }))}
              folder="events"
              aspectClass="aspect-video"
            />
            <Field label="Registration URL (optional)" hint="External link for devotee ticket or sign-up.">
              <input
                className={inputCls}
                value={form.registration_url}
                onChange={(e) => setForm((f) => ({ ...f, registration_url: e.target.value }))}
                placeholder="https://…"
              />
            </Field>
            <Field label="Status">
              <select
                className={inputCls}
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value as "published" | "draft" }))
                }
              >
                <option value="published">Published — visible on website</option>
                <option value="draft">Draft — hidden</option>
              </select>
            </Field>
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
            <div className="flex gap-2">
              <PrimaryButton disabled={saving}>{saving ? "Saving…" : "Save Event"}</PrimaryButton>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full border border-maroon-200 px-5 py-2 text-sm font-semibold text-maroon-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        {loading ? (
          <p className="text-sm text-stone-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-stone-600">
            No events yet. Click <strong>+ Add Event</strong> to create the first one.
          </p>
        ) : (
          <ul className="divide-y divide-maroon-50">
            {rows.map((e) => (
              <li key={e.id} className="py-4 space-y-2">
                {/* Row 1: Title + Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-800 leading-snug">{e.title}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{formatEventDate(e.event_date)}</p>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
                {/* Row 2: Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublish(e)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors active:scale-95 ${
                      e.status === "published"
                        ? "border-stone-300 text-stone-700 hover:bg-stone-50"
                        : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {e.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => startEdit(e)}
                    className="rounded-full border border-saffron-300 bg-saffron-50 px-3 py-1.5 text-xs font-semibold text-saffron-800 hover:bg-saffron-100 transition-colors active:scale-95"
                  >
                    ✎ Edit
                  </button>
                  <ConfirmDelete onDelete={() => remove(e.id)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
