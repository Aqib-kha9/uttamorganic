"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { HERO_SLIDES, type HeroSlide } from "@/data/adminContent";
import Modal, { Field, ImageField, SaveFooter, inputCls } from "@/components/admin/Modal";
import { useResource } from "@/lib/client/useResource";

export default function HeroManager() {
    const { items: slides, error, save: saveSlide, remove: removeSlide } = useResource<HeroSlide>("hero", HERO_SLIDES);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<HeroSlide | null>(null);
    const [form, setForm] = useState<HeroSlide>({ id: "", image: "", headline: "", subtext: "" });

    const openNew = () => {
        setEditing(null);
        setForm({ id: `slide-${Date.now()}`, image: "", headline: "", subtext: "" });
        setOpen(true);
    };

    const openEdit = (s: HeroSlide) => {
        setEditing(s);
        setForm({ ...s });
        setOpen(true);
    };

    const save = async () => {
        try {
            await saveSlide(form, editing?.id);
            setOpen(false);
        } catch (saveError) {
            alert(saveError instanceof Error ? saveError.message : "Unable to save hero slide.");
        }
    };

    const remove = async (id: string) => {
        if (confirm("Delete this hero slide?")) {
            try {
                await removeSlide(id);
            } catch (removeError) {
                alert(removeError instanceof Error ? removeError.message : "Unable to delete hero slide.");
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
                        Hero Slides
                    </h1>
                    <p className="text-sm text-slate-500">
                        Manage the rotating banner shown at the top of the homepage.
                    </p>
                </div>
                <button
                    onClick={openNew}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-650 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-650/20 hover:bg-emerald-750"
                >
                    <Plus className="h-4 w-4" /> Add Slide
                </button>
            </div>

            {error && <p className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-700">Using local fallback data: {error}</p>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {slides.map((s) => (
                    <div key={s.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                        <div className="relative h-40 w-full bg-stone-100">
                            {s.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={s.image} alt={s.headline} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full items-center justify-center text-slate-300">
                                    <ImageIcon className="h-8 w-8" />
                                </div>
                            )}
                            <span className="absolute left-3 top-3 rounded-lg bg-slate-900/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                Slide
                            </span>
                        </div>
                        <div className="space-y-1 p-4">
                            <h3 className="font-display text-base font-extrabold tracking-tight text-slate-900">
                                {s.headline}
                            </h3>
                            <p className="text-xs text-slate-500">{s.subtext}</p>
                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={() => openEdit(s)}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-stone-50"
                                >
                                    <Pencil className="h-3.5 w-3.5" /> Edit
                                </button>
                                <button
                                    onClick={() => remove(s.id)}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50"
                                >
                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                open={open}
                title={editing ? "Edit Hero Slide" : "Add Hero Slide"}
                subtitle="Image, headline and subtext shown on the banner"
                onClose={() => setOpen(false)}
                footer={<SaveFooter onClose={() => setOpen(false)} isEdit={!!editing} onSave={save} />}
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <ImageField label="Banner Image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
                    <Field label="Headline">
                        <input
                            className={inputCls}
                            value={form.headline}
                            onChange={(e) => setForm({ ...form, headline: e.target.value })}
                            placeholder="Get Free Parichay Combo Direct From Factory"
                        />
                    </Field>
                    <Field label="Subtext" full>
                        <textarea
                            rows={3}
                            className={inputCls}
                            value={form.subtext}
                            onChange={(e) => setForm({ ...form, subtext: e.target.value })}
                            placeholder="Save up to 70% middleman commission on certified bio-inputs."
                        />
                    </Field>
                </div>
            </Modal>
        </div>
    );
}
