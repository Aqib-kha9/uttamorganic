"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { CROP_ITEMS, type CropItem } from "@/data/adminContent";
import Modal, { Field, ImageField, SaveFooter, inputCls } from "@/components/admin/Modal";

export default function CropsManager() {
    const [items, setItems] = useState<CropItem[]>(CROP_ITEMS);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<CropItem | null>(null);
    const [form, setForm] = useState<CropItem>({ id: "", name: "", icon: "", desc: "", image: "" });

    const openNew = () => {
        setEditing(null);
        setForm({ id: `crop-${Date.now()}`, name: "", icon: "", desc: "", image: "" });
        setOpen(true);
    };
    const openEdit = (c: CropItem) => {
        setEditing(c);
        setForm({ ...c });
        setOpen(true);
    };
    const save = () => {
        if (editing) setItems((p) => p.map((c) => (c.id === editing.id ? form : c)));
        else setItems((p) => [...p, form]);
        setOpen(false);
    };
    const remove = (id: string) => {
        if (confirm("Delete this crop schedule?")) setItems((p) => p.filter((c) => c.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">Crop Schedules</h1>
                    <p className="text-sm text-slate-500">Manage the "Customized Schedules By Crops" section.</p>
                </div>
                <button onClick={openNew} className="inline-flex items-center gap-2 rounded-xl bg-emerald-650 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-650/20 hover:bg-emerald-750">
                    <Plus className="h-4 w-4" /> Add Crop
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                    <div key={c.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                        <div className="relative h-28 w-full bg-stone-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
                            <span className="absolute left-3 top-3 text-2xl">{c.icon}</span>
                        </div>
                        <div className="space-y-1 p-4">
                            <h3 className="font-display text-base font-extrabold tracking-tight text-slate-900">{c.name}</h3>
                            <p className="text-xs text-slate-500">{c.desc}</p>
                            <div className="flex gap-2 pt-2">
                                <button onClick={() => openEdit(c)} className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-stone-50">
                                    <Pencil className="h-3.5 w-3.5" /> Edit
                                </button>
                                <button onClick={() => remove(c.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50">
                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                open={open}
                title={editing ? "Edit Crop Schedule" : "Add Crop Schedule"}
                subtitle="Crop name, emoji icon, pest/disease description and image"
                onClose={() => setOpen(false)}
                footer={<SaveFooter onClose={() => setOpen(false)} isEdit={!!editing} onSave={save} />}
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Crop Name">
                        <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tomato" />
                    </Field>
                    <Field label="Icon (emoji)">
                        <input className={inputCls} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="🍅" />
                    </Field>
                    <Field label="Pest / Disease Description" full>
                        <input className={inputCls} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Early Blight, Powdery Mildew, Fruit Borer" />
                    </Field>
                    <ImageField label="Crop Image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
                </div>
            </Modal>
        </div>
    );
}
