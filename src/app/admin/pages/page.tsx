"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase";
import { seedPages } from "@/lib/seed";
import {
  BackLink,
  Card,
  Field,
  PrimaryButton,
  SetupNotice,
  inputCls,
  isAdminConfigured,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default function AdminPagesPage() {
  const [slug, setSlug] = useState("about");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  async function loadPage(s: string) {
    setLoading(true);
    setError("");
    setSaved("");
    const sb = supabaseBrowser();
    if (!sb) {
      setLoading(false);
      return;
    }
    const { data } = await sb.from("site_pages").select("*").eq("slug", s).single();
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    } else {
      const seed = seedPages.find((p) => p.slug === s);
      setTitle(seed?.title ?? "");
      setContent(seed?.content ?? "");
    }
    setLoading(false);
  }

  useEffect(() => {
    // Mount fetch for the selected page — legitimate external sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPage(slug);
  }, [slug]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved("");
    try {
      const sb = supabaseBrowser();
      if (!sb) throw new Error("Supabase is not configured.");
      const { error } = await sb
        .from("site_pages")
        .upsert({ slug, title: title.trim(), content, updated_at: new Date().toISOString() });
      if (error) throw error;
      setSaved("✓ Page saved — the website is updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!isAdminConfigured) {
    return (
      <div className="space-y-4">
        <BackLink />
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-maroon-900">
          <FileText aria-hidden className="h-7 w-7 text-saffron-600" />
          Pages
        </h1>
        <SetupNotice />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink />
      <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-maroon-900">
        <FileText aria-hidden className="h-7 w-7 text-saffron-600" />
        Pages
      </h1>

      <div className="flex flex-wrap gap-2">
        {[
          ["about", "About"],
          ["temple", "Temple"],
          ["experiences", "Experiences"],
          ["aims", "Aims"],
          ["privacy", "Privacy"],
          ["terms", "Terms"],
        ].map(([s, label]) => (
          <button
            key={s}
            type="button"
            onClick={() => setSlug(s)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              slug === s ? "bg-maroon-800 text-cream-50" : "border border-maroon-200 text-maroon-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Card>
        {loading ? (
          <p className="text-sm text-stone-500">Loading…</p>
        ) : (
          <form onSubmit={save} className="space-y-4">
            <Field label="Page title">
              <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Field>
            <Field
              label="Content"
              hint="Simple formatting: ## for headings, **bold**, and - for bullet lists."
            >
              <textarea
                className={`${inputCls} font-mono text-sm`}
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Field>
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
            {saved && <p className="text-sm font-medium text-green-700">{saved}</p>}
            <PrimaryButton disabled={saving}>{saving ? "Saving…" : "Save Page"}</PrimaryButton>
          </form>
        )}
      </Card>
    </div>
  );
}
