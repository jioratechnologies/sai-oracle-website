"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import { slugify, formatEventDate } from "@/lib/format";
import type { TempleEvent } from "@/lib/types";
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
    const sb = supabaseBrowser();
    if (!sb) {
      setLoading(false);
      return;
    }
    const { data } = await sb.from("events").select("*").order("event_date", { ascending: false });
    setRows((data ?? []) as TempleEvent[]);
    setLoading(false);
  }

  useEffect(() => {
    // Mount fetch for the admin list — legitimate external sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      const sb = supabaseBrowser();
      if (!sb) throw new Error("Supabase is not configured.");
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
        const { error } = await sb.from("events").insert(payload);
        if (error) throw error;
      } else {
        const { error } = await sb.from("events").update(payload).eq("id", editing);
        if (error) throw error;
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
    const sb = supabaseBrowser();
    if (!sb) return;
    await sb
      .from("events")
      .update({ status: e.status === "published" ? "draft" : "published" })
      .eq("id", e.id);
    load();
  }

  async function remove(id: string) {
    const sb = supabaseBrowser();
    if (!sb) return;
    await sb.from("events").delete().eq("id", id);
    load();
  }

  if (!isAdminConfigured) {
    return (
      <div className="space-y-4">
        <BackLink />
        <h1 className="font-display text-3xl font-bold text-maroon-900">📅 Events</h1>
        <SetupNotice />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-maroon-900">📅 Events</h1>
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
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Image URL" hint="Upload in Gallery first, then paste the URL here.">
                <input
                  className={inputCls}
                  value={form.image_url}
                  onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  placeholder="https://…"
                />
              </Field>
              <Field label="Registration URL (optional)">
                <input
                  className={inputCls}
                  value={form.registration_url}
                  onChange={(e) => setForm((f) => ({ ...f, registration_url: e.target.value }))}
                  placeholder="https://…"
                />
              </Field>
            </div>
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
              <li key={e.id} className="flex flex-wrap items-center gap-2 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-stone-800">{e.title}</p>
                  <p className="text-xs text-stone-500">{formatEventDate(e.event_date)}</p>
                </div>
                <StatusBadge status={e.status} />
                <button
                  type="button"
                  onClick={() => togglePublish(e)}
                  className="rounded-full border border-maroon-200 px-3 py-1 text-xs font-semibold text-maroon-800 hover:bg-maroon-50"
                >
                  {e.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={() => startEdit(e)}
                  className="rounded-full border border-maroon-200 px-3 py-1 text-xs font-semibold text-maroon-800 hover:bg-maroon-50"
                >
                  Edit
                </button>
                <ConfirmDelete onDelete={() => remove(e.id)} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
