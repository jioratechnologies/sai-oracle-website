"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import type { AartiTiming } from "@/lib/types";
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

export default function AdminTimingsPage() {
  const [rows, setRows] = useState<AartiTiming[]>([]);
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("");
  const [time, setTime] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  async function load() {
    const sb = supabaseBrowser();
    if (!sb) {
      setLoading(false);
      return;
    }
    const { data } = await sb.from("temple_timings").select("*").order("sort_order");
    setRows((data ?? []) as AartiTiming[]);
    setLoading(false);
  }

  useEffect(() => {
    // Mount fetch for the admin list — legitimate external sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function saveAll(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved("");
    try {
      const sb = supabaseBrowser();
      if (!sb) throw new Error("Supabase is not configured.");
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        if (!r.label.trim() || !r.time.trim()) throw new Error("Every row needs a name and a time.");
        const { error } = await sb
          .from("temple_timings")
          .update({ label: r.label.trim(), time: r.time.trim(), sort_order: i + 1 })
          .eq("id", r.id);
        if (error) throw error;
      }
      setSaved("✓ Timings saved — the website is updated.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function addRow(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const sb = supabaseBrowser();
      if (!sb) throw new Error("Supabase is not configured.");
      if (!label.trim() || !time.trim()) throw new Error("Give the new row a name and a time.");
      const { error } = await sb
        .from("temple_timings")
        .insert({ label: label.trim(), time: time.trim(), sort_order: rows.length + 1 });
      if (error) throw error;
      setLabel("");
      setTime("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add. Please try again.");
    }
  }

  async function remove(id: string) {
    const sb = supabaseBrowser();
    if (!sb) return;
    await sb.from("temple_timings").delete().eq("id", id);
    setRows((r) => r.filter((x) => x.id !== id));
  }

  function move(index: number, dir: -1 | 1) {
    setRows((r) => {
      const next = [...r];
      const j = index + dir;
      if (j < 0 || j >= next.length) return r;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  }

  if (!isAdminConfigured) {
    return (
      <div className="space-y-4">
        <BackLink />
        <h1 className="font-display text-3xl font-bold text-maroon-900">⏰ Temple Timings</h1>
        <SetupNotice />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink />
      <h1 className="font-display text-3xl font-bold text-maroon-900">⏰ Temple Timings</h1>
      <p className="text-[15px] text-stone-600">
        Edit the daily aarti schedule. Saving updates the website instantly.
      </p>

      <Card>
        {loading ? (
          <p className="text-sm text-stone-500">Loading…</p>
        ) : (
          <form onSubmit={saveAll} className="space-y-3">
            {rows.map((r, i) => (
              <div key={r.id} className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <button type="button" aria-label="Move up" onClick={() => move(i, -1)} className="px-1 text-stone-400 hover:text-maroon-700">▲</button>
                  <button type="button" aria-label="Move down" onClick={() => move(i, 1)} className="px-1 text-stone-400 hover:text-maroon-700">▼</button>
                </div>
                <input
                  className={inputCls}
                  value={r.label}
                  onChange={(e) =>
                    setRows((all) => all.map((x) => (x.id === r.id ? { ...x, label: e.target.value } : x)))
                  }
                  aria-label="Timing name"
                />
                <input
                  className={`${inputCls} max-w-32`}
                  value={r.time}
                  onChange={(e) =>
                    setRows((all) => all.map((x) => (x.id === r.id ? { ...x, time: e.target.value } : x)))
                  }
                  aria-label="Time"
                  placeholder="6:00 PM"
                />
                <ConfirmDelete onDelete={() => remove(r.id)} />
              </div>
            ))}
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
            {saved && <p className="text-sm font-medium text-green-700">{saved}</p>}
            <PrimaryButton disabled={saving}>{saving ? "Saving…" : "Save Changes"}</PrimaryButton>
          </form>
        )}
      </Card>

      <Card>
        <h2 className="mb-3 font-display text-xl font-bold text-maroon-900">Add Row</h2>
        <form onSubmit={addRow} className="flex flex-wrap items-end gap-2">
          <div className="min-w-40 flex-1">
            <Field label="Name">
              <input className={inputCls} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="E.g. Bhajan Sandhya" />
            </Field>
          </div>
          <div className="w-36">
            <Field label="Time">
              <input className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} placeholder="7:00 PM" />
            </Field>
          </div>
          <PrimaryButton>Add</PrimaryButton>
        </form>
      </Card>
    </div>
  );
}
