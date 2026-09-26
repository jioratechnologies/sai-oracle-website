"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Building2,
  QrCode,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  ShieldCheck,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import {
  BackLink,
  Card,
  Field,
  PrimaryButton,
  inputCls,
} from "@/components/admin/ui";
import { seedTrustSettings } from "@/lib/seed";
import type { TrustSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

export default function AdminTrustPage() {
  const [form, setForm] = useState<TrustSettings>({ ...seedTrustSettings });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/trust");
        if (res.ok) {
          const { trust } = await res.json();
          if (trust) setForm(trust);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, []);

  function set<K extends keyof TrustSettings>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved("");
    try {
      const res = await fetch("/api/admin/trust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trust: form }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to save");
      }
      setSaved("✓ Trust details saved — the donation page is now updated.");
      setTimeout(() => setSaved(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  // Derive auto-generated UPI QR link (Google Charts API — no server required)
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(form.upi_id)}&pn=${encodeURIComponent(form.payee_name)}&cu=INR`;
  const qrPreviewUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiDeepLink)}`;

  return (
    <div className="max-w-3xl space-y-6">
      <BackLink />
      <div>
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold text-maroon-900">
          <Heart className="h-7 w-7 text-saffron-600" />
          Trust & Donation Settings
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Update UPI ID, bank account details, mailing address and trust contact. Changes reflect instantly on the donation page.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-stone-500 py-10">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading…
        </div>
      ) : (
        <form onSubmit={save} className="space-y-6">

          {/* UPI Section */}
          <Card>
            <h2 className="flex items-center gap-2 text-base font-bold text-maroon-900 border-b border-maroon-100 pb-3 mb-5">
              <QrCode className="h-5 w-5 text-saffron-600" />
              UPI Payment Details
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  label="UPI ID"
                  hint="e.g. 30350015946@sbi — QR code is auto-generated from this"
                >
                  <input
                    type="text"
                    className={inputCls}
                    value={form.upi_id}
                    onChange={(e) => set("upi_id", e.target.value)}
                    placeholder="yourname@bankcode"
                    required
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Payee / Beneficiary Name">
                  <input
                    type="text"
                    className={inputCls}
                    value={form.payee_name}
                    onChange={(e) => set("payee_name", e.target.value)}
                    placeholder="Sri Sai Sansthan Charitable Trust"
                    required
                  />
                </Field>
              </div>
            </div>

            {/* Live QR Preview */}
            {form.upi_id && (
              <div className="mt-5 flex items-start gap-5 rounded-2xl border border-gold-200 bg-amber-50/50 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrPreviewUrl}
                  alt="Auto-generated UPI QR Preview"
                  width={120}
                  height={120}
                  className="rounded-xl border-2 border-gold-300 bg-white p-1 shadow"
                />
                <div className="text-sm space-y-1">
                  <p className="font-bold text-maroon-900 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Auto-generated QR Preview
                  </p>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    This QR is dynamically generated from your UPI ID above. Works with Google Pay, PhonePe, Paytm, BHIM and all Indian banking apps.
                  </p>
                  <p className="font-mono text-xs text-saffron-800 bg-saffron-50 border border-saffron-200 rounded-lg px-2 py-1 inline-block mt-1">
                    {form.upi_id}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    <strong>Note:</strong> To use your own QR image, upload{" "}
                    <code className="bg-stone-100 px-1 rounded text-[11px]">upi_qr.svg</code>{" "}
                    to <code className="bg-stone-100 px-1 rounded text-[11px]">/public/assets/content/trust/</code>
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Bank Account Section */}
          <Card>
            <h2 className="flex items-center gap-2 text-base font-bold text-maroon-900 border-b border-maroon-100 pb-3 mb-5">
              <Building2 className="h-5 w-5 text-saffron-600" />
              Bank Account Details
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Account Name (as per bank)">
                  <input
                    type="text"
                    className={inputCls + " uppercase tracking-wide"}
                    value={form.account_name}
                    onChange={(e) => set("account_name", e.target.value)}
                    placeholder="SRI SAI SANSTHAN CHARITABLE TRUST"
                  />
                </Field>
              </div>

              <Field label="Bank Name">
                <input
                  type="text"
                  className={inputCls}
                  value={form.bank_name}
                  onChange={(e) => set("bank_name", e.target.value)}
                  placeholder="State Bank of India (SBI)"
                />
              </Field>

              <Field label="Account Number">
                <input
                  type="text"
                  className={inputCls + " font-mono tracking-widest"}
                  value={form.account_number}
                  onChange={(e) => set("account_number", e.target.value)}
                  placeholder="30350015946"
                />
              </Field>

              <Field label="IFSC Code">
                <input
                  type="text"
                  className={inputCls + " font-mono uppercase tracking-widest"}
                  value={form.ifsc_code}
                  onChange={(e) => set("ifsc_code", e.target.value.toUpperCase())}
                  placeholder="SBIN0001562"
                />
              </Field>

              <Field label="Branch Address">
                <input
                  type="text"
                  className={inputCls}
                  value={form.branch_address}
                  onChange={(e) => set("branch_address", e.target.value)}
                  placeholder="Begum Pul, Meerut, Uttar Pradesh"
                />
              </Field>
            </div>
          </Card>

          {/* Cheque / DD Mailing Address */}
          <Card>
            <h2 className="flex items-center gap-2 text-base font-bold text-maroon-900 border-b border-maroon-100 pb-3 mb-5">
              <MapPin className="h-5 w-5 text-saffron-600" />
              Mailing / Cheque Address
            </h2>
            <Field label="Full Mailing Address" hint="Displayed on the By Cheque / Demand Draft section">
              <textarea
                rows={4}
                className={inputCls}
                value={form.mailing_address}
                onChange={(e) => set("mailing_address", e.target.value)}
                placeholder={"The Managing Trustee\nSri Sai Sansthan Charitable Trust\nH.No- 23, Godwin Estate, Roorkee Road\nMeerut, Uttar Pradesh – 250001, India"}
              />
            </Field>
          </Card>

          {/* Trust Contact */}
          <Card>
            <h2 className="flex items-center gap-2 text-base font-bold text-maroon-900 border-b border-maroon-100 pb-3 mb-5">
              <Phone className="h-5 w-5 text-saffron-600" />
              Direct Trust Contact
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Trust Email">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="email"
                    className={inputCls + " pl-9"}
                    value={form.trust_email}
                    onChange={(e) => set("trust_email", e.target.value)}
                    placeholder="saioracle7@gmail.com"
                  />
                </div>
              </Field>

              <Field label="Trust Phone / WhatsApp">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    className={inputCls + " pl-9"}
                    value={form.trust_phone}
                    onChange={(e) => set("trust_phone", e.target.value)}
                    placeholder="+91-9997815743"
                  />
                </div>
              </Field>
            </div>
          </Card>

          {/* 80G Tax Exemption Note */}
          <Card>
            <h2 className="flex items-center gap-2 text-base font-bold text-maroon-900 border-b border-maroon-100 pb-3 mb-5">
              <CreditCard className="h-5 w-5 text-saffron-600" />
              80G Tax Exemption Note
            </h2>
            <Field label="Exemption Description" hint="Shown on the donation page below the bank details">
              <textarea
                rows={3}
                className={inputCls}
                value={form.tax_exemption_note}
                onChange={(e) => set("tax_exemption_note", e.target.value)}
              />
            </Field>
          </Card>

          {/* Feedback */}
          {saved && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-800">
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              {saved}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-800">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 pb-8">
            <PrimaryButton disabled={saving}>
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                </span>
              ) : (
                "Save Trust Details"
              )}
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
}
