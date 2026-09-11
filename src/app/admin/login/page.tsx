"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OmMark from "@/components/OmMark";
import { isSupabaseConfigured, supabaseBrowser } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const configured = isSupabaseConfigured();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const sb = supabaseBrowser();
      if (!sb) throw new Error("Supabase is not configured.");
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-maroon-100 bg-white p-8 shadow-md">
        <div className="flex flex-col items-center text-center">
          <OmMark className="h-14 w-14" />
          <h1 className="mt-3 font-display text-3xl font-bold text-maroon-900">Sai Oracle Admin</h1>
          <p className="mt-1 text-sm text-stone-500">🙏 Om Sai Ram — staff login only</p>
        </div>

        {!configured ? (
          <div className="mt-6 rounded-xl bg-saffron-100/60 p-4 text-sm leading-relaxed text-stone-700">
            <p className="font-semibold text-maroon-900">🔌 Supabase not connected yet</p>
            <p className="mt-1">
              Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, run{" "}
              <code>supabase/schema.sql</code>, create an admin user in Supabase Authentication, then
              log in here.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-maroon-900">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-maroon-200 bg-cream-50 px-3 py-2 outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-200"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-maroon-900">Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-maroon-200 bg-cream-50 px-3 py-2 outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-200"
              />
            </label>
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-maroon-800 py-2.5 font-semibold text-cream-50 hover:bg-maroon-700 disabled:opacity-50"
            >
              {busy ? "Signing in…" : "Login"}
            </button>
          </form>
        )}
        <Link href="/" className="mt-5 block text-center text-sm font-semibold text-saffron-600 hover:underline">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
