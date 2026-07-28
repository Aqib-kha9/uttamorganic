"use client";

import { useState } from "react";
import { Plus, X, Save, Truck } from "lucide-react";
import { D2C_SECTION, type D2CSection } from "@/data/adminContent";
import { Field, ImageField, inputCls } from "@/components/admin/Modal";

export default function D2CManager() {
    const [form, setForm] = useState<D2CSection>({ ...D2C_SECTION });
    const [saved, setSaved] = useState(false);

    const updateBullet = (idx: number, value: string) => {
        setForm((f) => ({ ...f, bullets: f.bullets.map((b, i) => (i === idx ? value : b)) }));
    };
    const addBullet = () => setForm((f) => ({ ...f, bullets: [...f.bullets, ""] }));
    const removeBullet = (idx: number) => setForm((f) => ({ ...f, bullets: f.bullets.filter((_, i) => i !== idx) }));

    const save = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">Direct to Farm / About Section</h1>
                    <p className="text-sm text-slate-500">Manage the D2C section shown on the homepage and About page.</p>
                </div>
                <button onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-emerald-650 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-650/20 hover:bg-emerald-750">
                    <Save className="h-4 w-4" /> {saved ? "Saved!" : "Save Changes"}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Preview */}
                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                    <div className="relative h-44 w-full bg-stone-100">
                        {form.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={form.image} alt={form.heading} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center text-slate-300">
                                <Truck className="h-10 w-10" />
                            </div>
                        )}
                        <span className="absolute left-4 top-4 rounded-lg bg-emerald-650 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                            {form.badge}
                        </span>
                    </div>
                    <div className="space-y-2 p-5">
                        <h3 className="font-display text-lg font-extrabold tracking-tight text-slate-900">{form.heading}</h3>
                        <p className="text-sm text-slate-500">{form.description}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {form.bullets.filter(Boolean).map((b, i) => (
                                <span key={i} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{b}</span>
                            ))}
                        </div>
                        <button className="mt-2 rounded-xl bg-emerald-650 px-4 py-2 text-xs font-bold text-white">{form.ctaText}</button>
                    </div>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Badge Text">
                            <input className={inputCls} value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Direct to Farm" />
                        </Field>
                        <Field label="CTA Button Text">
                            <input className={inputCls} value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} placeholder="Explore Our Journey" />
                        </Field>
                        <Field label="Heading" full>
                            <input className={inputCls} value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} placeholder="India's Premier Factory-to-Farm Agricultural Brand" />
                        </Field>
                        <Field label="Description" full>
                            <textarea rows={4} className={inputCls} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="We operate a complete laboratory to synthesis cycle..." />
                        </Field>
                        <ImageField label="Section Image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
                    </div>

                    {/* Bullets */}
                    <div className="mt-5">
                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Highlight Bullets</label>
                        <div className="space-y-2">
                            {form.bullets.map((b, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input className={inputCls} value={b} onChange={(e) => updateBullet(i, e.target.value)} placeholder={`Bullet ${i + 1}`} />
                                    <button onClick={() => removeBullet(i)} className="rounded-lg border border-rose-200 p-2.5 text-rose-600 hover:bg-rose-50">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            <button onClick={addBullet} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-stone-300 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-stone-50">
                                <Plus className="h-3.5 w-3.5" /> Add Bullet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
