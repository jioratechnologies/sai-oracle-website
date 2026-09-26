"use client";

import { useEffect, useState } from "react";
import { Bell, Megaphone } from "lucide-react";
import type { Announcement } from "@/lib/types";
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

export default function AdminAnnouncementsPage() {
  const [rows, setRows] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/announcements");
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Failed to load announcements (status ${res.status})`);
      }
      const data = await res.json();
      setRows(data.rows ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load announcements.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function reset() {
    setTitle("");
    setContent("");
    setEditing(null);
    setError("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (!title.trim() || !content.trim()) throw new Error("Title and message are required.");

      if (editing) {
        const res = await fetch("/api/admin/announcements", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing, title: title.trim(), content: content.trim() }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to update announcement.");
        }
      } else {
        const res = await fetch("/api/admin/announcements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: title.trim(), content: content.trim() }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Failed to publish announcement.");
        }
      }
      reset();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(a: Announcement) {
    const nextStatus = a.status === "published" ? "draft" : "published";
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: a.id, status: nextStatus }),
      });
      if (res.ok) {
        setRows((prev) =>
          prev.map((item) => (item.id === a.id ? { ...item, status: nextStatus } : item))
        );
      }
    } catch {}
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`/api/admin/announcements?id=${encodeURIComponent(id)}`, {
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
          <Megaphone aria-hidden className="h-7 w-7 text-saffron-600" />
          Announcements
        </h1>
        <SetupNotice />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink />
      <h1 className="flex items-center gap-2 font-display text-2xl sm:text-3xl font-bold text-maroon-900">
        <Megaphone aria-hidden className="h-6 w-6 sm:h-7 sm:w-7 text-saffron-600 shrink-0" />
        Announcements
      </h1>

      <Card>
        <h2 className="mb-4 font-display text-xl font-bold text-maroon-900">
          {editing ? "Edit Announcement" : "New Announcement"}
        </h2>
        <form onSubmit={save} className="space-y-4">
          <Field label="Title" hint="Short headline, e.g. “Temple Timing Update”.">
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Field>
          <Field label="Message" hint="Shown in the top bar and on the homepage. Keep it to 1–2 lines.">
            <textarea
              className={inputCls}
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Field>
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <PrimaryButton disabled={saving}>
              {saving ? "Publishing…" : editing ? "Save Changes" : "Publish"}
            </PrimaryButton>
            {editing && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-maroon-200 px-5 py-2 text-sm font-semibold text-maroon-800"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </Card>

      <Card>
        {loading ? (
          <p className="text-sm text-stone-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-stone-600">No announcements yet.</p>
        ) : (
          <ul className="divide-y divide-maroon-50">
            {rows.map((a) => (
              <li key={a.id} className="py-4 space-y-2">
                {/* Row 1: Title + Status */}
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-stone-800 leading-snug flex items-center gap-1.5">
                    <Bell aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
                    {a.title}
                  </p>
                  <StatusBadge status={a.status} />
                </div>
                {/* Row 2: Content preview */}
                <p className="text-sm text-stone-500 line-clamp-2 pl-6">{a.content}</p>
                {/* Row 3: Actions */}
                <div className="flex flex-wrap items-center gap-2 pl-6">
                  <button
                    type="button"
                    onClick={() => togglePublish(a)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors active:scale-95 ${
                      a.status === "published"
                        ? "border-stone-300 text-stone-700 hover:bg-stone-50"
                        : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    {a.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTitle(a.title);
                      setContent(a.content);
                      setEditing(a.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="rounded-full border border-saffron-300 bg-saffron-50 px-3 py-1.5 text-xs font-semibold text-saffron-800 hover:bg-saffron-100 transition-colors active:scale-95"
                  >
                    ✎ Edit
                  </button>
                  <ConfirmDelete onDelete={() => remove(a.id)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
