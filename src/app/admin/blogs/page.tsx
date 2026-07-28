"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Newspaper } from "lucide-react";
import { BLOG_ITEMS, type BlogItem } from "@/data/adminContent";
import Modal, { Field, ImageField, SaveFooter, inputCls } from "@/components/admin/Modal";

export default function BlogsManager() {
    const [items, setItems] = useState<BlogItem[]>(BLOG_ITEMS);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<BlogItem | null>(null);
    const [form, setForm] = useState<BlogItem>({ id: "", title: "", date: "", desc: "", category: "", image: "" });

    const openNew = () => {
        setEditing(null);
        setForm({ id: `blog-${Date.now()}`, title: "", date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }), desc: "", category: "", image: "" });
        setOpen(true);
    };
    const openEdit = (b: BlogItem) => {
        setEditing(b);
        setForm({ ...b });
        setOpen(true);
    };
    const save = () => {
        if (editing) setItems((p) => p.map((b) => (b.id === editing.id ? form : b)));
        else setItems((p) => [form, ...p]);
        setOpen(false);
    };
    const remove = (id: string) => {
        if (confirm("Delete this blog post?")) setItems((p) => p.filter((b) => b.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">Blogs</h1>
                    <p className="text-sm text-slate-500">Manage blog posts shown on the homepage.</p>
                </div>
                <button onClick={openNew} className="inline-flex items-center gap-2 rounded-xl bg-emerald-650 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-650/20 hover:bg-emerald-750">
                    <Plus className="h-4 w-4" /> Add Blog
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((b) => (
                    <div key={b.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                        <div className="relative h-36 w-full bg-stone-100">
                            {b.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={b.image} alt={b.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full items-center justify-center text-slate-300">
                                    <Newspaper className="h-8 w-8" />
                                </div>
                            )}
                            <span className="absolute left-3 top-3 rounded-lg bg-emerald-650 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                {b.category}
                            </span>
                        </div>
                        <div className="space-y-1.5 p-4">
                            <p className="text-[11px] font-semibold text-slate-400">{b.date}</p>
                            <h3 className="font-display text-sm font-extrabold leading-snug tracking-tight text-slate-900">{b.title}</h3>
                            <p className="line-clamp-2 text-xs text-slate-500">{b.desc}</p>
                            <div className="flex gap-2 pt-2">
                                <button onClick={() => openEdit(b)} className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-stone-50">
                                    <Pencil className="h-3.5 w-3.5" /> Edit
                                </button>
                                <button onClick={() => remove(b.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50">
                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                open={open}
                title={editing ? "Edit Blog Post" : "Add Blog Post"}
                subtitle="Title, date, category, description and image"
                onClose={() => setOpen(false)}
                footer={<SaveFooter onClose={() => setOpen(false)} isEdit={!!editing} onSave={save} />}
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Title" full>
                        <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="No Middlemen, No Overpricing – Direct to Farm Revolution" />
                    </Field>
                    <Field label="Date">
                        <input className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="June 16, 2026" />
                    </Field>
                    <Field label="Category">
                        <input className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="D2C Agriculture" />
                    </Field>
                    <Field label="Description" full>
                        <textarea rows={4} className={inputCls} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Short blog summary shown on the homepage..." />
                    </Field>
                    <ImageField label="Blog Image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
                </div>
            </Modal>
        </div>
    );
}
