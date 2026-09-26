"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { isSupabaseConfigured, supabaseBrowser } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      const redirectParam =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("redirect")
          : null;
      window.location.href = redirectParam || "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-radial from-amber-50/80 via-cream-100 to-stone-200 px-4 py-12">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-saffron-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-maroon-300/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gold-200/20 blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-maroon-100/80 bg-white/95 p-8 shadow-2xl backdrop-blur-md sm:p-10">
          {/* Top festive gradient divider */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-saffron-500 via-amber-500 to-maroon-800" />

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center">
            {/* Sacred Baba Logo Aura */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-amber-400 via-saffron-500 to-maroon-700 p-1 shadow-xl ring-4 ring-amber-300/30">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-cream-50">
                <Image
                  src="/logo.png"
                  alt="Sai Oracle — Bhagwan Sri Sathya Sai Baba"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-maroon-900 text-gold-300 shadow-md ring-2 ring-white">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            </div>

            <h1 className="mt-4 font-display text-2xl font-black tracking-tight text-maroon-950 sm:text-3xl">
              Sai Oracle
            </h1>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="rounded-full bg-saffron-100 px-3 py-0.5 text-[11px] font-extrabold tracking-widest text-saffron-800 uppercase ring-1 ring-saffron-200">
                Admin Portal
              </span>
            </div>
            <p className="mt-2 text-xs font-medium text-stone-500">
              Om Sai Ram — Authorized temple administration sign-in
            </p>
          </div>

          {/* Form */}
          {!configured ? (
            <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-xs leading-relaxed text-amber-900 border border-amber-200">
              <p className="font-bold">Supabase not connected</p>
              <p className="mt-1">
                Please ensure Supabase environment variables are configured.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="gaurav@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/80 py-2.5 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/80 py-2.5 pl-10 pr-10 text-sm text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-saffron-500 focus:bg-white focus:ring-2 focus:ring-saffron-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-relaxed font-medium text-red-700 animate-in fade-in"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="btn-festive mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                    <span>Signing In…</span>
                  </span>
                ) : (
                  <span>Sign In to Admin</span>
                )}
              </button>
            </form>
          )}

          {/* Footer Navigation */}
          <div className="mt-6 flex flex-col items-center gap-3 border-t border-stone-100 pt-5 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-saffron-700 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Sai Oracle website</span>
            </Link>

            <div className="flex items-center gap-1 text-[11px] text-stone-400">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span>Secure encrypted administration session</span>
            </div>

            {/* Powered by Jioratech */}
            <a
              href="https://jioratech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] font-bold text-stone-400 hover:text-maroon-800 hover:border-maroon-300 hover:bg-stone-100 transition-all"
            >
              <span className="text-stone-400 text-[10px] font-medium">Powered by</span>
              <span className="text-saffron-600 font-black">J</span>
              <span>Jioratech</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

