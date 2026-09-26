"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState, type ReactNode } from "react";

export const isAdminConfigured =
  typeof process !== "undefined" &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-maroon-100 bg-white p-4 sm:p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-maroon-900">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-stone-500">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-maroon-200 bg-cream-50 px-3.5 py-2.5 text-[15px] text-stone-800 outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-200 transition-colors";

export function PrimaryButton({
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      onClick={onClick}
      {...props}
      className="inline-flex items-center gap-1.5 rounded-full bg-maroon-800 px-5 py-2.5 text-sm font-bold text-cream-50 shadow-sm transition-all hover:bg-maroon-700 active:scale-95 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 active:scale-95 transition-all disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const live = status === "published" || status === "true";
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
        live
          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
          : "bg-stone-100 text-stone-600 border border-stone-200"
      }`}
    >
      {status === "true" ? "Published" : status === "false" ? "Hidden" : status}
    </span>
  );
}

export function SetupNotice() {
  return (
    <Card className="border-saffron-300 bg-saffron-100/40">
      <h2 className="font-display text-2xl font-bold text-maroon-900">Connect Supabase to go live</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-stone-700">
        The website is currently showing starter content. To let the admin panel save changes:
      </p>
      <ol className="mt-3 list-decimal space-y-1.5 pl-6 text-[15px] text-stone-700">
        <li>
          Create a free project at{" "}
          <a href="https://supabase.com" target="_blank" rel="noreferrer" className="font-semibold text-maroon-800 underline">
            supabase.com
          </a>
        </li>
        <li>
          In the SQL Editor, run <code className="rounded bg-maroon-950 px-1.5 py-0.5 text-cream-100">supabase/schema.sql</code> then{" "}
          <code className="rounded bg-maroon-950 px-1.5 py-0.5 text-cream-100">supabase/seed.sql</code> from this repo
        </li>
        <li>Create a public storage bucket named <code className="rounded bg-maroon-950 px-1.5 py-0.5 text-cream-100">temple-media</code> (see schema.sql for policies)</li>
        <li>
          Add an admin user under Authentication → Users, then set in Vercel /{" "}
          <code className="rounded bg-maroon-950 px-1.5 py-0.5 text-cream-100">.env.local</code>:
          <code className="mt-1 block rounded bg-maroon-950 p-2 text-xs text-cream-100">
            NEXT_PUBLIC_SUPABASE_URL=…<br />
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=…
          </code>
        </li>
      </ol>
      <p className="mt-3 text-sm text-stone-600">
        Full steps are in the project <code>README.md</code>. Editing is disabled until then.
      </p>
    </Card>
  );
}

export function ConfirmDelete({ onDelete, label = "Delete" }: { onDelete: () => void; label?: string }) {
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <DangerButton onClick={() => setConfirming(true)}>{label}</DangerButton>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span className="font-bold text-red-700">Sure?</span>
      <button
        type="button"
        onClick={onDelete}
        className="rounded-full bg-red-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-800 active:scale-95 transition-all"
      >
        Yes, Delete
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-full border border-stone-300 px-3 py-1.5 text-stone-600 hover:bg-stone-50 active:scale-95 transition-all"
      >
        Cancel
      </button>
    </span>
  );
}

export function BackLink({ href = "/admin", label = "Dashboard" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm font-semibold text-saffron-700 hover:text-saffron-800 transition-colors group"
    >
      <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
      {label}
    </Link>
  );
}


