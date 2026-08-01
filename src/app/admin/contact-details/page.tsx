"use client";

import { useEffect, useState } from "react";
import { Plus, X, Save, Phone, Building2, Users } from "lucide-react";
import { CONTACT_DETAILS, type ContactDetails } from "@/data/adminContent";
import { Field, ImageField, inputCls } from "@/components/admin/Modal";
import { getSettings, saveSettings } from "@/lib/client/api";

export default function ContactDetailsManager() {
  const [form, setForm] = useState<ContactDetails>({ ...CONTACT_DETAILS });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    getSettings<ContactDetails>("contact-details")
      .then((details) => {
        setForm(details);
        setApiError(null);
      })
      .catch((error: unknown) => {
        setApiError(error instanceof Error ? error.message : "Unable to load contact details.");
      });
  }, []);

  const updateDirector = (idx: number, key: "name" | "role" | "phone", value: string) => {
    setForm((f) => ({ ...f, directors: f.directors.map((d, i) => (i === idx ? { ...d, [key]: value } : d)) }));
  };
  const addDirector = () => setForm((f) => ({ ...f, directors: [...f.directors, { name: "", role: "Director" }] }));
  const removeDirector = (idx: number) => setForm((f) => ({ ...f, directors: f.directors.filter((_, i) => i !== idx) }));

  const save = async () => {
    setSaving(true);
    setApiError(null);
    try {
      const savedDetails = await saveSettings<ContactDetails>("contact-details", form);
      setForm(savedDetails);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Unable to save contact details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">Contact Details</h1>
          <p className="text-sm text-slate-500">Manage brand info, contact details, legal IDs and directors shown across the site.</p>
        </div>
        <button disabled={saving} onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-emerald-650 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-650/20 hover:bg-emerald-750 disabled:cursor-not-allowed disabled:opacity-60">
          <Save className="h-4 w-4" /> {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {apiError && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
          {apiError}
        </p>
      )}

      {/* Brand */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-emerald-600" />
          <h2 className="font-display text-sm font-extrabold tracking-tight text-slate-900">Brand & Logo</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Brand Name">
            <input className={inputCls} value={form.brandName} onChange={(e) => setForm({ ...form, brandName: e.target.value })} />
          </Field>
          <Field label="Brand Tagline">
            <input className={inputCls} value={form.brandTagline} onChange={(e) => setForm({ ...form, brandTagline: e.target.value })} />
          </Field>
          <Field label="Brand Description" full>
            <textarea rows={3} className={inputCls} value={form.brandDescription} onChange={(e) => setForm({ ...form, brandDescription: e.target.value })} />
          </Field>
          <ImageField label="Logo" value={form.logo} onChange={(v) => setForm({ ...form, logo: v })} />
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Phone className="h-4 w-4 text-emerald-600" />
          <h2 className="font-display text-sm font-extrabold tracking-tight text-slate-900">Contact Information</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Address" full>
            <textarea rows={2} className={inputCls} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </Field>
          <Field label="Phone">
            <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field label="Email">
            <input className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field label="WhatsApp Number">
            <input className={inputCls} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
          </Field>
          <Field label="Office Hours" full>
            <input className={inputCls} value={form.officeHours} onChange={(e) => setForm({ ...form, officeHours: e.target.value })} />
          </Field>
        </div>
      </section>

      {/* Legal */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-display text-sm font-extrabold tracking-tight text-slate-900">Legal & Compliance</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Company Name">
            <input className={inputCls} value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
          </Field>
          <Field label="CIN">
            <input className={inputCls} value={form.cin} onChange={(e) => setForm({ ...form, cin: e.target.value })} />
          </Field>
          <Field label="GSTIN">
            <input className={inputCls} value={form.gstin} onChange={(e) => setForm({ ...form, gstin: e.target.value })} />
          </Field>
        </div>
      </section>

      {/* Socials */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-display text-sm font-extrabold tracking-tight text-slate-900">Social Links</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Facebook">
            <input className={inputCls} value={form.socials.facebook} onChange={(e) => setForm({ ...form, socials: { ...form.socials, facebook: e.target.value } })} />
          </Field>
          <Field label="Instagram">
            <input className={inputCls} value={form.socials.instagram} onChange={(e) => setForm({ ...form, socials: { ...form.socials, instagram: e.target.value } })} />
          </Field>
          <Field label="Twitter / X">
            <input className={inputCls} value={form.socials.twitter} onChange={(e) => setForm({ ...form, socials: { ...form.socials, twitter: e.target.value } })} />
          </Field>
        </div>
      </section>

      {/* Directors */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-600" />
            <h2 className="font-display text-sm font-extrabold tracking-tight text-slate-900">Directors</h2>
          </div>
          <button onClick={addDirector} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-stone-300 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-stone-50">
            <Plus className="h-3.5 w-3.5" /> Add Director
          </button>
        </div>
        <div className="space-y-3">
          {form.directors.map((d, i) => (
            <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <input className={inputCls} value={d.name} onChange={(e) => updateDirector(i, "name", e.target.value)} placeholder="Full Name" />
              <input className={inputCls} value={d.role} onChange={(e) => updateDirector(i, "role", e.target.value)} placeholder="Role" />
              <input className={inputCls} value={d.phone ?? ""} onChange={(e) => updateDirector(i, "phone", e.target.value)} placeholder="Phone (optional)" />
              <button onClick={() => removeDirector(i)} className="rounded-lg border border-rose-200 px-3 text-rose-600 hover:bg-rose-50">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
