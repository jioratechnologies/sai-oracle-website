"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import { seedSettings } from "@/lib/seed";
import type { SiteSettings } from "@/lib/types";
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

type SettingsRow = SiteSettings & { id?: number };

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsRow>({ ...seedSettings });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    (async () => {
      const sb = supabaseBrowser();
      if (!sb) {
        setLoading(false);
        return;
      }
      const { data } = await sb.from("site_settings").select("*").limit(1).single();
      if (data) setForm({ ...seedSettings, ...data });
      setLoading(false);
    })();
  }, []);

  function set<K extends keyof SiteSettings>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved("");
    try {
      const sb = supabaseBrowser();
      if (!sb) throw new Error("Supabase is not configured.");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...payload } = form;
      if (form.id) {
        const { error } = await sb.from("site_settings").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { data, error } = await sb.from("site_settings").insert(payload).select().single();
        if (error) throw error;
        if (data) setForm((f) => ({ ...f, id: data.id }));
      }
      setSaved("✓ Settings saved — the website header, footer and contact page are updated.");
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
        <h1 className="font-display text-3xl font-bold text-maroon-900">⚙️ Settings</h1>
        <SetupNotice />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <BackLink />
        <h1 className="font-display text-3xl font-bold text-maroon-900">⚙️ Settings</h1>
        <p className="text-sm text-stone-500">Loading…</p>
      </div>
    );
  }

  const contactFields: [keyof SiteSettings, string][] = [
    ["organization_name", "Organization Name"],
    ["tagline", "Tagline"],
    ["phone", "Phone"],
    ["email", "Email"],
    ["morning_opening", "Morning Opening (e.g. 5:30 AM)"],
    ["night_closing", "Night Closing (e.g. 10:00 PM)"],
  ];
  const socialFields: [keyof SiteSettings, string, string][] = [
    ["instagram_url", "Instagram", "https://instagram.com/…"],
    ["facebook_url", "Facebook", "https://facebook.com/…"],
    ["youtube_url", "YouTube", "https://youtube.com/…"],
    ["whatsapp_url", "WhatsApp", "https://wa.me/91…"],
    ["x_url", "X (Twitter)", "https://x.com/…"],
  ];

  return (
    <div className="space-y-4">
      <BackLink />
      <h1 className="font-display text-3xl font-bold text-maroon-900">⚙️ Settings</h1>

      <form onSubmit={save} className="space-y-4">
        <Card>
          <h2 className="mb-4 font-display text-xl font-bold text-maroon-900">Temple Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {contactFields.map(([key, label]) => (
              <Field key={key} label={label}>
                <input className={inputCls} value={form[key]} onChange={(e) => set(key, e.target.value)} />
              </Field>
            ))}
          </div>
          <div className="mt-4 space-y-4">
            <Field label="About (short)">
              <textarea className={inputCls} rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
            <Field label="Address">
              <textarea className={inputCls} rows={2} value={form.address} onChange={(e) => set("address", e.target.value)} />
            </Field>
            <Field label="Google Maps Link" hint="Right-click your temple on Google Maps → Share → Copy link.">
              <input className={inputCls} value={form.maps_url} onChange={(e) => set("maps_url", e.target.value)} placeholder="https://maps.google.com/?q=…" />
            </Field>
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 font-display text-xl font-bold text-maroon-900">🔗 Social Links</h2>
          <p className="mb-4 text-sm text-stone-500">
            Leave empty to hide. Just links — no app integrations needed.
          </p>
          <div className="space-y-4">
            {socialFields.map(([key, label, ph]) => (
              <Field key={key} label={label}>
                <input
                  className={inputCls}
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={ph}
                />
              </Field>
            ))}
          </div>
        </Card>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {saved && <p className="text-sm font-medium text-green-700">{saved}</p>}
        <PrimaryButton disabled={saving}>{saving ? "Saving…" : "Save Settings"}</PrimaryButton>
      </form>
    </div>
  );
}
