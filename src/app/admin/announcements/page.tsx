"use client";

import { useEffect, useState } from "react";
import { Bell, Megaphone } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase";
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
    const sb = supabaseBrowser();
    if (!sb) {
      setLoading(false);
      return;
    }
    const { data } = await sb
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data ?? []) as Announcement[]);
    setLoading(false);
  }

  useEffect(() => {
    // Mount fetch for the admin list — legitimate external sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      const sb = supabaseBrowser();
      if (!sb) throw new Error("Supabase is not configured.");
      if (!title.trim() || !content.trim()) throw new Error("Title and message are required.");
      if (editing) {
        const { error } = await sb
          .from("announcements")
          .update({ title: title.trim(), content: content.trim() })
          .eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await sb
          .from("announcements")
          .insert({ title: title.trim(), content: content.trim(), status: "published" });
        if (error) throw error;
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
    const sb = supabaseBrowser();
    if (!sb) return;
    await sb
      .from("announcements")
      .update({ status: a.status === "published" ? "draft" : "published" })
      .eq("id", a.id);
    load();
  }

  async function remove(id: string) {
    const sb = supabaseBrowser();
    if (!sb) return;
    await sb.from("announcements").delete().eq("id", id);
    load();
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
      <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-maroon-900">
        <Megaphone aria-hidden className="h-7 w-7 text-saffron-600" />
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
              <li key={a.id} className="flex flex-wrap items-center gap-2 py-3">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-semibold text-stone-800">
                    <Bell aria-hidden className="h-4 w-4 shrink-0 text-saffron-600" />
                    {a.title}
                  </p>
                  <p className="truncate text-sm text-stone-500">{a.content}</p>
                </div>
                <StatusBadge status={a.status} />
                <button
                  type="button"
                  onClick={() => togglePublish(a)}
                  className="rounded-full border border-maroon-200 px-3 py-1 text-xs font-semibold text-maroon-800 hover:bg-maroon-50"
                >
                  {a.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTitle(a.title);
                    setContent(a.content);
                    setEditing(a.id);
                  }}
                  className="rounded-full border border-maroon-200 px-3 py-1 text-xs font-semibold text-maroon-800 hover:bg-maroon-50"
                >
                  Edit
                </button>
                <ConfirmDelete onDelete={() => remove(a.id)} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
