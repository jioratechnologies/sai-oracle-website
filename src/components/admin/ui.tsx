"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

export const isAdminConfigured =
  typeof process !== "undefined" &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-maroon-100 bg-white p-5 shadow-sm ${className}`}>
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
      <span className="mb-1 block text-sm font-semibold text-maroon-900">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-stone-500">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-maroon-200 bg-cream-50 px-3 py-2 text-[15px] text-stone-800 outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-200";

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      {...props}
      className="rounded-full bg-maroon-800 px-5 py-2 text-sm font-semibold text-cream-50 transition-colors hover:bg-maroon-700 disabled:opacity-50"
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
      className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const live = status === "published" || status === "true";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        live ? "bg-green-100 text-green-800" : "bg-stone-200 text-stone-600"
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
            NEXT_PUBLIC_SUPABASE_ANON_KEY=…
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
    <span className="inline-flex items-center gap-2 text-xs">
      <span className="font-semibold text-red-700">Sure?</span>
      <button
        type="button"
        onClick={onDelete}
        className="rounded-full bg-red-700 px-3 py-1 font-semibold text-white hover:bg-red-800"
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-full border border-stone-300 px-3 py-1 text-stone-600"
      >
        No
      </button>
    </span>
  );
}

export function BackLink({ href = "/admin", label = "← Dashboard" }: { href?: string; label?: string }) {
  return (
    <Link href={href} className="text-sm font-semibold text-saffron-600 hover:underline">
      {label}
    </Link>
  );
}
